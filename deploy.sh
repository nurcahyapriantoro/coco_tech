#!/bin/bash
# ══════════════════════════════════════════════════════════════════════════
#  CocoTech — Deployment Script
#  Jalankan di Droplet setelah git pull, atau gunakan sebagai deploy hook
#
#  Usage:
#    chmod +x deploy.sh
#    ./deploy.sh
# ══════════════════════════════════════════════════════════════════════════

set -e  # Exit on any error

echo "======================================"
echo "  CocoTech Deploy Script"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "======================================"

# ── 1. Pull latest code ───────────────────────────────────────────────────
echo ""
echo "[1/6] Pulling latest code from git..."
git pull origin main

# ── 2. Install backend dependencies ──────────────────────────────────────
echo ""
echo "[2/6] Installing backend dependencies..."
cd backend
npm install --production
cd ..

# ── 3. Install frontend dependencies & build ─────────────────────────────
echo ""
echo "[3/6] Installing frontend dependencies..."
cd frontend
npm install

echo ""
echo "[4/6] Building frontend for production..."
npm run build
cd ..

# ── 4. Ensure logs directory exists ──────────────────────────────────────
echo ""
echo "[5/6] Setting up logs directory..."
mkdir -p logs

# ── 5. Reload backend with PM2 (zero-downtime) ───────────────────────────
echo ""
echo "[6/6] Reloading backend with PM2..."
if pm2 describe cocotech-backend > /dev/null 2>&1; then
    pm2 reload pm2.config.js --env production
    echo "  -> App reloaded (zero-downtime)"
else
    pm2 start pm2.config.js --env production
    pm2 save
    echo "  -> App started for the first time"
fi

# ── 6. Health check ───────────────────────────────────────────────────────
echo ""
echo "Waiting 3 seconds for app to initialize..."
sleep 3

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/api/health)
if [ "$HTTP_STATUS" = "200" ]; then
    echo ""
    echo "======================================"
    echo "  Deploy successful!"
    echo "  Health check: OK (HTTP $HTTP_STATUS)"
    echo "======================================"
else
    echo ""
    echo "======================================"
    echo "  WARNING: Health check failed!"
    echo "  HTTP Status: $HTTP_STATUS"
    echo "  Check logs: pm2 logs cocotech-backend"
    echo "======================================"
    exit 1
fi

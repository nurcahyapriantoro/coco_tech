// NOTE: .env is loaded via --env-file flag in package.json scripts
// This ensures all process.env vars (JWT_SECRET, ADMIN_PASS, etc.) are available
// BEFORE any module (including db.js) is evaluated — critical for ESM hoisting.

import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import authRouter from './routes/auth.js';
import portfolioRouter from './routes/portfolio.js';
import experienceRouter from './routes/experience.js';
import testimonialsRouter from './routes/testimonials.js';
import paketRouter from './routes/paket.js';
import skillsRouter from './routes/skills.js';
import awardsRouter from './routes/awards.js';
import settingsRouter from './routes/settings.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Fail-fast guards ────────────────────────────────────────────────────────
if (!process.env.JWT_SECRET) {
  console.error('[FATAL] JWT_SECRET environment variable is not set. Refusing to start.');
  console.error('[FATAL] Make sure backend/.env exists and contains JWT_SECRET.');
  process.exit(1);
}

if (!process.env.ADMIN_PASS) {
  console.error('[FATAL] ADMIN_PASS environment variable is not set. Refusing to start.');
  console.error('[FATAL] Make sure backend/.env exists and contains ADMIN_PASS.');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV === 'production';

// ── Security headers (helmet) ───────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:     ["'self'"],
      scriptSrc:      ["'self'"],
      styleSrc:       ["'self'", "'unsafe-inline'"],   // Tailwind inline styles; tighten after audit
      imgSrc:         ["'self'", 'data:', 'https:'],
      fontSrc:        ["'self'", 'data:'],
      connectSrc:     ["'self'"],
      mediaSrc:       ["'self'"],
      frameSrc:       ["'none'"],
      frameAncestors: ["'none'"],
      objectSrc:      ["'none'"],
      baseUri:        ["'self'"],
      formAction:     ["'self'"],
    },
  },
  // HSTS: enable only when HTTPS is live (safe to enable early — ignored over HTTP)
  strictTransportSecurity: isProd
    ? { maxAge: 31536000, includeSubDomains: true }
    : false,
}));

// ── Rate Limiting ────────────────────────────────────────────────────────────
// Login endpoint: max 5 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API limiter: 200 requests per minute per IP
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  message: { error: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,   // Required for httpOnly cookies to be forwarded
}));

// ── Parsers ──────────────────────────────────────────────────────────────────
app.use(cookieParser());
app.use(express.json({ limit: '256kb' }));   // 10mb was excessive for a CMS — reduced to 256kb

// ── Health check (no rate limit, used by Nginx/uptime monitors) ──────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── API routes ───────────────────────────────────────────────────────────────
app.use('/api/auth/login', loginLimiter);
app.use('/api', apiLimiter);
app.use('/api/auth', authRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/paket', paketRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/awards', awardsRouter);
app.use('/api/settings', settingsRouter);

// ── /api/* 404 — catch API typos before the SPA wildcard returns HTML ────────
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// ── Serve frontend dist in production (unified mode) ─────────────────────────
const distPath = join(__dirname, '../../frontend/dist');
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`CocoTech backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

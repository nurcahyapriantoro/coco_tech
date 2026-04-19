# CocoTech — Panduan Deploy ke DigitalOcean Droplet

Panduan ini mencakup langkah-langkah lengkap dari membuat Droplet hingga aplikasi bisa diakses via browser.

---

## Daftar Isi

1. [Persiapan Lokal](#1-persiapan-lokal)
2. [Buat Droplet di DigitalOcean](#2-buat-droplet-di-digitalocean)
3. [Koneksi SSH ke Droplet](#3-koneksi-ssh-ke-droplet)
4. [Setup Server (Node.js, PM2, Nginx)](#4-setup-server)
5. [Upload Project ke Server](#5-upload-project-ke-server)
6. [Konfigurasi Environment Variables](#6-konfigurasi-environment-variables)
7. [Build Frontend & Start Backend](#7-build-frontend--start-backend)
8. [Konfigurasi Nginx](#8-konfigurasi-nginx)
9. [Firewall & Keamanan](#9-firewall--keamanan)
10. [Verifikasi & Testing](#10-verifikasi--testing)
11. [Update / Redeploy](#11-update--redeploy)
12. [Upgrade ke HTTPS (nanti, jika sudah punya domain)](#12-upgrade-ke-https-opsional)

---

## 1. Persiapan Lokal

Sebelum deploy, pastikan kode sudah siap:

```bash
# Di komputer lokal — pastikan tidak ada file sensitif yang ter-commit
git status

# Cek apakah .env masuk ke git (seharusnya tidak)
git ls-files backend/.env   # harusnya kosong
git ls-files data/*.db      # harusnya kosong
```

Push kode ke GitHub/GitLab:

```bash
git add .
git commit -m "production ready"
git push origin main
```

---

## 2. Buat Droplet di DigitalOcean

1. Login ke [https://cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Klik **Create > Droplets**
3. Pilih konfigurasi berikut:

| Opsi | Pilihan |
|---|---|
| **Region** | Singapore (SGP1) — terdekat ke Indonesia |
| **OS** | Ubuntu 22.04 (LTS) x64 |
| **Plan** | Basic — Shared CPU |
| **Size** | **$6/bulan** — 1 vCPU, 1 GB RAM, 25 GB SSD (cukup untuk awal) |
| **Authentication** | SSH Key (lebih aman dari password) |
| **Hostname** | `cocotech-server` |

4. Klik **Create Droplet**
5. Tunggu ~1 menit hingga Droplet siap
6. Catat **IP Address** Droplet Anda (contoh: `128.199.xxx.xxx`)

### Buat SSH Key (jika belum ada)

Di komputer lokal:

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "cocotech-deploy"

# Tampilkan public key (copy ini ke DigitalOcean)
cat ~/.ssh/id_ed25519.pub
```

---

## 3. Koneksi SSH ke Droplet

```bash
# Ganti 128.199.xxx.xxx dengan IP Droplet Anda
ssh root@128.199.xxx.xxx
```

Jika berhasil, Anda akan melihat prompt `root@cocotech-server:~#`.

---

## 4. Setup Server

Jalankan semua perintah ini di dalam server (setelah SSH):

### 4.1 Update sistem

```bash
apt update && apt upgrade -y
```

### 4.2 Install Node.js 20 LTS

```bash
# Install NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js
apt install -y nodejs

# Verifikasi
node --version   # harus v20.x.x
npm --version    # harus 10.x.x
```

### 4.3 Install PM2 (process manager)

```bash
npm install -g pm2

# Verifikasi
pm2 --version
```

### 4.4 Install Nginx

```bash
apt install -y nginx

# Aktifkan dan start Nginx
systemctl enable nginx
systemctl start nginx

# Verifikasi
nginx -v
systemctl status nginx
```

### 4.5 Install Git

```bash
apt install -y git

# Verifikasi
git --version
```

---

## 5. Upload Project ke Server

### Opsi A — Clone dari GitHub (Recommended)

```bash
# Di server, pindah ke direktori yang tepat
cd /var/www

# Clone repository
git clone https://github.com/USERNAME/cocotech.git cocotech

# Masuk ke direktori project
cd /var/www/cocotech
```

### Opsi B — Upload via SCP (dari komputer lokal)

```bash
# Jalankan di komputer LOKAL (bukan server)
# Buat direktori di server dulu
ssh root@128.199.xxx.xxx "mkdir -p /var/www/cocotech"

# Upload file (kecuali node_modules, .env, dist, data/*.db)
rsync -avz --exclude='node_modules' --exclude='.env' \
  --exclude='dist' --exclude='data/*.db' --exclude='.git' \
  ./ root@128.199.xxx.xxx:/var/www/cocotech/
```

---

## 6. Konfigurasi Environment Variables

Di server, buat file `.env` untuk backend:

```bash
cd /var/www/cocotech/backend

# Buat file .env (JANGAN copy dari lokal — buat baru dengan nilai production)
nano .env
```

Isi file `.env` dengan nilai berikut (**ganti semua placeholder**):

```env
PORT=4000
NODE_ENV=production
JWT_SECRET=GANTI_DENGAN_RANDOM_STRING_64_KARAKTER_ATAU_LEBIH
ADMIN_USER=admin
ADMIN_PASS=GANTI_DENGAN_PASSWORD_KUAT_MINIMAL_16_KARAKTER
FRONTEND_URL=http://128.199.xxx.xxx
```

> **Generate JWT_SECRET yang kuat di server:**
> ```bash
> node -e "const crypto = require('crypto'); console.log(crypto.randomBytes(48).toString('hex'));"
> ```

Simpan file: `Ctrl+X` → `Y` → `Enter`

**Verifikasi file sudah benar:**
```bash
cat .env
```

---

## 7. Build Frontend & Start Backend

### 7.1 Install dependencies

```bash
cd /var/www/cocotech

# Install backend dependencies
cd backend && npm install --production && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### 7.2 Build frontend

```bash
cd /var/www/cocotech/frontend

# Set API URL ke IP Droplet sebelum build
echo "VITE_API_URL=http://128.199.xxx.xxx" > .env

# Build production
npm run build
```

Build output akan ada di `frontend/dist/`.

### 7.3 Buat direktori logs

```bash
mkdir -p /var/www/cocotech/logs
```

### 7.4 Start dengan PM2

> **Penting:** Jangan jalankan `node src/server.js` langsung. Selalu gunakan
> `npm start` atau PM2 agar flag `--env-file=.env` ikut terbawa. Tanpanya,
> env vars tidak terbaca dan password admin tidak akan tersync ke database.

```bash
cd /var/www/cocotech

# Start aplikasi
pm2 start pm2.config.js --env production

# Simpan process list (agar auto-restart setelah reboot)
pm2 save

# Setup PM2 startup script
pm2 startup
# PM2 akan print satu perintah — COPY dan JALANKAN perintah tersebut
# Contoh: sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root
```

### 7.5 Verifikasi backend berjalan

```bash
# Cek status PM2
pm2 status

# Cek logs
pm2 logs cocotech-backend --lines 20

# Test health endpoint
curl http://localhost:4000/api/health
# Expected: {"status":"ok","timestamp":"..."}
```

---

## 8. Konfigurasi Nginx

### 8.1 Copy konfigurasi

```bash
cp /var/www/cocotech/frontend/nginx.conf /etc/nginx/sites-available/cocotech
```

### 8.2 Edit konfigurasi — ganti IP

```bash
nano /etc/nginx/sites-available/cocotech
```

Ganti `YOUR_DROPLET_IP` dengan IP Droplet Anda (contoh: `128.199.xxx.xxx`):

```nginx
server_name 128.199.xxx.xxx _;
```

Simpan: `Ctrl+X` → `Y` → `Enter`

### 8.3 Aktifkan konfigurasi

```bash
# Buat symlink ke sites-enabled
ln -s /etc/nginx/sites-available/cocotech /etc/nginx/sites-enabled/

# Hapus konfigurasi default Nginx
rm -f /etc/nginx/sites-enabled/default

# Test konfigurasi
nginx -t
# Expected: syntax is ok / test is successful

# Reload Nginx
systemctl reload nginx
```

---

## 9. Firewall & Keamanan

```bash
# Install dan konfigurasi UFW firewall
ufw allow ssh        # port 22 — SSH
ufw allow http       # port 80 — HTTP
ufw deny 4000        # BLOKIR akses langsung ke Node.js (hanya via Nginx)
ufw --force enable

# Verifikasi rules
ufw status
```

> **Penting:** Port 4000 (Node.js) TIDAK boleh diakses langsung dari internet.
> Semua traffic harus melalui Nginx di port 80.

---

## 10. Verifikasi & Testing

Buka browser dan akses:

| URL | Expected |
|---|---|
| `http://128.199.xxx.xxx` | Halaman utama CocoTech |
| `http://128.199.xxx.xxx/admin` | Halaman login admin |
| `http://128.199.xxx.xxx/api/health` | `{"status":"ok","timestamp":"..."}` |

**Test login admin:**
1. Buka `http://128.199.xxx.xxx/admin`
2. Login dengan `ADMIN_USER` dan `ADMIN_PASS` yang sudah diset di `.env`
3. Pastikan bisa masuk ke dashboard

**Test rate limiting:**
```bash
# Coba login 6x berturut-turut dengan password salah
# Pada percobaan ke-6, harus dapat response 429 Too Many Requests
for i in {1..6}; do
  curl -s -X POST http://128.199.xxx.xxx/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"wrong"}' | python3 -m json.tool
  echo "--- Attempt $i ---"
done
```

---

## 11. Update / Redeploy

Setiap kali ada update kode, jalankan dari server:

```bash
cd /var/www/cocotech
./deploy.sh
```

Script ini akan otomatis:
1. `git pull` kode terbaru
2. `npm install` dependencies
3. Build ulang frontend
4. Reload PM2 (zero-downtime)
5. Health check untuk verifikasi

### Jika deploy via SCP (tanpa git):

```bash
# Dari komputer lokal
rsync -avz --exclude='node_modules' --exclude='.env' \
  --exclude='dist' --exclude='data/*.db' --exclude='.git' \
  ./ root@128.199.xxx.xxx:/var/www/cocotech/

# Lalu di server
cd /var/www/cocotech && ./deploy.sh
```

---

## 12. Upgrade ke HTTPS (Opsional)

Jika sudah punya domain, upgrade ke HTTPS dengan Let's Encrypt:

### 12.1 Arahkan domain ke IP Droplet

Di provider domain Anda, buat DNS record:
```
A    @              128.199.xxx.xxx
A    www            128.199.xxx.xxx
```

Tunggu DNS propagasi (biasanya 5-30 menit).

### 12.2 Install Certbot

```bash
apt install -y certbot python3-certbot-nginx
```

### 12.3 Update Nginx config

Edit `/etc/nginx/sites-available/cocotech`:
```bash
nano /etc/nginx/sites-available/cocotech
```

Ganti `server_name YOUR_DROPLET_IP _;` dengan:
```nginx
server_name yourdomain.com www.yourdomain.com;
```

Reload Nginx:
```bash
nginx -t && systemctl reload nginx
```

### 12.4 Dapatkan SSL certificate

```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot akan otomatis:
- Mendapatkan certificate dari Let's Encrypt
- Mengupdate konfigurasi Nginx untuk HTTPS
- Setup auto-renewal

### 12.5 Update environment variables

```bash
nano /var/www/cocotech/backend/.env
```

Ganti `FRONTEND_URL`:
```env
FRONTEND_URL=https://yourdomain.com
```

Reload PM2:
```bash
cd /var/www/cocotech && pm2 reload pm2.config.js --env production
```

---

## Troubleshooting

### Backend tidak mau start

```bash
# Cek logs PM2
pm2 logs cocotech-backend --lines 50

# Cek apakah .env sudah benar
cat /var/www/cocotech/backend/.env

# Test jalankan manual
cd /var/www/cocotech/backend && node src/server.js
```

### Nginx error

```bash
# Cek syntax config
nginx -t

# Cek error log Nginx
tail -50 /var/log/nginx/error.log

# Cek access log
tail -50 /var/log/nginx/access.log
```

### Port 4000 tidak bisa diakses

Ini **normal dan benar** — port 4000 sengaja diblokir firewall.
Akses harus melalui Nginx (port 80): `http://128.199.xxx.xxx`

### Database error

```bash
# Pastikan direktori data bisa ditulis
ls -la /var/www/cocotech/data/
chmod 755 /var/www/cocotech/data/
```

---

## Ringkasan Credentials

Simpan ini di tempat aman (password manager):

| Item | Nilai |
|---|---|
| **IP Droplet** | `128.199.xxx.xxx` |
| **SSH** | `ssh root@128.199.xxx.xxx` |
| **Admin URL** | `http://128.199.xxx.xxx/admin` |
| **Admin Username** | Sesuai `ADMIN_USER` di `.env` |
| **Admin Password** | Sesuai `ADMIN_PASS` di `.env` |

> **Jangan pernah commit file `.env` ke git!**

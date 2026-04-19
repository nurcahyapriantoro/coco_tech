import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, existsSync } from 'fs';
import bcrypt from 'bcryptjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '../../data');

// Ensure data directory exists
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const dbPath = join(dataDir, 'cocotech.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS portfolio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS paket (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS awards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

// ---------------------------------------------------------------------------
// Seed helpers
// ---------------------------------------------------------------------------
function seedTable(table, items) {
  const count = db.prepare(`SELECT COUNT(*) as c FROM ${table}`).get();
  if (count.c > 0) return;
  const insert = db.prepare(`INSERT INTO ${table} (data, sort_order) VALUES (?, ?)`);
  const insertMany = db.transaction((rows) => {
    rows.forEach((item, idx) => {
      insert.run(JSON.stringify(item), idx);
    });
  });
  insertMany(items);
  console.log(`Seeded ${items.length} rows into ${table}`);
}

// ---------------------------------------------------------------------------
// Portfolio seed
// ---------------------------------------------------------------------------
seedTable('portfolio', [
  {"id":"audit-monitoring","title":"Audit Monitoring Center","client":"PT Pertamina (Persero)","category":"data","year":2024,"thumb":null,"github":"https://github.com/nurcahyapriantoro/dashboard_audit","images":["/pertamina_pis/pis1.jpeg","/pertamina_pis/pis2.jpeg","/pertamina_pis/pis3.jpeg","/pertamina_pis/pis4.jpeg","/pertamina_pis/pis5.jpeg","/pertamina_pis/pis6.jpeg","/pertamina_pis/pis7.jpeg","/pertamina_pis/pis8.jpeg","/pertamina_pis/pis9.jpeg","/pertamina_pis/pis10.jpeg","/pertamina_pis/pis11.jpeg"],"desc":{"id":"Sistem monitoring audit real-time untuk salah satu BUMN terbesar Indonesia.","en":"Real-time audit monitoring system for one of Indonesia's largest state-owned enterprises."},"techs":["Python","FastAPI","Power BI","PostgreSQL","Azure"],"highlights":{"id":["Dashboard real-time multi-unit","Pipeline data otomatis","Integrasi sistem audit existing"],"en":["Multi-unit real-time dashboard","Automated data pipeline","Existing audit system integration"]}},
  {"id":"agriblock","title":"AgriBlock","client":"PKM Research (IPB University)","category":"blockchain","year":2024,"thumb":null,"github":"https://github.com/nurcahyapriantoro/PlatformAgriblock","images":["/agriblock/thumbnail.jpg","/agriblock/block1.jpg","/agriblock/block2.jpg","/agriblock/block3.jpg"],"desc":{"id":"Platform blockchain untuk traceability supply chain pertanian.","en":"Blockchain platform for agricultural supply chain traceability."},"techs":["Hyperledger Fabric","Go","React","Node.js","Docker"],"highlights":{"id":["Didanai Kemendikbudristek (PKM-RSH)","Smart contract supply chain","Finalist PIMNAS 37"],"en":["Funded by Ministry of Education","Supply chain smart contract","PIMNAS 37 Finalist"]}},
  {"id":"guitarclassnde","title":"GuitarClassNDE","client":"Personal Project","category":"web","year":2024,"thumb":null,"github":"https://github.com/nurcahyapriantoro/classnde2","images":["/guitarclass/guitar1.webp","/guitarclass/guitar2.webp","/guitarclass/guitar3.webp"],"desc":{"id":"Platform edukasi gitar online dengan sistem booking kelas.","en":"Online guitar education platform with class booking system."},"techs":["Next.js","TypeScript","Prisma","PostgreSQL","Tailwind CSS"],"highlights":{"id":["Booking & scheduling system","Video tutorial terintegrasi","Student progress dashboard"],"en":["Booking & scheduling system","Integrated video tutorials","Student progress dashboard"]}},
  {"id":"vpm-profile","title":"VPM Company Profile","client":"VPM (Corporate Client)","category":"web","year":2023,"thumb":null,"github":"https://github.com/nurcahyapriantoro/vpm-company-profile","images":["/vpm/vpm.jpg","/vpm/vpm2.jpg","/vpm/vpm3.jpg"],"desc":{"id":"Website company profile profesional untuk klien korporat.","en":"Professional corporate profile website."},"techs":["React","Tailwind CSS","Framer Motion","Vite"],"highlights":{"id":["Desain premium responsif","Animasi interaktif","SEO optimized"],"en":["Premium responsive design","Interactive animations","SEO optimized"]}},
  {"id":"ecommerce-calo","title":"E-Commerce Calo","client":"Course Project → Production","category":"web","year":2023,"thumb":null,"github":"https://github.com/nurcahyapriantoro/E-Commerce-Jual-Beli-Tiket-Bekas-Calo","images":["/calo/calo.jpeg","/calo/calo2.jpeg","/calo/calo3.jpeg"],"desc":{"id":"Platform e-commerce full-stack dengan fitur keranjang belanja.","en":"Full-stack e-commerce platform with shopping cart."},"techs":["Laravel","PHP","MySQL","Bootstrap","Midtrans"],"highlights":{"id":["Payment gateway integration","Admin dashboard lengkap","Inventory management"],"en":["Payment gateway integration","Complete admin dashboard","Inventory management"]}},
  {"id":"ipb-stressmeter","title":"IPBStressMeter","client":"IPB University Research","category":"data","year":2023,"thumb":null,"github":"https://github.com/nurcahyapriantoro/IPBStressMeter","images":["/ipbstressmeter/stressmeter.jpg"],"desc":{"id":"Aplikasi pengukur tingkat stres mahasiswa IPB menggunakan machine learning.","en":"Stress level measurement app for IPB students using machine learning."},"techs":["Python","Scikit-learn","Flask","TensorFlow","Pandas"],"highlights":{"id":["ML-based stress detection","Rekomendasi personal","Dashboard analytics"],"en":["ML-based stress detection","Personal recommendations","Analytics dashboard"]}}
]);

// ---------------------------------------------------------------------------
// Experience seed
// ---------------------------------------------------------------------------
seedTable('experience', [
  {"org":"Bank Indonesia","logo":"BI","role":{"id":"Data Engineer Intern","en":"Data Engineer Intern"},"period":{"id":"Sep 2025 – Mar 2026","en":"Sep 2025 – Mar 2026"},"color":"#00f5ff","desc":{"id":"Membangun data pipeline dan dashboard monitoring untuk departemen internal BI.","en":"Built data pipelines and monitoring dashboards for BI internal departments."},"techs":["Python","SQL","Power BI","Azure"]},
  {"org":"Polkadot Blockchain Academy","logo":"PBA","role":{"id":"Student — PBA-X Wave 3","en":"Student — PBA-X Wave 3"},"period":{"id":"2025","en":"2025"},"color":"#ff2d78","desc":{"id":"Mempelajari arsitektur blockchain tingkat lanjut.","en":"Learned advanced blockchain architecture."},"techs":["Rust","Substrate","Polkadot","WebAssembly"]},
  {"org":"Bangkit Academy (Google)","logo":"G","role":{"id":"Cloud Computing Cohort","en":"Cloud Computing Cohort"},"period":{"id":"2024","en":"2024"},"color":"#39ff14","desc":{"id":"Program intensif Google di bidang Cloud Computing.","en":"Google intensive program in Cloud Computing."},"techs":["GCP","Kubernetes","Docker","Terraform"]},
  {"org":"Indosat Digital Camp","logo":"IDC","role":{"id":"Data Science Track","en":"Data Science Track"},"period":{"id":"2023","en":"2023"},"color":"#8b2fff","desc":{"id":"Pelatihan data science intensif dari Indosat Ooredoo Hutchison.","en":"Intensive data science training by Indosat Ooredoo Hutchison."},"techs":["Python","Scikit-learn","TensorFlow","Pandas"]}
]);

// ---------------------------------------------------------------------------
// Testimonials seed
// ---------------------------------------------------------------------------
seedTable('testimonials', [
  {"name":"Budi Santoso","role":{"id":"Pemilik","en":"Owner"},"company":"CV Makmur Jaya","initials":"BS","color":"#00f5ff","stars":5.0,"quote":{"id":"Awalnya cuma mau bikin website company profile biasa. Tapi setelah diskusi, ternyata yang saya butuhkan itu sistem yang bisa langsung capture leads dari pengunjung. Hasilnya? 3 bulan pertama dapat 47 inquiry baru dari website. ROI-nya gila.","en":"Initially I just wanted a simple company profile website. But after discussion, what I actually needed was a system that could capture leads from visitors. The result? First 3 months got 47 new inquiries. The ROI is insane."}},
  {"name":"Sari Dewi Rahayu","role":{"id":"Marketing Manager","en":"Marketing Manager"},"company":"PT Nusantara Digital","initials":"SR","color":"#8b2fff","stars":5.0,"quote":{"id":"Yang bikin beda dari developer lain: dia ngerti bisnis. Website baru kami bounce rate turun dari 78% jadi 31%.","en":"What makes him different: he understands business. Our new website bounce rate dropped from 78% to 31%."}},
  {"name":"Hendra Wijaya","role":{"id":"Direktur","en":"Director"},"company":"PT Wijaya Konstruksi","initials":"HW","color":"#ff6a00","stars":4.8,"quote":{"id":"Saya orangnya gaptek total. Tapi mas Cahya sabar banget jelasinnya. Sekarang klien bilang website kami lebih profesional dari kompetitor yang 10x lebih besar.","en":"I'm completely non-technical. But Cahya was incredibly patient. Now clients say our website is more professional than competitors 10x our size."}},
  {"name":"Rizky Aditya","role":{"id":"CTO","en":"CTO"},"company":"Startup Fintech (NDA)","initials":"RA","color":"#ff2d78","stars":5.0,"quote":{"id":"Kami butuh data pipeline yang bisa handle 10K+ transaksi per hari. Mas Cahya build dari nol, sekarang handle 50K transaksi lancar.","en":"We needed a pipeline handling 10K+ daily transactions. Cahya built from scratch, now handles 50K smoothly."}},
  {"name":"Mega Purnama","role":{"id":"Owner","en":"Owner"},"company":"Mega Skincare ID","initials":"MP","color":"#39ff14","stars":5.0,"quote":{"id":"E-commerce saya sebelumnya pakai template biasa. Setelah dibuatin custom, omset naik 230% di bulan kedua.","en":"My e-commerce was on a generic template. After custom build, revenue jumped 230% in month two."}},
  {"name":"Fajar Kurniawan","role":{"id":"Project Manager","en":"Project Manager"},"company":"PT Infradata Solusi","initials":"FK","color":"#00f5ff","stars":4.9,"quote":{"id":"Deadline 3 minggu untuk dashboard monitoring yang kompleks. Selesai di hari ke-18 dan minim bug.","en":"3-week deadline for a complex monitoring dashboard. Done on day 18 with minimal bugs."}},
  {"name":"Dinda Pratiwi","role":{"id":"Founder","en":"Founder"},"company":"Ruang Belajar Online","initials":"DP","color":"#8b2fff","stars":4.8,"quote":{"id":"Platform edukasi kami butuh fitur video streaming, quiz realtime, dan sertifikat otomatis. Dikerjain semua sendirian dan jalan mulus.","en":"Our platform needed video streaming, real-time quizzes, and automatic certificates. All done solo and running smoothly."}},
  {"name":"Agus Setiawan","role":{"id":"Kepala IT","en":"Head of IT"},"company":"Koperasi Sejahtera Mandiri","initials":"AS","color":"#ff6a00","stars":4.9,"quote":{"id":"Kami punya data anggota 5000+ yang berantakan di Excel. Sekarang semua rapi di database dengan dashboard dan bisa export laporan.","en":"We had 5000+ member records in messy Excel files. Now organized in a database with dashboard and report export."}}
]);

// ---------------------------------------------------------------------------
// Skills seed
// ---------------------------------------------------------------------------
seedTable('skills', [
  {"category":{"id":"Bahasa Pemrograman","en":"Languages"},"icon":"⌨️","color":"#00f5ff","items":["Python","Rust","JavaScript","TypeScript","PHP","Go","SQL","HTML/CSS"]},
  {"category":{"id":"Framework & Library","en":"Frameworks & Libraries"},"icon":"🧩","color":"#8b2fff","items":["React","Next.js","FastAPI","Laravel","Express.js","Tailwind CSS","Flask","Framer Motion"]},
  {"category":{"id":"Data & AI","en":"Data & AI"},"icon":"🤖","color":"#ff2d78","items":["Power BI","Pandas","Scikit-learn","TensorFlow","OpenAI API","Jupyter","Matplotlib"]},
  {"category":{"id":"Blockchain","en":"Blockchain"},"icon":"🔗","color":"#ff6a00","items":["Hyperledger Fabric","Substrate","Polkadot","Solidity","WebAssembly","IPFS"]},
  {"category":{"id":"Cloud & DevOps","en":"Cloud & DevOps"},"icon":"☁️","color":"#39ff14","items":["GCP","Azure","Docker","Kubernetes","Terraform","GitHub Actions","Nginx","Linux"]},
  {"category":{"id":"Database & Tools","en":"Database & Tools"},"icon":"🗄️","color":"#00f5ff","items":["PostgreSQL","MySQL","MongoDB","Redis","Prisma","Git","Figma","Postman"]}
]);

// ---------------------------------------------------------------------------
// Awards seed
// ---------------------------------------------------------------------------
seedTable('awards', [
  {"title":{"id":"Finalist PIMNAS ke-37","en":"PIMNAS 37th National Finalist"},"org":{"id":"Kemendikbudristek RI","en":"Ministry of Education, Indonesia"},"year":2024,"icon":"🏆","color":"#ff6a00","desc":{"id":"Lolos seleksi nasional PIMNAS dengan proyek AgriBlock.","en":"Passed national selection for PIMNAS with AgriBlock project."}},
  {"title":{"id":"Juara 3 Business of The Year","en":"3rd Place Business of The Year"},"org":{"id":"Kompetisi Bisnis Nasional","en":"National Business Competition"},"year":2024,"icon":"🥉","color":"#00f5ff","desc":{"id":"Meraih peringkat 3 dalam kompetisi bisnis tingkat nasional dengan model bisnis CocoTech.","en":"Achieved 3rd place in national business competition with CocoTech business model."}},
  {"title":{"id":"Penerima Pendanaan PKM-RSH","en":"PKM-RSH Funding Recipient"},"org":{"id":"Kemendikbudristek RI","en":"Ministry of Education, Indonesia"},"year":2023,"icon":"💰","color":"#39ff14","desc":{"id":"Mendapatkan pendanaan riset dari pemerintah untuk Program Kreativitas Mahasiswa.","en":"Received government research funding for the Student Creativity Program."}}
]);

// ---------------------------------------------------------------------------
// Paket seed
// ---------------------------------------------------------------------------
seedTable('paket', [
  {"name":{"id":"Mahasiswa / UMKM","en":"Student / SME"},"price":"Rp 1.250.000","priceSub":{"id":"mulai dari","en":"starting from"},"popular":false,"features":{"id":["Landing page 1 halaman","Desain responsif","Form kontak WhatsApp","Hosting 1 tahun gratis","Revisi 2x"],"en":["1-page landing page","Responsive design","WhatsApp contact form","1 year free hosting","2 revisions"]}},
  {"name":{"id":"Starter","en":"Starter"},"price":"Rp 2.500.000","priceSub":{"id":"mulai dari","en":"starting from"},"popular":true,"features":{"id":["Website hingga 5 halaman","Desain custom premium","SEO dasar","Integrasi WhatsApp & media sosial","Hosting 1 tahun gratis","Support 30 hari","Revisi 5x"],"en":["Up to 5 pages","Premium custom design","Basic SEO","WhatsApp & social media integration","1 year free hosting","30-day support","5 revisions"]}},
  {"name":{"id":"Business","en":"Business"},"price":"Rp 7.500.000","priceSub":{"id":"mulai dari","en":"starting from"},"popular":false,"features":{"id":["Website custom tanpa batas halaman","Dashboard admin / CMS","Database & API integration","SEO advanced","Analytics & tracking","Hosting 1 tahun gratis","Support 60 hari","Revisi tanpa batas"],"en":["Unlimited pages custom website","Admin dashboard / CMS","Database & API integration","Advanced SEO","Analytics & tracking","1 year free hosting","60-day support","Unlimited revisions"]}},
  {"name":{"id":"Enterprise","en":"Enterprise"},"price":"Custom","priceSub":{"id":"hubungi kami","en":"contact us"},"popular":false,"features":{"id":["Sistem lengkap end-to-end","AI / Machine Learning integration","Blockchain / Smart Contract","Data pipeline & dashboard","Cloud architecture (GCP/Azure)","Dedicated project manager","SLA & maintenance contract"],"en":["Full end-to-end system","AI / Machine Learning integration","Blockchain / Smart Contract","Data pipeline & dashboard","Cloud architecture (GCP/Azure)","Dedicated project manager","SLA & maintenance contract"]}}
]);

// ---------------------------------------------------------------------------
// Settings seed
// ---------------------------------------------------------------------------
{
  const count = db.prepare(`SELECT COUNT(*) as c FROM settings`).get();
  if (count.c === 0) {
    db.prepare(`INSERT INTO settings (key, value) VALUES (?, ?)`).run('copywriting', JSON.stringify({}));
    console.log('Seeded settings with empty copywriting');
  }
}

// ---------------------------------------------------------------------------
// Admin user — always sync credentials from environment on startup
// This ensures the password in .env is always the source of truth.
// ---------------------------------------------------------------------------
{
  const adminUser = process.env.ADMIN_USER || 'admin';
  // ADMIN_PASS must be set — server.js exits on startup if missing (same guard as JWT_SECRET)
  const adminPass = process.env.ADMIN_PASS;
  const hash = bcrypt.hashSync(adminPass, 10);

  const existing = db.prepare(`SELECT id FROM users WHERE username = ?`).get(adminUser);
  if (!existing) {
    db.prepare(`INSERT INTO users (username, password_hash) VALUES (?, ?)`).run(adminUser, hash);
    console.log(`[db] Admin user created: ${adminUser}`);
  } else {
    // Always update hash so .env password stays in sync with DB
    db.prepare(`UPDATE users SET password_hash = ? WHERE username = ?`).run(hash, adminUser);
    console.log(`[db] Admin password synced from env for: ${adminUser}`);
  }
}

export default db;

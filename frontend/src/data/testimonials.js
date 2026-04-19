const testimonials = [
  {
    name: 'Budi Santoso',
    role: { id: 'Pemilik', en: 'Owner' },
    company: 'CV Makmur Jaya',
    initials: 'BS',
    color: '#00f5ff',
    stars: 5.0,
    quote: {
      id: 'Awalnya cuma mau bikin website company profile biasa. Tapi setelah diskusi, ternyata yang saya butuhkan itu sistem yang bisa langsung capture leads dari pengunjung. Hasilnya? 3 bulan pertama dapat 47 inquiry baru dari website. ROI-nya gila.',
      en: "Initially I just wanted a simple company profile website. But after discussion, what I actually needed was a system that could capture leads from visitors. The result? First 3 months got 47 new inquiries from the website. The ROI is insane.",
    },
  },
  {
    name: 'Sari Dewi Rahayu',
    role: { id: 'Marketing Manager', en: 'Marketing Manager' },
    company: 'PT Nusantara Digital',
    initials: 'SR',
    color: '#8b2fff',
    stars: 5.0,
    quote: {
      id: 'Yang bikin beda dari developer lain: dia ngerti bisnis. Bukan cuma ngoding. Waktu brief, dia tanya soal target market, pain point klien kami, conversion rate lama. Baru bikin solusi. Website baru kami bounce rate turun dari 78% jadi 31%.',
      en: "What makes him different from other developers: he understands business. Not just coding. During brief, he asked about target market, client pain points, our old conversion rate. Then built the solution. Our new website bounce rate dropped from 78% to 31%.",
    },
  },
  {
    name: 'Hendra Wijaya',
    role: { id: 'Direktur', en: 'Director' },
    company: 'PT Wijaya Konstruksi',
    initials: 'HW',
    color: '#ff6a00',
    stars: 4.8,
    quote: {
      id: 'Saya orangnya gaptek total. Tapi mas Cahya sabar banget jelasinnya. Semua progress ada screenshot, ada video demo. Saya tinggal approve. Sekarang klien bilang website kami lebih profesional dari kompetitor yang 10x lebih besar.',
      en: "I'm completely non-technical. But Cahya was incredibly patient explaining everything. All progress had screenshots, demo videos. I just had to approve. Now clients say our website is more professional than competitors 10x our size.",
    },
  },
  {
    name: 'Rizky Aditya',
    role: { id: 'CTO', en: 'CTO' },
    company: 'Startup Fintech (NDA)',
    initials: 'RA',
    color: '#ff2d78',
    stars: 5.0,
    quote: {
      id: 'Kami butuh data pipeline yang bisa handle 10K+ transaksi per hari dengan latency rendah. Mas Cahya build dari nol pakai FastAPI + PostgreSQL, sekarang handle 50K transaksi lancar. Ini level enterprise tapi dengan budget startup.',
      en: "We needed a data pipeline handling 10K+ daily transactions with low latency. Cahya built it from scratch with FastAPI + PostgreSQL, now handles 50K transactions smoothly. Enterprise-level quality at startup budget.",
    },
  },
  {
    name: 'Mega Purnama',
    role: { id: 'Owner', en: 'Owner' },
    company: 'Mega Skincare ID',
    initials: 'MP',
    color: '#39ff14',
    stars: 5.0,
    quote: {
      id: 'E-commerce saya sebelumnya pakai template marketplace biasa. Setelah dibuatin custom, omset naik 230% di bulan kedua karena checkout flow-nya dioptimasi. Bukan cuma cantik, tapi emang didesain buat jualan.',
      en: "My e-commerce was previously using a generic marketplace template. After getting a custom build, revenue jumped 230% in the second month because the checkout flow was optimized. Not just pretty, but actually designed to sell.",
    },
  },
  {
    name: 'Fajar Kurniawan',
    role: { id: 'Project Manager', en: 'Project Manager' },
    company: 'PT Infradata Solusi',
    initials: 'FK',
    color: '#00f5ff',
    stars: 4.9,
    quote: {
      id: 'Kami kasih deadline 3 minggu untuk dashboard monitoring yang lumayan kompleks. Selesai di hari ke-18 dan minim bug. Komunikasinya juga enak, update tiap hari di WhatsApp tanpa harus ditanya. Jarang nemu freelancer sekonsisten ini.',
      en: "We gave a 3-week deadline for a fairly complex monitoring dashboard. Done on day 18 with minimal bugs. Communication was also great, daily WhatsApp updates without being asked. Rarely find a freelancer this consistent.",
    },
  },
  {
    name: 'Dinda Pratiwi',
    role: { id: 'Founder', en: 'Founder' },
    company: 'Ruang Belajar Online',
    initials: 'DP',
    color: '#8b2fff',
    stars: 4.8,
    quote: {
      id: 'Platform edukasi kami butuh fitur video streaming, quiz realtime, dan sertifikat otomatis. Dikerjain semua sendirian dan jalan mulus. Yang paling saya appreciate: dia kasih saran fitur yang awalnya saya nggak kepikiran tapi ternyata krusial.',
      en: "Our education platform needed video streaming, real-time quizzes, and automatic certificates. All done solo and running smoothly. What I appreciate most: he suggested features I hadn't thought of that turned out to be crucial.",
    },
  },
  {
    name: 'Agus Setiawan',
    role: { id: 'Kepala IT', en: 'Head of IT' },
    company: 'Koperasi Sejahtera Mandiri',
    initials: 'AS',
    color: '#ff6a00',
    stars: 4.9,
    quote: {
      id: 'Kami punya data anggota 5000+ yang berantakan di Excel. Sekarang semua rapi di database, ada dashboard, bisa export laporan kapan aja. Pelatihan ke staf juga dikasih sampai semua bisa pakai sendiri. Support after-sales-nya juara.',
      en: "We had 5000+ member records scattered across Excel files. Now everything is organized in a database, has a dashboard, can export reports anytime. Staff training was provided until everyone could use it independently. After-sales support is championship level.",
    },
  },
];

export default testimonials;

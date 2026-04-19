const copy = {
  nav: {
    brand: 'CocoTech',
    links: {
      id: ['Beranda', 'Layanan', 'Portofolio', 'Profil', 'Paket', 'Kontak'],
      en: ['Home', 'Services', 'Portfolio', 'Profile', 'Pricing', 'Contact'],
    },
    cta: { id: 'Hubungi Kami', en: 'Contact Us' },
  },

  hero: {
    kicker: {
      id: 'Data Engineer & AI Specialist · Founder, CocoTech',
      en: 'Data Engineer & AI Specialist · Founder, CocoTech',
    },
    headline: {
      id: [
        'UMKM Tanpa Website Itu Invisible.',
        'Kami Buat Bisnis Anda Ditemukan.',
      ],
      en: [
        'SMEs Without a Website Are Invisible.',
        'We Make Your Business Discoverable.',
      ],
    },
    sub: {
      id: 'Jasa website profesional untuk UMKM dan pemilik bisnis yang ingin ditemukan pelanggan online. Mulai dari Rp 1.250.000 — pengerjaan cepat, desain premium, dan dukungan penuh dari engineer berpengalaman di Bank Indonesia, Google Bangkit, dan Polkadot Blockchain Academy.',
      en: 'Professional website services for SMEs and business owners who want to be found online. Starting from Rp 1,250,000 — fast turnaround, premium design, and full support from an engineer experienced at Bank Indonesia, Google Bangkit, and Polkadot Blockchain Academy.',
    },
    cta: { id: 'Konsultasi Gratis →', en: 'Free Consultation →' },
    ctaSec: { id: 'Lihat Portofolio', en: 'View Portfolio' },
  },

  socialProof: {
    items: {
      id: [
        '25+ Proyek Selesai',
        '25+ Klien Puas',
        '4.9★ Rating Rata-Rata',
        '4+ Tahun Pengalaman',
      ],
      en: [
        '25+ Projects Delivered',
        '25+ Happy Clients',
        '4.9★ Average Rating',
        '4+ Years Experience',
      ],
    },
  },

  trustStrip: {
    title: {
      id: 'Dipercaya & Berpengalaman Di',
      en: 'Trusted & Experienced At',
    },
    logos: [
      'Bank Indonesia',
      'Google Bangkit Academy',
      'Polkadot Blockchain Academy',
      'Indosat Digital Camp',
      'IPB University',
      'Pertamina',
    ],
  },

  layanan: {
    kicker: { id: 'Layanan Kami', en: 'Our Services' },
    headline: {
      id: 'Tiga Masalah yang Bikin Bisnis Anda Kehilangan Klien Setiap Hari',
      en: 'Three Problems Making Your Business Lose Clients Every Single Day',
    },
    sub: {
      id: 'Kami tidak cuma buat website. Kami pecahkan masalah fundamental yang membuat bisnis digital Anda stagnan.',
      en: "We don't just build websites. We solve the fundamental problems keeping your digital business stuck.",
    },
    cards: [
      {
        icon: '🌐',
        title: {
          id: 'Website & Aplikasi Web',
          en: 'Website & Web Apps',
        },
        problem: {
          id: '"Website saya sudah ada, tapi pengunjung langsung pergi dalam 3 detik."',
          en: '"I have a website, but visitors leave within 3 seconds."',
        },
        solution: {
          id: 'Kami bangun sistem web yang loading < 2 detik, desain yang membangun kepercayaan instan, dan alur konversi yang teruji.',
          en: 'We build web systems that load in <2s, designs that build instant trust, and battle-tested conversion flows.',
        },
        techs: ['React', 'Next.js', 'Laravel', 'Tailwind CSS'],
      },
      {
        icon: '📊',
        title: {
          id: 'Data Engineering & AI',
          en: 'Data Engineering & AI',
        },
        problem: {
          id: '"Data bisnis saya banyak, tapi saya tidak tahu cara memanfaatkannya."',
          en: '"I have tons of business data, but I have no idea how to use it."',
        },
        solution: {
          id: 'Pipeline data otomatis, dashboard real-time, dan model AI yang mengubah data jadi keputusan bisnis yang menguntungkan.',
          en: 'Automated data pipelines, real-time dashboards, and AI models that turn data into profitable business decisions.',
        },
        techs: ['Python', 'FastAPI', 'Power BI', 'OpenAI API'],
      },
      {
        icon: '🔗',
        title: {
          id: 'Blockchain & Sistem Terdistribusi',
          en: 'Blockchain & Distributed Systems',
        },
        problem: {
          id: '"Klien saya ragu karena data dan transaksi tidak transparan."',
          en: '"My clients hesitate because data and transactions aren\'t transparent."',
        },
        solution: {
          id: 'Solusi blockchain enterprise untuk supply chain, audit trail, dan smart contract yang membangun kepercayaan absolut.',
          en: 'Enterprise blockchain solutions for supply chain, audit trails, and smart contracts that build absolute trust.',
        },
        techs: ['Hyperledger Fabric', 'Substrate', 'Rust', 'Go'],
      },
    ],
  },

  stats: {
    kicker: { id: 'Angka Berbicara', en: 'Numbers Speak' },
    headline: { id: 'Track Record yang Terbukti', en: 'A Proven Track Record' },
    items: [
      { value: 25, suffix: '+', label: { id: 'Proyek Selesai', en: 'Projects Delivered' } },
      { value: 25, suffix: '+', label: { id: 'Klien Puas', en: 'Happy Clients' } },
      { value: 99, suffix: '%', label: { id: 'Tepat Waktu', en: 'On-Time Delivery' } },
      { value: 4.9, suffix: '★', label: { id: 'Rating Rata-Rata', en: 'Average Rating' }, decimals: 1 },
    ],
  },

  proses: {
    kicker: { id: 'Cara Kerja Kami', en: 'How We Work' },
    headline: {
      id: 'Dari Konsultasi Gratis Sampai Launch — Cuma 4 Langkah',
      en: 'From Free Consultation to Launch — Just 4 Steps',
    },
    steps: [
      {
        num: '01',
        title: { id: 'Konsultasi & Analisis', en: 'Consultation & Analysis' },
        desc: {
          id: 'Kami dengarkan masalah Anda, analisis kompetitor, dan rancang strategi digital yang pas untuk bisnis Anda. Gratis, tanpa komitmen.',
          en: "We listen to your problems, analyze competitors, and design a digital strategy tailored for your business. Free, no strings attached.",
        },
      },
      {
        num: '02',
        title: { id: 'Desain & Prototyping', en: 'Design & Prototyping' },
        desc: {
          id: 'Anda lihat desain lengkap sebelum satu baris kode pun ditulis. Revisi tanpa batas di tahap ini sampai Anda benar-benar puas.',
          en: "You see the complete design before a single line of code is written. Unlimited revisions at this stage until you're fully satisfied.",
        },
      },
      {
        num: '03',
        title: { id: 'Development & Testing', en: 'Development & Testing' },
        desc: {
          id: 'Dibangun dengan teknologi terkini (React, FastAPI, dll). Setiap fitur diuji menyeluruh. Anda bisa pantau progress real-time.',
          en: 'Built with cutting-edge tech (React, FastAPI, etc). Every feature thoroughly tested. You can monitor progress in real-time.',
        },
      },
      {
        num: '04',
        title: { id: 'Launch & Dukungan', en: 'Launch & Support' },
        desc: {
          id: 'Kami bantu deploy, training tim Anda, dan berikan support 30 hari gratis pasca-launch. Masalah jam 11 malam? Kami jawab.',
          en: "We help deploy, train your team, and provide 30 days free post-launch support. Problem at 11 PM? We'll answer.",
        },
      },
    ],
  },

  techStack: {
    kicker: { id: 'Teknologi Kami', en: 'Our Tech Stack' },
    headline: {
      id: 'Teknologi yang Mendukung Setiap Proyek Kami',
      en: 'Technology Powering Every Project We Build',
    },
  },

  portfolio: {
    kicker: { id: 'Portofolio', en: 'Portfolio' },
    headline: {
      id: 'Bukan Janji Kosong — Ini Bukti Nyata',
      en: "Not Empty Promises — This Is Real Proof",
    },
    sub: {
      id: 'Setiap proyek di bawah ini adalah solusi nyata untuk masalah bisnis yang nyata.',
      en: 'Every project below is a real solution for a real business problem.',
    },
    filterAll: { id: 'Semua', en: 'All' },
  },

  profil: {
    kicker: { id: 'Tentang Founder', en: 'About the Founder' },
    headline: {
      id: 'Dibangun oleh Seseorang yang Tahu Cara Kerja Sistem Besar dari Dalam',
      en: 'Built by Someone Who Knows How Large Systems Work from the Inside',
    },
    name: 'Nurcahya Priantoro',
    title: {
      id: 'Data Engineer & AI Specialist · Founder, CocoTech',
      en: 'Data Engineer & AI Specialist · Founder, CocoTech',
    },
    bio: {
      id: 'Data Engineer Intern di Bank Indonesia, alumni Polkadot Blockchain Academy Wave 3, dan lulusan Google Bangkit Academy bidang Cloud Computing — kini menyelesaikan S1 Ilmu Komputer IPB University. Bukan cuma teori: saya tahu cara membangun sistem yang benar-benar jalan di skala besar.',
      en: 'Data Engineer Intern at Bank Indonesia, Polkadot Blockchain Academy Wave 3 alumni, and Google Bangkit Academy Cloud Computing graduate — currently completing a B.Sc. in Computer Science at IPB Universityuntuk portofolio. Not just theory: I know how to build systems that actually work at scale.',
    },
    education: {
      id: 'IPB University · S1 Ilmu Komputer · 2022–2026',
      en: 'IPB University · B.Sc. Computer Science · 2022–2026',
    },
    email: 'nurcahya.priantoro@apps.ipb.ac.id',
    phone: '+6281283321577',
    linkedin: 'https://linkedin.com/in/nurcahya-priantoro',
    github: 'https://github.com/nurcahyapriantoro',
    instagram: 'https://www.instagram.com/nurcahyapriantoro',
  },

  experience: {
    kicker: { id: 'Pengalaman', en: 'Experience' },
    headline: {
      id: 'Track Record di Institusi Terbaik Indonesia',
      en: "Track Record at Indonesia's Top Institutions",
    },
  },

  testimonials: {
    kicker: { id: 'Kata Mereka', en: 'What They Say' },
    headline: {
      id: 'Jangan Percaya Kami — Percaya Mereka yang Sudah Merasakan',
      en: "Don't Trust Us — Trust Those Who Already Experienced It",
    },
  },

  awards: {
    kicker: { id: 'Penghargaan', en: 'Awards & Recognition' },
    headline: {
      id: 'Diakui di Tingkat Nasional',
      en: 'Nationally Recognized',
    },
  },

  paket: {
    kicker: { id: 'Paket & Harga', en: 'Pricing Plans' },
    headline: {
      id: 'Investasi yang Masuk Akal untuk Setiap Tahap Bisnis',
      en: 'Sensible Investment for Every Business Stage',
    },
    sub: {
      id: 'Pilih paket yang cocok. Semua sudah termasuk konsultasi gratis dan support 30 hari.',
      en: 'Pick the plan that fits. All include free consultation and 30-day support.',
    },
    popular: { id: 'Paling Populer', en: 'Most Popular' },
    cta: { id: 'Pilih Paket Ini', en: 'Choose This Plan' },
    tiers: [
      {
        name: { id: 'Mahasiswa / UMKM', en: 'Student / SME' },
        price: 'Rp 1.250.000',
        priceSub: { id: 'mulai dari', en: 'starting from' },
        features: {
          id: [
            'Landing page 1 halaman',
            'Desain responsif',
            'Form kontak WhatsApp',
            'Hosting 1 tahun gratis',
            'Revisi 2x',
          ],
          en: [
            '1-page landing page',
            'Responsive design',
            'WhatsApp contact form',
            '1 year free hosting',
            '2 revisions',
          ],
        },
      },
      {
        name: { id: 'Starter', en: 'Starter' },
        price: 'Rp 2.500.000',
        priceSub: { id: 'mulai dari', en: 'starting from' },
        popular: true,
        features: {
          id: [
            'Website hingga 5 halaman',
            'Desain custom premium',
            'SEO dasar',
            'Integrasi WhatsApp & media sosial',
            'Hosting 1 tahun gratis',
            'Support 30 hari',
            'Revisi 5x',
          ],
          en: [
            'Up to 5 pages',
            'Premium custom design',
            'Basic SEO',
            'WhatsApp & social media integration',
            '1 year free hosting',
            '30-day support',
            '5 revisions',
          ],
        },
      },
      {
        name: { id: 'Business', en: 'Business' },
        price: 'Rp 7.500.000',
        priceSub: { id: 'mulai dari', en: 'starting from' },
        features: {
          id: [
            'Website custom tanpa batas halaman',
            'Dashboard admin / CMS',
            'Database & API integration',
            'SEO advanced',
            'Analytics & tracking',
            'Hosting 1 tahun gratis',
            'Support 60 hari',
            'Revisi tanpa batas',
          ],
          en: [
            'Unlimited pages custom website',
            'Admin dashboard / CMS',
            'Database & API integration',
            'Advanced SEO',
            'Analytics & tracking',
            '1 year free hosting',
            '60-day support',
            'Unlimited revisions',
          ],
        },
      },
      {
        name: { id: 'Enterprise', en: 'Enterprise' },
        price: 'Custom',
        priceSub: { id: 'hubungi kami', en: 'contact us' },
        features: {
          id: [
            'Sistem lengkap end-to-end',
            'AI / Machine Learning integration',
            'Blockchain / Smart Contract',
            'Data pipeline & dashboard',
            'Cloud architecture (GCP/Azure)',
            'Dedicated project manager',
            'SLA & maintenance contract',
          ],
          en: [
            'Full end-to-end system',
            'AI / Machine Learning integration',
            'Blockchain / Smart Contract',
            'Data pipeline & dashboard',
            'Cloud architecture (GCP/Azure)',
            'Dedicated project manager',
            'SLA & maintenance contract',
          ],
        },
      },
    ],
  },

  faq: {
    kicker: { id: 'FAQ', en: 'FAQ' },
    headline: {
      id: 'Pertanyaan yang Sering Ditanyakan',
      en: 'Frequently Asked Questions',
    },
    items: [
      {
        q: { id: 'Berapa lama proses pengerjaan?', en: 'How long does it take?' },
        a: {
          id: 'Landing page 5–7 hari kerja. Website multi-halaman 2–4 minggu. Sistem kompleks (AI/blockchain) 1–3 bulan tergantung scope. Kami selalu kasih timeline detail di awal.',
          en: 'Landing page: 5–7 business days. Multi-page website: 2–4 weeks. Complex systems (AI/blockchain): 1–3 months depending on scope. We always provide a detailed timeline upfront.',
        },
      },
      {
        q: { id: 'Apakah bisa revisi setelah selesai?', en: 'Can I request revisions after completion?' },
        a: {
          id: 'Tentu. Setiap paket sudah termasuk jumlah revisi tertentu. Paket Business & Enterprise mendapat revisi tanpa batas. Setelah support period, kami tetap available dengan tarif maintenance yang terjangkau.',
          en: 'Absolutely. Every plan includes a set number of revisions. Business & Enterprise get unlimited revisions. After the support period, we remain available at affordable maintenance rates.',
        },
      },
      {
        q: { id: 'Saya tidak paham teknis, apakah tetap bisa?', en: "I'm not technical. Can I still work with you?" },
        a: {
          id: '100%. Mayoritas klien kami non-teknis. Kami jelaskan semuanya dalam bahasa yang mudah dipahami dan Anda bisa pantau progress tanpa perlu memahami kode.',
          en: "100%. Most of our clients are non-technical. We explain everything in plain language and you can monitor progress without understanding code.",
        },
      },
      {
        q: { id: 'Apakah termasuk hosting dan domain?', en: 'Does it include hosting and domain?' },
        a: {
          id: 'Semua paket sudah termasuk hosting 1 tahun gratis. Domain bisa kami bantu belikan (biaya domain terpisah, mulai Rp 100rb/tahun). Perpanjangan hosting mulai Rp 300rb/tahun.',
          en: 'All plans include 1 year free hosting. We can help purchase your domain (separate cost, starting Rp 100k/year). Hosting renewal starts at Rp 300k/year.',
        },
      },
      {
        q: { id: 'Metode pembayaran apa saja?', en: 'What payment methods do you accept?' },
        a: {
          id: 'Transfer bank (BCA, Mandiri, BNI), e-wallet (GoPay, OVO, Dana), dan bisa dicicil untuk proyek di atas Rp 5 juta (DP 50%, pelunasan saat serah terima).',
          en: 'Bank transfer (BCA, Mandiri, BNI), e-wallet (GoPay, OVO, Dana), and installments available for projects above Rp 5M (50% down payment, balance upon delivery).',
        },
      },
      {
        q: { id: 'Bisa handle proyek besar / enterprise?', en: 'Can you handle large / enterprise projects?' },
        a: {
          id: 'Ya. Saya punya pengalaman langsung membangun sistem untuk Bank Indonesia dan Pertamina. Untuk proyek enterprise, kami punya network developer terpercaya yang bisa di-scale sesuai kebutuhan.',
          en: "Yes. I have direct experience building systems for Bank Indonesia and Pertamina. For enterprise projects, we have a trusted developer network that can scale as needed.",
        },
      },
    ],
  },

  kontak: {
    kicker: { id: 'Hubungi Kami', en: 'Contact Us' },
    headline: {
      id: 'Ambil Langkah Pertama — Gratis, Tanpa Komitmen',
      en: 'Take the First Step — Free, No Commitment',
    },
    sub: {
      id: 'Ceritakan masalah bisnis Anda. Kami akan analisis dan kasih rekomendasi — gratis. Kalau cocok, kita lanjut. Kalau tidak, tidak ada yang rugi.',
      en: "Tell us about your business problem. We'll analyze it and give recommendations — free. If it fits, we proceed. If not, no one loses.",
    },
    form: {
      name: { id: 'Nama Lengkap', en: 'Full Name' },
      email: { id: 'Email', en: 'Email' },
      phone: { id: 'No. WhatsApp', en: 'WhatsApp Number' },
      message: { id: 'Ceritakan kebutuhan Anda...', en: 'Tell us about your needs...' },
      submit: { id: 'Kirim Pesan →', en: 'Send Message →' },
    },
    wa: {
      label: { id: 'Chat WhatsApp Langsung', en: 'Direct WhatsApp Chat' },
      number: '+6281283321577',
    },
  },

  footer: {
    tagline: {
      id: 'Membangun sistem digital yang bikin orang percaya.',
      en: 'Building digital systems that make people trust.',
    },
    copyright: '© 2025 CocoTech. All rights reserved.',
    links: {
      id: ['Beranda', 'Layanan', 'Portofolio', 'Paket', 'Kontak'],
      en: ['Home', 'Services', 'Portfolio', 'Pricing', 'Contact'],
    },
    social: [
      {
        key: 'linkedin',
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/nurcahya-priantoro/',
      },
      {
        key: 'github',
        label: 'GitHub',
        url: 'https://github.com/nurcahyapriantoro',
      },
      {
        key: 'instagram',
        label: 'Instagram',
        url: 'https://www.instagram.com/nurcahyapriantoro',
      },
    ],
  },

  intro: {
    line1: 'INITIALIZING',
    line2: 'CocoTech',
    line3: { id: 'Sistem Digital Terpercaya', en: 'Trusted Digital Systems' },
  },

  masalah: {
    kicker: {
      id: 'Realita Bisnis Anda',
      en: 'Your Business Reality',
    },
    headline: {
      id: 'Setiap Hari Tanpa Website, Anda Membiayai Pesaing Anda',
      en: "Every Day Without a Website, You're Funding Your Competitors",
    },
    sub: {
      id: 'Bukan soal nanti-nanti. Setiap jam yang berlalu, calon pelanggan Anda ditemukan oleh bisnis lain yang lebih "terlihat" online.',
      en: 'It\'s not about "someday." Every passing hour, your potential customers are being found by other businesses that look more visible online.',
    },
    painLabel: {
      id: 'Tanpa Website',
      en: 'Without a Website',
    },
    gainLabel: {
      id: 'Dengan Website CocoTech',
      en: 'With CocoTech Website',
    },
    pains: [
      {
        stat: '73%',
        title: {
          id: 'konsumen cek Google sebelum membeli',
          en: 'of consumers check Google before buying',
        },
        desc: {
          id: 'Mereka mencari bisnis seperti milik Anda — yang muncul adalah pesaing. Anda tidak ada di sana.',
          en: "They search for businesses like yours — your competitors show up. You're not even there.",
        },
      },
      {
        stat: '7 Detik',
        title: {
          id: 'untuk membentuk kesan pertama',
          en: 'to form a first impression',
        },
        desc: {
          id: 'Tanpa website, tidak ada kesan pertama. Bisnis tanpa kehadiran online dianggap tidak serius — atau tidak ada.',
          en: "Without a website, there's no first impression. Businesses with no online presence seem unserious — or nonexistent.",
        },
      },
      {
        stat: 'Rp 4–10 Jt',
        title: {
          id: 'potensi hilang ke kompetitor setiap bulan',
          en: 'in potential revenue lost to competitors monthly',
        },
        desc: {
          id: 'Itulah nilai nyata calon pelanggan yang memilih kompetitor yang "terlihat lebih profesional" karena punya website.',
          en: 'That\'s the real value of leads choosing competitors who "look more professional" with a website.',
        },
      },
      {
        stat: '82%',
        title: {
          id: 'calon klien tidak mau menghubungi bisnis tanpa online presence',
          en: "of prospects won't contact a business with no online presence",
        },
        desc: {
          id: 'Rekomendasi mulut ke mulut saja tidak cukup lagi. Era digital butuh bukti nyata — website Anda.',
          en: 'Word of mouth alone is no longer enough. The digital age requires real proof — your website.',
        },
      },
    ],
    gains: [
      {
        title: {
          id: 'Muncul di Google saat calon pelanggan mencari',
          en: 'Show up on Google when prospects are searching',
        },
        desc: {
          id: 'Website yang dioptimasi SEO memastikan bisnis Anda ditemukan, bukan pesaing Anda.',
          en: "An SEO-optimized website ensures your business gets found, not your competitors'.",
        },
      },
      {
        title: {
          id: 'Terima leads 24 jam — bahkan saat Anda tidur',
          en: 'Receive leads 24/7 — even while you sleep',
        },
        desc: {
          id: 'Website bekerja untuk Anda setiap saat. Form kontak dan WhatsApp CTA mengkonversi pengunjung jadi pelanggan.',
          en: 'Your website works for you around the clock. Contact forms and WhatsApp CTAs convert visitors into customers.',
        },
      },
      {
        title: {
          id: 'Tampil profesional = kepercayaan langsung terbangun',
          en: 'Look professional = instant trust established',
        },
        desc: {
          id: 'Website premium memberi legitimasi bisnis Anda. Klien rela bayar lebih untuk bisnis yang terlihat serius.',
          en: 'A premium website gives your business legitimacy. Clients willingly pay more for businesses that look serious.',
        },
      },
      {
        title: {
          id: 'Satu investasi — keuntungan bertahun-tahun',
          en: 'One investment — years of returns',
        },
        desc: {
          id: 'Dibandingkan kehilangan Rp 4–10 juta/bulan, investasi website Anda sudah balik modal dalam minggu pertama.',
          en: 'Compared to losing Rp 4–10M/month, your website investment pays for itself within the first week.',
        },
      },
    ],
    urgency: {
      text: {
        id: 'Saat Anda membaca ini, pesaing Anda baru saja mendapat 3 calon pelanggan baru dari Google.',
        en: 'While you\'re reading this, your competitors just received 3 new leads from Google.',
      },
      slotLabel: {
        id: 'Slot proyek tersedia bulan ini:',
        en: 'Project slots available this month:',
      },
      slotFilled: 3,
      slotTotal: 5,
      cta: {
        id: 'Amankan Slot Saya Sebelum Penuh →',
        en: "Secure My Slot Before It's Full →",
      },
    },
  },

  cerita: {
    kicker: {
      id: 'Hasil Nyata, Bukan Janji',
      en: 'Real Results, Not Promises',
    },
    headline: {
      id: 'Bisnis Seperti Milik Anda — Sudah Berhasil',
      en: 'Businesses Just Like Yours — Already Succeeding',
    },
    sub: {
      id: 'Bukan testimoni basa-basi. Ini transformasi nyata dari pemilik bisnis yang dulu punya masalah persis sama dengan Anda.',
      en: "These aren't generic testimonials. These are real transformations from business owners who once had the exact same problems as you.",
    },
    personas: [
      {
        initials: 'DW',
        color: '#f59e0b',
        name: 'Ibu Dewi',
        business: {
          id: 'Catering Rumahan · Jakarta Selatan',
          en: 'Home Catering · South Jakarta',
        },
        before: {
          id: 'Pasang promosi di grup WA tiap hari, orderan tidak stabil',
          en: 'Posted promos in WhatsApp groups daily, orders were unstable',
        },
        after: {
          id: '3–5 order baru per minggu dari orang yang tidak kenal saya',
          en: '3–5 new orders per week from people who never knew me before',
        },
        resultValue: '+340%',
        resultLabel: {
          id: 'order dalam 3 bulan',
          en: 'orders in 3 months',
        },
      },
      {
        initials: 'RD',
        color: '#0071e3',
        name: 'Pak Rudi',
        business: {
          id: 'Jasa Servis AC · Bekasi',
          en: 'AC Repair Service · Bekasi',
        },
        before: {
          id: 'Cukup mulut ke mulut — tapi pelanggan lama pindah ke kompetitor',
          en: 'Relied on word of mouth — but old customers kept switching to competitors',
        },
        after: {
          id: 'Muncul di Google pencarian lokal, pelanggan datang sendiri',
          en: 'Show up on local Google search, customers come to me directly',
        },
        resultValue: '2.5×',
        resultLabel: {
          id: 'pendapatan dalam 4 bulan',
          en: 'revenue in 4 months',
        },
      },
      {
        initials: 'TR',
        color: '#8b5cf6',
        name: 'Mbak Tari',
        business: {
          id: 'Desainer Grafis Freelance',
          en: 'Freelance Graphic Designer',
        },
        before: {
          id: 'Kirim portfolio via Google Drive, klien sering tidak mau buka',
          en: "Sent portfolio via Google Drive, clients often wouldn't open it",
        },
        after: {
          id: 'Klien langsung terkesan dan tanya harga tanpa ba-bi-bu',
          en: 'Clients are immediately impressed and ask about rates right away',
        },
        resultValue: '+80%',
        resultLabel: {
          id: 'rate naik, 2 klien baru/bulan',
          en: 'rate increase, 2 new clients/month',
        },
      },
    ],
    roi: {
      label: {
        id: 'Hitung Sendiri ROI-nya',
        en: 'Calculate Your Own ROI',
      },
      text: {
        id: 'Website CocoTech mulai Rp 1.250.000. Jika hanya dapat 1 pelanggan baru/bulan Rp 500rb → balik modal 3 bulan. Rata-rata klien kami dapat 5–10 pelanggan baru di bulan pertama.',
        en: 'CocoTech websites start at Rp 1,250,000. Getting just 1 new customer/month at Rp 500K → payback in 3 months. Our average client gets 5–10 new customers in the first month.',
      },
      cta: {
        id: 'Saya Siap Mulai →',
        en: 'I\'m Ready to Start →',
      },
    },
  },
};

export default copy;

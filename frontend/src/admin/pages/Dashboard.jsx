import { useState, useEffect } from 'react';
import { api } from '../api';

const StatCard = ({ label, value, icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#111] border border-white/10 rounded-xl p-6 text-left hover:border-[#0071E3]/50 transition-colors group w-full"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-2xl">{icon}</span>
      <span className="text-gray-600 group-hover:text-[#0071E3] text-sm transition-colors">→</span>
    </div>
    <div className="text-3xl font-bold text-white mb-1">
      {value === null ? <span className="text-gray-600 text-lg">—</span> : value}
    </div>
    <div className="text-gray-500 text-sm">{label}</div>
  </button>
);

const QUICK_LINKS = [
  { key: 'portfolio', label: 'Portfolio', icon: '💼', path: '/portfolio' },
  { key: 'testimonials', label: 'Testimoni', icon: '💬', path: '/testimonials' },
  { key: 'experience', label: 'Pengalaman', icon: '🏢', path: '/experience' },
  { key: 'paket', label: 'Paket & Harga', icon: '💰', path: '/paket' },
  { key: 'skills', label: 'Tech Stack', icon: '🛠️', path: '/skills' },
  { key: 'awards', label: 'Penghargaan', icon: '🏆', path: '/awards' },
];

export default function Dashboard({ onNavigate }) {
  const [counts, setCounts] = useState({
    portfolio: null,
    testimonials: null,
    experience: null,
    paket: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [portfolio, testimonials, experience, paket] = await Promise.allSettled([
          api.get('/portfolio'),
          api.get('/testimonials'),
          api.get('/experience'),
          api.get('/paket'),
        ]);
        setCounts({
          portfolio: portfolio.status === 'fulfilled' ? (Array.isArray(portfolio.value) ? portfolio.value.length : (portfolio.value?.data?.length ?? '?')) : '?',
          testimonials: testimonials.status === 'fulfilled' ? (Array.isArray(testimonials.value) ? testimonials.value.length : (testimonials.value?.data?.length ?? '?')) : '?',
          experience: experience.status === 'fulfilled' ? (Array.isArray(experience.value) ? experience.value.length : (experience.value?.data?.length ?? '?')) : '?',
          paket: paket.status === 'fulfilled' ? (Array.isArray(paket.value) ? paket.value.length : (paket.value?.data?.length ?? '?')) : '?',
        });
      } catch {
        //
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">Selamat datang di CocoTech CMS</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola konten website portofolio & agensi Anda.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Portfolio" value={loading ? '...' : counts.portfolio} icon="💼" onClick={() => onNavigate('portfolio')} />
        <StatCard label="Testimoni" value={loading ? '...' : counts.testimonials} icon="💬" onClick={() => onNavigate('testimonials')} />
        <StatCard label="Pengalaman" value={loading ? '...' : counts.experience} icon="🏢" onClick={() => onNavigate('experience')} />
        <StatCard label="Paket Harga" value={loading ? '...' : counts.paket} icon="💰" onClick={() => onNavigate('paket')} />
      </div>

      <div>
        <h2 className="text-white font-semibold mb-4">Akses Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {QUICK_LINKS.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className="bg-[#111] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 text-left hover:border-white/20 hover:bg-[#1a1a1a] transition-colors group"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-gray-300 group-hover:text-white text-sm transition-colors">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 bg-[#111] border border-white/10 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-3">⚙️ Copywriting & Teks Website</h2>
        <p className="text-gray-500 text-sm mb-4">Edit semua teks hero, about, kontak, dan section lainnya dari satu tempat.</p>
        <button
          onClick={() => onNavigate('settings')}
          className="bg-[#0071E3] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Buka Editor Copywriting →
        </button>
      </div>
    </div>
  );
}

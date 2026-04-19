const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { key: 'portfolio', label: 'Portfolio', icon: '💼' },
  { key: 'experience', label: 'Pengalaman', icon: '🏢' },
  { key: 'testimonials', label: 'Testimoni', icon: '💬' },
  { key: 'paket', label: 'Paket & Harga', icon: '💰' },
  { key: 'skills', label: 'Tech Stack', icon: '🛠️' },
  { key: 'awards', label: 'Penghargaan', icon: '🏆' },
  { key: 'settings', label: 'Copywriting', icon: '⚙️' },
];

export default function Sidebar({ currentPage, onNavigate, onLogout }) {
  return (
    <aside
      style={{ width: 240, minWidth: 240 }}
      className="h-screen bg-[#111] border-r border-white/10 flex flex-col"
    >
      <div className="px-6 py-5 border-b border-white/10">
        <span className="text-white font-bold text-lg tracking-tight">CocoTech CMS</span>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-colors text-left ${
              currentPage === item.key
                ? 'bg-[#0071E3] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

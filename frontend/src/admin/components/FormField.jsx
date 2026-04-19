// Shared form primitives — defined OUTSIDE any component so React never
// treats them as new types on re-render (prevents focus-loss typing bug).

export const inputCls =
  'w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#0071E3] transition-colors';

export const taCls = inputCls + ' resize-y min-h-[80px]';

export function Field({ label, children }) {
  return (
    <div>
      <label className="block text-gray-400 text-xs mb-1">{label}</label>
      {children}
    </div>
  );
}

export function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg text-white text-sm shadow-lg ${
        type === 'error' ? 'bg-red-600' : 'bg-green-600'
      }`}
    >
      {msg}
    </div>
  );
}

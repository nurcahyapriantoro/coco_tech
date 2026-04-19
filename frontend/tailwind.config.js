export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ct-cyan': '#00f5ff',
        'ct-purple': '#8b2fff',
        'ct-pink': '#ff2d78',
        'ct-green': '#39ff14',
        'ct-orange': '#ff6a00',
        'ct-bg': '#000005',
        'ct-bg-900': '#06060e',
        'ct-bg-800': '#0d0d1a',
        'ct-ink': '#111827',
      },
      fontFamily: {
        display: ['Sora', 'Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 245, 255, 0.3), 0 0 60px rgba(0, 245, 255, 0.1)',
        'neon-purple': '0 0 20px rgba(139, 47, 255, 0.3), 0 0 60px rgba(139, 47, 255, 0.1)',
        'neon-pink': '0 0 20px rgba(255, 45, 120, 0.3), 0 0 60px rgba(255, 45, 120, 0.1)',
        'neon-green': '0 0 20px rgba(57, 255, 20, 0.3), 0 0 60px rgba(57, 255, 20, 0.1)',
        'neon-orange': '0 0 20px rgba(255, 106, 0, 0.3), 0 0 60px rgba(255, 106, 0, 0.1)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        drift: 'drift 28s linear infinite',
      },
    },
  },
  plugins: [],
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import CocoTechLogo from './logos/CocoTechLogo';

const NAV_LINKS = [
  { id: 'layanan',   key: { id: 'Layanan',   en: 'Services'     } },
  { id: 'portfolio', key: { id: 'Portfolio', en: 'Portfolio'    } },
  { id: 'tentang',   key: { id: 'Tentang',   en: 'About'        } },
  { id: 'testimoni', key: { id: 'Testimoni', en: 'Testimonials' } },
  { id: 'harga',     key: { id: 'Harga',     en: 'Pricing'      } },
];

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar({ scrolled, lang, setLang, activeSection }) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/6281283321577', '_blank', 'noopener,noreferrer');
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'frosted' : 'transparent'}`}>
        <div className="navbar-inner">
          <button
            className="navbar-logo"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            onClick={() => scrollTo('home')}
          >
            <CocoTechLogo height={22} />
          </button>

          <div className="navbar-links">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                className={`navbar-link${activeSection === link.id ? ' active' : ''}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.key[lang]}
              </button>
            ))}
          </div>

          <div className="navbar-controls">
            <button className="navbar-icon-btn" onClick={toggleTheme} title="Toggle theme">
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button
              className="navbar-icon-btn"
              onClick={() => setLang(l => l === 'id' ? 'en' : 'id')}
              title="Switch language"
            >
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
            <button className="navbar-cta" onClick={openWhatsApp}>
              {lang === 'id' ? 'Hubungi' : 'Contact'}
            </button>

            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                className={`mobile-nav-link${activeSection === link.id ? ' active' : ''}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.key[lang]}
              </button>
            ))}
            <button
              className="mobile-nav-cta"
              onClick={openWhatsApp}
            >
              {lang === 'id' ? 'Konsultasi Gratis →' : 'Free Consultation →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

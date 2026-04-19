import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_COLORS = {
  web:        'linear-gradient(135deg, #0071e3 0%, #00c4ff 100%)',
  data:       'linear-gradient(135deg, #34c759 0%, #00d4aa 100%)',
  blockchain: 'linear-gradient(135deg, #8b2fff 0%, #e040fb 100%)',
};

const CATEGORY_BG = {
  web:        'rgba(0,113,227,0.08)',
  data:       'rgba(52,199,89,0.08)',
  blockchain: 'rgba(139,47,255,0.08)',
};

const CATEGORY_COLOR = {
  web:        'var(--accent)',
  data:       '#34c759',
  blockchain: '#8b2fff',
};

function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [prev, next]);

  if (!images || images.length === 0) return null;

  return (
    <div className="modal-slider">
      <div className="modal-slider-track">
        <img
          key={current}
          src={images[current]}
          alt={`Screenshot ${current + 1}`}
          className="modal-slider-img"
          draggable={false}
        />

        {images.length > 1 && (
          <>
            <button className="modal-slider-btn modal-slider-btn-prev" onClick={prev} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button className="modal-slider-btn modal-slider-btn-next" onClick={next} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="modal-slider-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`modal-slider-dot${i === current ? ' modal-slider-dot-active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Icon: GitHub
function IconGitHub() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}

// Icon: External link (globe/arrow)
function IconExternalLink() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

export default function PortfolioModal({ project, lang, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  const catColor = CATEGORY_COLOR[project.category] || 'var(--accent)';
  const catBg    = CATEGORY_BG[project.category]    || 'rgba(0,113,227,0.08)';
  const gradient = CATEGORY_COLORS[project.category] || CATEGORY_COLORS.web;
  const hasImages = project.images && project.images.length > 0;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 48, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Image slider (sticky top, tidak ikut scroll) ── */}
          <div className="modal-media">
            {hasImages ? (
              <ImageSlider images={project.images} />
            ) : (
              <div className="modal-thumb-strip" style={{ background: gradient }} />
            )}
          </div>

          {/* ── Scrollable body ── */}
          <div className="modal-body">
            {/* Header */}
            <div className="modal-header">
              <div className="modal-header-text">
                <div
                  className="modal-category-badge"
                  style={{ background: catBg, color: catColor }}
                >
                  {project.category.toUpperCase()} · {project.year}
                </div>
                <h2 className="modal-title">{project.title}</h2>
                <div className="modal-client">{project.client}</div>
              </div>
              <button className="modal-close" onClick={onClose} aria-label="Close modal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Description */}
            <p className="modal-desc">{project.desc[lang]}</p>

            {/* Highlights */}
            {project.highlights && project.highlights[lang] && (
              <div className="modal-section">
                <div className="modal-section-label">
                  {lang === 'id' ? 'Highlight Proyek' : 'Project Highlights'}
                </div>
                <ul className="modal-highlights-list">
                  {project.highlights[lang].map((h, i) => (
                    <li key={i} className="modal-highlight-item">
                      <span className="modal-highlight-dot" style={{ background: catColor }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech stack */}
            <div className="modal-section">
              <div className="modal-section-label">
                {lang === 'id' ? 'Teknologi yang Digunakan' : 'Technologies Used'}
              </div>
              <div className="modal-tech-chips">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="modal-tech-chip"
                    style={{ borderColor: catColor + '44', color: catColor }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              {/* Row 1: Link buttons (GitHub + Live) */}
              {(project.github || project.liveUrl) && (
                <div className="modal-footer-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link-btn"
                    >
                      <IconGitHub />
                      GitHub Repo
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link-btn modal-live-btn"
                      style={{ borderColor: catColor + '55', color: catColor }}
                    >
                      <IconExternalLink />
                      {lang === 'id' ? 'Lihat Website' : 'Live Website'}
                    </a>
                  )}
                </div>
              )}

              {/* Row 2: CTA + Close */}
              <div className="modal-footer-actions">
                <a
                  href={`https://wa.me/6281283321577?text=${encodeURIComponent(
                    lang === 'id'
                      ? `Halo, saya tertarik berdiskusi tentang proyek serupa dengan ${project.title}.`
                      : `Hi, I'm interested in discussing a project similar to ${project.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-cta"
                  style={{ background: catColor }}
                >
                  {lang === 'id' ? 'Diskusikan Proyek Serupa →' : 'Discuss a Similar Project →'}
                </a>
                <button className="modal-close-btn" onClick={onClose}>
                  {lang === 'id' ? 'Tutup' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import { useData } from '../context/DataContext';
import PortfolioModal from './PortfolioModal';

const GRADIENTS = [
  'linear-gradient(135deg, #0071e3 0%, #00c4ff 100%)',
  'linear-gradient(135deg, #34c759 0%, #00d4aa 100%)',
  'linear-gradient(135deg, #ff6a00 0%, #ffb347 100%)',
  'linear-gradient(135deg, #8b2fff 0%, #e040fb 100%)',
  'linear-gradient(135deg, #ff2d78 0%, #ff6a00 100%)',
  'linear-gradient(135deg, #0071e3 0%, #8b2fff 100%)',
  'linear-gradient(135deg, #34c759 0%, #0071e3 100%)',
];

const ICONS = ['📊', '🔗', '🎸', '🏢', '🛒', '🎓', '🧠'];

export default function PortfolioSection({ lang }) {
  const { portfolio, categories, copy: copywriting } = useData();
  const { portfolio: pw } = copywriting;
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);
  const filtered = filter === 'all' ? portfolio : portfolio.filter(p => p.category === filter);

  const handleCardClick = (project) => {
    if (!isDragging) setSelectedProject(project);
  };

  return (
    <>
      <section className="section section-alt" id="portfolio">
        <div className="section-inner-wide">
          <SectionHeader
            eyebrow={pw.kicker[lang]}
            title={pw.headline[lang]}
            subtitle={pw.sub[lang]}
          />

          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '100px',
                  border: '1px solid',
                  borderColor: filter === cat.key ? 'var(--accent)' : 'var(--border)',
                  background: filter === cat.key ? 'rgba(0,113,227,0.08)' : 'var(--bg)',
                  color: filter === cat.key ? 'var(--accent)' : 'var(--fg-2)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio-scroll-container" ref={containerRef}>
          <motion.div
            key={filter}
            className="portfolio-track"
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.08}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 40 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setTimeout(() => setIsDragging(false), 80)}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {filtered.map((project) => {
              const idx = portfolio.indexOf(project);
              const gradient = GRADIENTS[idx % GRADIENTS.length];

              return (
                <motion.div
                  key={project.id}
                  className="portfolio-card-h"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleCardClick(project)}
                  whileHover={isDragging ? {} : { y: -6, transition: { duration: 0.25 } }}
                >
                  <div className="portfolio-thumb-h">
                    {project.images && project.images.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        draggable={false}
                        loading="lazy"
                      />
                    ) : (
                      <>
                        <div
                          style={{
                            position: 'absolute', inset: 0,
                            background: gradient,
                          }}
                        />
                        <span style={{
                          position: 'absolute',
                          fontSize: 36,
                          top: '50%', left: '50%',
                          transform: 'translate(-50%,-50%)',
                        }}>
                          {ICONS[idx % ICONS.length]}
                        </span>
                      </>
                    )}

                    <div className="portfolio-thumb-overlay">
                      <span className="portfolio-thumb-overlay-name">{project.title}</span>
                      <span className="portfolio-thumb-overlay-cta">
                        {lang === 'id' ? 'Lihat Detail →' : 'View Details →'}
                      </span>
                    </div>
                  </div>

                  <div className="portfolio-info">
                    <div className="portfolio-tags">
                      {project.techs.slice(0, 3).map((tech) => (
                        <span key={tech} className="tag">{tech}</span>
                      ))}
                      {project.techs.length > 3 && (
                        <span className="tag">+{project.techs.length - 3}</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                      <h3 className="portfolio-name">{project.title}</h3>
                      <span style={{ fontSize: 12, color: 'var(--fg-3)', paddingTop: 3, flexShrink: 0 }}>{project.year}</span>
                    </div>
                    <p className="portfolio-desc">{project.desc[lang]}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="section-inner-wide" style={{ paddingTop: 0 }}>
          <p className="portfolio-drag-hint">
            ← {lang === 'id' ? 'Seret untuk menjelajahi' : 'Drag to explore'} →
          </p>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <PortfolioModal
            key={selectedProject.id}
            project={selectedProject}
            lang={lang}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

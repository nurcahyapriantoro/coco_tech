import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import { useData } from '../context/DataContext';

/* ── animation variants ──────────────────────────────────────── */
const cardVariant = {
  hidden: { opacity: 0, y: 36 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
};

const roiVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

/* ── CeritaCard ───────────────────────────────────────────────── */
function CeritaCard({ persona, lang, index }) {
  const scrollToKontak = () =>
    document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.div
      className="cerita-card"
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {/* identity */}
      <div className="cerita-identity">
        <div
          className="cerita-avatar"
          style={{ '--avatar-color': persona.color }}
          aria-hidden="true"
        >
          {persona.initials}
        </div>
        <div>
          <div className="cerita-name">{persona.name}</div>
          <div className="cerita-business">{persona.business[lang]}</div>
        </div>
      </div>

      {/* before */}
      <div className="cerita-before">
        <span className="cerita-label cerita-label-before">
          {lang === 'id' ? 'Sebelum' : 'Before'}
        </span>
        <p className="cerita-quote">{persona.before[lang]}</p>
      </div>

      {/* arrow */}
      <div className="cerita-arrow" aria-hidden="true">
        <div className="cerita-arrow-line" />
        <div className="cerita-arrow-icon">▼</div>
      </div>

      {/* after */}
      <div className="cerita-after">
        <span className="cerita-label cerita-label-after">
          {lang === 'id' ? 'Setelah' : 'After'}
        </span>
        <p className="cerita-after-text">{persona.after[lang]}</p>
      </div>

      {/* result */}
      <div className="cerita-result" style={{ '--avatar-color': persona.color }}>
        <span className="cerita-result-value">{persona.resultValue}</span>
        <span className="cerita-result-label">{persona.resultLabel[lang]}</span>
      </div>
    </motion.div>
  );
}

/* ── main export ─────────────────────────────────────────────── */
export default function CeritaSection({ lang }) {
  const { copy: cw } = useData();
  const { cerita: d } = cw;

  const scrollToKontak = () =>
    document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="section cerita-section">
      <div className="section-inner">
        {/* header */}
        <div className="cerita-header-wrapper">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            {d.kicker[lang]}
          </span>
          <SectionHeader title={d.headline[lang]} subtitle={d.sub[lang]} center />
        </div>

        {/* 3-card grid */}
        <div className="cerita-grid">
          {d.personas.map((persona, i) => (
            <CeritaCard key={i} persona={persona} lang={lang} index={i} />
          ))}
        </div>

        {/* ROI strip */}
        <motion.div
          className="cerita-roi"
          variants={roiVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
        >
          <div className="cerita-roi-icon" aria-hidden="true">💰</div>
          <div className="cerita-roi-body">
            <div className="cerita-roi-label">{d.roi.label[lang]}</div>
            <p className="cerita-roi-text">{d.roi.text[lang]}</p>
          </div>
          <button className="cerita-roi-cta" onClick={scrollToKontak}>
            {d.roi.cta[lang]}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import { useData } from '../context/DataContext';

/* ── animation variants ──────────────────────────────────────── */
const fromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

const fromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.45 },
  },
};

/* ── sub-components ──────────────────────────────────────────── */
function PainCard({ stat, title, desc, index }) {
  return (
    <motion.div
      className="masalah-card pain"
      custom={index}
      variants={fromLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <div className="masalah-card-stat">{stat}</div>
      <div className="masalah-card-title">{title}</div>
      <div className="masalah-card-desc">{desc}</div>
    </motion.div>
  );
}

function GainCard({ title, desc, index }) {
  return (
    <motion.div
      className="masalah-card gain"
      custom={index}
      variants={fromRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <div className="masalah-gain-check" aria-hidden="true">✓</div>
      <div>
        <div className="masalah-card-title">{title}</div>
        <div className="masalah-card-desc">{desc}</div>
      </div>
    </motion.div>
  );
}

function SlotDot({ filled }) {
  return <span className={`slot-dot${filled ? ' filled' : ''}`} aria-hidden="true" />;
}

/* ── main export ─────────────────────────────────────────────── */
export default function MasalahSection({ lang }) {
  const { copy: cw } = useData();
  const { masalah: d } = cw;

  const scrollToKontak = () => {
    document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section masalah-section">
      <div className="masalah-bg-orb" aria-hidden="true" />

      <div className="section-inner">
        {/* ── header ── */}
        <div className="masalah-header-wrapper">
          <span className="masalah-eyebrow-wrap">
            <span className="masalah-alarm-icon" aria-hidden="true">⚠️</span>
            <span className="eyebrow-text-only">{d.kicker[lang]}</span>
          </span>
          <SectionHeader
            title={d.headline[lang]}
            subtitle={d.sub[lang]}
            center
          />
        </div>

        {/* ── comparison grid ── */}
        <div className="masalah-grid">

          {/* LEFT — pain */}
          <div className="masalah-col">
            <motion.div
              className="masalah-col-header pain"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span aria-hidden="true">✗</span>
              {d.painLabel[lang]}
            </motion.div>

            {d.pains.map((item, i) => (
              <PainCard
                key={i}
                index={i}
                stat={item.stat}
                title={item.title[lang]}
                desc={item.desc[lang]}
              />
            ))}
          </div>

          {/* RIGHT — gain */}
          <div className="masalah-col">
            <motion.div
              className="masalah-col-header gain"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            >
              <span aria-hidden="true">✓</span>
              {d.gainLabel[lang]}
            </motion.div>

            {d.gains.map((item, i) => (
              <GainCard
                key={i}
                index={i}
                title={item.title[lang]}
                desc={item.desc[lang]}
              />
            ))}
          </div>
        </div>

        {/* ── urgency strip ── */}
        <motion.div
          className="urgency-strip"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
        >
          <div className="urgency-left">
            {/* live ticker */}
            <div className="urgency-ticker">
              <span className="urgency-dot" aria-hidden="true" />
              <span>{d.urgency.text[lang]}</span>
            </div>

            {/* slot indicator */}
            <div className="urgency-slots">
              <span className="urgency-slots-label">{d.urgency.slotLabel[lang]}</span>
              <div className="slot-dots">
                {Array.from({ length: d.urgency.slotTotal }).map((_, i) => (
                  <SlotDot key={i} filled={i < d.urgency.slotFilled} />
                ))}
              </div>
              <span className="urgency-slots-remaining">
                {lang === 'id'
                  ? `${d.urgency.slotTotal - d.urgency.slotFilled} tersisa`
                  : `${d.urgency.slotTotal - d.urgency.slotFilled} left`}
              </span>
            </div>
          </div>

          <div className="urgency-right">
            <button className="urgency-cta" onClick={scrollToKontak}>
              {d.urgency.cta[lang]}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useData } from '../context/DataContext';
import { usePerformance } from '../context/PerformanceContext';
import MagneticButton from './ui/MagneticButton';

const WORD_VARIANTS = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 },
  }),
};

function AnimatedLine({ text, offset = 0, accent = false }) {
  const words = text.split(' ');
  return (
    <span style={{ display: 'block', color: accent ? 'var(--accent)' : undefined }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={offset + i}
          variants={WORD_VARIANTS}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection({ lang }) {
  const { copy: copywriting } = useData();
  const { hero } = copywriting;
  const lines = hero.headline[lang];
  const line1WordCount = lines[0].split(' ').length;
  const performanceMode = usePerformance();

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroGray = useTransform(scrollYProgress, [0, 0.5], [30, 0]);
  const heroFilter = useTransform(heroGray, (v) => `grayscale(${v}%)`);

  const scrollToLayanan = () => {
    const el = document.getElementById('layanan');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToKontak = () => {
    const el = document.getElementById('kontak');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home" ref={sectionRef}>
      {performanceMode === 'high' ? (
        <motion.div
          className="hero-parallax-bg"
          style={{ y: bgY, filter: heroFilter }}
          aria-hidden="true"
        />
      ) : (
        <div className="hero-parallax-bg" aria-hidden="true" />
      )}

      <div className="hero-dot-grid" aria-hidden="true" />

      {performanceMode !== 'low' ? (
        <div className="hero-mesh" aria-hidden="true">
          <div className="hero-mesh-blob hero-mesh-1" />
          <div className="hero-mesh-blob hero-mesh-2" />
          <div className="hero-mesh-blob hero-mesh-3" />
        </div>
      ) : (
        <div
          className="hero-orb hero-orb-1"
          style={{ animation: 'none' }}
          aria-hidden="true"
        />
      )}

      <motion.div
        style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div
          className="hero-badge"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          <span className="hero-badge-dot" />
          {hero.kicker[lang]}
        </motion.div>

        <h1 className="hero-title">
          <AnimatedLine text={lines[0]} offset={0} accent={false} />
          <AnimatedLine text={lines[1]} offset={line1WordCount} accent={true} />
        </h1>

        <motion.p
          className="hero-subtitle"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {hero.sub[lang]}
        </motion.p>

        <motion.div
          className="hero-actions"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          <MagneticButton>
            <button className="btn-primary" onClick={scrollToKontak}>
              {hero.cta[lang]}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <button className="btn-secondary" onClick={scrollToPortfolio}>
              {hero.ctaSec[lang]}
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={scrollToLayanan}
        style={{ cursor: 'pointer' }}
      >
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  );
}

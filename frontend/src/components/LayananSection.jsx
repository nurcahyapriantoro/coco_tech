import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import { useData } from '../context/DataContext';

const SPRING = { stiffness: 300, damping: 30 };

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), SPRING);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), SPRING);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

const fadeCard = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
};

export default function LayananSection({ lang }) {
  const { copy: copywriting } = useData();
  const { layanan } = copywriting;

  return (
    <section className="section" id="layanan">
      <div className="section-inner">
        <SectionHeader
          eyebrow={layanan.kicker[lang]}
          title={layanan.headline[lang]}
          subtitle={layanan.sub[lang]}
        />

        <div className="services-grid">
          {layanan.cards.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <TiltCard className="service-card glass">
                <div className="service-icon">{card.icon}</div>
                <h3 className="service-name">{card.title[lang]}</h3>
                <p className="service-desc">
                  <em style={{ color: 'var(--fg-2)', fontStyle: 'normal', display: 'block', marginBottom: 8, fontSize: 13, opacity: 0.85 }}>
                    {card.problem[lang]}
                  </em>
                  {card.solution[lang]}
                </p>
                <ul className="service-features">
                  {card.techs.map((tech) => (
                    <li key={tech} className="service-feature">{tech}</li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

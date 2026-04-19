import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from './ui/SectionHeader';
import { useData } from '../context/DataContext';
import { usePerformance } from '../context/PerformanceContext';

function ProcessStep({ step, index, isLast, lang, sectionProgress }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const performanceMode = usePerformance();

  const threshold = index / Math.max(4, 1);
  const nextThreshold = (index + 1) / Math.max(4, 1);

  const connectorScale = useTransform(
    sectionProgress,
    [threshold, nextThreshold],
    [0, 1]
  );

  return (
    <motion.div
      className={`process-step${inView ? ' active' : ''}`}
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      <div className="process-step-left">
        <motion.div
          className="process-number"
          animate={
            inView
              ? { background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }
              : {}
          }
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {index + 1}
        </motion.div>

        {!isLast && (
          <div className="process-connector-track">
            <motion.div
              className="process-connector-fill"
              style={
                performanceMode === 'high'
                  ? { scaleY: connectorScale, height: '100%', transformOrigin: 'top' }
                  : { height: '100%' }
              }
              initial={performanceMode !== 'high' ? { scaleY: 0, transformOrigin: 'top' } : undefined}
              whileInView={performanceMode !== 'high' ? { scaleY: 1 } : undefined}
              viewport={performanceMode !== 'high' ? { once: true, margin: '-80px' } : undefined}
              transition={performanceMode !== 'high' ? { duration: 0.7, delay: 0.3 } : undefined}
            />
          </div>
        )}
      </div>
      <div className="process-content">
        <h3 className="process-title">{step.title[lang]}</h3>
        <p className="process-desc">{step.desc[lang]}</p>
      </div>
    </motion.div>
  );
}

export default function ProsesSection({ lang }) {
  const { copy: copywriting } = useData();
  const { proses } = copywriting;
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section className="section" id="proses" ref={sectionRef}>
      <div className="section-inner" style={{ maxWidth: 760 }}>
        <SectionHeader
          eyebrow={proses.kicker[lang]}
          title={proses.headline[lang]}
        />
        <div className="process-steps">
          {proses.steps.map((step, i) => (
            <ProcessStep
              key={i}
              step={step}
              index={i}
              isLast={i === proses.steps.length - 1}
              lang={lang}
              sectionProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

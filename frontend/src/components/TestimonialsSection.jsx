import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import { useData } from '../context/DataContext';
import { usePerformance } from '../context/PerformanceContext';

function TiltCard({ children }) {
  const ref = useRef(null);
  const performanceMode = usePerformance();

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 280, damping: 22 });
  const springRotY = useSpring(rotY, { stiffness: 280, damping: 22 });

  const handleMouseMove = (e) => {
    if (performanceMode === 'low') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotY.set(dx * 4);
    rotX.set(-dy * 4);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default function TestimonialsSection({ lang }) {
  const { copy: copywriting, testimonials } = useData();
  const { testimonials: tmCopy } = copywriting;
  const ITEMS = [...testimonials, ...testimonials];
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef(null);
  const posRef = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const tick = () => {
      if (!isHovered && el) {
        posRef.current += 0.5;
        const half = el.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        el.scrollLeft = posRef.current;
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isHovered]);

  return (
    <section className="section section-alt" id="testimoni">
      <div className="section-inner">
        <SectionHeader
          eyebrow={tmCopy.kicker[lang]}
          title={tmCopy.headline[lang]}
          center
        />
      </div>

      <div
        className="testimonials-scroll"
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="testimonials-track">
          {ITEMS.map((t, i) => (
            <TiltCard key={i}>
              <motion.div
                className="testimonial-card glass"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (i % testimonials.length) * 0.06 }}
              >
                <div className="testimonial-stars">
                  {'★'.repeat(Math.floor(t.stars))}
                </div>
                <p className="testimonial-quote">"{t.quote[lang]}"</p>
                <div className="testimonial-author">
                  <div
                    className="testimonial-avatar"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">
                      {t.role[lang]} · {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePerformance } from '../../context/PerformanceContext';

function Particles({ count = 10 }) {
  const dots = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 90}%`,
        size: 3 + Math.random() * 5,
        delay: (Math.random() * 6).toFixed(2),
        dur: (4 + Math.random() * 4).toFixed(2),
      });
    }
    return arr;
  }, [count]);

  return (
    <div className="plx-particles" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="plx-particle"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

function AnimatedLines() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`plx-anim-lines${visible ? ' is-visible' : ''}`}
      aria-hidden="true"
    >
      <span className="plx-anim-line plx-anim-line-l" />
      <span className="plx-anim-line plx-anim-line-r" />
    </div>
  );
}

function DividerCounter({ value, suffix = '', label }) {
  return (
    <div className="plx-counter">
      <span className="plx-counter-value">{value}{suffix}</span>
      {label && <span className="plx-counter-label">{label}</span>}
    </div>
  );
}

export default function ParallaxDivider({
  image,
  overlayOpacity = 0.5,
  label,
  speed = 0.25,
  height = 380,
  zoom = true,
  grayscale = false,
  particles = false,
  animatedLines = false,
  counter = null,
  waveOverlap = false,
}) {
  const ref = useRef(null);
  const performanceMode = usePerformance();
  const isHigh = performanceMode === 'high';
  const isMedium = performanceMode === 'medium';

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed * 100}%`, `${speed * 100}%`],
  );

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);

  const grayValue = useTransform(scrollYProgress, [0.05, 0.55], [100, 0]);
  const filterStr = useTransform(grayValue, (v) => `grayscale(${v}%)`);

  const labelOpacity = useTransform(scrollYProgress, [0.18, 0.42], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.18, 0.42], [28, 0]);

  const bgMotionStyle = isHigh
    ? {
        backgroundImage: `url(${image})`,
        y: bgY,
        ...(zoom ? { scale: bgScale } : {}),
        ...(grayscale ? { filter: filterStr } : {}),
      }
    : { backgroundImage: `url(${image})` };

  return (
    <div
      ref={ref}
      className={`parallax-divider${waveOverlap ? ' plx-wave' : ''}`}
      style={{ height }}
      aria-hidden="true"
    >
      {isHigh ? (
        <motion.div className="parallax-divider-bg" style={bgMotionStyle} />
      ) : (
        <div
          className="parallax-divider-bg"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      <div
        className="parallax-divider-overlay"
        style={{ opacity: overlayOpacity }}
      />

      <div className="parallax-divider-edge parallax-divider-edge-left" />
      <div className="parallax-divider-edge parallax-divider-edge-right" />

      {particles && isHigh && <Particles count={10} />}

      {animatedLines && isHigh && <AnimatedLines />}

      <div className="plx-content">
        {label && (
          isHigh ? (
            <motion.div
              className="parallax-divider-label"
              style={{ opacity: labelOpacity, y: labelY }}
            >
              <span className="parallax-divider-label-line" />
              <span className="parallax-divider-label-text">{label}</span>
              <span className="parallax-divider-label-line" />
            </motion.div>
          ) : (
            <div className="parallax-divider-label">
              <span className="parallax-divider-label-line" />
              <span className="parallax-divider-label-text">{label}</span>
              <span className="parallax-divider-label-line" />
            </div>
          )
        )}

        {counter && (isHigh || isMedium) && (
          <DividerCounter
            value={counter.value}
            suffix={counter.suffix}
            label={counter.label}
          />
        )}
      </div>
    </div>
  );
}

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePerformance } from '../../context/PerformanceContext';

export default function MagneticButton({ children, strength = 0.35, className = '', block = false }) {
  const ref = useRef(null);
  const performanceMode = usePerformance();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22, restDelta: 0.1 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, restDelta: 0.1 });

  const handleMouseMove = (e) => {
    if (performanceMode === 'low') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`magnetic-wrapper${className ? ' ' + className : ''}`}
      style={{ display: block ? 'block' : 'inline-block', width: block ? '100%' : undefined, x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor
    >
      {children}
    </motion.div>
  );
}

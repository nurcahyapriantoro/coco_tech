import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePerformance } from '../../context/PerformanceContext';

export default function CustomCursor() {
  const performanceMode = usePerformance();
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const dotX = useSpring(mouseX, { stiffness: 700, damping: 35, restDelta: 0.5 });
  const dotY = useSpring(mouseY, { stiffness: 700, damping: 35, restDelta: 0.5 });

  const ringX = useSpring(mouseX, { stiffness: 220, damping: 26, restDelta: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 26, restDelta: 0.5 });

  useEffect(() => {
    if (performanceMode === 'low') return;

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e) => {
      const interactive = e.target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor], .magnetic-wrapper'
      );
      setIsHovering(!!interactive);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);
    document.documentElement.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      document.documentElement.removeEventListener('mouseenter', handleEnter);
    };
  }, [performanceMode, mouseX, mouseY, visible]);

  if (performanceMode === 'low') return null;

  return (
    <>
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 1.7 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ scale: { type: 'spring', stiffness: 350, damping: 25 }, opacity: { duration: 0.15 } }}
      />
      <motion.div
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ scale: { duration: 0.15 }, opacity: { duration: 0.1 } }}
      />
    </>
  );
}

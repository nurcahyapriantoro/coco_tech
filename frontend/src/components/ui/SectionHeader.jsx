import { motion } from 'framer-motion';

const WORD_VARIANTS = {
  hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.055 },
  }),
};

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};

function AnimatedWords({ text, startIdx = 0 }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={startIdx + i}
          variants={WORD_VARIANTS}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export default function SectionHeader({ eyebrow, title, subtitle, center = false }) {
  return (
    <motion.div
      className={`section-head${center ? ' center' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={CONTAINER_VARIANTS}
    >
      {eyebrow && (
        <motion.div
          className="eyebrow"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          <span className="eyebrow-dot" />
          {eyebrow}
        </motion.div>
      )}

      {title && (
        <h2 className="section-title">
          <AnimatedWords text={title} startIdx={0} />
        </h2>
      )}

      {subtitle && (
        <motion.p
          className="section-subtitle"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
            },
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

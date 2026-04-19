import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import { useData } from '../context/DataContext';

export default function FAQSection({ lang }) {
  const { copy: copywriting } = useData();
  const { faq } = copywriting;
  const [open, setOpen] = useState(null);

  return (
    <section className="section section-alt" id="faq">
      <div className="section-inner" style={{ maxWidth: 760 }}>
        <SectionHeader
          eyebrow={faq.kicker[lang]}
          title={faq.headline[lang]}
          center
        />
        <div className="faq-list">
          {faq.items.map((item, i) => (
            <div
              key={i}
              className={`faq-item${open === i ? ' open' : ''}`}
              onClick={() => setOpen(open === i ? null : i)}
              style={{ cursor: 'pointer' }}
            >
              <div className="faq-question">
                {item.q[lang]}
                <span className="faq-icon">{open === i ? '−' : '+'}</span>
              </div>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="faq-answer"
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="faq-answer-inner">{item.a[lang]}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

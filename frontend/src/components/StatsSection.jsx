import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import OdometerNumber from './ui/OdometerNumber';
import { useData } from '../context/DataContext';

export default function StatsSection({ lang }) {
  const { copy: copywriting } = useData();
  const { stats } = copywriting;

  return (
    <section className="section section-alt" id="stats">
      <div className="section-inner">
        <SectionHeader
          eyebrow={stats.kicker[lang]}
          title={stats.headline[lang]}
          center
        />
        <div className="bento-grid">
          {stats.items.map((item, i) => (
            <motion.div
              key={i}
              className="bento-card glass"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <div className="bento-watermark" aria-hidden="true">
                {item.value}{item.suffix}
              </div>

              <div className="bento-value">
                <OdometerNumber
                  to={item.value}
                  value={item.value}
                  decimals={item.decimals || 0}
                  suffix={item.suffix}
                />
              </div>
              <div className="bento-label">{item.label[lang]}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

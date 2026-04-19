import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import { useData } from '../context/DataContext';

export default function AwardsSection({ lang }) {
  const { copy: copywriting, awards } = useData();
  const { awards: awardsCopy } = copywriting;

  return (
    <section className="section section-alt" id="awards">
      <div className="section-inner">
        <SectionHeader
          eyebrow={awardsCopy.kicker[lang]}
          title={awardsCopy.headline[lang]}
          center
        />
        <div className="awards-grid">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              className="award-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              whileHover={{ y: -4 }}
            >
              <div className="award-icon" style={{ color: award.color }}>{award.icon}</div>
              <div className="award-year">{award.year}</div>
              <h3 className="award-title">{award.title[lang]}</h3>
              <p className="award-org">{award.org[lang]}</p>
              <p className="award-desc">{award.desc[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

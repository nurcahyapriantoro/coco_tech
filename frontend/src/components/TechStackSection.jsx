import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import { useData } from '../context/DataContext';

export default function TechStackSection({ lang }) {
  const { copy: copywriting, skills } = useData();
  const { techStack } = copywriting;

  return (
    <section className="section" id="techstack">
      <div className="section-inner">
        <SectionHeader
          eyebrow={techStack.kicker[lang]}
          title={techStack.headline[lang]}
          center
        />
        <div className="tech-grid">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              className="tech-card glass"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <div className="tech-card-header">
                <span style={{ fontSize: 20 }}>{skill.icon}</span>
                <span className="tech-category" style={{ color: skill.color }}>
                  {skill.category[lang]}
                </span>
              </div>
              <div className="tech-chips">
                {skill.items.map((item) => (
                  <span key={item} className="tech-chip">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

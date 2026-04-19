import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import { useData } from '../context/DataContext';
import LogoBankIndonesia from './logos/LogoBankIndonesia';
import LogoPolkadot from './logos/LogoPolkadot';
import LogoGoogle from './logos/LogoGoogle';
import LogoIndosat from './logos/LogoIndosat';

const LOGOS = {
  'Bank Indonesia': <LogoBankIndonesia size={32} />,
  'Polkadot Blockchain Academy': <LogoPolkadot size={32} />,
  'Bangkit Academy (Google)': <LogoGoogle size={32} />,
  'Indosat Digital Camp': <LogoIndosat size={32} />,
};

export default function ExperienceSection({ lang }) {
  const { copy: copywriting, experience } = useData();
  const { experience: expCopy } = copywriting;

  return (
    <section className="section section-alt" id="experience">
      <div className="section-inner" style={{ maxWidth: 760 }}>
        <SectionHeader
          eyebrow={expCopy.kicker[lang]}
          title={expCopy.headline[lang]}
        />

        <div className="exp-timeline">
          {experience.map((exp, i) => {
            const isLast = i === experience.length - 1;
            return (
              <motion.div
                key={i}
                className="exp-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              >
                <div className="exp-left">
                  <div className="exp-logo">
                    {LOGOS[exp.org] || (
                      <span style={{ fontSize: 12, fontWeight: 700, color: exp.color }}>
                        {exp.logo}
                      </span>
                    )}
                  </div>
                  {!isLast && (
                    <motion.div
                      className="exp-connector"
                      initial={{ scaleY: 0, transformOrigin: 'top' }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                    />
                  )}
                </div>
                <div className="exp-content">
                  <p className="exp-role">{exp.role[lang]}</p>
                  <p className="exp-org">{exp.org}</p>
                  <p className="exp-period">{exp.period[lang]}</p>
                  <p className="exp-desc">{exp.desc[lang]}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                    {exp.techs.map((tech) => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

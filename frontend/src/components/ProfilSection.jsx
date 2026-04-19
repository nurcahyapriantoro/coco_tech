import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from './ui/SectionHeader';
import { useData } from '../context/DataContext';

export default function ProfilSection({ lang }) {
  const { copy: copywriting } = useData();
  const { profil } = copywriting;
  const photoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const highlights = [
    { val: '4+', suffix: '', label: lang === 'id' ? 'Tahun Pengalaman' : 'Years Experience' },
    { val: '25', suffix: '', label: lang === 'id' ? 'Proyek Selesai' : 'Projects Done' },
    { val: '12', suffix: '', label: lang === 'id' ? 'Sertifikasi Bergengsi' : 'Prestige Certs' },
  ];

  const bioLines = profil.bio[lang].split('. ').filter(Boolean);

  return (
    <section className="section" id="tentang">
      <div className="section-inner">
        <div className="profil-layout">
          <motion.div
            className="profil-photo-wrap"
            ref={photoRef}
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div className="profil-photo-frame" style={{ y }}>
              <img src="/profilepicture.png" alt={profil.name} />
            </motion.div>
            <div className="profil-photo-badge">
              <div className="profil-photo-badge-text">{profil.name}</div>
              <div className="profil-photo-badge-sub">
                {lang === 'id' ? 'Founder, CocoTech' : 'Founder, CocoTech'}
              </div>
            </div>
          </motion.div>

          <div>
            <SectionHeader
              eyebrow={profil.kicker[lang]}
              title={profil.headline[lang]}
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {bioLines.map((line, i) => (
                <motion.p
                  key={i}
                  className="profil-bio-line"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {line}{i < bioLines.length - 1 ? '.' : ''}
                </motion.p>
              ))}
            </motion.div>

            <div className="profil-highlight">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  className="profil-highlight-item"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="profil-highlight-val">
                    {h.val}<span>{h.suffix}</span>
                  </div>
                  <div className="profil-highlight-label">{h.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import LogoBankIndonesia from './logos/LogoBankIndonesia';
import LogoPolkadot from './logos/LogoPolkadot';
import LogoGoogle from './logos/LogoGoogle';
import LogoIndosat from './logos/LogoIndosat';

const ITEMS = [
  { logo: <LogoBankIndonesia size={28} />, name: 'Bank Indonesia' },
  { logo: <LogoPolkadot size={28} />,     name: 'Polkadot' },
  { logo: <LogoGoogle size={28} />,       name: 'Google Bangkit' },
  { logo: <LogoIndosat size={28} />,      name: 'IDCamp' },
  { logo: <LogoBankIndonesia size={28} />, name: 'Bank Indonesia' },
  { logo: <LogoPolkadot size={28} />,     name: 'Polkadot' },
  { logo: <LogoGoogle size={28} />,       name: 'Google Bangkit Academy' },
  { logo: <LogoIndosat size={28} />,      name: 'IDCamp' },
];

export default function SocialProofBar({ lang }) {
  return (
    <motion.section
      className="social-proof"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="social-proof-label">
        {lang === 'id' ? 'Dipercaya & Berkolaborasi Dengan' : 'Trusted & Collaborated With'}
      </p>
      <div style={{ overflow: 'hidden' }}>
        <div className="marquee-track">
          {ITEMS.map((item, i) => (
            <div key={i} className="marquee-item">
              <span style={{ width: 28, height: 28, display: 'flex', alignItems: 'center' }}>
                {item.logo}
              </span>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

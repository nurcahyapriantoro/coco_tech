import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import MagneticButton from './ui/MagneticButton';
import { useData } from '../context/DataContext';

export default function PaketSection({ lang }) {
  const { copy: copywriting } = useData();
  const { paket } = copywriting;

  return (
    <section className="section" id="harga">
      <div className="section-inner">
        <SectionHeader
          eyebrow={paket.kicker[lang]}
          title={paket.headline[lang]}
          subtitle={paket.sub[lang]}
          center
        />
        <div className="pricing-grid">
          {paket.tiers.map((tier, i) => (
            <motion.div
              key={i}
              className={`pricing-card glass${tier.popular ? ' featured' : ''}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: tier.popular ? -8 : 0 }}
              whileHover={{ y: tier.popular ? -14 : -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              {tier.popular && (
                <div className="pricing-shimmer-wrap" aria-hidden="true">
                  <div className="pricing-shimmer" />
                </div>
              )}

              {tier.popular && (
                <div className="pricing-badge-row">
                  <span className="pricing-badge">{paket.popular[lang]}</span>
                </div>
              )}

              <div className="pricing-tier">
                <div className="pricing-name">{tier.name[lang]}</div>
              </div>
              <div className="pricing-price">{tier.price}</div>
              <div className="pricing-price-note">{tier.priceSub[lang]}</div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                {tier.features[lang].map((feature, j) => (
                  <li key={j} className="pricing-feature">
                    <span className="pricing-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <MagneticButton block>
                <a
                  href={`https://wa.me/6281283321577?text=${encodeURIComponent(
                    lang === 'id'
                      ? `Halo, saya tertarik dengan paket ${tier.name.id}.`
                      : `Hi, I'm interested in the ${tier.name.en} plan.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pricing-cta"
                >
                  {paket.cta[lang]}
                </a>
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import MagneticButton from './ui/MagneticButton';
import { useData } from '../context/DataContext';

export default function KontakSection({ lang }) {
  const { copy: copywriting } = useData();
  const { kontak } = copywriting;
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;

    const text = encodeURIComponent(
      [
        `Halo, saya ${form.name}.`,
        form.email ? `Email: ${form.email}` : null,
        form.phone ? `WhatsApp: ${form.phone}` : null,
        '',
        form.message,
      ].filter(Boolean).join('\n')
    );

    window.open(`https://wa.me/6281283321577?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section" id="kontak">
      <div className="section-inner">
        <SectionHeader
          eyebrow={kontak.kicker[lang]}
          title={kontak.headline[lang]}
          subtitle={kontak.sub[lang]}
          center
        />
        <div className="contact-layout">
          <div className="contact-info-items">
            <div className="contact-info-item">
              <div className="contact-info-icon">💬</div>
              <div>
                <div className="contact-info-label">{kontak.wa.label[lang]}</div>
                <a
                  href="https://wa.me/6281283321577"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-value"
                >
                  +62 812 8332 1577
                </a>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">✉️</div>
              <div>
                <div className="contact-info-label">Email</div>
                <a
                  href="mailto:admin@cocotech.studio"
                  className="contact-info-value"
                >
                  admin@cocotech.studio
                </a>
              </div>
            </div>
          </div>

          <motion.form
            key="form"
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">{kontak.form.name[lang]}</label>
                <input
                  className="form-input"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={kontak.form.name[lang]}
                  required
                />
              </div>
              <div className="form-field">
                <label className="form-label">{kontak.form.email[lang]}</label>
                <input
                  className="form-input"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={kontak.form.email[lang]}
                />
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">{kontak.form.phone[lang]}</label>
              <input
                className="form-input"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder={kontak.form.phone[lang]}
              />
            </div>
            <div className="form-field">
              <label className="form-label">
                {lang === 'id' ? 'Pesan' : 'Message'}
              </label>
              <textarea
                className="form-input"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={kontak.form.message[lang]}
                required
                style={{ resize: 'vertical', minHeight: 120 }}
              />
            </div>
            <MagneticButton>
              <button type="submit" className="form-submit btn-primary">
                {kontak.form.submit[lang]}
              </button>
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { api } from '../api';

const COPY_DEFAULT = {"nav":{"brand":"CocoTech","links":{"id":["Beranda","Layanan","Portofolio","Profil","Paket","Kontak"],"en":["Home","Services","Portfolio","Profile","Pricing","Contact"]},"cta":{"id":"Hubungi Kami","en":"Contact Us"}},"hero":{"kicker":{"id":"Data Engineer & AI Specialist · Founder, CocoTech","en":"Data Engineer & AI Specialist · Founder, CocoTech"},"headline":{"id":["UMKM Tanpa Website Itu Invisible.","Kami Buat Bisnis Anda Ditemukan."],"en":["SMEs Without a Website Are Invisible.","We Make Your Business Discoverable."]},"sub":{"id":"Jasa website profesional untuk UMKM dan pemilik bisnis yang ingin ditemukan pelanggan online.","en":"Professional website services for SMEs and business owners who want to be found online."},"cta":{"id":"Konsultasi Gratis →","en":"Free Consultation →"},"ctaSec":{"id":"Lihat Portofolio","en":"View Portfolio"}},"socialProof":{"items":{"id":["25+ Proyek Selesai","25+ Klien Puas","4.9★ Rating Rata-Rata","4+ Tahun Pengalaman"],"en":["25+ Projects Delivered","25+ Happy Clients","4.9★ Average Rating","4+ Years Experience"]}},"stats":{"kicker":{"id":"Angka Berbicara","en":"Numbers Speak"},"headline":{"id":"Track Record yang Terbukti","en":"A Proven Track Record"},"items":[{"value":25,"suffix":"+","label":{"id":"Proyek Selesai","en":"Projects Delivered"}},{"value":25,"suffix":"+","label":{"id":"Klien Puas","en":"Happy Clients"}},{"value":99,"suffix":"%","label":{"id":"Tepat Waktu","en":"On-Time Delivery"}},{"value":4.9,"suffix":"★","label":{"id":"Rating Rata-Rata","en":"Average Rating"},"decimals":1}]},"profil":{"kicker":{"id":"Tentang Founder","en":"About the Founder"},"headline":{"id":"Dibangun oleh Seseorang yang Tahu Cara Kerja Sistem Besar dari Dalam","en":"Built by Someone Who Knows How Large Systems Work from the Inside"},"name":"Nurcahya Priantoro","title":{"id":"Data Engineer & AI Specialist · Founder, CocoTech","en":"Data Engineer & AI Specialist · Founder, CocoTech"},"bio":{"id":"Data Engineer Intern di Bank Indonesia, alumni Polkadot Blockchain Academy Wave 3, dan lulusan Google Bangkit Academy.","en":"Data Engineer Intern at Bank Indonesia, Polkadot Blockchain Academy Wave 3 alumni, and Google Bangkit Academy graduate."},"education":{"id":"IPB University · S1 Ilmu Komputer · 2022–2026","en":"IPB University · B.Sc. Computer Science · 2022–2026"},"email":"nurcahya.priantoro@apps.ipb.ac.id","phone":"+6281283321577","linkedin":"https://linkedin.com/in/nurcahya-priantoro","github":"https://github.com/nurcahyapriantoro","instagram":"https://www.instagram.com/nurcahyapriantoro"},"kontak":{"kicker":{"id":"Hubungi Kami","en":"Contact Us"},"headline":{"id":"Ambil Langkah Pertama — Gratis, Tanpa Komitmen","en":"Take the First Step — Free, No Commitment"},"sub":{"id":"Ceritakan masalah bisnis Anda. Kami akan analisis dan kasih rekomendasi — gratis.","en":"Tell us about your business problem. We'll analyze it and give recommendations — free."},"wa":{"label":{"id":"Chat WhatsApp Langsung","en":"Direct WhatsApp Chat"},"number":"+6281283321577"}},"footer":{"tagline":{"id":"Membangun sistem digital yang bikin orang percaya.","en":"Building digital systems that make people trust."},"copyright":"© 2025 CocoTech. All rights reserved."}};

function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg text-white text-sm shadow-lg ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
      {msg}
    </div>
  );
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

const inputCls = 'w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#0071E3] transition-colors';
const taCls = inputCls + ' resize-y min-h-[70px]';

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-gray-500 text-xs mb-1">{label}</label>
      {children}
    </div>
  );
}

function SectionCard({ title, children, onSave, saving }) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden mb-4">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <h3 className="text-white font-semibold text-sm">{title}</h3>
        <button
          onClick={onSave}
          disabled={saving}
          className="bg-[#0071E3] hover:bg-blue-600 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
        >
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
      <div className="p-5 space-y-3">{children}</div>
    </div>
  );
}

export default function Settings() {
  const [copy, setCopy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState('');
  const [toast, setToast] = useState({ msg: '', type: 'success' });
  const [activeTab, setActiveTab] = useState('hero');

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3000);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get('/settings/copywriting');
        const data = res.data || res;
        if (data && Object.keys(data).length > 0) {
          setCopy(deepMerge(COPY_DEFAULT, data));
        } else {
          setCopy(null);
        }
      } catch {
        setCopy(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const initDefault = () => setCopy(JSON.parse(JSON.stringify(COPY_DEFAULT)));

  const set = (path, val) => {
    setCopy((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = val;
      return next;
    });
  };

  const saveSection = async (section) => {
    setSavingSection(section);
    try {
      await api.put('/settings/copywriting', copy);
      showToast('Tersimpan!');
    } catch {
      showToast('Gagal menyimpan', 'error');
    } finally {
      setSavingSection('');
    }
  };

  const TABS = [
    { key: 'hero', label: 'Hero' },
    { key: 'social', label: 'Social Proof' },
    { key: 'stats', label: 'Stats' },
    { key: 'profil', label: 'Profil' },
    { key: 'kontak', label: 'Kontak' },
    { key: 'footer', label: 'Footer' },
    { key: 'nav', label: 'Nav' },
  ];

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Memuat copywriting...</div>
    );
  }

  if (!copy) {
    return (
      <div className="p-8">
        <Toast msg={toast.msg} type={toast.type} />
        <div className="max-w-lg mx-auto text-center py-20">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-white text-xl font-bold mb-2">Belum Ada Copywriting</h2>
          <p className="text-gray-500 text-sm mb-6">API mengembalikan data kosong. Inisialisasi dengan nilai default untuk mulai mengedit.</p>
          <button
            onClick={initDefault}
            className="bg-[#0071E3] hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg transition-colors"
          >
            Initialize dari Default
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Toast msg={toast.msg} type={toast.type} />
      <div className="mb-6">
        <h1 className="text-white text-xl font-bold">⚙️ Copywriting & Teks Website</h1>
        <p className="text-gray-500 text-sm mt-0.5">Edit semua teks website dalam satu halaman.</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeTab === tab.key
                ? 'bg-[#0071E3] text-white'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'hero' && (
        <SectionCard title="Hero Section" onSave={() => saveSection('hero')} saving={savingSection === 'hero'}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kicker (ID)">
              <input className={inputCls} value={copy.hero.kicker.id} onChange={(e) => set('hero.kicker.id', e.target.value)} />
            </Field>
            <Field label="Kicker (EN)">
              <input className={inputCls} value={copy.hero.kicker.en} onChange={(e) => set('hero.kicker.en', e.target.value)} />
            </Field>
          </div>
          <Field label="Headline Baris 1 (ID)">
            <input className={inputCls} value={copy.hero.headline.id[0]} onChange={(e) => set('hero.headline.id', [e.target.value, copy.hero.headline.id[1]])} />
          </Field>
          <Field label="Headline Baris 2 (ID)">
            <input className={inputCls} value={copy.hero.headline.id[1]} onChange={(e) => set('hero.headline.id', [copy.hero.headline.id[0], e.target.value])} />
          </Field>
          <Field label="Headline Baris 1 (EN)">
            <input className={inputCls} value={copy.hero.headline.en[0]} onChange={(e) => set('hero.headline.en', [e.target.value, copy.hero.headline.en[1]])} />
          </Field>
          <Field label="Headline Baris 2 (EN)">
            <input className={inputCls} value={copy.hero.headline.en[1]} onChange={(e) => set('hero.headline.en', [copy.hero.headline.en[0], e.target.value])} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Sub (ID)">
              <textarea className={taCls} value={copy.hero.sub.id} onChange={(e) => set('hero.sub.id', e.target.value)} />
            </Field>
            <Field label="Sub (EN)">
              <textarea className={taCls} value={copy.hero.sub.en} onChange={(e) => set('hero.sub.en', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="CTA Utama (ID)">
              <input className={inputCls} value={copy.hero.cta.id} onChange={(e) => set('hero.cta.id', e.target.value)} />
            </Field>
            <Field label="CTA Utama (EN)">
              <input className={inputCls} value={copy.hero.cta.en} onChange={(e) => set('hero.cta.en', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="CTA Sekunder (ID)">
              <input className={inputCls} value={copy.hero.ctaSec.id} onChange={(e) => set('hero.ctaSec.id', e.target.value)} />
            </Field>
            <Field label="CTA Sekunder (EN)">
              <input className={inputCls} value={copy.hero.ctaSec.en} onChange={(e) => set('hero.ctaSec.en', e.target.value)} />
            </Field>
          </div>
        </SectionCard>
      )}

      {activeTab === 'social' && (
        <SectionCard title="Social Proof" onSave={() => saveSection('social')} saving={savingSection === 'social'}>
          <p className="text-gray-500 text-xs mb-2">Satu item per baris</p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Items (ID)">
              <textarea
                className={taCls + ' min-h-[120px]'}
                value={(copy.socialProof.items.id || []).join('\n')}
                onChange={(e) => set('socialProof.items.id', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
              />
            </Field>
            <Field label="Items (EN)">
              <textarea
                className={taCls + ' min-h-[120px]'}
                value={(copy.socialProof.items.en || []).join('\n')}
                onChange={(e) => set('socialProof.items.en', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
              />
            </Field>
          </div>
        </SectionCard>
      )}

      {activeTab === 'stats' && (
        <SectionCard title="Stats Section" onSave={() => saveSection('stats')} saving={savingSection === 'stats'}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kicker (ID)">
              <input className={inputCls} value={copy.stats.kicker.id} onChange={(e) => set('stats.kicker.id', e.target.value)} />
            </Field>
            <Field label="Kicker (EN)">
              <input className={inputCls} value={copy.stats.kicker.en} onChange={(e) => set('stats.kicker.en', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Headline (ID)">
              <input className={inputCls} value={copy.stats.headline.id} onChange={(e) => set('stats.headline.id', e.target.value)} />
            </Field>
            <Field label="Headline (EN)">
              <input className={inputCls} value={copy.stats.headline.en} onChange={(e) => set('stats.headline.en', e.target.value)} />
            </Field>
          </div>
          <div className="mt-2">
            <p className="text-gray-500 text-xs mb-3">Stat Items</p>
            {(copy.stats.items || []).map((item, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-white/5 rounded-lg p-3 mb-2">
                <div className="grid grid-cols-4 gap-2 mb-2">
                  <Field label="Value">
                    <input type="number" className={inputCls} value={item.value}
                      onChange={(e) => {
                        const next = [...copy.stats.items];
                        next[idx] = { ...next[idx], value: parseFloat(e.target.value) };
                        set('stats.items', next);
                      }}
                    />
                  </Field>
                  <Field label="Suffix">
                    <input className={inputCls} value={item.suffix}
                      onChange={(e) => {
                        const next = [...copy.stats.items];
                        next[idx] = { ...next[idx], suffix: e.target.value };
                        set('stats.items', next);
                      }}
                    />
                  </Field>
                  <Field label="Label (ID)">
                    <input className={inputCls} value={item.label.id}
                      onChange={(e) => {
                        const next = [...copy.stats.items];
                        next[idx] = { ...next[idx], label: { ...next[idx].label, id: e.target.value } };
                        set('stats.items', next);
                      }}
                    />
                  </Field>
                  <Field label="Label (EN)">
                    <input className={inputCls} value={item.label.en}
                      onChange={(e) => {
                        const next = [...copy.stats.items];
                        next[idx] = { ...next[idx], label: { ...next[idx].label, en: e.target.value } };
                        set('stats.items', next);
                      }}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {activeTab === 'profil' && (
        <SectionCard title="Profil / About" onSave={() => saveSection('profil')} saving={savingSection === 'profil'}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kicker (ID)">
              <input className={inputCls} value={copy.profil.kicker.id} onChange={(e) => set('profil.kicker.id', e.target.value)} />
            </Field>
            <Field label="Kicker (EN)">
              <input className={inputCls} value={copy.profil.kicker.en} onChange={(e) => set('profil.kicker.en', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Headline (ID)">
              <textarea className={taCls} value={copy.profil.headline.id} onChange={(e) => set('profil.headline.id', e.target.value)} />
            </Field>
            <Field label="Headline (EN)">
              <textarea className={taCls} value={copy.profil.headline.en} onChange={(e) => set('profil.headline.en', e.target.value)} />
            </Field>
          </div>
          <Field label="Nama">
            <input className={inputCls} value={copy.profil.name} onChange={(e) => set('profil.name', e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Title (ID)">
              <input className={inputCls} value={copy.profil.title.id} onChange={(e) => set('profil.title.id', e.target.value)} />
            </Field>
            <Field label="Title (EN)">
              <input className={inputCls} value={copy.profil.title.en} onChange={(e) => set('profil.title.en', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Bio (ID)">
              <textarea className={taCls} value={copy.profil.bio.id} onChange={(e) => set('profil.bio.id', e.target.value)} />
            </Field>
            <Field label="Bio (EN)">
              <textarea className={taCls} value={copy.profil.bio.en} onChange={(e) => set('profil.bio.en', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Education (ID)">
              <input className={inputCls} value={copy.profil.education.id} onChange={(e) => set('profil.education.id', e.target.value)} />
            </Field>
            <Field label="Education (EN)">
              <input className={inputCls} value={copy.profil.education.en} onChange={(e) => set('profil.education.en', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Email">
              <input type="email" className={inputCls} value={copy.profil.email} onChange={(e) => set('profil.email', e.target.value)} />
            </Field>
            <Field label="Phone">
              <input className={inputCls} value={copy.profil.phone} onChange={(e) => set('profil.phone', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="LinkedIn">
              <input className={inputCls} value={copy.profil.linkedin} onChange={(e) => set('profil.linkedin', e.target.value)} />
            </Field>
            <Field label="GitHub">
              <input className={inputCls} value={copy.profil.github} onChange={(e) => set('profil.github', e.target.value)} />
            </Field>
            <Field label="Instagram">
              <input className={inputCls} value={copy.profil.instagram} onChange={(e) => set('profil.instagram', e.target.value)} />
            </Field>
          </div>
        </SectionCard>
      )}

      {activeTab === 'kontak' && (
        <SectionCard title="Kontak / Contact" onSave={() => saveSection('kontak')} saving={savingSection === 'kontak'}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kicker (ID)">
              <input className={inputCls} value={copy.kontak.kicker.id} onChange={(e) => set('kontak.kicker.id', e.target.value)} />
            </Field>
            <Field label="Kicker (EN)">
              <input className={inputCls} value={copy.kontak.kicker.en} onChange={(e) => set('kontak.kicker.en', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Headline (ID)">
              <textarea className={taCls} value={copy.kontak.headline.id} onChange={(e) => set('kontak.headline.id', e.target.value)} />
            </Field>
            <Field label="Headline (EN)">
              <textarea className={taCls} value={copy.kontak.headline.en} onChange={(e) => set('kontak.headline.en', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Sub (ID)">
              <textarea className={taCls} value={copy.kontak.sub.id} onChange={(e) => set('kontak.sub.id', e.target.value)} />
            </Field>
            <Field label="Sub (EN)">
              <textarea className={taCls} value={copy.kontak.sub.en} onChange={(e) => set('kontak.sub.en', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="WA Label (ID)">
              <input className={inputCls} value={copy.kontak.wa.label.id} onChange={(e) => set('kontak.wa.label.id', e.target.value)} />
            </Field>
            <Field label="WA Label (EN)">
              <input className={inputCls} value={copy.kontak.wa.label.en} onChange={(e) => set('kontak.wa.label.en', e.target.value)} />
            </Field>
          </div>
          <Field label="Nomor WhatsApp">
            <input className={inputCls} value={copy.kontak.wa.number} onChange={(e) => set('kontak.wa.number', e.target.value)} />
          </Field>
        </SectionCard>
      )}

      {activeTab === 'footer' && (
        <SectionCard title="Footer" onSave={() => saveSection('footer')} saving={savingSection === 'footer'}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tagline (ID)">
              <input className={inputCls} value={copy.footer.tagline.id} onChange={(e) => set('footer.tagline.id', e.target.value)} />
            </Field>
            <Field label="Tagline (EN)">
              <input className={inputCls} value={copy.footer.tagline.en} onChange={(e) => set('footer.tagline.en', e.target.value)} />
            </Field>
          </div>
          <Field label="Copyright">
            <input className={inputCls} value={copy.footer.copyright} onChange={(e) => set('footer.copyright', e.target.value)} />
          </Field>
        </SectionCard>
      )}

      {activeTab === 'nav' && (
        <SectionCard title="Navigasi" onSave={() => saveSection('nav')} saving={savingSection === 'nav'}>
          <Field label="Brand Name">
            <input className={inputCls} value={copy.nav.brand} onChange={(e) => set('nav.brand', e.target.value)} />
          </Field>
          <p className="text-gray-500 text-xs mt-1">Link navigasi — pisah dengan baris baru (urutan harus sama antara ID dan EN)</p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nav Links (ID)">
              <textarea
                className={taCls + ' min-h-[120px]'}
                value={(copy.nav.links.id || []).join('\n')}
                onChange={(e) => set('nav.links.id', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
              />
            </Field>
            <Field label="Nav Links (EN)">
              <textarea
                className={taCls + ' min-h-[120px]'}
                value={(copy.nav.links.en || []).join('\n')}
                onChange={(e) => set('nav.links.en', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="CTA (ID)">
              <input className={inputCls} value={copy.nav.cta.id} onChange={(e) => set('nav.cta.id', e.target.value)} />
            </Field>
            <Field label="CTA (EN)">
              <input className={inputCls} value={copy.nav.cta.en} onChange={(e) => set('nav.cta.en', e.target.value)} />
            </Field>
          </div>
        </SectionCard>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => saveSection('all')}
          disabled={!!savingSection}
          className="bg-[#0071E3] hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
        >
          {savingSection ? 'Menyimpan...' : '💾 Simpan Semua Perubahan'}
        </button>
      </div>
    </div>
  );
}

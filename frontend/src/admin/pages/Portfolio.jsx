import { useState, useEffect } from 'react';
import { api } from '../api';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Field, Toast, inputCls, taCls } from '../components/FormField';

const linesToArr = (s) => s.split('\n').map((l) => l.trim()).filter(Boolean);
const arrToLines = (a) => (Array.isArray(a) ? a.join('\n') : '');

const EMPTY = {
  slug: '', title: '', client: '', category: 'web', year: new Date().getFullYear(),
  github: '', liveUrl: '', images: '', desc: { id: '', en: '' }, techs: '',
  highlights: { id: '', en: '' },
};

function toForm(item) {
  if (!item) return EMPTY;
  return {
    slug: item.slug || '',
    title: item.title || '',
    client: item.client || '',
    category: item.category || 'web',
    year: item.year || new Date().getFullYear(),
    github: item.github || '',
    liveUrl: item.liveUrl || '',
    images: arrToLines(item.images),
    desc: { id: item.desc?.id || '', en: item.desc?.en || '' },
    techs: arrToLines(item.techs),
    highlights: { id: arrToLines(item.highlights?.id), en: arrToLines(item.highlights?.en) },
  };
}

function toPayload(f) {
  return {
    slug: f.slug,
    title: f.title,
    client: f.client,
    category: f.category,
    year: Number(f.year),
    github: f.github,
    liveUrl: f.liveUrl,
    images: linesToArr(f.images),
    desc: { id: f.desc.id, en: f.desc.en },
    techs: linesToArr(f.techs),
    highlights: { id: linesToArr(f.highlights.id), en: linesToArr(f.highlights.en) },
  };
}

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState({ msg: '', type: 'success' });
  const [saving, setSaving] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3000);
  };

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('/portfolio');
      setItems(Array.isArray(res) ? res : res.data || []);
    } catch { showToast('Gagal memuat data', 'error'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditItem(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (item) => { setEditItem(item); setForm(toForm(item)); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = toPayload(form);
      if (editItem) {
        // Always use the DB integer id for the API route
        await api.put(`/portfolio/${editItem.id}`, payload);
        showToast('Portfolio diperbarui');
      } else {
        await api.post('/portfolio', payload);
        showToast('Portfolio ditambahkan');
      }
      setModalOpen(false);
      load();
    } catch { showToast('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (item) => {
    try {
      await api.del(`/portfolio/${item.id}`);
      showToast('Portfolio dihapus');
      load();
    } catch { showToast('Gagal menghapus', 'error'); }
  };

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setNested = (parent, key, val) => setForm((f) => ({ ...f, [parent]: { ...f[parent], [key]: val } }));

  return (
    <div className="p-8">
      <Toast msg={toast.msg} type={toast.type} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-bold">Portfolio</h1>
          <p className="text-gray-500 text-sm mt-0.5">{items.length} proyek</p>
        </div>
        <button onClick={openAdd} className="bg-[#0071E3] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          + Tambah Proyek
        </button>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Belum ada portfolio. Tambah yang pertama!</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">JUDUL</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">KLIEN</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">KATEGORI</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">TAHUN</th>
                <th className="text-right text-gray-500 text-xs font-medium px-4 py-3">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id || i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white text-sm font-medium">{item.title}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{item.client}</td>
                  <td className="px-4 py-3">
                    <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-full">{item.category}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{item.year}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(item)} className="text-gray-400 hover:text-white text-sm mr-3 transition-colors">Edit</button>
                    <button onClick={() => setDeleteTarget(item)} className="text-red-500 hover:text-red-400 text-sm transition-colors">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Portfolio' : 'Tambah Portfolio'} size="xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug (URL identifier)">
              <input className={inputCls} value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="my-project" />
            </Field>
            <Field label="Judul">
              <input className={inputCls} value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Nama Proyek" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Klien">
              <input className={inputCls} value={form.client} onChange={(e) => set('client', e.target.value)} placeholder="Nama klien" />
            </Field>
            <Field label="Kategori">
              <select className={inputCls} value={form.category} onChange={(e) => set('category', e.target.value)}>
                <option value="web">Web</option>
                <option value="data">Data</option>
                <option value="blockchain">Blockchain</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tahun">
              <input type="number" className={inputCls} value={form.year} onChange={(e) => set('year', e.target.value)} />
            </Field>
            <Field label="GitHub URL">
              <input className={inputCls} value={form.github} onChange={(e) => set('github', e.target.value)} placeholder="https://github.com/..." />
            </Field>
          </div>
          <Field label="Live URL (opsional)">
            <input className={inputCls} value={form.liveUrl} onChange={(e) => set('liveUrl', e.target.value)} placeholder="https://..." />
          </Field>
          <Field label="Gambar (satu URL per baris)">
            <textarea className={taCls} value={form.images} onChange={(e) => set('images', e.target.value)} placeholder="https://..." />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Deskripsi (ID)">
              <textarea className={taCls} value={form.desc.id} onChange={(e) => setNested('desc', 'id', e.target.value)} />
            </Field>
            <Field label="Deskripsi (EN)">
              <textarea className={taCls} value={form.desc.en} onChange={(e) => setNested('desc', 'en', e.target.value)} />
            </Field>
          </div>
          <Field label="Teknologi (satu per baris)">
            <textarea className={taCls} value={form.techs} onChange={(e) => set('techs', e.target.value)} placeholder="React&#10;Node.js&#10;PostgreSQL" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Highlights (ID) — satu per baris">
              <textarea className={taCls} value={form.highlights.id} onChange={(e) => setNested('highlights', 'id', e.target.value)} />
            </Field>
            <Field label="Highlights (EN) — satu per baris">
              <textarea className={taCls} value={form.highlights.en} onChange={(e) => setNested('highlights', 'en', e.target.value)} />
            </Field>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">Batal</button>
            <button onClick={handleSave} disabled={saving} className="bg-[#0071E3] hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors">
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => handleDelete(deleteTarget)}
        message={`Hapus proyek "${deleteTarget?.title}"?`}
      />
    </div>
  );
}

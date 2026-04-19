import { useState, useEffect } from 'react';
import { api } from '../api';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Field, Toast, inputCls, taCls } from '../components/FormField';

const EMPTY = {
  name: '', company: '', initials: '', color: '#6366f1', stars: 5,
  role: { id: '', en: '' }, quote: { id: '', en: '' },
};

function toForm(item) {
  if (!item) return EMPTY;
  return {
    name: item.name || '',
    company: item.company || '',
    initials: item.initials || '',
    color: item.color || '#6366f1',
    stars: item.stars ?? 5,
    role: { id: item.role?.id || '', en: item.role?.en || '' },
    quote: { id: item.quote?.id || '', en: item.quote?.en || '' },
  };
}

export default function Testimonials() {
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
      const res = await api.get('/testimonials');
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
      const payload = { ...form, stars: Number(form.stars) };
      if (editItem) {
        await api.put(`/testimonials/${editItem.id}`, payload);
        showToast('Testimoni diperbarui');
      } else {
        await api.post('/testimonials', payload);
        showToast('Testimoni ditambahkan');
      }
      setModalOpen(false);
      load();
    } catch { showToast('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (item) => {
    try {
      await api.del(`/testimonials/${item.id}`);
      showToast('Dihapus');
      load();
    } catch { showToast('Gagal menghapus', 'error'); }
  };

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setNested = (parent, key, val) => setForm((f) => ({ ...f, [parent]: { ...f[parent], [key]: val } }));

  const renderStars = (stars) => '★'.repeat(Math.floor(stars)) + (stars % 1 >= 0.5 ? '½' : '');

  return (
    <div className="p-8">
      <Toast msg={toast.msg} type={toast.type} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-bold">💬 Testimoni</h1>
          <p className="text-gray-500 text-sm mt-0.5">{items.length} testimoni</p>
        </div>
        <button onClick={openAdd} className="bg-[#0071E3] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          + Tambah Testimoni
        </button>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Belum ada testimoni.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">NAMA</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">PERUSAHAAN</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">RATING</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">INISIAL</th>
                <th className="text-right text-gray-500 text-xs font-medium px-4 py-3">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id || i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white text-sm font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{item.company}</td>
                  <td className="px-4 py-3 text-yellow-400 text-sm">{item.stars}★</td>
                  <td className="px-4 py-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: item.color }}>
                      {item.initials}
                    </div>
                  </td>
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Testimoni' : 'Tambah Testimoni'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nama">
              <input className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="John Doe" />
            </Field>
            <Field label="Perusahaan">
              <input className={inputCls} value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="PT. Example" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Peran (ID)">
              <input className={inputCls} value={form.role.id} onChange={(e) => setNested('role', 'id', e.target.value)} placeholder="CEO, Founder..." />
            </Field>
            <Field label="Peran (EN)">
              <input className={inputCls} value={form.role.en} onChange={(e) => setNested('role', 'en', e.target.value)} placeholder="CEO, Founder..." />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Inisial (maks 2 karakter)">
              <input className={inputCls} maxLength={2} value={form.initials} onChange={(e) => set('initials', e.target.value.toUpperCase())} placeholder="JD" />
            </Field>
            <Field label="Rating (0–5)">
              <input type="number" min="0" max="5" step="0.1" className={inputCls} value={form.stars} onChange={(e) => set('stars', e.target.value)} />
            </Field>
          </div>
          <Field label="Warna Avatar">
            <div className="flex gap-2">
              <input type="color" className="h-9 w-12 rounded cursor-pointer bg-transparent border border-white/10" value={form.color} onChange={(e) => set('color', e.target.value)} />
              <input className={inputCls} value={form.color} onChange={(e) => set('color', e.target.value)} placeholder="#6366f1" />
            </div>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Kutipan (ID)">
              <textarea className={taCls} value={form.quote.id} onChange={(e) => setNested('quote', 'id', e.target.value)} />
            </Field>
            <Field label="Kutipan (EN)">
              <textarea className={taCls} value={form.quote.en} onChange={(e) => setNested('quote', 'en', e.target.value)} />
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
        message={`Hapus testimoni dari "${deleteTarget?.name}"?`}
      />
    </div>
  );
}

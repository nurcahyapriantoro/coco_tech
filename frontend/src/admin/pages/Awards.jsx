import { useState, useEffect } from 'react';
import { api } from '../api';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Field, Toast, inputCls, taCls } from '../components/FormField';

const EMPTY = {
  title: { id: '', en: '' },
  org: { id: '', en: '' },
  year: new Date().getFullYear(),
  icon: '🏆',
  color: '#FFD700',
  desc: { id: '', en: '' },
};

function toForm(item) {
  if (!item) return EMPTY;
  return {
    title: { id: item.title?.id || '', en: item.title?.en || '' },
    org: { id: item.org?.id || '', en: item.org?.en || '' },
    year: item.year || new Date().getFullYear(),
    icon: item.icon || '🏆',
    color: item.color || '#FFD700',
    desc: { id: item.desc?.id || '', en: item.desc?.en || '' },
  };
}

export default function Awards() {
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
      const res = await api.get('/awards');
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
      const payload = { ...form, year: Number(form.year) };
      if (editItem) {
        await api.put(`/awards/${editItem.id}`, payload);
        showToast('Penghargaan diperbarui');
      } else {
        await api.post('/awards', payload);
        showToast('Penghargaan ditambahkan');
      }
      setModalOpen(false);
      load();
    } catch { showToast('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (item) => {
    try {
      await api.del(`/awards/${item.id}`);
      showToast('Dihapus');
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
          <h1 className="text-white text-xl font-bold">🏆 Penghargaan</h1>
          <p className="text-gray-500 text-sm mt-0.5">{items.length} penghargaan</p>
        </div>
        <button onClick={openAdd} className="bg-[#0071E3] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          + Tambah Penghargaan
        </button>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Belum ada penghargaan.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">JUDUL (ID)</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">ORGANISASI</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">TAHUN</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">IKON</th>
                <th className="text-right text-gray-500 text-xs font-medium px-4 py-3">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id || i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white text-sm font-medium">{item.title?.id}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{item.org?.id}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{item.year}</td>
                  <td className="px-4 py-3 text-xl">{item.icon}</td>
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Penghargaan' : 'Tambah Penghargaan'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Judul (ID)">
              <input className={inputCls} value={form.title.id} onChange={(e) => setNested('title', 'id', e.target.value)} placeholder="Juara 1 Hackathon" />
            </Field>
            <Field label="Judul (EN)">
              <input className={inputCls} value={form.title.en} onChange={(e) => setNested('title', 'en', e.target.value)} placeholder="1st Place Hackathon" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Organisasi (ID)">
              <input className={inputCls} value={form.org.id} onChange={(e) => setNested('org', 'id', e.target.value)} placeholder="Nama organisasi" />
            </Field>
            <Field label="Organisasi (EN)">
              <input className={inputCls} value={form.org.en} onChange={(e) => setNested('org', 'en', e.target.value)} placeholder="Organization name" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tahun">
              <input type="number" className={inputCls} value={form.year} onChange={(e) => set('year', e.target.value)} />
            </Field>
            <Field label="Ikon (emoji)">
              <input className={inputCls} value={form.icon} onChange={(e) => set('icon', e.target.value)} placeholder="🏆" />
            </Field>
          </div>
          <Field label="Warna">
            <div className="flex gap-2">
              <input type="color" className="h-9 w-12 rounded cursor-pointer bg-transparent border border-white/10" value={form.color} onChange={(e) => set('color', e.target.value)} />
              <input className={inputCls} value={form.color} onChange={(e) => set('color', e.target.value)} placeholder="#FFD700" />
            </div>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Deskripsi (ID)">
              <textarea className={taCls} value={form.desc.id} onChange={(e) => setNested('desc', 'id', e.target.value)} />
            </Field>
            <Field label="Deskripsi (EN)">
              <textarea className={taCls} value={form.desc.en} onChange={(e) => setNested('desc', 'en', e.target.value)} />
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
        message={`Hapus penghargaan "${deleteTarget?.title?.id}"?`}
      />
    </div>
  );
}

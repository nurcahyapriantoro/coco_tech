import { useState, useEffect } from 'react';
import { api } from '../api';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Field, Toast, inputCls } from '../components/FormField';

const linesToArr = (s) => s.split('\n').map((l) => l.trim()).filter(Boolean);
const arrToLines = (a) => (Array.isArray(a) ? a.join('\n') : '');

const EMPTY = {
  category: { id: '', en: '' },
  icon: '🛠️',
  color: '#0071E3',
  items: '',
};

function toForm(item) {
  if (!item) return EMPTY;
  return {
    category: { id: item.category?.id || '', en: item.category?.en || '' },
    icon: item.icon || '🛠️',
    color: item.color || '#0071E3',
    items: arrToLines(item.items),
  };
}

function toPayload(f) {
  return { ...f, items: linesToArr(f.items) };
}

export default function Skills() {
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
      const res = await api.get('/skills');
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
        await api.put(`/skills/${editItem.id}`, payload);
        showToast('Tech stack diperbarui');
      } else {
        await api.post('/skills', payload);
        showToast('Tech stack ditambahkan');
      }
      setModalOpen(false);
      load();
    } catch { showToast('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (item) => {
    try {
      await api.del(`/skills/${item.id}`);
      showToast('Dihapus');
      load();
    } catch { showToast('Gagal menghapus', 'error'); }
  };

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setNested = (parent, key, val) => setForm((f) => ({ ...f, [parent]: { ...f[parent], [key]: val } }));

  const taCls = inputCls + ' resize-y min-h-[120px]';

  return (
    <div className="p-8">
      <Toast msg={toast.msg} type={toast.type} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-bold">🛠️ Tech Stack</h1>
          <p className="text-gray-500 text-sm mt-0.5">{items.length} kategori</p>
        </div>
        <button onClick={openAdd} className="bg-[#0071E3] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          + Tambah Kategori
        </button>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Belum ada data tech stack.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">KATEGORI</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">IKON</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">WARNA</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">JML SKILL</th>
                <th className="text-right text-gray-500 text-xs font-medium px-4 py-3">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id || i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white text-sm font-medium">{item.category?.id}</td>
                  <td className="px-4 py-3 text-xl">{item.icon}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-white/20" style={{ background: item.color }} />
                      <span className="text-gray-500 text-xs">{item.color}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{(item.items || []).length} skill</td>
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Kategori' : 'Tambah Kategori'} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Kategori (ID)">
              <input className={inputCls} value={form.category.id} onChange={(e) => setNested('category', 'id', e.target.value)} placeholder="Frontend" />
            </Field>
            <Field label="Kategori (EN)">
              <input className={inputCls} value={form.category.en} onChange={(e) => setNested('category', 'en', e.target.value)} placeholder="Frontend" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Ikon (emoji)">
              <input className={inputCls} value={form.icon} onChange={(e) => set('icon', e.target.value)} placeholder="🛠️" />
            </Field>
            <Field label="Warna">
              <div className="flex gap-2">
                <input type="color" className="h-9 w-12 rounded cursor-pointer bg-transparent border border-white/10" value={form.color} onChange={(e) => set('color', e.target.value)} />
                <input className={inputCls} value={form.color} onChange={(e) => set('color', e.target.value)} placeholder="#0071E3" />
              </div>
            </Field>
          </div>
          <Field label="Skills (satu per baris)">
            <textarea className={taCls} value={form.items} onChange={(e) => set('items', e.target.value)} placeholder="React&#10;Vue.js&#10;TypeScript" />
          </Field>
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
        message={`Hapus kategori "${deleteTarget?.category?.id}"?`}
      />
    </div>
  );
}

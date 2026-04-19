import { useState, useEffect } from 'react';
import { api } from '../api';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Field, Toast, inputCls, taCls } from '../components/FormField';

const linesToArr = (s) => s.split('\n').map((l) => l.trim()).filter(Boolean);
const arrToLines = (a) => (Array.isArray(a) ? a.join('\n') : '');

const EMPTY = {
  name: { id: '', en: '' },
  price: '',
  priceSub: { id: '', en: '' },
  popular: false,
  features: { id: '', en: '' },
};

function toForm(item) {
  if (!item) return EMPTY;
  return {
    name: { id: item.name?.id || '', en: item.name?.en || '' },
    price: item.price || '',
    priceSub: { id: item.priceSub?.id || '', en: item.priceSub?.en || '' },
    popular: !!item.popular,
    features: { id: arrToLines(item.features?.id), en: arrToLines(item.features?.en) },
  };
}

function toPayload(f) {
  return {
    ...f,
    features: { id: linesToArr(f.features.id), en: linesToArr(f.features.en) },
  };
}

export default function Paket() {
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
      const res = await api.get('/paket');
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
        await api.put(`/paket/${editItem.id}`, payload);
        showToast('Paket diperbarui');
      } else {
        await api.post('/paket', payload);
        showToast('Paket ditambahkan');
      }
      setModalOpen(false);
      load();
    } catch { showToast('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (item) => {
    try {
      await api.del(`/paket/${item.id}`);
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
          <h1 className="text-white text-xl font-bold">💰 Paket & Harga</h1>
          <p className="text-gray-500 text-sm mt-0.5">{items.length} paket</p>
        </div>
        <button onClick={openAdd} className="bg-[#0071E3] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          + Tambah Paket
        </button>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Belum ada paket harga.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">NAMA (ID)</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">HARGA</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">POPULAR</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">FITUR</th>
                <th className="text-right text-gray-500 text-xs font-medium px-4 py-3">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id || i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white text-sm font-medium">{item.name?.id}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{item.price}</td>
                  <td className="px-4 py-3">
                    {item.popular && (
                      <span className="bg-[#0071E3]/20 text-[#0071E3] text-xs px-2 py-1 rounded-full font-medium">Popular</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{(item.features?.id || []).length} fitur</td>
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Paket' : 'Tambah Paket'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nama Paket (ID)">
              <input className={inputCls} value={form.name.id} onChange={(e) => setNested('name', 'id', e.target.value)} placeholder="Starter" />
            </Field>
            <Field label="Nama Paket (EN)">
              <input className={inputCls} value={form.name.en} onChange={(e) => setNested('name', 'en', e.target.value)} placeholder="Starter" />
            </Field>
          </div>
          <Field label="Harga">
            <input className={inputCls} value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="Rp 2.500.000 atau Custom" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Sub Harga (ID)">
              <input className={inputCls} value={form.priceSub.id} onChange={(e) => setNested('priceSub', 'id', e.target.value)} placeholder="/ proyek" />
            </Field>
            <Field label="Sub Harga (EN)">
              <input className={inputCls} value={form.priceSub.en} onChange={(e) => setNested('priceSub', 'en', e.target.value)} placeholder="/ project" />
            </Field>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="popular"
              checked={form.popular}
              onChange={(e) => set('popular', e.target.checked)}
              className="w-4 h-4 accent-[#0071E3] cursor-pointer"
            />
            <label htmlFor="popular" className="text-gray-300 text-sm cursor-pointer">Tandai sebagai Popular</label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Fitur (ID) — satu per baris">
              <textarea className={taCls} value={form.features.id} onChange={(e) => setNested('features', 'id', e.target.value)} placeholder="5 Halaman&#10;Desain Responsif&#10;..." />
            </Field>
            <Field label="Fitur (EN) — satu per baris">
              <textarea className={taCls} value={form.features.en} onChange={(e) => setNested('features', 'en', e.target.value)} placeholder="5 Pages&#10;Responsive Design&#10;..." />
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
        message={`Hapus paket "${deleteTarget?.name?.id}"?`}
      />
    </div>
  );
}

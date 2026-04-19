import { useState, useEffect } from 'react';
import { api } from '../api';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Field, Toast, inputCls, taCls } from '../components/FormField';

const linesToArr = (s) => s.split('\n').map((l) => l.trim()).filter(Boolean);
const arrToLines = (a) => (Array.isArray(a) ? a.join('\n') : '');

const EMPTY = {
  org: '', logo: '', color: '#00f5ff',
  role: { id: '', en: '' }, period: { id: '', en: '' },
  desc: { id: '', en: '' }, techs: '',
};

function toForm(item) {
  if (!item) return EMPTY;
  return {
    org: item.org || '',
    logo: item.logo || '',
    color: item.color || '#00f5ff',
    role: { id: item.role?.id || '', en: item.role?.en || '' },
    period: { id: item.period?.id || '', en: item.period?.en || '' },
    desc: { id: item.desc?.id || '', en: item.desc?.en || '' },
    techs: arrToLines(item.techs),
  };
}

function toPayload(f) {
  return { ...f, techs: linesToArr(f.techs) };
}

export default function Experience() {
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
      const res = await api.get('/experience');
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
        await api.put(`/experience/${editItem.id}`, payload);
        showToast('Pengalaman diperbarui');
      } else {
        await api.post('/experience', payload);
        showToast('Pengalaman ditambahkan');
      }
      setModalOpen(false);
      load();
    } catch { showToast('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (item) => {
    try {
      await api.del(`/experience/${item.id}`);
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
          <h1 className="text-white text-xl font-bold">🏢 Pengalaman</h1>
          <p className="text-gray-500 text-sm mt-0.5">{items.length} entri</p>
        </div>
        <button onClick={openAdd} className="bg-[#0071E3] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          + Tambah Pengalaman
        </button>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Belum ada data.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">ORGANISASI</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">PERAN (ID)</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">PERIODE</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">WARNA</th>
                <th className="text-right text-gray-500 text-xs font-medium px-4 py-3">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id || i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white text-sm font-medium">{item.org}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{item.role?.id}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{item.period?.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-white/20" style={{ background: item.color }} />
                      <span className="text-gray-500 text-xs">{item.color}</span>
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Pengalaman' : 'Tambah Pengalaman'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Organisasi">
              <input className={inputCls} value={form.org} onChange={(e) => set('org', e.target.value)} placeholder="Nama organisasi" />
            </Field>
            <Field label="Logo (singkatan)">
              <input className={inputCls} value={form.logo} onChange={(e) => set('logo', e.target.value)} placeholder="BI, G, PBA..." />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Peran (ID)">
              <input className={inputCls} value={form.role.id} onChange={(e) => setNested('role', 'id', e.target.value)} />
            </Field>
            <Field label="Peran (EN)">
              <input className={inputCls} value={form.role.en} onChange={(e) => setNested('role', 'en', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Periode (ID)">
              <input className={inputCls} value={form.period.id} onChange={(e) => setNested('period', 'id', e.target.value)} placeholder="Jan 2024 – Des 2024" />
            </Field>
            <Field label="Periode (EN)">
              <input className={inputCls} value={form.period.en} onChange={(e) => setNested('period', 'en', e.target.value)} placeholder="Jan 2024 – Dec 2024" />
            </Field>
          </div>
          <Field label="Warna Aksen">
            <div className="flex gap-2">
              <input type="color" className="h-9 w-12 rounded cursor-pointer bg-transparent border border-white/10" value={form.color} onChange={(e) => set('color', e.target.value)} />
              <input className={inputCls} value={form.color} onChange={(e) => set('color', e.target.value)} placeholder="#00f5ff" />
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
          <Field label="Teknologi (satu per baris)">
            <textarea className={taCls} value={form.techs} onChange={(e) => set('techs', e.target.value)} placeholder="Python&#10;Apache Spark&#10;dbt" />
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
        message={`Hapus pengalaman di "${deleteTarget?.org}"?`}
      />
    </div>
  );
}

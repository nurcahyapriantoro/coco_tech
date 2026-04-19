import Modal from './Modal';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Konfirmasi" size="sm">
      <p className="text-gray-300 mb-6">{message || 'Apakah Anda yakin ingin menghapus item ini?'}</p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Batal
        </button>
        <button
          onClick={() => { onConfirm(); onClose(); }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Hapus
        </button>
      </div>
    </Modal>
  );
}

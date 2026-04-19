export default function LogoBankIndonesia({ size = 48, className = '' }) {
  return (
    <img
      src="/logo_bi_new.png"
      alt="Bank Indonesia"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
      className={className}
    />
  );
}

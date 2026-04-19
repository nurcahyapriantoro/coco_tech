export default function LogoGoogle({ size = 48, className = '' }) {
  return (
    <img
      src="/gcp.png"
      alt="Google Bangkit Academy"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
      className={className}
    />
  );
}

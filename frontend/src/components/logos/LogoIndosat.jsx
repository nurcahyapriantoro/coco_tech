export default function LogoIndosat({ size = 48, className = '' }) {
  return (
    <img
      src="/id_camp.png"
      alt="IDCamp"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
      className={className}
    />
  );
}

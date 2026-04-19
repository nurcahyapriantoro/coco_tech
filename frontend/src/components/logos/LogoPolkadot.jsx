export default function LogoPolkadot({ size = 48, className = '' }) {
  const r = size / 2;
  const cx = r;
  const cy = r;
  const dotR = size * 0.085;
  const orbitR = size * 0.32;

  const dots = [{ x: cx, y: cy }];
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 - 90) * (Math.PI / 180);
    dots.push({
      x: cx + orbitR * Math.cos(angle),
      y: cy + orbitR * Math.sin(angle),
    });
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Polkadot Blockchain Academy"
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={i === 0 ? dotR * 1.25 : dotR}
          fill="#E6007A"
          opacity={i === 0 ? 1 : 0.9}
        />
      ))}
    </svg>
  );
}

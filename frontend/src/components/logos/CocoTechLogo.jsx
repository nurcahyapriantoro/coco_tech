export default function CocoTechLogo({ height = 28, showText = true, className = '' }) {
  const vw = showText ? 148 : 32;
  const vh = 32;

  return (
    <svg
      width={(height / vh) * vw}
      height={height}
      viewBox={`0 0 ${vw} ${vh}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CocoTech"
      style={{ color: 'var(--fg)' }}
    >
      <path
        d="M 22.64 7.64 A 10 10 0 1 0 22.64 24.36"
        stroke="#0071E3"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="25.6" cy="16" r="2.4" fill="#0071E3" />

      {showText && (
        <text
          x="38"
          y="23"
          fontFamily="'Cal Sans', 'Inter', system-ui, sans-serif"
          fontSize="16"
          letterSpacing="-0.3"
        >
          <tspan fontWeight="400" fill="currentColor">Coco</tspan>
          <tspan fontWeight="700" fill="var(--accent)">Tech</tspan>
        </text>
      )}
    </svg>
  );
}

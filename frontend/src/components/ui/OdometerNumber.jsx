import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * DigitColumn — animates a single digit from 0 rolling to the target digit.
 */
function DigitColumn({ digit, active, delay = 0 }) {
  const targetIdx = parseInt(digit, 10);

  if (isNaN(targetIdx)) {
    return (
      <span style={{ display: 'inline-block', color: 'var(--accent)', marginLeft: 1 }}>
        {digit}
      </span>
    );
  }

  return (
    <span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        height: '1.15em',
        verticalAlign: 'bottom',
        lineHeight: 1.15,
      }}
    >
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          transform: active ? `translateY(-${targetIdx * 1.15}em)` : 'translateY(0)',
          transition: active
            ? `transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
            : 'none',
          willChange: 'transform',
        }}
      >
        {DIGITS.map((d) => (
          <span
            key={d}
            style={{
              height: '1.15em',
              display: 'block',
              lineHeight: 1.15,
              userSelect: 'none',
            }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * OdometerNumber — per-digit column rolling counter.
 * Triggered when the element enters the viewport.
 *
 * Props:
 *   value    {number}  — Target number
 *   suffix   {string}  — Appended after the number (e.g. '+', '%')
 *   decimals {number}  — Number of decimal places
 */
export default function OdometerNumber({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setActive(true), 120);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const str =
    decimals > 0
      ? parseFloat(value).toFixed(decimals)
      : Math.floor(value).toString();

  return (
    <span
      ref={ref}
      style={{ display: 'inline-flex', alignItems: 'baseline' }}
      aria-label={`${str}${suffix}`}
    >
      {str.split('').map((char, i) => (
        <DigitColumn
          key={i}
          digit={char}
          active={active}
          delay={i * 55}
        />
      ))}
      {suffix && (
        <span style={{ color: 'var(--accent)', marginLeft: 2, display: 'inline-block' }}>
          {suffix}
        </span>
      )}
    </span>
  );
}

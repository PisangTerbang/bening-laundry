"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useVelocity } from "motion/react";

function Clothes() {
  return (
    <>
      <circle r="128" fill="none" />
      <path d="M-70-62l22-14 10 8h16l10-8 22 14-10 18-12-6v40h-36v-40l-12 6Z" fill="#e8507f" />
      <g transform="rotate(28 40 30)">
        <path d="M18 2h48l4 74h-18l-8-48-8 48H18Z" fill="#2f5bd8" />
        <path d="M18 10h52" stroke="#1d3f9e" strokeWidth="3" />
      </g>
      <path d="M-82 30h16v26a8 8 0 0 0 8 8h14v14h-22a16 16 0 0 1-16-16Z" fill="#ffd34d" transform="rotate(-18 -70 50)" />
      <rect x="-30" y="58" width="56" height="34" rx="6" fill="#ffffff" transform="rotate(-8 0 75)" />
      <path d="M-24 66h44M-24 84h44" stroke="#cddbef" strokeWidth="3" transform="rotate(-8 0 75)" />
    </>
  );
}

export function Washer({ className }: { className?: string }) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const angle = useMotionValue(0);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const speed = 40 + Math.min(Math.abs(velocity.get()), 4000) * 0.25;
    angle.set((angle.get() + (speed * delta) / 1000) % 360);
  });

  return (
    <svg viewBox="0 0 440 520" className={className} role="img" aria-label="Mesin cuci dengan cucian berputar di dalam tabung">
      <defs>
        <clipPath id="glass">
          <circle cx="220" cy="310" r="128" />
        </clipPath>
      </defs>

      <rect x="64" y="496" width="44" height="18" rx="6" fill="#b7c7e2" />
      <rect x="332" y="496" width="44" height="18" rx="6" fill="#b7c7e2" />
      <rect x="10" y="10" width="420" height="494" rx="40" fill="#ffffff" stroke="#cddbef" strokeWidth="2" />
      <path d="M10 118h420" stroke="#e3ebf6" strokeWidth="2" />

      <rect x="44" y="42" width="112" height="46" rx="12" fill="#f2f6fc" stroke="#cddbef" strokeWidth="2" />
      <path d="M70 65h60" stroke="#cddbef" strokeWidth="4" strokeLinecap="round" />
      <rect x="190" y="42" width="120" height="46" rx="12" fill="#0f1c3f" />
      <text x="250" y="73" textAnchor="middle" fill="#8fe3ff" fontSize="22" fontWeight="900" fontFamily="inherit" letterSpacing="1">
        07–21
      </text>
      <circle cx="372" cy="65" r="27" fill="#f2f6fc" stroke="#cddbef" strokeWidth="2" />
      <path d="M372 65l12-14" stroke="#1543c8" strokeWidth="5" strokeLinecap="round" />

      <circle cx="220" cy="310" r="166" fill="#f2f6fc" stroke="#cddbef" strokeWidth="2" />
      <circle cx="220" cy="310" r="148" fill="#dfe8f5" />
      <circle cx="220" cy="310" r="132" fill="#c2d4ef" />
      <g clipPath="url(#glass)">
        <rect x="80" y="170" width="280" height="280" fill="#d8e6fb" />
        <g transform="translate(220 310)">
          <motion.g style={{ rotate: angle }}>
            <Clothes />
          </motion.g>
        </g>
        <g className="wave" opacity="0.78">
          <path
            d="M60 352q30-18 60 0t60 0 60 0 60 0 60 0 60 0 60 0v120H60Z"
            fill="#4f80f0"
          />
        </g>
        {[
          [170, 420, 0, 6],
          [205, 430, 1.4, 4],
          [252, 425, 2.6, 7],
          [282, 432, 3.6, 5],
          [228, 436, 0.8, 3.5],
        ].map(([x, y, d, r]) => (
          <circle key={`${x}-${y}`} className="bubble" cx={x} cy={y} r={r} fill="#ffffff" style={{ animationDelay: `${d}s` }} />
        ))}
        <path d="M128 250a128 128 0 0 1 82-62" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.55" />
      </g>
      <circle cx="220" cy="310" r="132" fill="none" stroke="#9fb6da" strokeWidth="3" />
      <rect x="378" y="282" width="16" height="56" rx="8" fill="#dfe8f5" stroke="#cddbef" strokeWidth="2" />
    </svg>
  );
}

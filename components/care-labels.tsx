"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { careLabels, type CareId } from "@/lib/data";

const tub = "M6 14 10 34h28l4-20";
const wave = "M3 14c4-4 7 3 10 0s7 3 10 0 7 3 10 0 7 3 10 0";
const iron = "M8 32h32c0-10-5-17-15-17h-9c-3 0-5 3-5 6";
const cross = "M8 6 40 36M40 6 8 36";

function Symbol({ id, className }: { id: CareId; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const body: Record<CareId, React.ReactNode> = {
    cuci30: (
      <>
        <path {...p} d={tub} />
        <path {...p} d={wave} />
        <text x="24" y="29" textAnchor="middle" fontSize="11" fontWeight="900" fill="currentColor">
          30
        </text>
      </>
    ),
    cuci40: (
      <>
        <path {...p} d={tub} />
        <path {...p} d={wave} />
        <text x="24" y="29" textAnchor="middle" fontSize="11" fontWeight="900" fill="currentColor">
          40
        </text>
      </>
    ),
    tangan: (
      <>
        <path {...p} d={tub} />
        <path {...p} d={wave} />
        <path {...p} d="M18 30v-8M22 30v-10M26 30v-9M30 30v-6M16 26c2 4 6 6 16 4" />
      </>
    ),
    noBleach: (
      <>
        <path {...p} d="M24 6 42 34H6Z" />
        <path {...p} d="M12 12 36 36M36 12 12 36" />
      </>
    ),
    tumbleLow: (
      <>
        <rect {...p} x="8" y="6" width="32" height="30" rx="2" />
        <circle {...p} cx="24" cy="21" r="10" />
        <circle cx="24" cy="21" r="2" fill="currentColor" />
      </>
    ),
    noTumble: (
      <>
        <rect {...p} x="8" y="6" width="32" height="30" rx="2" />
        <circle {...p} cx="24" cy="21" r="10" />
        <path {...p} d={cross} />
      </>
    ),
    iron1: (
      <>
        <path {...p} d={iron} />
        <circle cx="24" cy="25" r="2" fill="currentColor" />
      </>
    ),
    iron2: (
      <>
        <path {...p} d={iron} />
        <circle cx="20" cy="25" r="2" fill="currentColor" />
        <circle cx="28" cy="25" r="2" fill="currentColor" />
      </>
    ),
    noIron: (
      <>
        <path {...p} d={iron} />
        <path {...p} d={cross} />
      </>
    ),
    dry: (
      <>
        <circle {...p} cx="24" cy="21" r="14" />
        <text x="24" y="27" textAnchor="middle" fontSize="16" fontWeight="900" fill="currentColor">
          P
        </text>
      </>
    ),
    shade: (
      <>
        <rect {...p} x="8" y="6" width="32" height="30" rx="2" />
        <path {...p} d="M8 16 18 6M24 14v16" />
      </>
    ),
    noWring: (
      <>
        <path {...p} d="M6 20c6-8 10 8 18 0s12 8 18 0" />
        <path {...p} d="M6 16v8M42 16v8" />
        <path {...p} d={cross} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 48 42" className={className} aria-hidden="true">
      {body[id]}
    </svg>
  );
}

export function CareLabels() {
  const [active, setActive] = useState<CareId>("cuci30");
  const label = careLabels.find((c) => c.id === active)!;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {careLabels.map((c) => {
          const on = c.id === active;
          return (
            <li key={c.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setActive(c.id)}
                className={`flex w-full flex-col items-center gap-2 rounded-2xl border-2 px-2 py-4 text-center text-sm font-bold leading-tight transition-colors ${
                  on ? "border-cobalt bg-cobalt text-white" : "border-line bg-white text-ink hover:border-cobalt/50"
                }`}
              >
                <Symbol id={c.id} className="h-10 w-12" />
                {c.name}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="lg:sticky lg:top-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={label.id}
            initial={{ opacity: 0, rotate: -2, y: 14 }}
            animate={{ opacity: 1, rotate: -1, y: 0 }}
            exit={{ opacity: 0, rotate: 1, y: -10 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative mx-auto max-w-sm rounded-b-xl bg-white px-7 pb-8 pt-10 shadow-[0_24px_40px_-24px_rgb(15_28_63/0.45)]"
            aria-live="polite"
          >
            <span aria-hidden="true" className="absolute inset-x-3 top-3 border-t-2 border-dashed border-line" />
            <span aria-hidden="true" className="absolute inset-x-3 bottom-3 top-3 rounded-b-lg border-x-2 border-b-2 border-dashed border-line" />
            <Symbol id={label.id} className="h-16 w-20 text-cobalt" />
            <p className="heading mt-4 text-2xl">{label.name}</p>
            <p className="mt-2 text-muted">{label.meaning}</p>
            <p className="mt-5 rounded-xl bg-air px-4 py-3 font-semibold">
              <span className="block text-sm text-cobalt">Di Bening Laundry</span>
              {label.treat}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

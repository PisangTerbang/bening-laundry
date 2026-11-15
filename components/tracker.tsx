"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useWa } from "@/components/wa-sim";
import { trackSteps } from "@/lib/data";

const pattern = /^BL-\d{4}$/;

function digitsOf(code: string) {
  return code
    .replace(/\D/g, "")
    .split("")
    .map(Number);
}

function SpinIcon() {
  return (
    <motion.svg viewBox="0 0 24 24" className="size-5" animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M7 13c2 2 4 2 5 0s3-2 5 0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </motion.svg>
  );
}

function Timeline({ code, live }: { code: string; live: boolean }) {
  const d = digitsOf(code);
  const start = live ? 0 : d.reduce((a, b) => a + b, 0) % trackSteps.length;
  const [step, setStep] = useState(start);
  const kg = 3 + (d[3] ?? 0) % 6;

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => setStep((s) => (s < trackSteps.length - 1 ? s + 1 : s)), 3500);
    return () => clearInterval(t);
  }, [live]);

  const done = step === trackSteps.length - 1;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="heading text-3xl">{code}</p>
        <p className={`rounded-full px-3 py-1 text-sm font-extrabold ${done ? "bg-wa text-white" : "bg-nota text-nota-ink"}`} aria-live="polite">
          {done ? "Sedang diantar" : trackSteps[step].title}
        </p>
      </div>
      <p className="mt-1 text-sm text-muted">
        Cuci dan setrika, {kg} kg{live ? ". Status bergerak otomatis karena ini simulasi." : ". Ini status contoh."}
      </p>

      <ol className="mt-6">
        {trackSteps.map((s, i) => {
          const state = i < step ? "done" : i === step ? "now" : "next";
          return (
            <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
              {i < trackSteps.length - 1 && (
                <span aria-hidden="true" className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 bg-line">
                  <motion.span className="absolute inset-x-0 top-0 bg-cobalt" initial={false} animate={{ height: i < step ? "100%" : "0%" }} transition={{ duration: 0.6 }} />
                </span>
              )}
              <motion.span
                initial={false}
                animate={{ scale: state === "now" ? 1.12 : 1 }}
                className={`relative grid size-8 shrink-0 place-items-center rounded-full border-2 ${
                  state === "done" ? "border-cobalt bg-cobalt text-white" : state === "now" ? "border-cobalt bg-air text-cobalt" : "border-line bg-white text-line"
                }`}
              >
                {state === "done" ? (
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12.5 4.5 4.5L19 7" />
                  </svg>
                ) : state === "now" && s.title === "Dicuci" ? (
                  <SpinIcon />
                ) : (
                  <span className="size-2 rounded-full bg-current" />
                )}
                {state === "now" && <span className="absolute inset-0 animate-ping rounded-full border-2 border-cobalt/40" />}
              </motion.span>
              <div className={state === "next" ? "opacity-45" : ""}>
                <p className="font-extrabold">{s.title}</p>
                <p className="text-sm text-muted">{s.title === "Ditimbang" && i <= step ? `${kg} kg. ${s.body}` : s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </motion.div>
  );
}

export function Tracker() {
  const { lastCode } = useWa();
  const [input, setInput] = useState("");
  const [tracked, setTracked] = useState<{ code: string; live: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const track = (raw: string) => {
    const code = raw.trim().toUpperCase().replace(/\s+/g, "");
    if (!pattern.test(code)) {
      setError("Kode cucian terdiri dari BL, tanda hubung, dan 4 angka. Contoh: BL-2048.");
      setTracked(null);
      return;
    }
    setError(null);
    setInput(code);
    setTracked({ code, live: code === lastCode });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            track(input);
          }}
          className="flex flex-col gap-3 sm:flex-row"
          noValidate
        >
          <label htmlFor="track-code" className="sr-only">
            Kode cucian
          </label>
          <input
            id="track-code"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Contoh: BL-2048"
            autoCapitalize="characters"
            aria-invalid={!!error}
            aria-describedby={error ? "track-error" : undefined}
            className="min-w-0 flex-1 rounded-full border-2 border-line bg-white px-5 py-3.5 text-lg font-bold tracking-wide uppercase outline-none placeholder:font-semibold placeholder:normal-case placeholder:tracking-normal focus:border-cobalt"
          />
          <button type="submit" className="rounded-full bg-cobalt px-7 py-3.5 font-extrabold text-white transition-colors hover:bg-cobalt-deep">
            Lacak
          </button>
        </form>
        <AnimatePresence>
          {error && (
            <motion.p id="track-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 font-semibold text-pink" role="alert">
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap gap-2">
          {lastCode && (
            <button type="button" onClick={() => track(lastCode)} className="rounded-full bg-nota px-4 py-2 font-bold text-nota-ink">
              Lacak pesananmu, {lastCode}
            </button>
          )}
          <button type="button" onClick={() => track("BL-2048")} className="rounded-full bg-white px-4 py-2 font-bold ring-1 ring-line hover:ring-cobalt">
            Coba kode contoh
          </button>
        </div>
        <p className="mt-6 max-w-[40ch] text-muted">
          Kode cucian ada di balasan WhatsApp setelah kamu memesan. Buat pesanan di kalkulator di atas untuk melihat statusnya bergerak.
        </p>
      </div>

      <div className="min-h-[24rem]">
        {tracked ? (
          <Timeline key={`${tracked.code}-${tracked.live}`} code={tracked.code} live={tracked.live} />
        ) : (
          <div className="grid h-full min-h-[24rem] place-items-center rounded-3xl border-2 border-dashed border-line p-8 text-center text-muted">
            Status cucian muncul di sini setelah kamu memasukkan kode.
          </div>
        )}
      </div>
    </div>
  );
}

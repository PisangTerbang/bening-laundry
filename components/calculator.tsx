"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useSyncExternalStore } from "react";
import { rupiah } from "@/components/wa";
import { WaButton } from "@/components/wa-sim";
import { laundry, pricing, scents, services, type ServiceId } from "@/lib/data";

const pickupSlots = ["08.00 sampai 10.00", "12.00 sampai 14.00", "16.00 sampai 18.00", "19.00 sampai 21.00"];

function wibNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
}

function estimateDone(days: number, kilat: boolean) {
  const now = wibNow();
  const start = new Date(now);
  const h = now.getHours() + now.getMinutes() / 60;
  if (h >= laundry.close) {
    start.setDate(start.getDate() + 1);
    start.setHours(laundry.open, 0, 0, 0);
  } else if (h < laundry.open) {
    start.setHours(laundry.open, 0, 0, 0);
  }

  const day = (d: Date) => d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short" });
  if (kilat) {
    const done = new Date(start.getTime() + pricing.kilatHours * 3600_000);
    if (done.getHours() >= laundry.close || done.getDate() !== start.getDate()) {
      done.setDate(start.getDate() + 1);
      done.setHours(10, 0, 0, 0);
    }
    const time = `${String(done.getHours()).padStart(2, "0")}.${String(done.getMinutes()).padStart(2, "0")}`;
    return `${day(done)}, sekitar pukul ${time}`;
  }
  const done = new Date(start);
  done.setDate(done.getDate() + days);
  return `${day(done)}, sore`;
}

function Drum({ kg }: { kg: number }) {
  const fill = Math.min(kg / pricing.maxKg, 1);
  const colors = ["#e8507f", "#2f5bd8", "#ffd34d", "#ffffff", "#7cc4a4"];
  return (
    <svg viewBox="0 0 100 100" className="size-24 shrink-0" aria-hidden="true">
      <defs>
        <clipPath id="mini-glass">
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="48" fill="#fff" stroke="#cddbef" strokeWidth="2" />
      <circle cx="50" cy="50" r="40" fill="#dfe8f5" />
      <g clipPath="url(#mini-glass)">
        <rect x="10" y="10" width="80" height="80" fill="#d8e6fb" />
        <motion.g animate={{ rotate: kg * 50 }} transition={{ type: "spring", stiffness: 60, damping: 12 }}>
          <circle cx="50" cy="50" r="40" fill="none" />
          {Array.from({ length: kg }, (_, i) => {
            const a = i * 2.4;
            const r = 8 + (i % 4) * 7;
            return <rect key={i} x={50 + Math.cos(a) * r - 6} y={50 + Math.sin(a) * r - 4} width="12" height="8" rx="3" fill={colors[i % colors.length]} />;
          })}
        </motion.g>
        <motion.rect x="10" width="80" height="80" fill="#4f80f0" opacity="0.55" animate={{ y: 90 - fill * 55 }} transition={{ type: "spring", stiffness: 120, damping: 18 }} />
      </g>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#9fb6da" strokeWidth="2" />
    </svg>
  );
}

function Hand({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-hand text-[1.6rem] font-semibold leading-none text-nota-ink ${className}`}>{children}</span>;
}

export function Calculator() {
  const [serviceId, setServiceId] = useState<ServiceId>("cuci-setrika");
  const [kg, setKg] = useState(4);
  const [kilat, setKilat] = useState(false);
  const [scent, setScent] = useState<(typeof scents)[number]>("Lavender");
  const [pickup, setPickup] = useState(true);
  const [slot, setSlot] = useState(pickupSlots[2]);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const service = services.find((s) => s.id === serviceId)!;
  const billedKg = Math.max(kg, pricing.minKg);
  const base = billedKg * service.perKg;
  const kilatCost = kilat ? billedKg * pricing.kilatPerKg : 0;
  const pickupCost = pickup && kg < pricing.freePickupFromKg ? pricing.pickupFee : 0;
  const total = base + kilatCost + pickupCost;

  const done = isClient ? estimateDone(service.days, kilat) : null;

  const speedLabel = kilat ? `Kilat ${pricing.kilatHours} jam` : `Reguler ${service.days} hari`;
  const message = [
    `Halo ${laundry.name}, saya mau laundry.`,
    `Layanan: ${service.label} (${speedLabel})`,
    `Perkiraan berat: ${kg} kg`,
    `Pewangi: ${scent}`,
    `Perkiraan biaya: ${rupiah(total)}`,
    pickup ? `Minta dijemput di: ${address.trim() || "(alamat menyusul)"}, jam ${slot}` : "Saya antar sendiri ke outlet.",
    name.trim() && `Nama: ${name.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const chip =
    "relative cursor-pointer rounded-2xl border-2 border-line bg-white px-4 py-3 font-bold transition-colors hover:border-cobalt/50 has-checked:border-cobalt has-checked:bg-cobalt has-checked:text-white has-focus-visible:outline-3 has-focus-visible:outline-pink";
  const field = "w-full rounded-2xl border-2 border-line bg-white px-4 py-3 outline-none transition-colors focus:border-cobalt";

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
      <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend className="mb-3 text-lg font-extrabold">Layanan</legend>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {services.map((s) => (
              <label key={s.id} className={`${chip} flex flex-col gap-1 [&:has(:checked)_.sub]:text-white/80`}>
                <input type="radio" name="service" className="sr-only" checked={serviceId === s.id} onChange={() => setServiceId(s.id)} />
                <span>{s.label}</span>
                <span className="sub text-sm font-semibold text-muted">
                  {rupiah(s.perKg)}/kg, {s.days} hari
                </span>
              </label>
            ))}
          </div>
          <p className="mt-2.5 text-sm text-muted">{service.note}.</p>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-lg font-extrabold">Perkiraan berat</legend>
          <div className="flex items-center gap-5 rounded-3xl bg-white p-4 ring-1 ring-line sm:gap-6 sm:p-5">
            <Drum kg={kg} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setKg((k) => Math.max(1, k - 1))}
                  aria-label="Kurangi 1 kg"
                  className="grid size-11 place-items-center rounded-full bg-air text-2xl font-black text-cobalt hover:bg-line"
                >
                  −
                </button>
                <output htmlFor="kg" className="heading text-4xl tabular-nums" aria-live="polite">
                  {kg} kg
                </output>
                <button
                  type="button"
                  onClick={() => setKg((k) => Math.min(pricing.maxKg, k + 1))}
                  aria-label="Tambah 1 kg"
                  className="grid size-11 place-items-center rounded-full bg-air text-2xl font-black text-cobalt hover:bg-line"
                >
                  +
                </button>
              </div>
              <input
                id="kg"
                type="range"
                min={1}
                max={pricing.maxKg}
                value={kg}
                onChange={(e) => setKg(Number(e.target.value))}
                aria-label="Perkiraan berat dalam kilogram"
                className="mt-3 w-full accent-cobalt"
              />
            </div>
          </div>
          <p className="mt-2.5 text-sm text-muted">
            Kira-kira 1 kg sama dengan 5 kaos atau 2 celana jeans. Berat pasti dihitung saat ditimbang, minimal {pricing.minKg} kg.
          </p>
        </fieldset>

        <div className="grid gap-8 sm:grid-cols-2">
          <fieldset>
            <legend className="mb-3 text-lg font-extrabold">Kecepatan</legend>
            <div className="grid grid-cols-2 gap-2.5">
              <label className={chip}>
                <input type="radio" name="speed" className="sr-only" checked={!kilat} onChange={() => setKilat(false)} />
                Reguler
              </label>
              <label className={chip}>
                <input type="radio" name="speed" className="sr-only" checked={kilat} onChange={() => setKilat(true)} />
                Kilat {pricing.kilatHours} jam
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-3 text-lg font-extrabold">Pewangi</legend>
            <div className="flex flex-wrap gap-2">
              {scents.map((s) => (
                <label
                  key={s}
                  className="relative cursor-pointer rounded-full border-2 border-line bg-white px-3.5 py-1.5 text-sm font-bold has-checked:border-pink has-checked:bg-pink has-checked:text-white has-focus-visible:outline-3 has-focus-visible:outline-cobalt"
                >
                  <input type="radio" name="scent" className="sr-only" checked={scent === s} onChange={() => setScent(s)} />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <fieldset>
          <legend className="mb-3 text-lg font-extrabold">Antar-jemput</legend>
          <div className="grid grid-cols-2 gap-2.5">
            <label className={chip}>
              <input type="radio" name="pickup" className="sr-only" checked={pickup} onChange={() => setPickup(true)} />
              Jemput di tempatku
            </label>
            <label className={chip}>
              <input type="radio" name="pickup" className="sr-only" checked={!pickup} onChange={() => setPickup(false)} />
              Antar sendiri
            </label>
          </div>
          <AnimatePresence initial={false}>
            {pickup && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid gap-3 pt-4 sm:grid-cols-[1.4fr_1fr]">
                  <div>
                    <label htmlFor="address" className="text-sm font-bold">
                      Alamat jemput
                    </label>
                    <input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Nama kos, jalan, patokan"
                      className={`${field} mt-1.5`}
                    />
                  </div>
                  <div>
                    <label htmlFor="slot" className="text-sm font-bold">
                      Jam jemput
                    </label>
                    <select id="slot" value={slot} onChange={(e) => setSlot(e.target.value)} className={`${field} mt-1.5`}>
                      {pickupSlots.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <p className="mt-2.5 text-sm text-muted">
                  Gratis untuk {pricing.freePickupFromKg} kg ke atas, radius {pricing.pickupRadiusKm} km dari outlet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </fieldset>

        <div>
          <label htmlFor="name" className="text-lg font-extrabold">
            Nama
          </label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={`${field} mt-3`} />
        </div>
      </form>

      <div className="lg:sticky lg:top-24">
        <div className="nota rotate-[0.6deg] px-6 pb-7 pt-9 shadow-[0_28px_40px_-24px_rgb(15_28_63/0.45)] sm:px-8">
          <div className="flex items-baseline justify-between border-b-2 border-dashed border-nota-ink/30 pb-3">
            <p className="heading text-xl">{laundry.name}</p>
            <p className="text-sm font-bold text-nota-ink/70">Nota perkiraan</p>
          </div>

          <dl className="nota-lines mt-2">
            <div className="flex min-h-[4.8rem] items-end justify-between gap-4 pb-2">
              <dt className="text-sm font-bold">
                {service.label}
                <Hand className="block">
                  {billedKg} kg × {service.perKg.toLocaleString("id-ID")}
                </Hand>
              </dt>
              <dd>
                <Hand>{base.toLocaleString("id-ID")}</Hand>
              </dd>
            </div>
            {kilat && (
              <div className="flex min-h-[4.8rem] items-end justify-between gap-4 pb-2">
                <dt className="text-sm font-bold">
                  Kilat {pricing.kilatHours} jam
                  <Hand className="block">
                    {billedKg} kg × {pricing.kilatPerKg.toLocaleString("id-ID")}
                  </Hand>
                </dt>
                <dd>
                  <Hand>{kilatCost.toLocaleString("id-ID")}</Hand>
                </dd>
              </div>
            )}
            <div className="flex min-h-[2.4rem] items-end justify-between gap-4 pb-1.5">
              <dt className="text-sm font-bold">Antar-jemput</dt>
              <dd>
                <Hand>{!pickup ? "tidak" : pickupCost === 0 ? "gratis" : pickupCost.toLocaleString("id-ID")}</Hand>
              </dd>
            </div>
            <div className="flex min-h-[2.4rem] items-end justify-between gap-4 pb-1.5">
              <dt className="text-sm font-bold">Pewangi</dt>
              <dd>
                <Hand>{scent}</Hand>
              </dd>
            </div>
          </dl>

          {kg < pricing.minKg && (
            <p className="mt-3 text-sm font-semibold text-nota-ink/80">Di bawah {pricing.minKg} kg tetap dihitung {pricing.minKg} kg.</p>
          )}

          <div className="mt-5 flex items-center justify-between border-t-2 border-nota-ink/70 pt-4">
            <span className="text-lg font-extrabold">Total</span>
            <span className="relative px-3 py-1">
              <svg viewBox="0 0 200 70" preserveAspectRatio="none" className="absolute -inset-x-2 -inset-y-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1rem)]" aria-hidden="true">
                <path d="M30 8C80-2 170 2 190 24c14 18-20 40-90 40C30 64 4 48 10 30 14 18 40 10 80 8" fill="none" stroke="#e8507f" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={total}
                  initial={{ opacity: 0, y: -8, rotate: -4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="relative block"
                >
                  <Hand className="text-[2.4rem]">{rupiah(total)}</Hand>
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
          <p className="mt-4 min-h-6 text-sm font-semibold text-nota-ink/80">{done && <>Perkiraan selesai {done}.</>}</p>
        </div>

        <WaButton
          message={message}
          reply={[
            pickup ? `Siap, kurir kami jemput jam ${slot}.` : "Siap, kami tunggu di outlet ya.",
            "Kode cucianmu {kode}. Simpan kodenya untuk melacak status cucian di website kami.",
            `Perkiraan biaya ${rupiah(total)}, nanti kami kirim foto timbangannya.`,
          ].join("\n")}
          className="mt-6 flex items-center justify-center gap-2.5 rounded-full bg-wa px-6 py-4 font-extrabold text-white shadow-[0_14px_30px_-14px_rgb(18_140_75/0.9)] transition-transform hover:-translate-y-0.5"
        >
          {pickup ? "Minta dijemput lewat WhatsApp" : "Kirim pesanan lewat WhatsApp"}
        </WaButton>
        <p className="mt-3 text-center text-sm text-muted">Harga akhir mengikuti hasil timbangan di outlet.</p>
      </div>
    </div>
  );
}

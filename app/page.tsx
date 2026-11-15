import { AreaMap } from "@/components/area-map";
import { Calculator } from "@/components/calculator";
import { CareLabels } from "@/components/care-labels";
import { DemoNote } from "@/components/demo-note";
import { Tracker } from "@/components/tracker";
import { rupiah } from "@/components/wa";
import { WaButton, WaProvider } from "@/components/wa-sim";
import { Washer } from "@/components/washer";
import { faq, laundry, pricing, services, steps, unitItems, whatsapp } from "@/lib/data";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const h2 = "heading text-[clamp(2.2rem,4.6vw,3.4rem)]";
const pickupMessage = `Halo ${laundry.name}, saya mau minta jemput cucian.\nAlamat:\nJam jemput:`;
const pickupReply = "Halo, bisa. Kirim alamat dan jam jemputnya ya.\nSupaya biayanya jelas dulu, kamu juga bisa hitung di kalkulator website kami.";
const cheapestWash = Math.min(...services.filter((s) => s.id !== "setrika").map((s) => s.perKg));

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-cobalt" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export default function Home() {
  return (
    <WaProvider
      name={laundry.name}
      number={whatsapp.number}
      display={whatsapp.display}
      demo={whatsapp.demo}
      codePrefix="BL"
      avatarClassName="bg-cobalt"
    >
      <a
        href="#hitung"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-white px-5 py-3 font-bold shadow-lg focus:translate-y-0"
      >
        Langsung ke kalkulator
      </a>

      <header className="sticky top-0 z-40 bg-air/85 backdrop-blur-lg">
        <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
          <a href="#" className="flex items-center gap-2.5">
            <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true">
              <rect width="64" height="64" rx="16" fill="#1543c8" />
              <circle cx="32" cy="34" r="19" fill="#fff" />
              <circle cx="32" cy="34" r="13" fill="#e9f1fb" />
              <path d="M19 37c4 3 8 3 13 0s9-3 13 0v4a13 13 0 0 1-26 0Z" fill="#5d8bf4" />
              <circle cx="22" cy="11" r="3" fill="#fff" />
              <circle cx="30" cy="11" r="3" fill="#ffe89c" />
            </svg>
            <span className="heading whitespace-nowrap text-xl">{laundry.name}</span>
          </a>
          <nav aria-label="Navigasi" className="hidden gap-7 font-bold lg:flex">
            <a href="#hitung" className="hover:text-cobalt">Hitung biaya</a>
            <a href="#lacak" className="hover:text-cobalt">Lacak cucian</a>
            <a href="#label" className="hover:text-cobalt">Label baju</a>
            <a href="#area" className="hover:text-cobalt">Area jemput</a>
            <a href="#tanya" className="hover:text-cobalt">Tanya jawab</a>
          </nav>
          <WaButton
            message={pickupMessage}
            reply={pickupReply}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-wa px-4 py-2 text-sm font-extrabold text-white [&>svg]:size-4"
          >
            <span className="sm:hidden">Jemput</span>
            <span className="hidden sm:inline">Minta jemput</span>
          </WaButton>
        </div>
      </header>

      <main id="isi">
        <section>
          <div className={`${wrap} grid items-center gap-14 pb-20 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 lg:pt-14`}>
            <div>
              <h1 className="heading text-[clamp(2.8rem,6.6vw,5.4rem)]">{laundry.tagline}</h1>
              <p className="mt-6 max-w-[48ch] text-lg text-muted">{laundry.intro}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#hitung" className="rounded-full bg-cobalt px-7 py-4 font-extrabold text-white transition-colors hover:bg-cobalt-deep">
                  Hitung biaya cucian
                </a>
                <WaButton
                  message={pickupMessage}
                  reply={pickupReply}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 font-extrabold ring-2 ring-inset ring-line transition-colors hover:ring-cobalt [&>svg]:text-wa"
                >
                  Minta dijemput
                </WaButton>
              </div>
              <ul className="mt-10 grid gap-2.5 font-semibold sm:grid-cols-2">
                <li className="flex gap-2.5">
                  <Check />
                  Antar-jemput gratis dari {pricing.freePickupFromKg} kg
                </li>
                <li className="flex gap-2.5">
                  <Check />
                  Kilat {pricing.kilatHours} jam untuk yang mendadak
                </li>
                <li className="flex gap-2.5">
                  <Check />
                  Buka setiap hari 07.00 sampai 21.00
                </li>
                <li className="flex gap-2.5">
                  <Check />
                  Bayar tunai atau QRIS saat diantar
                </li>
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[25rem]">
              <Washer className="w-full drop-shadow-[0_40px_40px_rgb(15_28_63/0.18)]" />
              <p className="nota absolute -bottom-6 -left-4 -rotate-6 px-5 pb-4 pt-6 shadow-lg sm:-left-12">
                <span className="block text-sm font-bold">Mulai</span>
                <span className="font-hand text-4xl font-bold leading-none text-nota-ink">{rupiah(cheapestWash)}/kg</span>
              </p>
            </div>
          </div>
        </section>

        <section id="hitung" className="bg-white py-20 sm:py-24">
          <div className={wrap}>
            <h2 className={h2}>Hitung biaya cucianmu</h2>
            <p className="mb-12 mt-3 max-w-[56ch] text-muted">
              Atur layanan dan perkiraan beratnya. Notanya langsung terisi, lalu kirim lewat WhatsApp dan kami jemput sesuai jam yang kamu pilih.
            </p>
            <Calculator />
          </div>
        </section>

        <section id="lacak" className="py-20 sm:py-24">
          <div className={wrap}>
            <h2 className={h2}>Lacak cucian</h2>
            <p className="mb-10 mt-3 max-w-[52ch] text-muted">Masukkan kode cucianmu untuk melihat sudah sampai tahap mana.</p>
            <Tracker />
          </div>
        </section>

        <section id="satuan" className="border-t border-line py-20 sm:py-24">
          <div className={`${wrap} grid gap-10 lg:grid-cols-[0.8fr_1.2fr]`}>
            <div>
              <h2 className={h2}>Cuci satuan</h2>
              <p className="mt-4 max-w-[38ch] text-muted">
                Untuk barang besar atau yang perlu perlakuan khusus. Selesai 3 hari, bisa ikut dijemput bersama cucian kiloan.
              </p>
            </div>
            <ul className="divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-line">
              {unitItems.map((item) => (
                <li key={item.name} className="flex items-center justify-between gap-6 px-6 py-4 sm:px-8">
                  <span>
                    <span className="block font-extrabold">{item.name}</span>
                    {item.note && <span className="text-sm text-muted">{item.note}</span>}
                  </span>
                  <span className="whitespace-nowrap font-extrabold tabular-nums text-cobalt">{rupiah(item.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="label" className="bg-white py-20 sm:py-24">
          <div className={wrap}>
            <h2 className={h2}>Baca label bajumu</h2>
            <p className="mb-10 mt-3 max-w-[54ch] text-muted">
              Bingung dengan simbol di label baju? Pilih simbolnya untuk tahu artinya dan bagaimana kami merawat pakaian itu.
            </p>
            <CareLabels />
          </div>
        </section>

        <section id="cara" className="bg-cobalt py-20 text-white sm:py-24">
          <div className={wrap}>
            <h2 className={h2}>Dari kos sampai kembali ke lemari</h2>
            <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <span aria-hidden="true" className="absolute left-7 right-7 top-7 hidden border-t-[3px] border-dashed border-white/35 lg:block" />
              {steps.map((s, n) => (
                <li key={s.title} className="relative">
                  <span className="heading grid size-14 place-items-center rounded-full bg-white text-2xl text-cobalt ring-8 ring-cobalt">{n + 1}</span>
                  <h3 className="mt-5 text-xl font-extrabold">{s.title}</h3>
                  <p className="mt-2 max-w-[30ch] text-white/80">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="area" className="py-20 sm:py-24">
          <div className={wrap}>
            <h2 className={h2}>Area antar-jemput</h2>
            <p className="mb-8 mt-3 max-w-[54ch] text-muted">
              Outlet kami di {laundry.address}. Pilih daerahmu untuk cek apakah masuk area jemput gratis.
            </p>
            <div className="rounded-[28px] bg-white p-3 ring-1 ring-line sm:p-5">
              <AreaMap />
            </div>
          </div>
        </section>

        <section id="tanya" className="border-t border-line py-20 sm:py-24">
          <div className={`${wrap} grid gap-10 lg:grid-cols-[0.8fr_1.2fr]`}>
            <div>
              <h2 className={h2}>Tanya jawab</h2>
              <p className="mt-4 max-w-[34ch] text-muted">Pertanyaan lain? Chat kami di WhatsApp {whatsapp.display} (nomor contoh).</p>
            </div>
            <div className="flex flex-col gap-3">
              {faq.map((item, n) => (
                <details key={item.q} className="group rounded-3xl bg-white ring-1 ring-line open:ring-2 open:ring-cobalt" open={n === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-lg font-extrabold sm:px-7 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-air text-cobalt transition-transform group-open:rotate-45">
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="max-w-[60ch] px-6 pb-6 text-muted sm:px-7">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-cobalt-deep text-white/75">
        <div className={`${wrap} flex flex-wrap items-start justify-between gap-6 py-10 text-sm`}>
          <div>
            <p className="heading text-lg text-white">{laundry.name}</p>
            <p className="mt-1">
              {laundry.address}.{" "}
              <a href="#area" className="underline underline-offset-4">
                Lihat area jemput
              </a>
            </p>
            <p>Setiap hari 07.00 sampai 21.00, WhatsApp {whatsapp.display} (nomor contoh)</p>
          </div>
          <DemoNote className="max-w-[40ch]" />
        </div>
      </footer>
    </WaProvider>
  );
}

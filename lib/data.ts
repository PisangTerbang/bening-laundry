export const laundry = {
  name: "Bening Laundry",
  address: "Condongcatur, Depok, Sleman, Yogyakarta",
  tagline: "Cucian kiloan beres dua hari, dijemput dari kosmu.",
  intro:
    "Satu mesin untuk satu pelanggan, jadi bajumu tidak tercampur dengan cucian orang lain. Hitung biayanya di bawah, lalu kirim pesanan lewat WhatsApp.",
  open: 7,
  close: 21,
};

export const whatsapp = {
  number: "6281200000000",
  display: "0812-0000-0000",
  demo: true,
};

export const map = {
  home: { name: "Bening Laundry", x: 320, y: 210 },
  roads: [
    { d: "M-10 236 C180 226 460 246 650 230", w: 20, name: "Ring road utara", labelAt: [110, 222, -2] as [number, number, number] },
    { d: "M300 -10 C310 120 330 300 316 430", w: 12 },
    { d: "M-10 110 C200 120 420 96 650 120", w: 10 },
    { d: "M140 -10 C150 140 130 300 150 430", w: 9 },
    { d: "M500 -10 C490 160 520 300 500 430", w: 9 },
    { d: "M320 210 L470 170", w: 7 },
  ],
  water: [{ d: "M560 -10 C540 120 600 260 570 430", w: 10, name: "Sungai", labelAt: [592, 330, 80] as [number, number, number] }],
  parks: ["M380 300 h90 v70 h-90 Z"],
  places: [
    { id: "seturan", name: "Kos Seturan", kind: "kos" as const, x: 385, y: 175, km: 1.4, minutes: 5, note: "Masuk area antar-jemput gratis untuk 5 kg ke atas." },
    { id: "pogung", name: "Kos Pogung", kind: "kos" as const, x: 200, y: 160, km: 2.6, minutes: 9, note: "Masuk area antar-jemput gratis untuk 5 kg ke atas." },
    { id: "kampus", name: "Kampus", kind: "kampus" as const, x: 240, y: 268, km: 1.9, minutes: 7, note: "Kurir bisa jemput di depan gerbang atau di parkiran." },
    { id: "terminal", name: "Terminal", kind: "halte" as const, x: 334, y: 266, km: 1.1, minutes: 4, note: "Masuk area antar-jemput gratis untuk 5 kg ke atas." },
    { id: "stadion", name: "Stadion", kind: "stadion" as const, x: 520, y: 128, km: 4.2, minutes: 13, note: "Di luar radius 3 km. Bisa antar sendiri ke outlet, atau jemput dengan biaya Rp10.000." },
    { id: "perumahan", name: "Perumahan", kind: "kos" as const, x: 110, y: 332, km: 4.8, minutes: 15, note: "Di luar radius 3 km. Bisa antar sendiri ke outlet, atau jemput dengan biaya Rp10.000." },
  ],
};

export type ServiceId = "cuci-setrika" | "cuci-lipat" | "setrika";

export const services: { id: ServiceId; label: string; perKg: number; days: number; note: string }[] = [
  { id: "cuci-setrika", label: "Cuci dan setrika", perKg: 7000, days: 2, note: "Dilipat rapi, siap masuk lemari" },
  { id: "cuci-lipat", label: "Cuci dan lipat", perKg: 5500, days: 2, note: "Tanpa setrika, untuk kaos dan baju rumah" },
  { id: "setrika", label: "Setrika saja", perKg: 5000, days: 1, note: "Baju sudah bersih, tinggal disetrika" },
];

export const pricing = {
  minKg: 3,
  maxKg: 15,
  kilatPerKg: 4000,
  kilatHours: 6,
  pickupFee: 5000,
  freePickupFromKg: 5,
  pickupRadiusKm: 3,
};

export const scents = ["Lavender", "Sakura", "Ocean fresh", "Tanpa pewangi"] as const;

export type CareId = "cuci30" | "cuci40" | "tangan" | "noBleach" | "tumbleLow" | "noTumble" | "iron1" | "iron2" | "noIron" | "dry" | "shade" | "noWring";

export const careLabels: { id: CareId; name: string; meaning: string; treat: string }[] = [
  { id: "cuci30", name: "Cuci 30 derajat", meaning: "Boleh dicuci mesin dengan air maksimal 30°C.", treat: "Kami cuci dengan air dingin dan putaran normal." },
  { id: "cuci40", name: "Cuci 40 derajat", meaning: "Boleh dicuci mesin dengan air hangat sampai 40°C.", treat: "Cocok untuk handuk, sprei, dan kaos katun." },
  { id: "tangan", name: "Cuci tangan", meaning: "Jangan dicuci mesin. Kucek pelan dengan air dingin.", treat: "Masuk layanan satuan, dicuci tangan terpisah." },
  { id: "noBleach", name: "Tanpa pemutih", meaning: "Jangan pakai pemutih jenis apa pun.", treat: "Kami tidak memakai pemutih untuk pakaian berwarna." },
  { id: "tumbleLow", name: "Pengering suhu rendah", meaning: "Boleh dikeringkan mesin dengan panas rendah.", treat: "Pengering diatur ke suhu rendah." },
  { id: "noTumble", name: "Jangan dikeringkan mesin", meaning: "Jangan masuk pengering mesin, bisa menyusut.", treat: "Kami jemur di rak dalam ruangan." },
  { id: "iron1", name: "Setrika suhu rendah", meaning: "Setrika maksimal 110°C, untuk sintetis dan nilon.", treat: "Disetrika dengan alas kain." },
  { id: "iron2", name: "Setrika suhu sedang", meaning: "Setrika maksimal 150°C, untuk wol dan poliester.", treat: "Suhu setrika diturunkan satu tingkat." },
  { id: "noIron", name: "Jangan disetrika", meaning: "Panas setrika bisa merusak sablon atau bahan.", treat: "Cukup dilipat rapi, tanpa setrika." },
  { id: "dry", name: "Dry clean", meaning: "Perlu cuci kering dengan pelarut khusus, bukan air.", treat: "Kami teruskan ke mitra dry clean, selesai 4 hari." },
  { id: "shade", name: "Jemur di tempat teduh", meaning: "Jangan dijemur di bawah matahari langsung, warna bisa pudar.", treat: "Dijemur di rak dalam ruangan." },
  { id: "noWring", name: "Jangan diperas", meaning: "Jangan dipelintir atau diperas keras.", treat: "Putaran mesin dibuat paling pelan." },
];

export const trackSteps = [
  { title: "Dijemput kurir", body: "Cucian sudah diambil dari alamatmu." },
  { title: "Ditimbang", body: "Foto timbangan dikirim ke WhatsApp-mu." },
  { title: "Dicuci", body: "Masuk mesin sendiri, terpisah dari pelanggan lain." },
  { title: "Dikeringkan", body: "Dikeringkan sesuai label pakaian." },
  { title: "Disetrika dan dilipat", body: "Dirapikan lalu dikemas dalam plastik bersegel." },
  { title: "Diantar", body: "Kurir menuju alamatmu." },
];

export const unitItems: { name: string; price: number; note?: string }[] = [
  { name: "Bed cover besar", price: 25000 },
  { name: "Selimut tebal", price: 20000 },
  { name: "Sprei dan sarung bantal", price: 15000 },
  { name: "Sepatu", price: 35000, note: "Cuci bersih bagian dalam dan luar" },
  { name: "Tas ransel", price: 30000 },
  { name: "Helm", price: 25000, note: "Busa dicuci, kaca dibersihkan" },
];

export const steps = [
  { title: "Dijemput", body: "Kurir datang ke kos atau rumahmu di jam yang kamu pilih. Bisa juga antar sendiri ke outlet." },
  { title: "Ditimbang", body: "Foto timbangan dan nota dikirim ke WhatsApp-mu, jadi beratnya jelas sebelum dicuci." },
  { title: "Dicuci terpisah", body: "Satu mesin untuk satu pelanggan. Baju putih dan berwarna dipisah dulu." },
  { title: "Diantar kembali", body: "Cucian datang terlipat dalam plastik bersegel. Bayar tunai atau QRIS saat sampai." },
];

export const faq = [
  {
    q: "Apakah cucianku dicampur dengan punya orang lain?",
    a: "Tidak. Setiap pelanggan memakai satu mesin sendiri, termasuk saat pengeringan.",
  },
  {
    q: "Kalau ada baju yang hilang atau rusak?",
    a: "Laporkan dalam 1×24 jam setelah cucian diterima. Kami ganti sampai 10 kali biaya cuci baju tersebut.",
  },
  {
    q: "Berapa jauh area antar-jemput?",
    a: "Sampai 3 km dari outlet di Condongcatur. Gratis untuk cucian 5 kg ke atas, di bawah itu Rp5.000 sekali jalan. Cek areamu di peta di atas.",
  },
  {
    q: "Bisa titip cucian di luar jam buka?",
    a: "Bisa lewat kurir dengan janji temu sebelumnya. Outlet sendiri buka setiap hari pukul 07.00 sampai 21.00.",
  },
];

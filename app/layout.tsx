import type { Metadata, Viewport } from "next";
import "@fontsource-variable/nunito";
import "@fontsource-variable/caveat";
import "./globals.css";

const title = "Bening Laundry | Laundry Kiloan Antar-Jemput di Condongcatur";
const description =
  "Laundry kiloan mulai Rp5.500 per kg, satu mesin untuk satu pelanggan. Antar-jemput gratis dari 5 kg di sekitar Condongcatur, Sleman.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["laundry kiloan jogja", "laundry condongcatur", "laundry antar jemput", "laundry kilat sleman"],
  openGraph: { title, description, locale: "id_ID", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#1543c8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

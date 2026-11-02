import "./globals.css";
import { Roboto, Roboto_Slab } from "next/font/google"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export const metadata = {
  title: "Pustaka Senja",
  description: "Sebuah ruang baca dan perpustakaan komunitas di dekat kampus yang saat ini memiliki sembilan koleksi buku utama."
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-roboto-slab",
});

const daftarMenu = [
  { nama: "Beranda", path: "/" },
  { nama: "Katalog", path: "/katalog" },
  { nama: "Usulan Buku", path: "/usulan" }
];

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${roboto.variable} ${robotoSlab.variable}`}>
      <body className="min-h-screen flex flex-col bg-krem font-sans text-navy antialiased">
        <Navbar daftarMenu={daftarMenu} />

        <main className="flex-1 w-full mx-auto pt-8">
          {children}
        </main>

        <Footer daftarMenu={daftarMenu} />
      </body>
    </html>
  );
}

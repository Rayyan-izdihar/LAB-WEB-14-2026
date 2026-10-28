import { useState } from 'react';

import Navbar from './components/Navbar.jsx'
import MenuList from './components/MenuList.jsx'
import MenuCard from './components/MenuCard.jsx'
import RingkasanPesanan from './components/RingkasanPesanan.jsx'
import FormPesan from './components/FormPesan.jsx'
import Footer from './components/Footer.jsx'


function App() {
    const detailMenu = [
        { id: 1, nama: "Kopi Susu",     kategori: "Kopi",     harga: 18000, tersedia: true,  deskripsi: "Espresso dengan susu segar dan gula aren." },
        { id: 2, nama: "Americano",     kategori: "Kopi",     harga: 15000, tersedia: true,  deskripsi: "Espresso dengan air panas, rasa kuat dan bersih." },
        { id: 3, nama: "Cappuccino",    kategori: "Kopi",     harga: 22000, tersedia: true,  deskripsi: "Espresso, susu panas, dan busa susu tebal." },
        { id: 4, nama: "Matcha Latte",  kategori: "Non-Kopi", harga: 24000, tersedia: true,  deskripsi: "Teh hijau matcha dengan susu." },
        { id: 5, nama: "Teh Tarik",     kategori: "Non-Kopi", harga: 14000, tersedia: false, deskripsi: "Teh susu yang ditarik hingga berbusa." },
        { id: 6, nama: "Cokelat Panas", kategori: "Non-Kopi", harga: 20000, tersedia: true,  deskripsi: "Cokelat pekat dengan susu hangat." },
        { id: 7, nama: "Roti Bakar",    kategori: "Makanan",  harga: 16000, tersedia: true,  deskripsi: "Roti tebal dengan selai cokelat dan keju." },
        { id: 8, nama: "Pisang Goreng", kategori: "Makanan",  harga: 12000, tersedia: false, deskripsi: "Pisang goreng renyah dengan taburan keju." },
        { id: 9, nama: "Nasi Goreng",   kategori: "Makanan",  harga: 25000, tersedia: true,  deskripsi: "Nasi goreng kampung dengan telur mata sapi." }
    ];

    const [kategoriDipilih, setKategori] = useState("Semua");
    const [pesanan, setPesanan] = useState([]);

    return (
        <>
            <Navbar 
                pesanan={pesanan}
            />

            <section className="relative overflow-hidden rounded-b-[3rem] bg-tan px-5 py-14 text-center">
                <div className="absolute -left-10 top-6 h-32 w-32 rounded-full bg-cream/40"></div>
                <div className="absolute -right-6 bottom-4 h-24 w-24 rounded-full bg-coffee/30"></div>
                <div className="relative mx-auto max-w-xl">
                    <h1 className="text-4xl font-extrabold text-coffee sm:text-5xl">Kedai Kopi Senja</h1>
                    <p className="mt-3 text-lg font-semibold text-ink/80">Pesan sendiri dari meja, tanpa antre.</p>
                    <a href="#menu" className="mt-6 inline-block rounded-full bg-coffee px-8 py-4 font-bold text-cream transition hover:-translate-y-1 hover:shadow-lg active:scale-95">Lihat Menu</a>
                </div>
            </section>

            <main className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[2fr_1fr]">
                <div>
                    <MenuList 
                        kategoriDipilih={kategoriDipilih}
                        setKategori={setKategori}
                    />

                    <MenuCard
                        detailMenu={detailMenu}
                        kategoriDipilih={kategoriDipilih}
                        pesanan={pesanan}
                        setPesanan={setPesanan} 
                    />
                </div>  

                <aside id="pesanan" className="grid gap-6 pt-20 lg:sticky lg:top-24 lg:self-start">
                    <RingkasanPesanan 
                        pesanan={pesanan}
                        setPesanan={setPesanan}
                    />

                    <FormPesan
                        pesanan={pesanan}
                        setPesanan={setPesanan}
                    />
                </aside> 
            </main>

            <Footer />
        </>
    )
}

export default App

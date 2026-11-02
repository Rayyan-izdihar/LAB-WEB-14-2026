"use client";

import { useState } from "react";
import { sampulKategori } from "@/data/data";
import Link from "next/link";

export default function BukuCard({ dataBuku, jumlahBuku }) {
    const tech = dataBuku.filter((buku) => buku.kategori === "Teknologi").length
    const fiksi = dataBuku.filter((buku) => buku.kategori === "Teknologi").length
    const pdiri = dataBuku.filter((buku) => buku.kategori === "Teknologi").length

    const [kategoriDipilih, setKategori] = useState("Semua");
    const [favorit, setFavorit] = useState([]);

    const menuKategori = [
        {cat: "Semua", jumlah: jumlahBuku}, 
        {cat: "Teknologi", jumlah: tech}, 
        {cat: "Fiksi", jumlah: fiksi}, 
        {cat: "Pengembangan Diri", jumlah: pdiri}
    ]

    const filterBuku = dataBuku.filter((buku) => kategoriDipilih === "Semua" ? buku : buku.kategori === kategoriDipilih)

    const tambahFavorit = (idBuku) => (
        setFavorit(
            favorit.includes(idBuku) 
            ? favorit.filter((id) => id != idBuku)
            : [ ...favorit, idBuku]
        )
    )
    
    return (
        <section>
            <div className="mx-auto max-w-7xl md:pl-10 px-5 pb-16 pt-6">
                <h1 className="text-3xl font-judul font-extrabold leading-tight sm:text-5xl">Katalog Buku</h1>
                <p className="mt-2 text-lg text-cokelat max-w-xl">Pilih kategori, simpan buku favoritmu, lalu buka detailnya.</p>
            </div>
            
            <section className="rounded-t-[3rem] bg-kertas">
                <div className="grid gap-8 mx-auto max-w-7xl px-5 py-14 lg:grid-cols-[240px_1fr]">
                    <aside>
                        <h3 className="font-judul text-2xl font-bold mb-4">Kategori</h3>
                        
                        {menuKategori.map((menu, idx) => 
                            <button key={idx} 
                                type="button"
                                aria-pressed={menu.cat === kategoriDipilih}
                                className="flex w-full items-center justify-between bg-krem rounded-xl text-lg font-medium px-4 py-2 mb-2 btn-tekan hover:bg-krem-tua aria-pressed:bg-navy aria-pressed:text-krem"
                                onClick={() => setKategori(menu.cat)}
                            >
                                <p>{menu.cat}</p><span className="text-sm">{menu.jumlah}</span>
                            </button>
                        )}
                    </aside>

                    <div className="space-y-4">
                        <p className="text-sm text-cokelat">{`Menampilkan ${filterBuku.length} buku dari ${jumlahBuku}`}</p>
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {filterBuku.map((buku) => 
                                <div key={buku.id}
                                    className="flex flex-col rounded-3xl bg-white p-4 shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
                                >
                                    {sampulKategori(buku.kategori, buku.judul, buku.penulis)}

                                    <h3 className="mt-4 font-judul text-xl font-bold leading-snug">{buku.judul}</h3>
                                    <p className="text-lg text-cokelat">{buku.penulis}</p>
                                    <p className="mt-2">{buku.kategori} &middot; {buku.tahun}</p>
                                    <div className="mt-3">
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${buku.tersedia? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                            {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
                                        </span>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                                        <button
                                            type="button"
                                            aria-pressed={favorit.includes(buku.id)}
                                            className="grid h-12 w-12 place-items-center rounded-full border-2 border-navy/20 btn-tekan hover:border-oranye hover:text-oranye aria-pressed:border-oranye aria-pressed:bg-oranye aria-pressed:text-white"
                                            onClick={() => tambahFavorit(buku.id)}
                                        >
                                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill={favorit.includes(buku.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.4-9.5 9-9.5 9z" /></svg>
                                        </button>

                                        <Link href={`/katalog/${buku.id}`}
                                            className="inline-flex items-center rounded-full bg-oranye px-5 py-3 font-bold text-white btn-angkat"
                                        >
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </section>
    )
}
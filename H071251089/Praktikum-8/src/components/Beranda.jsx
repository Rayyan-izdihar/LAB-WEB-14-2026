import { jumlahBuku, bukuTersedia, bukuDipinjam } from "@/data/data"
import Link from "next/link";
import Image from "next/image";

export default function Beranda({ nama, slogan, deskripsi, lokasi, jamBuka }) {
    const statistik = [
        { label: "Total Koleksi Buku", nilai: jumlahBuku, warna: "bg-navy text-krem" },
        { label: "Buku Tersedia", nilai: bukuTersedia, warna: "bg-oranye text-white" },
        { label: "Buku Dipinjam", nilai: bukuDipinjam, warna: "bg-cokelat text-krem" },
    ];

    return (
        <header>
            <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 pt-6 md:grid-cols-2">
                <div className="md:pl-10">
                    <p className="inline-block rounded-full bg-navy text-krem font-bold px-4 py-2">Ruang baca komunitas</p>
                    <h1 className="mt-5 text-4xl font-judul font-extrabold leading-tight sm:text-5xl lg:text-7xl">{nama}</h1>
                    <p className="mt-2 text-2xl font-judul text-cokelat font-bold">{slogan}</p>
                    <p className="mt-4 text-lg text-cokelat max-w-xl">{deskripsi}</p>
                    <ul className="mt-5 space-y-1">
                        <p>Lokasi: {lokasi}</p>
                        <p>Jam Buka: {jamBuka}</p>
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-3 text-lg">
                        <Link href="/katalog"
                            className="inline-flex items-center rounded-full bg-oranye text-white font-bold px-7 py-3 shadow-md btn-angkat"
                        >
                            Lihat Katalog
                        </Link>
                        <Link href="/usulan"
                            className="inline-flex items-center border-[2.5px] rounded-full font-bold px-7 py-3 btn-tekan hover:bg-navy hover:text-krem"
                        >
                            Usulan Buku
                        </Link>
                    </div>
                </div>

                <Image
                    src="/book-header.svg" alt="Tumpukan buku di bawah matahari senja" width={500} height={450}
                    className="mx-auto"
                />
            </div>

            <div className="rounded-t-[3rem] bg-kertas">
                <div className="mx-auto max-w-7xl px-5 py-14">
                    <h2 className="font-judul text-2xl font-bold mb-8">Isi rak kami</h2>

                    <div className="grid grid gap-5 sm:grid-cols-3">
                        {statistik.map((stat) => (
                            <div key={stat.label} className={`relative rounded-b-xl rounded-t-[2rem] p-6 pt-10 transition hover:-translate-y-2 hover:shadow-md ${stat.warna}`}>
                                <span className="absolute inset-x-6 top-4 h-1.5 rounded-full bg-white/40"></span>
                                <h1 className="text-6xl font-judul font-extrabold">{stat.nilai}</h1>
                                <p className="mt-2 text-lg font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
}
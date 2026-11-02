import { sampulKategori } from "@/data/data";
import { dataBuku } from "@/data/data";
import Link from "next/link";

export default function DetailBuku({ buku }) {
    return (
        <section>
            <div className="mx-auto max-w-7xl md:pl-10 px-5 pb-16 pt-6">
                <h1 className="text-3xl font-judul font-extrabold leading-tight sm:text-5xl">Detail Buku</h1>
                <p className="mt-2 text-lg text-cokelat max-w-xl">Informasi lengkap dan sinopsis buku.</p>
            </div>
            
            <section className="rounded-t-[3rem] bg-kertas">
                <div className="mx-auto max-w-7xl px-5 py-14">
                    <Link href="/katalog" className="inline-flex py-3 items-center text-lg font-bold text-oranye hover:underline">
                        &larr; Kembali ke Katalog
                    </Link>

                    <article className="mt-8 grid gap-14 md:grid-cols-[350px_1fr]">
                        {sampulKategori(buku.kategori, buku.judul, buku.penulis)}

                        <div>
                            <h2 className="font-judul text-3xl font-bold sm:text-5xl">{buku.judul}</h2>
                            <p className="mt-1 text-xl text-cokelat">{buku.penulis}</p>

                            <dl className="mt-6 grid max-w-md grid-cols-2 gap-4 rounded-2xl bg-krem p-5 text-lg">
                                <div><dt className="text-cokelat">Kategori</dt><dd className="font-bold">{buku.kategori}</dd></div>
                                <div><dt className="text-cokelat">Tahun terbit</dt><dd className="font-bold">{buku.tahun}</dd></div>
                                <div>
                                    <dt className="text-cokelat">Status</dt>
                                    <dd className="mt-1">
                                        <span className={`rounded-full px-3 py-1 text-sm font-bold ${buku.tersedia? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                            {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                            
                            <h3 className="mt-10 font-judul text-2xl font-bold">Sinopsis</h3>
                            <p className="mt-2 max-w-2xl text-lg leading-relaxed">{buku.sinopsis}</p>
                        </div>
                    </article>
                </div>
            </section>
        </section>
    )
}
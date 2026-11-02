import { dataBuku } from "@/data/data";
import DetailBuku from "@/components/DetailBuku"
import Link from "next/link";
import Image from "next/image";

export default async function DetaillBukuCard({ params }) {
    const { id } = await params;
    const buku = dataBuku.find((data) => data.id === id);

    if (!buku) {
        return (
            <section>
                <div className="mx-auto max-w-7xl md:pl-10 px-5 pb-16 pt-6">
                    <h1 className="text-3xl font-judul font-extrabold leading-tight sm:text-5xl">Buku Tidak Ditemukan</h1>
                    <p className="mt-2 text-lg text-cokelat max-w-xl">Alamat yang kamu buka tidak cocok dengan koleksi kami.</p>
                </div>

                <div className="rounded-t-[3rem] bg-kertas text-center py-12">
                    <Image src="/not-found-book.svg" alt="Not Found Image" width={240} height={150}
                        className="mx-auto"
                    />

                    <h2 className="mt-6 font-judul text-2xl font-bold">Buku dengan id <span className="text-oranye">{id}</span> tidak ada</h2>
                    <p className="mt-2 text-cokelat">Cek lagi alamatnya, atau pilih buku dari katalog.</p>
                    <Link href="/katalog" 
                        className="mt-6 inline-flex items-center rounded-full bg-oranye px-7 py-3 font-bold text-white shadow-md btn-angkat"
                    >
                        Kembali ke Katalog
                    </Link>
                </div>
            </section>
        )        
    }

    return (
        <DetailBuku 
            buku={buku}
        />
    )
}
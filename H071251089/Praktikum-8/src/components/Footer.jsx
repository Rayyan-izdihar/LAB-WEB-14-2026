import Link from "next/link";
import Image from "next/image";

export default function Footer({ daftarMenu }) {
    return (
        <footer className="bg-navy text-krem text-base">
            <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3">
                <div>
                    <div className="flex items-center gap-2 font-judul font-bold text-2xl">
                        <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                        Pustaka Senja
                    </div>
                    <p className="mt-3 text-krem/80">Ruang baca dan perpustakaan komunitas di dekat kampus</p>
                </div>

                <div>
                    <p className="font-bold text-lg mb-3">Menu</p>
                    <div className="flex flex-col gap-1">
                        {daftarMenu.map((menu) => (
                            <div key={menu.path}>
                                <Link href={menu.path}
                                    className="text-krem/80 hover:text-white"
                                >
                                    {menu.nama}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="font-bold text-lg mb-3">Kunjungi Kami</p>
                    <div className="text-krem/80">
                        <p>Perpustakaan Kampus Universitas Hasanuddin</p>
                        <p><span className="text-white/80 font-bold">Senin - Sabtu:</span> 09.00 - 20.00 WITA</p>
                    </div>
                    <Link href="https://www.google.com/maps/search/?api=1&query=Karaeng+Pattingalloang+Perpustakaan+Pusat+Universitas+Hasanuddin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex p-2 rounded-full border-2 border-krem/60 bg-krem/10 mt-3 gap-3 items-center font-medium btn-tekan hover:bg-krem/20"
                    >
                        <Image src="/maps.svg" alt="Logo" width={24} height={24} />
                        Pustaka Senja
                    </Link>
                </div>
            </div>

            <p className="border-t border-white/15 py-4 text-center text-krem/80">&copy; 2026 Pustaka Senja</p>
        </footer>
    )
}
import { useState } from "react";

function MenuCard({detailMenu, kategoriDipilih, pesanan, setPesanan}) {
    const icon_kopi = <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 10h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8 3v3M12 3v3"/></svg>
    const icon_nonkopi = <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4h12l-1.5 15a1 1 0 0 1-1 .9h-7a1 1 0 0 1-1-.9z"/><path d="M7 10h10M13 4l2-2"/></svg>
    const icon_makanan = <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15h16a8 8 0 0 1-16 0z"/><path d="M12 6v4M8 7.5l1 2.5M16 7.5l-1 2.5"/></svg>

    const [lihatDetail, setLihatDetail] = useState([])
    const tampilkanDetail = (id) => {
        setLihatDetail(
            lihatDetail.includes(id)
                ? lihatDetail.filter((menuId) => menuId != id)
                : [ ...lihatDetail, id]
        )
    }

    const tambahPesanan = (menu) => {
        setPesanan(
            pesanan.some((menuPesan) => menuPesan.id === menu.id)
                ? pesanan.map((menuPesanan) => (menuPesanan.id === menu.id ? { ...menuPesanan, jumlah: menuPesanan.jumlah + 1 } : menuPesanan))
                : [ ...pesanan, { ...menu, jumlah: 1 } ]
        )
    }

    return (
        <div className="mt-6 grid md:grid-cols-2 gap-4">
            {detailMenu.filter((menu) => kategoriDipilih === "Semua" ? menu : menu.kategori === kategoriDipilih)
            .map((menu) => (
                <div key={menu.id} 
                    className={`rounded-3xl bg-white p-4 shadow-sm ${menu.tersedia ? "" : "opacity-70"}`}>

                    <div className="flex items-center gap-4">
                        <div className="grid h-18 w-16 place-items-center bg-coffee rounded-2xl text-tan">{menu.kategori === "Kopi" ? icon_kopi : menu.kategori === "Non-Kopi" ? icon_nonkopi : icon_makanan}</div>
                        <div className="flex-1">
                            <h3 className="text-lg font-extrabold">{menu.nama}</h3>
                            <p className="text-base text-coffee/70">{menu.kategori}</p>
                            <p className="font-bold text-coffee">{`Rp ${menu.harga.toLocaleString("id-ID")}`}</p>
                        </div>

                        <button 
                            type="button"
                            disabled={!menu.tersedia} 
                            className={`rounded-full font-bold px-5 py-3 ${menu.tersedia 
                                ? "bg-coffee text-cream transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95" 
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
                            onClick={() => tambahPesanan(menu)}
                        >
                            {menu.tersedia? "Tambah" : "Habis"}
                        </button>
                    </div>

                    <button 
                        type="button" 
                        className="mt-2 pt-2 underline decoration-2 underline-offset-6 text-ink/80 font-bold text-sm transition hover:-translate-y-0.5 active:scale-95"
                        onClick={() => tampilkanDetail(menu.id)}
                    >
                        {lihatDetail.includes(menu.id) ? "Tutup Detail" : "Lihat Detail"}
                    </button>

                    {lihatDetail.includes(menu.id) && (
                        <div className=" mt-3 px-5 py-3 bg-cream rounded-[1rem] font-semibold text-sm shadow-sm">
                            {menu.deskripsi}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default MenuCard

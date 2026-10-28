
function RingkasanPesanan({pesanan, setPesanan}) {
    const totalItem = pesanan.reduce((sum, menu) => sum + menu.jumlah, 0)
    const totalHarga = pesanan.reduce((sum, menu) => sum + menu.jumlah * menu.harga, 0)

    const rp = (nominal) => ("Rp " + nominal.toLocaleString("id-ID"))

    const kurangiPesanan = (menu) => {
        setPesanan(
            pesanan
            .map((menuPesanan) => ( menu.id === menuPesanan.id ? { ...menuPesanan, jumlah: menuPesanan.jumlah - 1} : menuPesanan))
            .filter((menuPesanan) => menuPesanan.jumlah > 0)
        )
    }

    return (
        <div className="bg-white rounded-[2rem] text-coffee p-6">
            <h3 className="text-xl font-extrabold mb-4">Ringkasan Pesanan</h3>

            {pesanan.length === 0 && (
                <div className="bg-cream rounded-[2rem] text-center font-semibold p-5">Belum ada pesanan. Silahkan memesan terlebih dahulu </div>
            )}

            {pesanan.length !== 0 && (
                <div className="space-y-2">

                    <div className="divide-y divide-gray-300">
                        {pesanan.map((menu) => (
                            <div key={menu.id} className="flex items-center justify-between py-3">
                                <div>
                                    <p className="text-ink font-extrabold">{menu.nama} <span className="text-coffee">{`× ${menu.jumlah}`}</span></p>
                                    <p className="text-sm text-coffee/70">{rp(menu.harga * menu.jumlah)}</p>
                                </div>

                                <button
                                    type="button"
                                    className="w-12 h-12 rounded-full bg-cream text-xl font-extrabold transition hover:bg-tan active:scale-95"
                                    onClick={() => kurangiPesanan(menu)}
                                >
                                    −
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between bg-cream rounded-[1.25rem] font-extrabold p-5">
                        <p>{`Total (${totalItem} item)`}</p>
                        <p>{rp(totalHarga)}</p>
                    </div>

                </div>
            )}
        </div>
    )
}

export default RingkasanPesanan

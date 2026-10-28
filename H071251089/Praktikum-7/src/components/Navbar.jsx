import logo from '../assets/logo-kopi-senja.svg'

function Navbar({pesanan}) {
    const totalItem = pesanan.reduce((sum, menu) => sum + menu.jumlah, 0)
    const totalHarga = pesanan.reduce((sum, menu) => sum + menu.jumlah * menu.harga, 0)

    return (
        <nav className="sticky top-0 z-50 bg-coffee py-3">
            <div className="flex mx-auto md:max-w-6xl items-center justify-between px-5 text-base">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="Logo Kopi Senja" className="w-12 h-12" />
                    <span className="text-cream font-extrabold  md:text-xl">Kopi Senja</span>
                </div>

                <a href="#pesanan" className="bg-cream rounded-full font-bold text-coffee px-4 py-2">
                    {`${totalItem} item · Rp ${totalHarga.toLocaleString("id-ID")}`} 
                </a>
            </div>
        </nav>
    )
}

export default Navbar

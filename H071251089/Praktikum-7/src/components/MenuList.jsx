
function MenuList({kategoriDipilih, setKategori}) {
    const daftarKategori = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

    return (
        <div id="menu" className="pt-20">
            <h2 className="text-3xl font-extrabold text-coffee">Menu</h2>
            <div className="mt-4 flex flex-wrap gap-2">
                {daftarKategori.map((kategori) => (
                    <button 
                        key={kategori}
                        aria-pressed={kategori === kategoriDipilih}
                        className="px-5 py-4 bg-white rounded-full font-bold text-coffee transition hover:bg-tan active:scale-95 aria-pressed:bg-coffee aria-pressed:text-cream"
                        onClick={() => setKategori(kategori)}
                    >
                        {kategori}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default MenuList

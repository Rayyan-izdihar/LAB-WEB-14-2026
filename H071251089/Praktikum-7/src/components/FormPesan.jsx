import { useState } from "react";

function FormPesan({pesanan, setPesanan}) {
    const [nama, setNama] = useState("")
    const [meja, setMeja] = useState("")
    const [validasi, setValidasi] = useState(false)
    const [terkirim, setTerkirim] = useState(false)
    const totalPesanan = pesanan.reduce((sum, menu) => sum + menu.jumlah, 0)

    const hasilValidasi = (nama, meja, totalPesanan) => (
        [
            totalPesanan === 0 ? true : false,
            !nama.trim() ? true : false,
            !meja.trim() || !Number.isInteger(Number(meja)) || Number(meja) < 1 || Number(meja) > 50 ? true : false
        ] 
    )
    
    const hasilValidasiForm = hasilValidasi(nama, meja, totalPesanan)
    function handleSubmit(e) {
        e.preventDefault();

        const hasil = hasilValidasi(nama, meja, totalPesanan);
        const tidakValid = hasil.some((value) => value === true);

        setValidasi(tidakValid);

        if (tidakValid) {
            setTerkirim(false);
            return;
        }

        setTerkirim(true);

        setNama("")
        setMeja("")
        setPesanan([])
    }

    return (
        <div className="bg-coffee rounded-[2rem] text-cream p-6">
            <h3 className="text-xl font-extrabold mb-4">Form Pemesanan</h3>

            {terkirim && (
                <div className="bg-tan rounded-[2rem] text-coffee text-lg text-left font-bold p-5 mb-4">
                    {`Terima kasih telah memesan. Pesanan kamu akan segera datang!`} 
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label htmlFor="nama" className="mb-1 block font-semibold">Nama</label>
                <input 
                    id="nama"
                    type="text"
                    placeholder="Nama Kamu" 
                    className="w-full bg-cream px-5 py-3 rounded-full text-ink placeholder:text-ink/50 focus:outline-none focus:ring-4 focus:ring-tan mb-5"
                    value={nama}
                    onChange={(e) =>
                        setNama(e.target.value)
                    }
                /> 

                <label htmlFor="meja" className="mb-1 block font-semibold">Nomor Meja</label>
                <input 
                    id="meja"
                    type="text"
                    placeholder="Contoh: 7" 
                    className="w-full bg-cream px-5 py-3 rounded-full text-ink placeholder:text-ink/50 focus:outline-none focus:ring-4 focus:ring-tan"
                    value={meja}
                    onChange={(e) =>
                        setMeja(e.target.value)
                    }
                />

                {validasi && (
                    <div className="mt-5 bg-white rounded-[2rem] text-red-500 px-10 py-5">
                        <ul>
                            <li className={`list-disc pl-5 ${hasilValidasiForm[0] ? "" : "hidden"}`}>Pesanan masih kosong. Pilih menu terlebih dahulu.</li>
                            <li className={`list-disc pl-5 ${hasilValidasiForm[1] ? "" : "hidden"}`}>Nama wajib diisi.</li>
                            <li className={`list-disc pl-5 ${hasilValidasiForm[2] ? "" : "hidden"}`}>Nomor meja harus berupa angka 1 sampai 50.</li>
                        </ul>
                    </div>
                )}

                <button 
                    type="submit" 
                    className="mt-5 w-full py-3 text-lg rounded-full bg-tan font-bold text-coffee transition hover:-translate-y-1 hover:shadow-lg active:scale-95"
                >
                    Kirim Pesanan
                </button>
            </form>
        </div>
    )
}

export default FormPesan
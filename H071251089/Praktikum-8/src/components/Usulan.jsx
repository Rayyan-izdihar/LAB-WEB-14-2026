"use client";

import { useState } from "react";

export default function Usulan() {
    // data
    const [nama, setNama] = useState("");
    const [judul, setJudul] = useState("");
    const [kategori, setKategori] = useState("");
    const [alasan, setAlasan] = useState("");
    const [komentar, setKomentar] = useState([]);


    // animasi notifikasi
    const [dataTampil, setDatatampil] = useState({nama: "", judul: ""});
    const [notifTampil, setNotifTampil] = useState(false);


    // logika validasi inputan
    const [validasiGagal, setvalidasiGagal] = useState(false);
    const [terkirim, setTerkirim] = useState(false);

    const hasilValidasi =
    [
        { cek: nama.trim() !== '' ? true : false,  desc: "Nama pengusul belum diisi."},
        { cek: judul.trim() !== '' ? true : false, desc: "Judul buku belum diisi."},
        { cek: kategori !== '' ? true : false,     desc: "Kategori buku belum dipilih."},
        { cek: alasan.trim() !== '' ? true : false,  desc: "Alasan usulan belum diisi."}
    ]

    const valid = hasilValidasi.every((hasil) => hasil.cek === true)

    function handleSubmit(e) {
        e.preventDefault();

        setvalidasiGagal(!valid)

        if (!valid) {
            setTerkirim(false)
            return;
        }

        setKomentar((komentar) =>
            [ {nama: nama, judul: judul, kategori: kategori, alasan: alasan}, ...komentar ]
        )

        setDatatampil({nama, judul})
        setTerkirim(true)

        setTimeout(() => {
            setNotifTampil(true);
        }, 10);

        setTimeout(() => {
            setNotifTampil(false);
        }, 4500);

        setTimeout(() =>{
            setTerkirim(false);
        }, 5000)

        setNama("")
        setJudul("")
        setKategori("")
        setAlasan("")
    }


    // return
    return (
        <section>
            <div className="mx-auto max-w-7xl md:pl-10 px-5 pb-16 pt-6">
                <h1 className="text-3xl font-judul font-extrabold leading-tight sm:text-5xl">Usulan Buku</h1>
                <p className="mt-2 text-lg text-cokelat max-w-xl">Ada judul yang belum ada di rak kami? Tulis usulanmu di sini.</p>
            </div>

            <section className="rounded-t-[3rem] bg-kertas">
                <div className="grid gap-8 mx-auto max-w-7xl px-5 py-14 md:grid-cols-[1fr_1.2fr]">
                    <div className="space-y-8">
                        <div className="bg-navy text-krem rounded-[2rem] p-8 space-y-3">
                            <h2 className="font-judul text-xl font-medium">Buku apa yang ingin kamu baca?</h2>
                            <p className="text-krem/90 max-w-xl">Usulanmu membantu pengelola memilih koleksi berikutnya. Isi usulan buku kamu kepada kami.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-7 rounded-[2rem] bg-white text-lg p-6 shadow-md ring-1 ring-black/5 sm:p-8">
                            <div>
                                <label htmlFor="nama" className="mb-1 block font-semibold">Nama Pengusul</label>
                                <input id="nama" type="text" className="min-h-12 w-full rounded-xl border-3 border-navy/20 bg-white px-4 input-focus"
                                    value={nama} onChange={(e) => setNama(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="judul" className="mb-1 block font-semibold">Judul Buku yang Diusulkan</label>
                                <input id="judul" type="text" className="min-h-12 w-full rounded-xl border-3 border-navy/20 bg-white px-4 input-focus"
                                    value={judul} onChange={(e) => setJudul(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="kategori" className="mb-1 block font-semibold">Kategori Buku</label>
                                <select id="kategori" className="min-h-12 w-full rounded-xl border-3 border-navy/20 bg-white px-4 input-focus"
                                    value={kategori} onChange={(e) => setKategori(e.target.value)}
                                >
                                    <option value="">Pilih kategori</option> 
                                    <option value="Teknologi" className="text-oranye font-medium">Teknologi</option> 
                                    <option value="Fiksi" className="text-oranye font-medium">Fiksi</option> 
                                    <option value="Pengembangan Diri" className="text-oranye font-medium">Pengembangan Diri</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="alasan" className="mb-1 block font-semibold">Ulasan Usulan</label>
                                <textarea id="alasan" rows={4} className="min-h-12 w-full rounded-xl border-3 border-navy/20 bg-white px-4 input-focus"
                                    value={alasan} onChange={(e) => setAlasan(e.target.value)}
                                ></textarea>
                            </div>

                            {(validasiGagal && !valid) && (
                                <ul className="list-disc rounded-xl bg-red-100 p-4 pl-8 text-sm font-medium text-red-800">
                                    {hasilValidasi.map((hasil, idx) => 
                                        <li key={idx} className={`pl-5 ${hasil.cek ? "hidden" : ""}`}>{hasil.desc}</li>
                                    )}
                                </ul>
                            )}

                            {terkirim && (
                                <p className={`rounded-xl bg-green-100 p-4 font-medium text-green-800 transition-all duration-500 ease-in-out ${notifTampil ? "-translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
                                    {`Usulan buku kamu "${dataTampil.judul}" berhasil dikirim. Terima kasih, ${dataTampil.nama}!`}
                                </p>
                            )}

                            <button 
                                type="submit" 
                                className="w-full py-3 text-lg rounded-full bg-oranye font-bold text-white btn-angkat"
                            >
                                Kirim Usulan
                            </button>
                        </form>
                    </div>


                    <div>
                        <h3 className="font-judul text-3xl font-bold mt-10 md:mt-0 px-4">Usulan Sesi ini</h3>

                        {komentar.length <= 0 && (
                            <p className="mt-15 text-cokelat text-center">Belum ada usulan yang dikirim.</p>
                        )}

                        <div className={`mt-7 grid gap-4 ${komentar.length <= 0 ? "hidden" : ""} max-h-screen overflow-y-auto max-w-xs md:max-w-full`}>
                            {komentar.map((prev, idx) => (
                                <div key={idx} className="rounded-2xl border-l-8 border-oranye bg-krem p-5">
                                    <p className="font-judul text-lg font-bold">{prev.judul}</p>
                                    <p className="text-sm text-cokelat">{prev.kategori} &middot; diusulkan {prev.nama}</p>
                                    <p className="mt-2">{prev.alasan}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}
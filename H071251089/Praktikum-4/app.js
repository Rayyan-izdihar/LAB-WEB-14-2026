const dataPraktikan = [
  { nama: "Budi", nilaiTugas: [80, 85, 90] },
  { nama: "Siti", nilaiTugas: [60, 60, 60] },
  { nama: "Andi", nilaiTugas: [90, 90, 90] },
  { nama: "Dewi", nilaiTugas: [75, 75, 75] },
  { nama: "Eko", nilaiTugas: [45, 45, 45] },
  { nama: "Elang", nilaiTugas: [70, 100, 80]}
];

const hasilPraktikan = dataPraktikan.map(function(item) {
    const totalNilai = item.nilaiTugas.reduce((acc, curr) => acc + curr, 0);
    const rataRata = totalNilai / item.nilaiTugas.length;

    const status = rataRata >= 75 ? "Lulus" : "Tidak Lulus";

    return {
    nama: item.nama,
    nilaiTugas: item.nilaiTugas,
    rataRata: rataRata.toFixed(2),
    status: status
    };
})



const namaAsisten = prompt("Masukkan nama Asisten Lab:");

if (namaAsisten) {
    document.write("<div class='bg-emerald-400/30 border-l-6 border-emerald-600 rounded-lg my-6 p-4'>");
        document.write("<p class='text-lg text-emerald-400 font-bold'>Selamat Datang " + namaAsisten + "!</p>");
        document.write("<p class='text-xs text-emerald-200 font-medium'>Berikut adalah laporan hasil praktikum</p>");
    document.write("</div>");

    dataStyling(hasilPraktikan);
} else {
    document.write("<div class='bg-rose-400/30 border-l-6 border-rose-600 rounded-lg my-6 p-4'>");
        document.write("<p class='text-lg text-rose-400 font-bold'>Akses Di Tolak</p>");
        document.write("<p class='text-xs text-rose-200 font-medium'>Anda tidak memasukkan identitas asisten.</p>");
    document.write("</div>");
}



function dataStyling(hasilPraktikan) {
    document.write("<div class='grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5 mb-8'>");

    hasilPraktikan.forEach(function(data) {
        const badgeStyle = data.status === "Lulus"
            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
            : "bg-rose-500/10 text-rose-400 border-rose-500/30";
        
        document.write("<div class='bg-slate-700/40 p-5 border border-slate-700 rounded-xl shadow-xs shadow-white/50 hover:shadow-white/95'>");
            document.write("<div class='flex items-center justify-between mb-3'>");
                document.write("<p class='text-lg text-white font-bold'>" + data.nama + "</p>");
                document.write("<span class='text-xs px-2.5 py-1 rounded-full border font-semibold " + badgeStyle + " '>" + data.status + "</span>");
            document.write("</div>");
        
            document.write("<p class='text-xs text-slate-400 mb-2'>Daftar Nilai Tugas:</p>");
            document.write("<div class='flex gap-3 mb-4'>");

            data.nilaiTugas.forEach(function(nilai) {
                document.write("<p class='text-sm text-white font-mono bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 shadow-xs shadow-white/50'>" + nilai + "</p>");
            });

            document.write("</div>");

            document.write("<div class='flex items-center justify-between py-2 border-t border-slate-600'>");
                document.write("<p class='text-sm text-slate-400'>Rata-rata:</p>");
                document.write("<span class='text-amber-400 font-bold font-mono'> " + data.rataRata + " </span>");

        document.write("</div></div>");
    });

    document.write("</div>")

    console.log(`Data Array: ${hasilPraktikan}`);
}
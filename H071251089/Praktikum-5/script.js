// ===== Konfigurasi =====
const API_URL = "https://jsonplaceholder.typicode.com";

// ===== Elemen HTML =====
const elStatusAnggota = document.getElementById("status-anggota");
const elDaftarAnggota = document.getElementById("daftar-anggota");
const elJudulBagian = document.getElementById("judul-bagian");
const elRingkasan = document.getElementById("ringkasan");
const elBarProgres = document.getElementById("bar-progres");
const elCari = document.getElementById("cari-tugas");
const elForm = document.getElementById("form-tugas");
const elInputJudul = document.getElementById("judul-tugas");
const elTombolSimpan = document.getElementById("tombol-simpan");
const elPesanForm = document.getElementById("pesan-form");
const elStatusTugas = document.getElementById("status-tugas");
const elDaftarTugas = document.getElementById("daftar-tugas");
const elNotifikasi = document.getElementById("notifikasi");

// ===== Class Tailwind untuk penanda anggota terpilih =====
const KELAS_TOMBOL_BIASA = ["text-slate-600", "hover:bg-slate-100"];
const KELAS_TOMBOL_AKTIF = ["bg-blue-50", "text-blue-700", "font-semibold"];
const KELAS_BADGE_BIASA = ["bg-slate-100", "text-slate-500"];
const KELAS_BADGE_AKTIF = ["bg-blue-600", "text-white"];

// ===== Class Tailwind untuk tugas selesai =====
const KELAS_JUDUL_SELESAI = ["line-through", "text-gray-400"];
const KELAS_BULAT_BIASA = ["border-slate-300"];
const KELAS_BULAT_SELESAI = ["bg-emerald-600", "border-emerald-600", "text-white"];

// ===== State =====
let daftarTugas = [];        // tugas anggota yang sedang ditampilkan
let anggotaTerpilih = null;  // { tombol, badge } milik anggota yang sedang dipilih
let nomorPermintaan = 0;     // untuk mengabaikan respons lama jika user klik anggota lain
let sedangMenyimpan = false;
let timerNotifikasi = null;

// ===== Fungsi bantu =====
function ambilPesanError(error) {
  // fetch yang gagal karena koneksi akan melempar TypeError
  if (error instanceof TypeError) {
    return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
  }
  return error.message;
}

function tampilkanStatus(elemen, teks, adalahError) {
  elemen.textContent = teks;
  elemen.classList.remove("hidden");
  if (adalahError) {
    elemen.classList.remove("text-slate-500");
    elemen.classList.add("text-red-600");
  } else {
    elemen.classList.remove("text-red-600");
    elemen.classList.add("text-slate-500");
  }
}

function sembunyikanStatus(elemen) {
  elemen.textContent = "";
  elemen.classList.add("hidden");
}

function aturKontrol(aktif) {
  elCari.disabled = !aktif;
  elInputJudul.disabled = !aktif;
  elTombolSimpan.disabled = !aktif;
}

function tampilkanPesanForm(teks) {
  elPesanForm.textContent = teks;
  elPesanForm.classList.remove("hidden");
}

function sembunyikanPesanForm() {
  elPesanForm.textContent = "";
  elPesanForm.classList.add("hidden");
}

function tampilkanNotifikasi(teks) {
  elNotifikasi.textContent = teks;
  elNotifikasi.classList.remove("opacity-0", "translate-y-2", "pointer-events-none");

  clearTimeout(timerNotifikasi);
  timerNotifikasi = setTimeout(function () {
    elNotifikasi.classList.add("opacity-0", "translate-y-2", "pointer-events-none");
  }, 3000);
}

// ===== Ringkasan progres (F2 no.6 & F5 no.3) =====
function perbaruiRingkasan() {
  const total = daftarTugas.length;
  const selesai = daftarTugas.filter(function (tugas) {
    return tugas.completed;
  }).length;

  elRingkasan.textContent = selesai + " dari " + total + " tugas selesai";
  const persen = total === 0 ? 0 : (selesai / total) * 100;
  elBarProgres.style.width = persen + "%";
}

// ===== Pesan "tidak ada tugas" (F3 no.4) =====
function perbaruiPesanKosong() {
  const adaYangTampil = daftarTugas.some(function (tugas) {
    return !tugas.li.classList.contains("hidden");
  });

  if (daftarTugas.length === 0) {
    tampilkanStatus(elStatusTugas, "Belum ada tugas.", false);
  } else if (!adaYangTampil) {
    tampilkanStatus(elStatusTugas, "Tidak ada tugas yang cocok.", false);
  } else {
    sembunyikanStatus(elStatusTugas);
  }
}

// ===== F1: Daftar anggota =====
function buatTombolAnggota(anggota, indeks) {
  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.className =
    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm " +
    "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500";
  tombol.classList.add(...KELAS_TOMBOL_BIASA);

  const badge = document.createElement("span");
  badge.className =
    "w-7 h-7 shrink-0 flex items-center justify-center rounded-md text-xs " +
    "font-mono transition-colors duration-200";
  badge.classList.add(...KELAS_BADGE_BIASA);
  badge.textContent = String(indeks + 1).padStart(2, "0");

  const nama = document.createElement("span");
  nama.className = "truncate";
  nama.textContent = anggota.name;

  tombol.appendChild(badge);
  tombol.appendChild(nama);

  tombol.addEventListener("click", function () {
    pilihAnggota(anggota, tombol, badge);
  });

  return tombol;
}

async function muatAnggota() {
  tampilkanStatus(elStatusAnggota, "Memuat anggota...", false);

  try {
    const respons = await fetch(API_URL + "/users");
    if (!respons.ok) {
      throw new Error("Server mengembalikan status " + respons.status + ".");
    }
    const data = await respons.json();

    sembunyikanStatus(elStatusAnggota);
    data.forEach(function (anggota, indeks) {
      elDaftarAnggota.appendChild(buatTombolAnggota(anggota, indeks));
    });
  } catch (error) {
    tampilkanStatus(elStatusAnggota, "Gagal memuat anggota. " + ambilPesanError(error), true);
  }
}

// ===== F2: Tugas anggota =====
async function pilihAnggota(anggota, tombol, badge) {
  if (sedangMenyimpan) return; // jangan pindah anggota saat tugas baru sedang disimpan

  // Hanya satu anggota yang bertanda
  if (anggotaTerpilih) {
    anggotaTerpilih.tombol.classList.remove(...KELAS_TOMBOL_AKTIF);
    anggotaTerpilih.tombol.classList.add(...KELAS_TOMBOL_BIASA);
    anggotaTerpilih.badge.classList.remove(...KELAS_BADGE_AKTIF);
    anggotaTerpilih.badge.classList.add(...KELAS_BADGE_BIASA);
  }
  tombol.classList.remove(...KELAS_TOMBOL_BIASA);
  tombol.classList.add(...KELAS_TOMBOL_AKTIF);
  badge.classList.remove(...KELAS_BADGE_BIASA);
  badge.classList.add(...KELAS_BADGE_AKTIF);
  anggotaTerpilih = { tombol: tombol, badge: badge };

  elJudulBagian.textContent = "Tugas " + anggota.name;
  await muatTugas(anggota.id);
}

function buatItemTugas(data) {
  const item = { title: data.title, completed: data.completed };

  const li = document.createElement("li");
  li.className =
    "flex items-center gap-3 px-6 py-3 border-b border-slate-100 " +
    "transition-colors duration-200 hover:bg-slate-50";

  const bulat = document.createElement("span");
  bulat.className =
    "w-5 h-5 shrink-0 flex items-center justify-center rounded-full border-2 " +
    "text-xs leading-none transition-colors duration-200";
  bulat.classList.add(...KELAS_BULAT_BIASA);

  const judul = document.createElement("span");
  judul.className = "flex-1 text-sm transition-colors duration-200";
  judul.textContent = item.title;

  const aksi = document.createElement("div");
  aksi.className = "flex items-center gap-2 shrink-0";

  const kelasTombolKecil =
    "px-2.5 py-1 text-xs rounded-md border border-slate-200 text-slate-500 " +
    "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ";

  const tombolHapus = document.createElement("button");
  tombolHapus.type = "button";
  tombolHapus.className = kelasTombolKecil + "hover:bg-red-50 hover:text-red-600 hover:border-red-200";
  tombolHapus.textContent = "Hapus";

  item.li = li;
  item.bulat = bulat;
  item.judul = judul;
  item.tombolSelesai = null;

  // F5 no.1: tombol Tandai selesai hanya untuk tugas yang belum selesai
  if (!item.completed) {
    const tombolSelesai = document.createElement("button");
    tombolSelesai.type = "button";
    tombolSelesai.className =
      kelasTombolKecil + "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200";
    tombolSelesai.textContent = "Tandai selesai";
    tombolSelesai.addEventListener("click", function () {
      tandaiSelesai(item);
    });
    item.tombolSelesai = tombolSelesai;
    aksi.appendChild(tombolSelesai);
  }

  tombolHapus.addEventListener("click", function () {
    hapusTugas(item);
  });
  aksi.appendChild(tombolHapus);

  li.appendChild(bulat);
  li.appendChild(judul);
  li.appendChild(aksi);

  if (item.completed) {
    terapkanTampilanSelesai(item);
  }

  return item;
}

function terapkanTampilanSelesai(item) {
  item.completed = true;
  item.judul.classList.add(...KELAS_JUDUL_SELESAI);
  item.bulat.classList.remove(...KELAS_BULAT_BIASA);
  item.bulat.classList.add(...KELAS_BULAT_SELESAI);
  item.bulat.textContent = "\u2713";
  if (item.tombolSelesai) {
    item.tombolSelesai.remove();
    item.tombolSelesai = null;
  }
}

function kosongkanTugas() {
  daftarTugas = [];
  elDaftarTugas.innerHTML = ""; // satu-satunya pemakaian innerHTML: mengosongkan elemen
  elRingkasan.textContent = "";
  elBarProgres.style.width = "0%";
}

async function muatTugas(idAnggota) {
  const nomor = ++nomorPermintaan;

  kosongkanTugas();
  aturKontrol(false);
  elCari.value = "";
  elInputJudul.value = "";
  sembunyikanPesanForm();
  tampilkanStatus(elStatusTugas, "Memuat tugas...", false);

  try {
    const respons = await fetch(API_URL + "/todos?userId=" + idAnggota);
    if (!respons.ok) {
      throw new Error("Server mengembalikan status " + respons.status + ".");
    }
    const data = await respons.json();

    if (nomor !== nomorPermintaan) return; // sudah ada permintaan yang lebih baru

    data.forEach(function (tugas) {
      const item = buatItemTugas({ title: tugas.title, completed: tugas.completed });
      daftarTugas.push(item);
      elDaftarTugas.appendChild(item.li);
    });

    aturKontrol(true);
    perbaruiRingkasan();
    perbaruiPesanKosong();
  } catch (error) {
    if (nomor !== nomorPermintaan) return;
    tampilkanStatus(elStatusTugas, "Gagal memuat tugas. " + ambilPesanError(error), true);
  }
}

// ===== F3: Mencari tugas =====
function terapkanPencarian() {
  const kataKunci = elCari.value.trim().toLowerCase();

  daftarTugas.forEach(function (tugas) {
    if (tugas.title.toLowerCase().includes(kataKunci)) {
      tugas.li.classList.remove("hidden");
    } else {
      tugas.li.classList.add("hidden");
    }
  });

  perbaruiPesanKosong();
}

elCari.addEventListener("input", terapkanPencarian);

// ===== F4: Menambah tugas baru =====
function simpanTugas(judul) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const sudahAda = daftarTugas.some(function (tugas) {
        return tugas.title.toLowerCase() === judul.toLowerCase();
      });

      if (sudahAda) {
        reject(new Error('Tugas "' + judul + '" sudah ada di daftar.'));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

elForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  sembunyikanPesanForm();

  const judul = elInputJudul.value.trim();

  if (judul === "") {
    tampilkanPesanForm("Judul tugas tidak boleh kosong.");
    return;
  }
  if (judul.length < 5) {
    tampilkanPesanForm("Judul tugas minimal 5 karakter.");
    return;
  }

  sedangMenyimpan = true;
  elTombolSimpan.disabled = true;
  elTombolSimpan.textContent = "Menyimpan...";

  try {
    const tugasBaru = await simpanTugas(judul);

    const item = buatItemTugas(tugasBaru);
    daftarTugas.unshift(item);
    elDaftarTugas.prepend(item.li); // tugas baru di paling atas agar langsung terlihat

    elInputJudul.value = "";
    elCari.value = "";       // kosongkan pencarian supaya tugas baru pasti tampil
    terapkanPencarian();     // sekaligus memperbarui pesan kosong
    perbaruiRingkasan();
    setTimeout(() => {
      tampilkanNotifikasi("Tugas berhasil ditambahkan.");
    }, 5000);
    
  } catch (error) {
    tampilkanPesanForm(error.message);
  } finally {
    sedangMenyimpan = false;
    elTombolSimpan.disabled = false;
    elTombolSimpan.textContent = "Simpan";
  }
});

elInputJudul.addEventListener("input", sembunyikanPesanForm);

// ===== F5: Menandai selesai dan menghapus =====
function tandaiSelesai(item) {
  terapkanTampilanSelesai(item);
  perbaruiRingkasan();
}

function hapusTugas(item) {
  item.li.remove();
  daftarTugas = daftarTugas.filter(function (tugas) {
    return tugas !== item;
  });
  perbaruiRingkasan();
  perbaruiPesanKosong();
}

// ===== Mulai =====
muatAnggota();

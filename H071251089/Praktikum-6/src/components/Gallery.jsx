import foto_1 from '../assets/gallery/foto-1.svg'
import foto_2 from '../assets/gallery/foto-2.svg'
import foto_3 from '../assets/gallery/foto-3.svg'
import foto_4 from '../assets/gallery/foto-4.svg'
import foto_5 from '../assets/gallery/foto-5.svg'
import foto_6 from '../assets/gallery/foto-6.svg'

function Gallery() {
    const gallery = [
        { id: 1, title: "Kegiatan Kampus", src: foto_1 },
        { id: 2, title: "Belajar Bersama", src: foto_2 },
        { id: 3, title: "Proyek Kelompok", src: foto_3 },
        { id: 4, title: "Lomba & Seminar", src: foto_4 },
        { id: 5, title: "Hari Santai", src: foto_5 },
        { id: 6, title: "Perjalanan", src: foto_6 }
    ]

    return (
        <div id="galeri" className="text-sage-dark px-5 pt-32">
            <h3 className="inline-block text-2xl bg-clay rounded-full text-white font-bold px-6 py-3">Galeri</h3>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((foto) => (
                    <div className="group overflow-hidden rounded-3xl bg-sage text-left transition hover:-translate-y-1 hover:shadow-xl">
                        <div className="overflow-hidden"><img src={foto.src} alt={foto.title} loading="lazy" width="800" height="600"
                            className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-110"/>
                        </div>
                        <span className="block px-5 py-3 font-semibold text-sage-dark">{foto.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery
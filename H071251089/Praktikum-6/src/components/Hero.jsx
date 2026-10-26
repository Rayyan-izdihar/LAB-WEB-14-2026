import profile from '../assets/gallery/profile.jpg'

function Hero() {
    return (
        <div id="beranda" className="mx-auto grid items-center gap-10 md:grid-cols-2 px-5 pt-32">
            <div className="order-2 text-center md:order-1 md:text-left">
                <p className="inline-block rounded-full bg-sage-dark px-5 py-1.5 text-sm font-semibold text-cream">Halo, saya</p>
                <h1 className="mt-5 text-2xl font-bold leading-tight text-sage-dark sm:text-4xl lg:text-5xl">Muhammad Rayyan Izdihar</h1>
                <p className="mx-auto mt-4 mb-10 max-w-md text-lg text-ink/80 md:mx-0">Mahasiswa Sistem Informasi yang suka membangun website dan belajar hal baru setiap hari.</p>
                <a href="#tentang"
                    onClick={() => console.log("Selamat datang di portofolio saya")}
                    className="inline-block rounded-full bg-clay px-8 py-4 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl active:scale-95">
                    Kenali Saya
                </a>
            </div>
            
            <div className="relative order-1 mx-auto grid aspect-square w-full max-w-sm place-items-center md:order-2">
                <div className="absolute inset-0 rounded-full bg-sage-dark"></div>
                <div className="absolute -right-2 top-4 h-20 w-20 rounded-full bg-clay"></div>
                <div className="absolute -left-3 bottom-8 h-14 w-14 rounded-full bg-sage-mid"></div>
                <div className="absolute bottom-0 right-6 h-8 w-8 rounded-full border-4 border-sage-dark"></div>
                <img src={profile} alt="Foto profil" width="320" height="320"
                    className="relative w-3/4 rounded-full border-8 border-cream object-cover transition duration-500 hover:rotate-3 hover:scale-105"/>
            </div>
        </div>
    )
}

export default Hero
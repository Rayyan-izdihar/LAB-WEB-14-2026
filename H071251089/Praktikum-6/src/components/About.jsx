function About() {
    const aboutInfo = [
        { id: 1, label: "Nama", value: "Muhammad Rayyan Izdihar" },
        { id: 2, label: "Kampus", value: "Universitas Hasanuddin" },
        { id: 3, label: "Jurusan", value: "Sistem Informasi" },
        { id: 4, label: "Kota", value: "Makassar" }
    ]

    return (
        <div id="tentang" className="text-lg md:text-xl px-5 pt-32">
            <h3 className="inline-block text-xl bg-sage-dark rounded-full text-cream font-bold px-6 py-3">Tentang Saya</h3>

            <div className="grid md:grid-cols-2 gap-6 bg-sage rounded-[2rem] mt-6 p-6 md:p-10">
                <p className="text-ink leading-relaxed">Saya mahasiswa Sistem Informasi yang tertarik pada pengembangan web dan basis data. Saya senang mengubah ide menjadi tampilan yang rapi, mudah dipakai, dan bermanfaat.</p>

                <div className="grid gap-3">
                    {aboutInfo.map((item) => (
                        <div key={item.id} className="flex text-base md:text-lg bg-cream rounded-[1rem] text-sage-dark justify-between px-6 py-3 transition hover:translate-x-2 hover:shadow-md">
                            <span>{item.label}</span><span className="text-ink font-semibold">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About
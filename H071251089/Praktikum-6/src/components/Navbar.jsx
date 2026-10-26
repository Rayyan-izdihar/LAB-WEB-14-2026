import home from '../assets/icons/home.svg'
import about from '../assets/icons/about.svg'
import skill from '../assets/icons/skill.svg'
import gallery from '../assets/icons/gallery.svg'

function Navbar() {
    const menu = [
        { nama: "Beranda", href: "#beranda", icon: home },
        { nama: "Tentang", href: "#tentang", icon: about },
        { nama: "Skill", href: "#skill", icon: skill },
        { nama: "Galeri", href: "#galeri", icon: gallery }
    ];

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between bg-cream/85 backdrop-blur text-sm md:text-lg md:px-50 px-6 py-3">
            <div className="rounded-full font-bold bg-sage px-5 py-3">Rayyan</div>

            <div className="flex items-center gap-2 md:hidden">
                {menu.map((item) => (
                    <button key={item.nama} href={item.href} 
                        onClick={() =>
                            console.log(`Menu ${item.nama} Diklik`)
                        }
                        className='bg-sage-mid-dark active:bg-sage-dark rounded-full transition-colors duration-200'
                        >
                        <img src={item.icon} alt="Icon" className='w-10 h-8 p-1' />
                    </button>
                ))}
            </div>

            <div className="md:flex items-center gap-0.5 font-bold hidden">
                {menu.map((item) => (
                    <a key={item.nama} href={item.href} 
                        onClick={() =>
                            console.log(`Menu ${item.nama} Diklik`)
                        }
                        className="text-center px-5 py-3 rounded-full md:text-lg hover:bg-sage active:bg-sage-dark active:text-cream transition-colors duration-200">
                        {item.nama}
                    </a>
                ))}
            </div>
        </nav>
    )
}

export default Navbar
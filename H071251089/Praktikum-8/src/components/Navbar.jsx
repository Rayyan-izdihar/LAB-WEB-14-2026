"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar({ daftarMenu }) {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-40 bg-krem/85 px-4 py-3 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-navy px-5 py-2 text-krem shadow-lg">
                <Link href="/" className="hidden items-center gap-2 font-judul text-lg font-bold sm:flex">
                    <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                    Pustaka Senja
                </Link>

                <div className="flex items-center gap-3">
                    {daftarMenu.map((menu) => {
                        const isActive = menu.path === '/'
                                    ? pathname === '/'
                                    : pathname.startsWith(menu.path)

                        return (
                            <div key={menu.path}>
                                <Link href={menu.path}
                                    className={`flex items-center px-5 py-3 rounded-full font-medium btn-tekan ${isActive ? "bg-krem text-navy" : "hover:bg-white/20"}`}
                                >
                                    {menu.nama}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
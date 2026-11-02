import { dataBuku, jumlahBuku } from "@/data/data";
import BukuCard from "@/components/BukuCard";

export default function BukuCardPage() {
    return (
        <BukuCard 
            dataBuku={dataBuku}
            jumlahBuku={jumlahBuku}
        />
    )
}
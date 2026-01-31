import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Destination } from "@/data/destinations"

interface DestinationCardProps {
    destination: Destination
}

export function DestinationCard({ destination }: DestinationCardProps) {
    return (
        <Link href={`/destinations`}>
            <Card className="group relative overflow-hidden h-[300px] border-none shadow-none text-white">
                <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                    <p className="text-sm text-slate-300 line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {destination.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        Explore <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </Card>
        </Link>
    )
}

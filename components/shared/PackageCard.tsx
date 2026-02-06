import Image from "next/image"
import Link from "next/link"
import { Star, Clock, MapPin, ArrowRight } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package } from "@/data/packages"

interface PackageCardProps {
    pkg: Package
}

export function PackageCard({ pkg }: PackageCardProps) {
    return (
        <Card className="overflow-hidden group flex flex-col h-full border-border/50 bg-card hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={pkg.images[0]}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-slate-900">{pkg.rating}</span>
                </div>
            </div>

            <CardHeader className="space-y-2 p-5">
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                            <MapPin className="w-3 h-3" />
                            {pkg.location}
                        </div>
                        <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors">
                            <Link href={`/packages/${pkg.slug}`}>
                                {pkg.title}
                            </Link>
                        </h3>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap pt-2">
                    {pkg.type && <Badge variant="secondary" className="font-normal">{pkg.type}</Badge>}
                </div>
            </CardHeader>

            <CardContent className="p-5 pt-0 flex-grow space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                    Experience the best of {pkg.location} with our exclusive {pkg.durationDays}-day tour.
                </p>

                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{pkg.durationDays} Days</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="font-bold text-lg text-primary">${pkg.price.toLocaleString()}</span>
                        <span className="text-muted-foreground text-xs">/ person</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-5 border-t border-border/50 flex gap-3">
                <Button asChild variant="outline" className="flex-1">
                    <Link href={`/packages/${pkg.slug}`}>View Details</Link>
                </Button>
                <Button asChild className="flex-1 gap-2">
                    <Link href={`/?view=contact&package=${encodeURIComponent(pkg.title)}`}>
                        Book Now <ArrowRight className="w-4 h-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

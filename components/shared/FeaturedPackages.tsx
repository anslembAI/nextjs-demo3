"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { PackageCard } from "@/components/shared/PackageCard"
import { Package } from "@/data/packages"
import { cn } from "@/lib/utils"

// TTD exchange rate (1 USD = approximately 6.79 TTD)
const USD_TO_TTD_RATE = 6.79

interface FeaturedPackagesProps {
    packages: Package[]
}

export function FeaturedPackages({ packages }: FeaturedPackagesProps) {
    const [isTTD, setIsTTD] = useState(false)

    // Convert packages to include converted prices
    const displayPackages = packages.map(pkg => ({
        ...pkg,
        displayPrice: isTTD ? Math.round(pkg.price * USD_TO_TTD_RATE) : pkg.price,
        currency: isTTD ? "TTD" : "USD",
        currencySymbol: isTTD ? "TT$" : "$"
    }))

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
                    <div>
                        <p className="text-primary font-semibold mb-2 uppercase tracking-wide text-sm">Curated Experiences</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Featured Packages</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Currency Toggle */}
                        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2.5 rounded-full shadow-sm border border-border/50">
                            <span className={cn(
                                "text-sm font-semibold transition-colors",
                                !isTTD ? "text-primary" : "text-muted-foreground"
                            )}>
                                USD
                            </span>
                            <Switch
                                checked={isTTD}
                                onCheckedChange={setIsTTD}
                                aria-label="Toggle currency between USD and TTD"
                            />
                            <span className={cn(
                                "text-sm font-semibold transition-colors",
                                isTTD ? "text-primary" : "text-muted-foreground"
                            )}>
                                TTD
                            </span>
                        </div>

                        <Button variant="ghost" className="hidden sm:flex gap-2" asChild>
                            <Link href="/?view=packages">View all packages <ArrowRight className="w-4 h-4" /></Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayPackages.map((pkg) => (
                        <PackageCardWithCurrency
                            key={pkg.slug}
                            pkg={pkg}
                            displayPrice={pkg.displayPrice}
                            currencySymbol={pkg.currencySymbol}
                        />
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Button variant="outline" asChild>
                        <Link href="/?view=packages">View all packages</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

// Extended PackageCard that accepts currency props
import Image from "next/image"
import { Star, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PackageCardWithCurrencyProps {
    pkg: Package
    displayPrice: number
    currencySymbol: string
}

function PackageCardWithCurrency({ pkg, displayPrice, currencySymbol }: PackageCardWithCurrencyProps) {
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
                        <span className="font-bold text-lg text-primary">
                            {currencySymbol}{displayPrice.toLocaleString()}
                        </span>
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

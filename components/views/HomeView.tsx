
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShieldCheck, HeartHandshake, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FeaturedPackages } from "@/components/shared/FeaturedPackages"
import { DestinationCard } from "@/components/shared/DestinationCard"
import { InquiryForm } from "@/components/shared/InquiryForm"
import { VirtualTravelVisa } from "@/components/shared/VirtualTravelVisa"
import { packages } from "@/data/packages"
import { activeDestinations } from "@/data/destinations"

export function HomeView() {
    const featuredPackages = packages.slice(0, 9)
    const popularDestinations = activeDestinations.slice(0, 4)

    return (
        <div className="flex flex-col min-h-screen animate-fade-in">
            {/* Hero Section */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop"
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                <div className="container relative z-10 px-4 md:px-6 text-center text-white space-y-8 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto drop-shadow-lg">
                        Discover the World in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-200">Unmatched Luxury</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto drop-shadow-md">
                        Curated journeys, exclusive experiences, and personalized itineraries for the discerning traveler.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" asChild>
                            <Link href="/?view=packages">
                                Explore Packages
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20" asChild>
                            <Link href="/?view=contact">
                                Plan Custom Trip
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Inquiry Widget Section */}
            <section id="start-journey" className="relative z-20 -mt-24 pb-20 container px-4 md:px-6">
                <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-6 md:p-8 max-w-5xl mx-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold">Start Your Journey</h2>
                        <p className="text-muted-foreground">Tell us where you want to go, and we'll handle the rest.</p>
                    </div>
                    <div className="grid grid-cols-1">
                        <InquiryForm className="bg-transparent" inputClassName="border-slate-300 dark:border-input" />
                    </div>
                </div>
            </section>

            {/* Featured Packages with Currency Toggle */}
            <FeaturedPackages packages={featuredPackages} />

            {/* Popular Destinations */}
            <section className="py-20">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Destinations</h2>
                        <p className="text-muted-foreground text-lg">Explore our most sought-after locations, known for their beauty, culture, and luxury.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularDestinations.map(dest => (
                            <DestinationCard key={dest.slug} destination={dest} />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Button size="lg" variant="secondary" className="gap-2" asChild>
                            <Link href="/?view=destinations">Explore All Destinations <ArrowRight className="w-4 h-4" /></Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Virtual Travel Visa */}
            <VirtualTravelVisa />

            {/* Trust Indicators */}
            <section className="py-20 border-t border-border/40 bg-slate-50 dark:bg-slate-900/30">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center gap-4 p-6">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full text-primary">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">Secure Booking</h3>
                            <p className="text-muted-foreground">Your payments and data are protected with bank-level security standards.</p>
                        </div>
                        <div className="flex flex-col items-center gap-4 p-6">
                            <div className="bg-teal-100 dark:bg-teal-900/30 p-4 rounded-full text-teal-600 dark:text-teal-400">
                                <Globe className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">Expert Local Guides</h3>
                            <p className="text-muted-foreground">Experience destinations like a local with our handpicked expert guides.</p>
                        </div>
                        <div className="flex flex-col items-center gap-4 p-6">
                            <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full text-amber-600 dark:text-amber-400">
                                <HeartHandshake className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">24/7 Support</h3>
                            <p className="text-muted-foreground">We are here for you around the clock, from planning to your return home.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 overflow-hidden">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Travelers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-card p-8 rounded-2xl border shadow-sm relative">
                                <div className="text-4xl text-primary/20 absolute top-4 left-4 font-serif">"</div>
                                <p className="text-slate-600 dark:text-slate-300 mb-6 italic relative z-10">
                                    The most amazing trip of my life! Everything was perfectly organized, and the hotels were stunning.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden relative">
                                        <Image src={`https://i.pravatar.cc/150?u=${i}`} alt="User" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold">Sarah Jenkins</p>
                                        <p className="text-xs text-muted-foreground">Bali Retreat</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="container px-4 md:px-6 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Plan Your Dream Vacation?</h2>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                        Contact our travel experts today and let us craft a personalized itinerary just for you.
                    </p>
                    <Button size="lg" variant="secondary" className="px-8 py-6 text-lg rounded-full" asChild>
                        <Link href="/?view=contact">Get Started</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}

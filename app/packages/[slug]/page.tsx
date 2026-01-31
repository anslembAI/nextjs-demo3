import { notFound } from "next/navigation"
import Image from "next/image"
import { MapPin, Clock, Star, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { InquiryForm } from "@/components/shared/InquiryForm"
import { packages } from "@/data/packages"

export function generateStaticParams() {
    return packages.map((pkg) => ({
        slug: pkg.slug,
    }))
}

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
    const pkg = packages.find((p) => p.slug === params.slug)

    if (!pkg) {
        notFound()
    }

    return (
        <div className="container px-4 md:px-6 py-12 pt-28">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                                {pkg.type}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                {pkg.location}
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                            {pkg.title}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/10 px-3 py-1 rounded-full border border-yellow-100 dark:border-yellow-900/30">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-yellow-700 dark:text-yellow-400">{pkg.rating}</span>
                        <span className="text-xs text-muted-foreground">(120 Reviews)</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Image Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                        <div className="relative h-full md:col-span-2 md:row-span-2">
                            <Image src={pkg.images[0]} alt={pkg.title} fill className="object-cover hover:scale-105 transition-transform duration-500" priority />
                        </div>
                        {/* If more images exist, add them here. For now just main image takes full space or grid if multiple */}
                    </div>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-border/50">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground uppercase">Duration</p>
                                <p className="font-semibold">{pkg.durationDays} Days</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground uppercase">Location</p>
                                <p className="font-semibold truncate">{pkg.location}</p>
                            </div>
                        </div>
                        {/* Add more highlights dynamically if needed */}
                    </div>

                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b rounded-none h-auto p-0 gap-6">
                            <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2 data-[state=active]:shadow-none">Overview</TabsTrigger>
                            <TabsTrigger value="itinerary" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2 data-[state=active]:shadow-none">Itinerary</TabsTrigger>
                            <TabsTrigger value="includes" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2 data-[state=active]:shadow-none">What's Included</TabsTrigger>
                            <TabsTrigger value="faq" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2 data-[state=active]:shadow-none">FAQ</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="pt-6 space-y-4 animate-fade-in">
                            <h3 className="text-2xl font-bold">Experience the unexpected</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Immerse yourself in {pkg.location} with our signature {pkg.title} package.
                                Designed for those who seek both comfort and adventure, this journey allows you to explore the hidden gems and iconic landmarks.
                            </p>
                            <h4 className="text-lg font-semibold mt-4">Highlights</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {pkg.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </TabsContent>

                        <TabsContent value="itinerary" className="pt-6 animate-fade-in">
                            <div className="space-y-6 relative border-l border-border ml-3 pl-8">
                                {pkg.itinerary.map((day, i) => (
                                    <div key={i} className="relative">
                                        <span className="absolute -left-[41px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold ring-4 ring-background">
                                            {day.day}
                                        </span>
                                        <h4 className="text-lg font-bold mb-1">{day.title}</h4>
                                        <p className="text-muted-foreground">{day.description}</p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="includes" className="pt-6 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pkg.includes.map((inc, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-slate-50 dark:bg-slate-900/20">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        <span className="font-medium">{inc}</span>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="faq" className="pt-6 animate-fade-in">
                            <Accordion type="single" collapsible className="w-full">
                                {pkg.faqs.map((faq, i) => (
                                    <AccordionItem key={i} value={`item-${i}`}>
                                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar / Inquiry Form */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-card border rounded-2xl shadow-lg p-6 space-y-6" id="inquire">
                            <div className="flex justify-between items-end border-b pb-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Starting from</p>
                                    <p className="text-3xl font-bold text-primary">${pkg.price.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-500 line-through">${Math.round(pkg.price * 1.2).toLocaleString()}</p>
                                    <Badge variant="destructive">Save 20%</Badge>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Book or Inquire</h3>
                                <InquiryForm packageTitle={pkg.title} />
                            </div>

                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
                                <HelpCircle className="w-3 h-3" />
                                <span>Free cancellation up to 7 days before departure.</span>
                            </div>
                        </div>

                        <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                            <h4 className="font-semibold mb-2">Need Help?</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                Speak to our travel expert for customized itineraries.
                            </p>
                            <Button variant="outline" className="w-full bg-white hover:bg-white/90 text-primary border-primary/20">
                                Call +1 (555) 123-4567
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

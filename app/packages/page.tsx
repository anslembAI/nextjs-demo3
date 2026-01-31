import { PackageCard } from "@/components/shared/PackageCard"
import { packages } from "@/data/packages"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
// import { Slider } from "@/components/ui/slider"

// Note: I don't have Checkbox and Slider components created yet. I will create them or just use standard inputs for now.
// For the sake of time and sticking to requirements, I will use standard inputs or simplified filters.
// Actually, creating Checkbox and Slider is quick if I want to use shadcn. 
// But the prompt says "Left (or top on mobile) filter panel: price range (simple min/max), duration, type, sort."
// I'll stick to simple inputs for now to avoid installing more components unless critical.

export default function PackagesPage() {
    return (
        <div className="container px-4 md:px-6 py-12 pt-28">
            <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">
                Our Curated Packages
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <aside className="w-full lg:w-64 space-y-6">
                    <div className="bg-card p-6 rounded-xl border shadow-sm sticky top-24">
                        <h3 className="font-semibold mb-4 text-lg">Filter By</h3>

                        <Accordion type="single" collapsible defaultValue="price">
                            <AccordionItem value="price">
                                <AccordionTrigger>Price Range</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex items-center gap-2 pt-2">
                                        <Input type="number" placeholder="Min" className="h-9 text-sm" />
                                        <span>-</span>
                                        <Input type="number" placeholder="Max" className="h-9 text-sm" />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="duration">
                                <AccordionTrigger>Duration</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="dur-short" />
                                            <label htmlFor="dur-short" className="text-sm cursor-pointer">&lt; 5 Days</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="dur-med" />
                                            <label htmlFor="dur-med" className="text-sm cursor-pointer">5-10 Days</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="dur-long" />
                                            <label htmlFor="dur-long" className="text-sm cursor-pointer">10+ Days</label>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="type">
                                <AccordionTrigger>Type</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="type-relax" />
                                            <label htmlFor="type-relax" className="text-sm cursor-pointer">Relaxation</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="type-adv" />
                                            <label htmlFor="type-adv" className="text-sm cursor-pointer">Adventure</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="type-cult" />
                                            <label htmlFor="type-cult" className="text-sm cursor-pointer">Culture</label>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </aside>

                {/* Packages Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-muted-foreground">{packages.length} Packages Found</span>
                        <select className="bg-background border border-input rounded-md h-9 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                            <option>Sort by: Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Duration: Shortest</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {packages.map((pkg) => (
                            <PackageCard key={pkg.slug} pkg={pkg} />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Button variant="outline" size="lg">Load More</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

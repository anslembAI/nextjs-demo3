
"use client"

import { useState, useMemo } from "react"
import { PackageCard } from "@/components/shared/PackageCard"
import { packages } from "@/data/packages"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

export function PackagesView() {
    const [minPrice, setMinPrice] = useState<number | "">("")
    const [maxPrice, setMaxPrice] = useState<number | "">("")
    const [selectedDurations, setSelectedDurations] = useState<string[]>([])
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [sortOption, setSortOption] = useState<string>("recommended")

    // Filter handlers
    const handleDurationChange = (value: string, checked: boolean | string) => {
        if (checked) {
            setSelectedDurations([...selectedDurations, value])
        } else {
            setSelectedDurations(selectedDurations.filter((d: string) => d !== value))
        }
    }

    const handleTypeChange = (value: string, checked: boolean | string) => {
        if (checked) {
            setSelectedTypes([...selectedTypes, value])
        } else {
            setSelectedTypes(selectedTypes.filter((t: string) => t !== value))
        }
    }

    // Extract unique types from packages for the filter list if we wanted to be dynamic, 
    // but for now we'll stick to the UI's hardcoded ones + maybe add a few common ones if missing?
    // The UI had Relaxation, Adventure, Culture. Let's make sure those match data types.

    const filteredPackages = useMemo(() => {
        return packages.filter(pkg => {
            // Price Filter
            if (minPrice !== "" && pkg.price < minPrice) return false
            if (maxPrice !== "" && pkg.price > maxPrice) return false

            // Duration Filter
            if (selectedDurations.length > 0) {
                const matchesDuration = selectedDurations.some((range: string) => {
                    if (range === "short") return pkg.durationDays < 5
                    if (range === "medium") return pkg.durationDays >= 5 && pkg.durationDays <= 10
                    if (range === "long") return pkg.durationDays > 10
                    return false
                })
                if (!matchesDuration) return false
            }

            // Type Filter
            if (selectedTypes.length > 0) {
                // The UI had specific labels, let's match them loosely or exactly?
                // Data types: "Relaxation", "Culture", "Adventure", "Hotel", "Resort", "Experience", "Cruise", "History"
                // The UI checkboxes were: Relaxation, Adventure, Culture.
                // If I select "Relaxation", I expect to see "Relaxation" types. 
                // What about "Resort"? It's similar but distinct in data. 
                // For now, exact match is safest unless I map them.
                if (!selectedTypes.includes(pkg.type)) return false
            }

            return true
        }).sort((a, b) => {
            switch (sortOption) {
                case "price-asc":
                    return a.price - b.price
                case "price-desc":
                    return b.price - a.price
                case "duration-asc":
                    return a.durationDays - b.durationDays
                case "recommended":
                default:
                    return 0 // Keep original order
            }
        })
    }, [minPrice, maxPrice, selectedDurations, selectedTypes, sortOption])

    return (
        <div className="container px-4 md:px-6 py-12 pt-28 bg-background animate-fade-in">
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
                                        <Input
                                            type="number"
                                            placeholder="Min"
                                            className="h-9 text-sm"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : "")}
                                        />
                                        <span>-</span>
                                        <Input
                                            type="number"
                                            placeholder="Max"
                                            className="h-9 text-sm"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="duration">
                                <AccordionTrigger>Duration</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id="dur-short"
                                                checked={selectedDurations.includes("short")}
                                                onCheckedChange={(c) => handleDurationChange("short", c)}
                                            />
                                            <label htmlFor="dur-short" className="text-sm cursor-pointer">&lt; 5 Days</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id="dur-med"
                                                checked={selectedDurations.includes("medium")}
                                                onCheckedChange={(c) => handleDurationChange("medium", c)}
                                            />
                                            <label htmlFor="dur-med" className="text-sm cursor-pointer">5-10 Days</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id="dur-long"
                                                checked={selectedDurations.includes("long")}
                                                onCheckedChange={(c) => handleDurationChange("long", c)}
                                            />
                                            <label htmlFor="dur-long" className="text-sm cursor-pointer">10+ Days</label>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="type">
                                <AccordionTrigger>Type</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2 pt-2">
                                        {/* Dynamic types based on available data or fixed list? 
                                            The original UI had limited options. Let's expose all types found in data 
                                            to be more useful, or at least the main ones.
                                        */}
                                        {["Relaxation", "Adventure", "Culture", "Hotel", "Resort", "Experience", "Cruise", "History"].map(type => (
                                            <div key={type} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`type-${type}`}
                                                    checked={selectedTypes.includes(type)}
                                                    onCheckedChange={(c) => handleTypeChange(type, c)}
                                                />
                                                <label htmlFor={`type-${type}`} className="text-sm cursor-pointer">{type}</label>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </aside>

                {/* Packages Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-muted-foreground">{filteredPackages.length} Packages Found</span>
                        <select
                            className="bg-background border border-input rounded-md h-9 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="recommended">Sort by: Recommended</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="duration-asc">Duration: Shortest</option>
                        </select>
                    </div>

                    {filteredPackages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredPackages.map((pkg) => (
                                <PackageCard key={pkg.slug} pkg={pkg} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-semibold">No packages found</h3>
                            <p className="text-muted-foreground">Try adjusting your filters.</p>
                        </div>
                    )}

                    {/* Only show Load More if there are lots? For now static is fine or remove it. */}
                </div>
            </div>
        </div>
    )
}


import { DestinationCard } from "@/components/shared/DestinationCard"
import { activeDestinations } from "@/data/destinations"

export function DestinationsView() {
    return (
        <div className="container px-4 md:px-6 py-12 pt-28 bg-background animate-fade-in">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Explore Destinations</h1>
                <p className="text-muted-foreground text-lg">
                    From vibrant cities to serene islands, find your perfect getaway.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeDestinations.map(dest => (
                    <DestinationCard key={dest.slug} destination={dest} />
                ))}
            </div>
        </div>
    )
}

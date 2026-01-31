import Image from "next/image"

export default function AboutPage() {
    return (
        <div className="container px-4 md:px-6 py-12 pt-28">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">About LuxeTravel</h1>
                <p className="text-muted-foreground text-lg">Curating exceptional journeys since 2010.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 animate-fade-in">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                        alt="Our Team"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        At LuxeTravel, we believe that travel is not just about visiting new places, but about collecting memories that last a lifetime.
                        Our mission is to provide you with seamless, luxurious, and personalized travel experiences that exceed your expectations.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        We meticulously handpick every hotel, tour guide, and activity to ensure the highest standards of quality and authenticity.
                        Whether you dream of a relaxing beach getaway or an adventurous mountain expedition, we are here to make it a reality.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-slate-50 dark:bg-slate-900/50 p-12 rounded-3xl">
                <div>
                    <h3 className="text-4xl font-bold text-primary mb-2">10+</h3>
                    <p className="text-muted-foreground">Years of Experience</p>
                </div>
                <div>
                    <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
                    <p className="text-muted-foreground">Destinations Covered</p>
                </div>
                <div>
                    <h3 className="text-4xl font-bold text-primary mb-2">10k+</h3>
                    <p className="text-muted-foreground">Happy Travelers</p>
                </div>
            </div>
        </div>
    )
}

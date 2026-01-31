"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, MapPin, Calendar, Users, Briefcase } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "./ModeToggle"

const navigation = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/packages" },
    { name: "Destinations", href: "/destinations" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
]

export function Navbar() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isHomePage = pathname === "/"
    const showSolidNav = isScrolled || !isHomePage

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                showSolidNav ? "bg-background/80 backdrop-blur-md shadow-sm border-border/50 text-foreground" : "bg-transparent py-4 text-white"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary p-2 rounded-xl">
                            <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <span className={cn("text-xl font-bold tracking-tight", showSolidNav ? "text-foreground" : "text-white drop-shadow-md")}>
                            LuxeTravel
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href
                                        ? "text-primary font-semibold"
                                        : showSolidNav ? "text-muted-foreground" : "text-white/80 hover:text-white"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button variant="ghost" className={cn("rounded-full", !showSolidNav ? "text-white hover:bg-white/20 hover:text-white" : "")} asChild>
                            <Link href="/#virtual-visa-cards">Vcard</Link>
                        </Button>
                        <Button className={cn("rounded-full px-6", !showSolidNav ? "bg-white text-primary hover:bg-white/90" : "")}>
                            Plan a Trip
                        </Button>
                        <ModeToggle />
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className={cn(showSolidNav ? "text-foreground" : "text-white hover:bg-white/10 hover:text-white")}>
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col gap-6 mt-10">
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="bg-primary p-2 rounded-xl">
                                            <MapPin className="h-6 w-6 text-white" />
                                        </div>
                                        <span className="text-xl font-bold">LuxeTravel</span>
                                    </div>

                                    {navigation.map((item) => (
                                        <SheetClose key={item.name} asChild>
                                            <Link
                                                href={item.href}
                                                className="text-lg font-medium transition-colors hover:text-primary"
                                            >
                                                {item.name}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                    <SheetClose asChild>
                                        <Link
                                            href="/#virtual-visa-cards"
                                            className="text-lg font-medium transition-colors hover:text-primary"
                                        >
                                            Vcard
                                        </Link>
                                    </SheetClose>
                                    <Separator />
                                    <Separator />
                                    <div className="flex items-center gap-4">
                                        <ModeToggle />
                                        <span className="text-sm font-medium">Switch Theme</span>
                                    </div>
                                    <SheetClose asChild>
                                        <Button className="w-full">Plan a Trip</Button>
                                    </SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}

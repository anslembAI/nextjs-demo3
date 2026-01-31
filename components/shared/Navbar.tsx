"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, MapPin, User, LogOut, UserCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "./ModeToggle"
import { AuthDialog } from "@/components/auth/auth-dialog"
import { useAuth } from "@/lib/auth-context"

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
    const [isAuthOpen, setIsAuthOpen] = React.useState(false)
    const { user, isAuthenticated, isLoading: authLoading, signOut } = useAuth()

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
                        <Button className={cn("rounded-full px-6", !showSolidNav ? "bg-white text-primary hover:bg-white/90" : "")} asChild>
                            <Link href="/#start-journey">Plan a Trip</Link>
                        </Button>
                        <ModeToggle />

                        {/* Auth Section */}
                        {authLoading ? (
                            <div className="w-20 h-9 animate-pulse bg-muted/50 rounded-full" />
                        ) : isAuthenticated && user ? (
                            <div className="flex items-center gap-2 ml-2">
                                <div
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-full border",
                                        showSolidNav
                                            ? "bg-muted/50 border-border"
                                            : "bg-white/10 border-white/20"
                                    )}
                                    title={user.name}
                                >
                                    <UserCircle className={cn("h-5 w-5", !showSolidNav ? "text-white" : "text-primary")} />
                                    <span className={cn("text-sm font-medium max-w-[80px] truncate hidden lg:block", !showSolidNav ? "text-white" : "text-foreground")}>
                                        {user.name}
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn("rounded-full", !showSolidNav ? "text-white hover:bg-white/20 hover:text-white" : "")}
                                    onClick={() => signOut()}
                                    title="Sign Out"
                                >
                                    <LogOut className="h-5 w-5" />
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="ghost"
                                className={cn("rounded-full", !showSolidNav ? "text-white hover:bg-white/20 hover:text-white" : "")}
                                onClick={() => setIsAuthOpen(true)}
                            >
                                Sign In
                            </Button>
                        )}
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

                                    {authLoading ? (
                                        <div className="w-full h-10 animate-pulse bg-muted/50 rounded-lg" />
                                    ) : isAuthenticated && user ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                                <UserCircle className="h-8 w-8 text-primary" />
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{user.name}</span>
                                                    <span className="text-xs text-muted-foreground">{user.email}</span>
                                                </div>
                                            </div>
                                            <SheetClose asChild>
                                                <Button variant="outline" className="w-full" onClick={() => signOut()}>
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Log Out
                                                </Button>
                                            </SheetClose>
                                        </div>
                                    ) : (
                                        <SheetClose asChild>
                                            <Button className="w-full" onClick={() => setIsAuthOpen(true)}>
                                                Sign In
                                            </Button>
                                        </SheetClose>
                                    )}

                                    <Separator />
                                    <div className="flex items-center gap-4">
                                        <ModeToggle />
                                        <span className="text-sm font-medium">Switch Theme</span>
                                    </div>
                                    <SheetClose asChild>
                                        <Button className="w-full" asChild>
                                            <Link href="/#start-journey">Plan a Trip</Link>
                                        </Button>
                                    </SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>

            <AuthDialog isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} />
        </header>
    )
}

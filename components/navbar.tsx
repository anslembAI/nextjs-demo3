"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, Moon, Sun, User, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthModal } from "@/components/auth-modal";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  React.useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const navLinks = [
    { name: "Destinations", href: "#destinations" },
    { name: "Experiences", href: "#experiences" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="nav-sticky">
      <div className="nav-gradient-line" />
      <div className="container">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col items-start gap-0.5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Voyage Collective <span className="text-xs font-normal text-muted-foreground">by VTS</span>
              </span>
            </div>
            <span className="text-xs text-muted-foreground pl-11">Smarter trips, beautifully crafted.</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            {/* Auth Button / User Profile */}
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-[100px] truncate">{user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                
                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-lg z-50 animate-fade-in">
                    <div className="p-3 border-b border-border/50">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <div className="p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          await signOut();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full justify-start"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden md:inline-flex"
              >
                Sign In
              </Button>
            )}
            <Button className="hidden md:inline-flex">Book Now</Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
                
                {/* Mobile Auth Button / User Profile */}
                {isAuthenticated ? (
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex items-center gap-2 flex-1 bg-muted rounded-lg px-3 py-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium truncate flex-1">{user?.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={async () => {
                        await signOut();
                        setIsMenuOpen(false);
                      }}
                      aria-label="Sign out"
                    >
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex-1"
                  >
                    Sign In
                  </Button>
                )}
                <Button className="flex-1">Book Now</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
}

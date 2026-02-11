"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Eventi", href: "#eventi" },
  { label: "Sport", href: "#sport" },
  { label: "Iscrizione", href: "#iscrizione" },
  { label: "Contatti", href: "#contatti" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-card/95 backdrop-blur-md border-b border-border py-4 shadow-sm"
        : "bg-transparent border-transparent py-6"
        }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-2">
          <span
            className={`text-2xl font-serif font-bold transition-colors ${scrolled ? "text-primary" : "text-primary-foreground"
              }`}
          >
            Sagra di Fogliano
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors ${scrolled
                ? "text-foreground hover:text-primary"
                : "text-primary-foreground/90 hover:text-white"
                }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className={`md:hidden ${scrolled
            ? "text-foreground hover:bg-muted"
            : "text-primary-foreground hover:bg-white/10"
            }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-6 pb-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors border-b border-border last:border-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

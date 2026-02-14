import { MapPin, Phone, Mail } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer id="contatti" className="bg-foreground text-primary-foreground py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Sagra di Fogliano</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              La tradizionale festa paesana di Fogliano, nel cuore della provincia di Reggio Emilia. Un appuntamento imperdibile con il gusto, la musica e lo sport.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Link Rapidi</h4>
            <nav className="space-y-3">
              <a href="#home" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Home
              </a>
              <a href="#eventi" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Eventi
              </a>
              <a href="#sport" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Eventi Sportivi
              </a>
              <a href="#iscrizione" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Iscrizione
              </a>
              <a href="#sponsor" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Sponsor
              </a>
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Contatti</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Fogliano, Reggio Emilia (RE)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+39 0522 123456</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@sagradifogliano.it</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/15" />

        <p className="text-center text-xs text-primary-foreground/50">
          {"© 2026 Sagra di Fogliano. Tutti i diritti riservati."}
        </p>
      </div>
    </footer>
  )
}

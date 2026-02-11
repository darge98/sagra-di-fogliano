import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/home.jpeg"
          alt="Festa della Sagra di Fogliano con tavoli imbanditi e luci festose"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary-foreground/80 font-semibold">
          Fogliano, Reggio Emilia
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-tight text-balance">
          Sagra di Fogliano
        </h1>
        <p className="mt-6 text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed text-pretty">
          Tradizione, sapori e divertimento nel cuore dell{"'"}Emilia. Unisciti a noi per una festa indimenticabile tra gastronomia, musica dal vivo e competizioni sportive.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <CalendarDays className="h-5 w-5" />
            <span className="text-sm font-semibold">14 - 22 Giugno 2025</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-primary-foreground/30" />
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-semibold">Fogliano, RE</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-sagra text-sagra-foreground hover:bg-sagra/90 px-8 text-base font-bold">
            <a href="#eventi">Scopri gli Eventi</a>
          </Button>
          <Button asChild size="lg" className="bg-sport text-sport-foreground hover:bg-sport/90 px-8 text-base font-bold">
            <a href="#iscrizione">Iscriviti allo Sport</a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full bg-primary-foreground/60 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

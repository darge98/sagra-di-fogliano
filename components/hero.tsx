"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CalendarDays, MapPin, BookOpen, Users } from "lucide-react"
import storiaData from "@/data/storia.json"

export function Hero() {
  const [storiaOpen, setStoriaOpen] = useState(false)
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

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
          <Button asChild size="lg" className="bg-sagra text-sagra-foreground hover:bg-sagra hover:text-sagra-foreground  px-8 text-base font-bold">
            <a href="#eventi">Scopri gli Eventi</a>
          </Button>
          <Button asChild size="lg" className="bg-sport text-sport-foreground hover:bg-sport hover:text-sport-foregroundpx-8 text-base font-bold">
            <a href="#iscrizione">Iscriviti allo Sport</a>
          </Button>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/60 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/10 hover:text-primary-foreground px-8 text-base font-bold"
            onClick={() => setStoriaOpen(true)}
          >
            <BookOpen className="h-5 w-5 mr-2" />
            La nostra storia
          </Button>
        </div>

        <Dialog open={storiaOpen} onOpenChange={setStoriaOpen}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0 sm:rounded-xl border">
            {/* Header con accent */}
            <div className="bg-sagra/15 border-b border-sagra/30 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sagra text-sagra-foreground">
                  <BookOpen className="h-6 w-6" />
                </div>
                <DialogHeader className="flex-1">
                  <DialogTitle className="font-serif text-2xl font-bold text-foreground">
                    {storiaData.titolo}
                  </DialogTitle>
                </DialogHeader>
              </div>
            </div>

            {/* Contenuto scrollabile */}
            <div className="overflow-y-auto flex-1">
              {/* Foto volontari */}
              {"fotoVolontari" in storiaData && storiaData.fotoVolontari && (
                <div className="relative w-full aspect-[21/9] min-h-[180px] bg-muted overflow-hidden">
                  <img
                    src={storiaData.fotoVolontari}
                    alt="I volontari della Sagra di Fogliano"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                      const fallback = e.currentTarget.nextElementSibling
                      if (fallback) fallback.classList.remove("hidden")
                    }}
                  />
                  <div className="hidden absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground">
                    <Users className="h-16 w-16 mb-2 opacity-40" />
                    <span className="text-xs font-medium">I volontari della sagra</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 px-6 py-3 pointer-events-none">
                    <p className="text-sm font-semibold text-white drop-shadow-lg">
                      I volontari che rendono possibile tutto questo
                    </p>
                  </div>
                </div>
              )}

              {/* Testo */}
              <div className="px-6 py-6">
                <div className="relative pl-4 border-l-2 border-sagra/50">
                  <p className="whitespace-pre-line text-foreground/90 leading-relaxed text-base">
                    {storiaData.contenuto}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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

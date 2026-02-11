import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, Trophy, Footprints, Dribbble, PersonStanding, Volleyball } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const sportEvents = [
  {
    id: "calcio",
    title: "Calcio a 8",
    icon: Footprints as LucideIcon,
    date: "18 - 22 Giugno",
    time: "19:00",
    description:
      "Torneo di calcio a 8 con gironi eliminatori e fase finale. Premi per le prime classificate.",
    prize: "Trofeo + Premi",
  },
  {
    id: "beachvolley",
    title: "Beach Volley",
    icon: Volleyball as LucideIcon,
    date: "18 - 22 Giugno",
    time: "19:00",
    description:
      "Beach volley sulla sabbia! Divertimento e competizione assicurati per tutti.",
    prize: "Trofeo + Premi",
  },
  {
    id: "4fogliano",
    title: "4Fogliano",
    icon: Dribbble as LucideIcon,
    date: "18 - 22 Giugno",
    time: "19:00",
    description:
      "Il torneo di basket 4 contro 4 targato Fogliano. Sfide rapide e spettacolari!",
    prize: "Trofeo + Premi",
  },
  {
    id: "lodolata",
    title: "Lodolata",
    icon: Footprints as LucideIcon,
    date: "18 - 22 Giugno",
    time: "19:00",
    description:
      "La corsa di Fogliano! Un percorso attraverso le strade e le campagne del paese.",
    prize: "Medaglie e Premi",
  },
]

export function SportsSection() {
  return (
    <section id="sport" className="py-24 px-6 bg-muted">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
            Giornate dello Sportivo
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Metti alla prova le tue abilità! Iscriviti ai tornei e alle gare della sagra.
          </p>
        </div>

        {/* Sport image banner */}
        <div className="relative rounded-2xl overflow-hidden mb-12 h-64 md:h-80">
          <img
            src="/images/sports.jpg"
            alt="Giornate dello Sportivo alla Sagra di Fogliano"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-sport-foreground/60 flex items-center justify-center">
            <div className="text-center">
              <Trophy className="h-12 w-12 text-sport mx-auto mb-4" />
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-sport">
                Sfida i migliori!
              </h3>
              <p className="mt-2 text-lg">
                Iscrizioni aperte per tutti i tornei
              </p>
            </div>
          </div>
        </div>

        {/* Sport events grid - square cards */}
        <div className="mx-auto max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sportEvents.map((sport) => {
            const Icon = sport.icon
            return (
              <Card
                key={sport.id}
                className="group overflow-hidden border-2 border-transparent border-sport transition-all duration-300 hover:shadow-xl bg-card"
              >
                <CardContent className="p-0">
                  {/* Card header with icon */}
                  <div className="bg-sport px-4 py-8 text-center">
                    <Icon className="h-10 w-10 text-sport-foreground mx-auto mb-3" />
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-sport-foreground leading-tight">
                      {sport.title}
                    </h3>
                  </div>
                  {/* Card body */}
                  <div className="px-4 py-5">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {sport.description}
                    </p>
                    <div className="flex flex-col gap-2 text-xs text-muted-foreground mb-5">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-sport" />
                        {sport.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-sport" />
                        Ore {sport.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Trophy className="h-3.5 w-3.5 text-sport" />
                        {sport.prize}
                      </span>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-sport text-sport-foreground hover:bg-sport/90 font-bold"
                    >
                      <a href="#iscrizione">Iscriviti Ora</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

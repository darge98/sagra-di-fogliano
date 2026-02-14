"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { CalendarDays, Clock, Trophy, Footprints, Dribbble, PersonStanding, Volleyball, FileText } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import sportEventsData from "@/data/sports-cards.json"

interface SportDetailData {
  label: string
  value: string
}

interface SportEventData {
  id: string
  title: string
  icon: string
  date: string
  time: string
  description: string
  prize: string
  details?: SportDetailData[]
}

const iconMap: Record<string, LucideIcon> = {
  Footprints,
  Volleyball,
  Dribbble,
  PersonStanding,
  Trophy,
}

interface SportEvent {
  id: string
  title: string
  icon: LucideIcon
  date: string
  time: string
  description: string
  prize: string
  details?: SportDetailData[]
}

const sportEvents: SportEvent[] = (sportEventsData as SportEventData[]).map((sport) => ({
  ...sport,
  icon: (iconMap[sport.icon] || Trophy) as LucideIcon,
}))

export function SportsSection() {
  const [selectedSport, setSelectedSport] = useState<SportEvent | null>(null)

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
                    <div className="flex flex-col gap-2">
                      {sport.details && sport.details.length > 0 && (
                        <Button
                          variant="outline"
                          className="w-full border-sport text-sport hover:bg-sport/10 font-bold"
                          onClick={() => setSelectedSport(sport)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Scopri di più
                        </Button>
                      )}
                      <Button
                        asChild
                        className="w-full bg-sport text-sport-foreground hover:bg-sport/90 font-bold"
                      >
                        <a href="#iscrizione">Iscriviti Ora</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Sport detail dialog */}
      <Dialog
        open={selectedSport !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedSport(null)
        }}
      >
        {selectedSport && (
          <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto !bg-white text-foreground">
            <DialogHeader>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex flex-col items-center justify-center bg-sport rounded-lg px-4 py-3 shrink-0">
                  {(() => {
                    const Icon = selectedSport.icon
                    return <Icon className="h-8 w-8 text-sport-foreground" />
                  })()}
                </div>
                <div>
                  <DialogTitle className="font-serif text-2xl font-bold text-foreground">
                    {selectedSport.title}
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground mt-1">
                    {selectedSport.description}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Details list */}
            <div className="mt-4 space-y-0">
              {selectedSport.details?.map((detail, index) => {
                const isLast = index === (selectedSport.details?.length ?? 0) - 1
                return (
                  <div key={detail.label} className="flex gap-4">
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full shrink-0 bg-sport text-sport-foreground">
                        <FileText className="h-4 w-4" />
                      </div>
                    </div>
                    {/* Content */}
                    <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                      <h4 className="font-semibold text-foreground text-sm">
                        {detail.label}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA footer */}
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                asChild
                className="w-full bg-sport text-sport-foreground hover:bg-sport/90 font-bold"
              >
                <a href="#iscrizione">Iscriviti Ora</a>
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}

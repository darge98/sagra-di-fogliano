"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  CalendarDays,
  Clock,
  MapPin,
  Music,
  Baby,
  UtensilsCrossed,
  Sparkles,
  BookOpen,
  Theater,
  Camera,
  Beer,
  ChevronDown,
  Leaf,
  WheatOff,
  Flame,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import festivalDaysData from "@/data/sagra-cards.json"

interface MenuItemData {
  name: string
  price: string
  vegan?: boolean
  glutenFree?: boolean
  spicy?: boolean
}

interface MenuCategoryData {
  category: string
  items: MenuItemData[]
}

interface DayEventData {
  time: string
  title: string
  description?: string
  icon: string
  highlight?: boolean
}

interface FestivalDayData {
  id: string
  dayShort: string
  dayNumber: string
  dayName: string
  date: string
  tagline: string
  events: DayEventData[]
  menu?: MenuCategoryData[]
}

const iconMap: Record<string, LucideIcon> = {
  Baby,
  UtensilsCrossed,
  Music,
  Camera,
  Sparkles,
  BookOpen,
  Beer,
  Theater,
}

interface DayEvent {
  time: string
  title: string
  description?: string
  icon: LucideIcon
  highlight?: boolean
}

interface FestivalDay {
  id: string
  dayShort: string
  dayNumber: string
  dayName: string
  date: string
  tagline: string
  events: DayEvent[]
  menu?: MenuCategoryData[]
}

const festivalDays: FestivalDay[] = (festivalDaysData as FestivalDayData[]).map((day) => ({
  ...day,
  events: day.events.map((event) => ({
    ...event,
    icon: iconMap[event.icon] || Music, // Fallback icon
  })),
}))

export function EventsSection() {
  const [selectedDay, setSelectedDay] = useState<FestivalDay | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section id="eventi" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
            Sagra
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Tre giornate ricche di eventi, musica, spettacoli e buona cucina
            emiliana. Clicca su una giornata per scoprire il programma
            completo.
          </p>
        </div>

        {/* Day cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {festivalDays.map((day) => (
            <Card
              key={day.id}
              className="group cursor-pointer overflow-hidden border-2 border-sagra transition-all duration-300 hover:shadow-xl bg-card"
              onClick={() => setSelectedDay(day)}
              role="button"
              tabIndex={0}
              aria-label={`Vedi programma ${day.dayName} ${day.dayNumber} Giugno`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSelectedDay(day)
                }
              }}
            >
              <CardContent className="p-0">
                {/* Day header */}
                <div className="bg-sagra px-6 py-8 text-center">
                  <p className="text-sagra-foreground/70 text-xs uppercase tracking-widest font-bold">
                    {day.date}
                  </p>
                  <p className="font-serif text-5xl md:text-6xl font-bold text-sagra-foreground mt-1">
                    {day.dayNumber}
                  </p>
                  <p className="text-sagra-foreground font-bold text-lg uppercase tracking-wider mt-1">
                    {day.dayShort}
                  </p>
                </div>
                {/* Day body */}
                <div className="px-6 py-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2 text-balance">
                    {day.tagline}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{day.events.length} eventi in programma</span>
                  </div>
                  {/* Mini preview of events */}
                  <ul className="space-y-2">
                    {day.events.slice(0, 3).map((event) => {
                      const Icon = event.icon
                      return (
                        <li
                          key={event.title}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">
                            <span className="font-semibold text-foreground">
                              {event.time}
                            </span>{" "}
                            - {event.title}
                          </span>
                        </li>
                      )
                    })}
                    {day.events.length > 3 && (
                      <li className="text-xs font-semibold">
                        + altri {day.events.length - 3} eventi...
                      </li>
                    )}
                  </ul>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider group-hover:underline">
                    Scopri il programma completo
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Day detail dialog */}
      <Dialog
        open={selectedDay !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedDay(null)
        }}
      >
        {selectedDay && (
          <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto !bg-white text-foreground">
            <DialogHeader>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex flex-col items-center justify-center bg-sagra rounded-lg px-4 py-3 shrink-0">
                  <span className="text-sagra-foreground text-xs font-bold uppercase tracking-wider">
                    {selectedDay.dayShort}
                  </span>
                  <span className="font-serif text-3xl font-bold text-sagra-foreground leading-none">
                    {selectedDay.dayNumber}
                  </span>
                </div>
                <div>
                  <DialogTitle className="font-serif text-2xl font-bold text-foreground">
                    {selectedDay.dayName} {selectedDay.dayNumber} Giugno
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground mt-1">
                    {selectedDay.tagline}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Timeline */}
            <div className="mt-4 space-y-0">
              {selectedDay.events.map((event, index) => {
                const Icon = event.icon
                const isLast = index === selectedDay.events.length - 1
                return (
                  <div key={event.title} className="flex gap-4">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex items-center justify-center h-10 w-10 rounded-full shrink-0 ${event.highlight
                          ? "bg-sagra text-sagra-foreground"
                          : "bg-muted text-muted-foreground"
                          }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      {!isLast && (
                        <div className="w-px flex-1 bg-border min-h-6" />
                      )}
                    </div>
                    {/* Content */}
                    <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center gap-1 text-xs font-bold">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </span>
                        {event.highlight && (
                          <span className="text-[10px] uppercase tracking-wider font-bold text-sagra-foreground px-2 py-0.5 rounded-full bg-sagra">
                            In evidenza
                          </span>
                        )}
                      </div>
                      <h4
                        className={`font-semibold text-foreground ${event.highlight ? "text-base" : "text-sm"
                          }`}
                      >
                        {event.title}
                      </h4>
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Menu section - collapsible */}
            {selectedDay.menu && selectedDay.menu.length > 0 && (
              <div className="mt-6 pt-5 border-t border-border">
                <button
                  type="button"
                  className="flex items-center justify-between w-full group/menu"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-expanded={menuOpen}
                >
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5 text-sagra" />
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Menù della Serata
                    </h3>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${menuOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                >
                  {/* Legenda */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4 pb-3 border-b border-border">
                    <span className="flex items-center gap-1">
                      <Leaf className="h-3.5 w-3.5 text-green-600" /> Vegano
                    </span>
                    <span className="flex items-center gap-1">
                      <WheatOff className="h-3.5 w-3.5 text-amber-600" /> Senza glutine
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5 text-red-500" /> Piccante
                    </span>
                  </div>
                  <div className="space-y-4">
                    {selectedDay.menu.map((category) => (
                      <div key={category.category}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-sagra-foreground bg-sagra px-3 py-1.5 rounded-md mb-2">
                          {category.category}
                        </h4>
                        <ul className="space-y-1">
                          {category.items.map((item) => (
                            <li
                              key={item.name}
                              className="flex items-center justify-between text-sm py-1 px-1"
                            >
                              <span className="flex items-center gap-1.5 text-foreground">
                                {item.name}
                                {item.vegan && (
                                  <span title="Vegano"><Leaf className="h-3.5 w-3.5 text-green-600 shrink-0" /></span>
                                )}
                                {item.glutenFree && (
                                  <span title="Senza glutine"><WheatOff className="h-3.5 w-3.5 text-amber-600 shrink-0" /></span>
                                )}
                                {item.spicy && (
                                  <span title="Piccante"><Flame className="h-3.5 w-3.5 text-red-500 shrink-0" /></span>
                                )}
                              </span>
                              <span className="font-bold text-foreground ml-4 shrink-0">
                                {item.price}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Location footer */}
            <div className="pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                Centro Sociale di Fogliano, Via Nervi 23 - Reggio Emilia
              </span>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}

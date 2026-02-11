"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle2, Send, Plus, Trash2, Users } from "lucide-react"

const sportOptions = [
  {
    value: "calcio",
    label: "Calcio a 8",
    type: "squadra" as const,
    minPlayers: 8,
    maxPlayers: 14,
    hint: "Minimo 8, massimo 14 giocatori per squadra",
  },
  {
    value: "beachvolley",
    label: "Beach Volley",
    type: "squadra" as const,
    minPlayers: 2,
    maxPlayers: 6,
    hint: "Minimo 2, massimo 6 giocatori per squadra",
  },
  {
    value: "4fogliano",
    label: "4Fogliano (Basket 4v4)",
    type: "squadra" as const,
    minPlayers: 4,
    maxPlayers: 6,
    hint: "Minimo 4, massimo 6 giocatori per squadra",
  },
  {
    value: "lodolata",
    label: "Lodolata (Corsa)",
    type: "gruppo" as const,
    minPlayers: 1,
    maxPlayers: 20,
    hint: "Da 1 a 20 partecipanti per gruppo",
  },
]

interface TeamMember {
  id: string
  firstName: string
  lastName: string
}

function createMember(): TeamMember {
  return { id: crypto.randomUUID(), firstName: "", lastName: "" }
}

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedSport, setSelectedSport] = useState("")
  const [teamName, setTeamName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [members, setMembers] = useState<TeamMember[]>([createMember()])
  const [notes, setNotes] = useState("")

  const sport = sportOptions.find((s) => s.value === selectedSport)

  function handleSportChange(value: string) {
    setSelectedSport(value)
    const newSport = sportOptions.find((s) => s.value === value)
    if (newSport) {
      const initial = newSport.type === "coppia" ? 2 : 1
      setMembers(Array.from({ length: initial }, () => createMember()))
    }
  }

  function addMember() {
    if (sport && members.length < sport.maxPlayers) {
      setMembers([...members, createMember()])
    }
  }

  function removeMember(id: string) {
    if (sport && members.length > sport.minPlayers) {
      setMembers(members.filter((m) => m.id !== id))
    }
  }

  function updateMember(id: string, field: "firstName" | "lastName", value: string) {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    )
  }

  function resetForm() {
    setSubmitted(false)
    setSelectedSport("")
    setTeamName("")
    setContactEmail("")
    setContactPhone("")
    setMembers([createMember()])
    setNotes("")
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="iscrizione" className="py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="bg-sport-muted rounded-2xl p-12">
            <CheckCircle2 className="h-16 w-16 text-sport mx-auto mb-6" />
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Iscrizione Inviata!
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Grazie per aver iscritto la{" "}
              {sport?.type === "coppia" ? "vostra coppia" : sport?.type === "gruppo" ? "vostra squadra" : "vostra squadra"}{" "}
              <strong className="text-foreground">{teamName}</strong> al{" "}
              <strong className="text-foreground">{sport?.label}</strong>!
              Vi contatteremo via email per confermare la partecipazione.
            </p>
            <Button
              onClick={resetForm}
              className="mt-8 bg-sport text-sport-foreground hover:bg-sport/90 font-bold"
            >
              Nuova Iscrizione
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const teamLabel =
    sport?.type === "gruppo"
      ? "Nome del Gruppo"
      : "Nome della Squadra"

  const canAddMore = sport ? members.length < sport.maxPlayers : false
  const canRemove = sport ? members.length > sport.minPlayers : false

  return (
    <section id="iscrizione" className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-sport font-bold mb-3">
            Partecipa
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
            Iscrivi la tua Squadra
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Compila il modulo per iscrivere la tua squadra, coppia o gruppo
            al torneo sportivo. Vi ricontatteremo per confermare la
            partecipazione.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl border border-border p-8 md:p-10 space-y-8"
        >
          {/* Step 1 - Sport selection */}
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground mb-1 flex items-center gap-2">
              <span className="flex items-center justify-center h-7 w-7 rounded-full bg-sport text-sport-foreground text-xs font-bold">
                1
              </span>
              Scegli l{"'"}evento
            </h3>
            <div className="ml-9 mt-3 space-y-2">
              <Label htmlFor="sport" className="text-foreground font-semibold">
                Evento Sportivo *
              </Label>
              <Select
                value={selectedSport}
                onValueChange={handleSportChange}
                required
              >
                <SelectTrigger className="bg-background border-input">
                  <SelectValue placeholder="Seleziona un evento" />
                </SelectTrigger>
                <SelectContent>
                  {sportOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {sport && (
                <p className="text-xs text-muted-foreground">{sport.hint}</p>
              )}
            </div>
          </div>

          {selectedSport && (
            <>
              {/* Step 2 - Team info */}
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                  <span className="flex items-center justify-center h-7 w-7 rounded-full bg-sport text-sport-foreground text-xs font-bold">
                    2
                  </span>
                  Informazioni squadra
                </h3>
                <div className="ml-9 mt-3 space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="teamName"
                      className="text-foreground font-semibold"
                    >
                      {teamLabel} *
                    </Label>
                    <Input
                      id="teamName"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder={`Inserisci il ${teamLabel.toLowerCase()}`}
                      required
                      className="bg-background border-input"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="contactEmail"
                        className="text-foreground font-semibold"
                      >
                        Email Referente *
                      </Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="referente@email.com"
                        required
                        className="bg-background border-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="contactPhone"
                        className="text-foreground font-semibold"
                      >
                        Telefono Referente *
                      </Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+39 333 1234567"
                        required
                        className="bg-background border-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 - Members */}
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                  <span className="flex items-center justify-center h-7 w-7 rounded-full bg-sport text-sport-foreground text-xs font-bold">
                    3
                  </span>
                  Componenti della squadra
                </h3>
                <div className="ml-9 mt-3 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Users className="h-4 w-4 text-sport" />
                    <span>
                      {members.length}{" "}
                      {members.length === 1
                        ? "componente"
                        : "componenti"}{" "}
                      {sport &&
                        `(min ${sport.minPlayers}, max ${sport.maxPlayers})`}
                    </span>
                  </div>

                  {members.map((member, index) => (
                    <div
                      key={member.id}
                      className="flex items-end gap-3 rounded-lg border border-border bg-background p-4"
                    >
                      <span className="shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-muted text-muted-foreground text-xs font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label
                            htmlFor={`member-fn-${member.id}`}
                            className="text-foreground text-xs font-semibold"
                          >
                            Nome *
                          </Label>
                          <Input
                            id={`member-fn-${member.id}`}
                            value={member.firstName}
                            onChange={(e) =>
                              updateMember(
                                member.id,
                                "firstName",
                                e.target.value
                              )
                            }
                            placeholder="Nome"
                            required
                            className="bg-card border-input h-9 text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label
                            htmlFor={`member-ln-${member.id}`}
                            className="text-foreground text-xs font-semibold"
                          >
                            Cognome *
                          </Label>
                          <Input
                            id={`member-ln-${member.id}`}
                            value={member.lastName}
                            onChange={(e) =>
                              updateMember(
                                member.id,
                                "lastName",
                                e.target.value
                              )
                            }
                            placeholder="Cognome"
                            required
                            className="bg-card border-input h-9 text-sm"
                          />
                        </div>
                      </div>
                      {canRemove && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="shrink-0 h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeMember(member.id)}
                          aria-label={`Rimuovi componente ${index + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  {canAddMore && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addMember}
                      className="w-full border-dashed border-border text-muted-foreground hover:text-foreground bg-transparent"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Aggiungi componente
                    </Button>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="ml-9 space-y-2">
                <Label
                  htmlFor="notes"
                  className="text-foreground font-semibold"
                >
                  Note aggiuntive
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Richieste particolari, informazioni aggiuntive..."
                  rows={3}
                  className="bg-background border-input resize-none"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-sport text-sport-foreground hover:bg-sport/90 font-bold text-base"
              >
                <Send className="h-4 w-4 mr-2" />
                Invia Iscrizione Squadra
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                I campi contrassegnati con * sono obbligatori. I vostri
                dati saranno utilizzati solo per la gestione dell{"'"}
                iscrizione.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

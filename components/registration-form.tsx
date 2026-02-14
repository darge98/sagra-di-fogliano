"use client"

import React from "react"
import imageCompression from "browser-image-compression"
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
import { CheckCircle2, Loader2, Send, Plus, Trash2, Users } from "lucide-react"

const sportOptions = [
  {
    value: "calcio",
    label: "Calcio a 8",
    type: "squadra" as const,
    minPlayers: 8,
    // maxPlayers removed to allow unlimited
    hint: "Minimo 8 giocatori",
  },
  {
    value: "beachvolley",
    label: "Beach Volley",
    type: "squadra" as const,
    minPlayers: 4,
    // maxPlayers removed
    hint: "Minimo 4 giocatori",
  },
  {
    value: "4fogliano",
    label: "4Fogliano (Basket)",
    type: "squadra" as const,
    minPlayers: 4,
    // maxPlayers removed
    hint: "Minimo 4 giocatori",
  },
  {
    value: "lodolata",
    label: "Lodolata (Corsa)",
    type: "individuale" as const,
    minPlayers: 1,
    maxPlayers: 1,
    hint: "Iscrizione individuale",
  },
]

interface TeamMember {
  id: string
  firstName: string
  lastName: string
  gender: string
  birthDate: string
  birthPlace: string
  address: string
  medicalCertificate: File | null
}

function createMember(): TeamMember {
  return {
    id: crypto.randomUUID(),
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    birthPlace: "",
    address: "",
    medicalCertificate: null,
  }
}

interface MemberFieldsProps {
  member: TeamMember
  index: number
  updateMember: (
    id: string,
    field: keyof TeamMember,
    value: string | File | null
  ) => void
  removeMember: (id: string) => void
  canRemove: boolean
  showHeader?: boolean
}

function MemberFields({
  member,
  index,
  updateMember,
  removeMember,
  canRemove,
  showHeader = true,
}: MemberFieldsProps) {
  return (
    <div className={`space-y-4 ${showHeader ? "rounded-lg border border-border bg-background p-6" : ""}`}>
      {showHeader && (
        <div className="flex items-center justify-between">
          <span className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-muted-foreground text-xs font-bold">
            {index + 1}
          </span>
          {canRemove && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => removeMember(member.id)}
              aria-label={`Rimuovi componente ${index + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            onChange={(e) => updateMember(member.id, "firstName", e.target.value)}
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
            onChange={(e) => updateMember(member.id, "lastName", e.target.value)}
            placeholder="Cognome"
            required
            className="bg-card border-input h-9 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label
            htmlFor={`member-gender-${member.id}`}
            className="text-foreground text-xs font-semibold"
          >
            Sesso *
          </Label>
          <Select
            value={member.gender}
            onValueChange={(value) => updateMember(member.id, "gender", value)}
            required
          >
            <SelectTrigger className="bg-card border-input h-9 text-sm">
              <SelectValue placeholder="Sesso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Maschio</SelectItem>
              <SelectItem value="F">Femmina</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label
            htmlFor={`member-dob-${member.id}`}
            className="text-foreground text-xs font-semibold"
          >
            Data di Nascita *
          </Label>
          <Input
            id={`member-dob-${member.id}`}
            type="date"
            value={member.birthDate}
            onChange={(e) => updateMember(member.id, "birthDate", e.target.value)}
            required
            className="bg-card border-input h-9 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label
            htmlFor={`member-pob-${member.id}`}
            className="text-foreground text-xs font-semibold"
          >
            Luogo di Nascita *
          </Label>
          <Input
            id={`member-pob-${member.id}`}
            value={member.birthPlace}
            onChange={(e) => updateMember(member.id, "birthPlace", e.target.value)}
            placeholder="Città"
            required
            className="bg-card border-input h-9 text-sm"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label
          htmlFor={`member-addr-${member.id}`}
          className="text-foreground text-xs font-semibold"
        >
          Indirizzo di Residenza *
        </Label>
        <Input
          id={`member-addr-${member.id}`}
          value={member.address}
          onChange={(e) => updateMember(member.id, "address", e.target.value)}
          placeholder="Via Roma 1, Reggio Emilia"
          required
          className="bg-card border-input h-9 text-sm"
        />
      </div>

      <div className="space-y-1">
        <Label
          htmlFor={`member-cert-${member.id}`}
          className="text-foreground text-xs font-semibold"
        >
          Certificato Medico (PDF/FOTO) *
        </Label>
        <Input
          id={`member-cert-${member.id}`}
          type="file"
          accept="image/*,.pdf"
          onChange={(e) =>
            updateMember(
              member.id,
              "medicalCertificate",
              e.target.files ? e.target.files[0] : null
            )
          }
          required={!member.medicalCertificate}
          className="bg-card border-input h-9 text-sm cursor-pointer file:text-foreground hover:file:bg-accent file:bg-transparent file:border-0 file:mr-4 file:font-semibold"
        />
        {member.medicalCertificate && (
          <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
            <CheckCircle2 className="h-3 w-3" />
            File caricato: {member.medicalCertificate.name}
          </p>
        )}
      </div>
    </div>
  )
}

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [selectedSport, setSelectedSport] = useState("")
  const [teamName, setTeamName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [members, setMembers] = useState<TeamMember[]>([createMember()])

  const sport = sportOptions.find((s) => s.value === selectedSport)

  function handleSportChange(value: string) {
    setSelectedSport(value)
    const newSport = sportOptions.find((s) => s.value === value)
    if (newSport) {
      setMembers(Array.from({ length: newSport.minPlayers }, () => createMember()))
    }
  }

  function addMember() {
    if (sport) {
      // Allow adding if no maxPlayers defined or if below maxPlayers
      if (!sport.maxPlayers || members.length < sport.maxPlayers) {
        setMembers([...members, createMember()])
      }
    }
  }

  function removeMember(id: string) {
    if (sport && members.length > sport.minPlayers) {
      setMembers(members.filter((m) => m.id !== id))
    }
  }

  function updateMember(
    id: string,
    field: keyof TeamMember,
    value: string | File | null
  ) {
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
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!sport) return
    setSubmitError(null)
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.set("sport", selectedSport)
      formData.set("sportLabel", sport.label)
      formData.set("teamName", teamName)
      formData.set("contactEmail", contactEmail)
      formData.set("contactPhone", contactPhone)
      formData.set(
        "members",
        JSON.stringify(
          members.map((m) => ({
            firstName: m.firstName,
            lastName: m.lastName,
            gender: m.gender,
            birthDate: m.birthDate,
            birthPlace: m.birthPlace,
            address: m.address,
          }))
        )
      )
      const compressedFiles = await Promise.all(
        members.map(async (m, i) => {
          const file = m.medicalCertificate
          if (!file) return null
          const isImage = file.type.startsWith("image/")
          if (!isImage) return file
          try {
            const compressed = await imageCompression(file, {
              maxSizeMB: 0.4,
              maxWidthOrHeight: 1600,
              useWebWorker: true,
            })
            return new File([compressed], file.name, { type: compressed.type })
          } catch {
            return file
          }
        })
      )
      compressedFiles.forEach((file, i) => {
        if (file) formData.set(`certificate_${i}`, file)
      })
      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || "Errore durante l'invio dell'iscrizione")
      }
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Errore di connessione. Riprova.")
    } finally {
      setIsSubmitting(false)
    }
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
              Grazie per aver inviato l{"'"}iscrizione
              {sport?.type !== "individuale" && (
                <>
                  {" "}
                  per la squadra{" "}
                  <strong className="text-foreground">{teamName}</strong>
                </>
              )}{" "}
              al <strong className="text-foreground">{sport?.label}</strong>! Vi
              contatteremo via email per confermare la partecipazione.
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

  const teamLabel = "Nome della Squadra"

  const isIndividual = sport?.type === "individuale"

  const canAddMore = sport ? (sport.maxPlayers ? members.length < sport.maxPlayers : true) : false
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
            {isIndividual ? "Iscriviti alla Lodolata" : "Iscrivi la tua Squadra"}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Compila il modulo per iscriverti al torneo sportivo. Vi
            ricontatteremo per confermare la partecipazione.
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
              {/* Step 2 - Team/Contact info */}
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                  <span className="flex items-center justify-center h-7 w-7 rounded-full bg-sport text-sport-foreground text-xs font-bold">
                    2
                  </span>
                  {isIndividual ? "Informazioni Contatto" : "Informazioni squadra"}
                </h3>
                <div className="ml-9 mt-3 space-y-4">
                  {!isIndividual && (
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
                        required={!isIndividual}
                        className="bg-background border-input"
                      />
                    </div>
                  )}
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

                  {isIndividual && members[0] && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Label className="text-foreground font-semibold mb-4 block">
                        Dati Partecipante
                      </Label>
                      <MemberFields
                        member={members[0]}
                        index={0}
                        updateMember={updateMember}
                        removeMember={removeMember}
                        canRemove={false}
                        showHeader={false}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Step 3 - Members (Only for teams) */}
              {!isIndividual && (
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                    <span className="flex items-center justify-center h-7 w-7 rounded-full bg-sport text-sport-foreground text-xs font-bold">
                      3
                    </span>
                    Componenti della squadra
                  </h3>
                  <div className="ml-9 mt-3 space-y-3">
                    {members.map((member, index) => (
                      <MemberFields
                        key={member.id}
                        member={member}
                        index={index}
                        updateMember={updateMember}
                        removeMember={removeMember}
                        canRemove={sport ? index >= sport.minPlayers : false}
                        showHeader={true}
                      />
                    ))}

                    {canAddMore && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addMember}
                        className="w-full border-dashed border-border text-muted-foreground hover:text-foreground bg-transparent mt-4"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Aggiungi componente
                      </Button>
                    )}
                  </div>
                </div>
              )}

              

              {submitError && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {submitError}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-sport text-sport-foreground hover:bg-sport/90 font-bold text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Invia Iscrizione {isIndividual ? "" : "Squadra"}
                  </>
                )}
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

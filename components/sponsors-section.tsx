import { Handshake } from "lucide-react"
import sponsorsData from "@/data/sponsors.json"

interface SponsorData {
  id: string
  name: string
  logo: string
  url?: string
}

const sponsors = sponsorsData as SponsorData[]

function SponsorLogo({ sponsor }: { sponsor: SponsorData }) {
  const content = (
    <div className="flex items-center justify-center h-20 rounded-xl border-2 border-border bg-card p-4 transition-all duration-300 hover:border-sagra hover:shadow-lg">
      <img
        src={sponsor.logo}
        alt={sponsor.name}
        className="h-full w-full object-contain"
      />
    </div>
  )

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`Visita ${sponsor.name}`}
      >
        {content}
      </a>
    )
  }

  return content
}

export function SponsorsSection() {
  return (
    <section id="sponsor" className="py-24 px-6 bg-muted">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
            Sponsor
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Grazie ai nostri partner per il prezioso sostegno che rende possibile
            questa festa.
          </p>
        </div>

        {/* Sponsors grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sponsors.map((sponsor) => (
            <SponsorLogo key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </section>
  )
}

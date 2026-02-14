import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { EventsSection } from "@/components/events-section"
import { SportsSection } from "@/components/sports-section"
import { RegistrationForm } from "@/components/registration-form"
import { SponsorsSection } from "@/components/sponsors-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EventsSection />
        <SportsSection />
        <RegistrationForm />
        <SponsorsSection />
      </main>
      <Footer />
    </>
  )
}

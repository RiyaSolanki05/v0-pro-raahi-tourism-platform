import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ServicesSection } from "@/components/services-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen warm-gradient-subtle">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

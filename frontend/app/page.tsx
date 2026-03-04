import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import RecruitmentBanner from "@/components/recruitment-banner"
import AboutSection from "@/components/about-section"
import VisionSection from "@/components/vision-section"
import GoalsSection from "@/components/goals-section"
import ServicesSection from "@/components/services-section"
import ActivitiesSection from "@/components/activities-section"
import LibrarySection from "@/components/library-section"
import IHLSourcesSection from "@/components/ihl-sources-section"
import MediaSection from "@/components/media-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <RecruitmentBanner />
      <AboutSection />
      <VisionSection />
      <GoalsSection />
      <ServicesSection />
      <ActivitiesSection />
      <LibrarySection />
      <IHLSourcesSection />
      <MediaSection />
      <ContactSection />
      <Footer />
      <FloatingContact />
    </main>
  )
}

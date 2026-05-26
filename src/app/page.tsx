import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DestinationsSection from "@/components/home/DestinationsSection";
import HospitalsSection from "@/components/home/HospitalsSection";
import PatientJourneySection from "@/components/home/PatientJourneySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogSection from "@/components/home/BlogSection";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUs />
      <DestinationsSection />
      <HospitalsSection />
      <PatientJourneySection />
      <TestimonialsSection />
      <BlogSection />
      <CTABanner />
    </>
  );
}

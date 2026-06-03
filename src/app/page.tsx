import HeroSection         from "@/components/home/HeroSection";
import TrustStrip          from "@/components/home/TrustStrip";
import CentersSection      from "@/components/home/CentersSection";
import ServicesSection     from "@/components/home/ServicesSection";
import DoctorsSection      from "@/components/home/DoctorsSection";
import WhyChooseUs         from "@/components/home/WhyChooseUs";
import DestinationsSection from "@/components/home/DestinationsSection";
import HospitalsSection    from "@/components/home/HospitalsSection";
import RecognitionBanner   from "@/components/home/RecognitionBanner";
import PatientJourneySection from "@/components/home/PatientJourneySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogSection         from "@/components/home/BlogSection";
import CTABanner           from "@/components/home/CTABanner";
import StatsSection        from "@/components/home/StatsSection";

export default function Home() {
  return (
    <>
      {/* 1. Immersive full-screen hero — emergency bar + CTAs + stats strip */}
      <HeroSection />

      {/* 2. Accreditation marquee trust strip */}
      <TrustStrip />

      {/* 3. Centers of Clinical Excellence — specialty departments */}
      <CentersSection />

      {/* 4. Medical specialities with photos */}
      <ServicesSection />

      {/* 5. Featured board-certified specialists */}
      <DoctorsSection />

      {/* 6. Why choose OneEarthMed — clinical credibility */}
      <WhyChooseUs />

      {/* 7. Treatment destinations — Bangkok, Delhi, Istanbul, etc. */}
      <DestinationsSection />

      {/* 8. Partner hospital showcase */}
      <HospitalsSection />

      {/* 9. Awards, accreditations & quality recognition */}
      <RecognitionBanner />

      {/* 10. Patient journey — step-by-step care process */}
      <PatientJourneySection />

      {/* 11. Patient testimonials */}
      <TestimonialsSection />

      {/* 12. Trust statistics */}
      <StatsSection />

      {/* 13. Healthcare insights & blog */}
      <BlogSection />

      {/* 14. Final CTA — book consultation */}
      <CTABanner />
    </>
  );
}

import { BentoFeatures } from '@/components/landing/bento-features';
import { FAQSection } from '@/components/landing/faq-section';
import { LandingFooter } from '@/components/landing/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { LandingNavbar } from '@/components/landing/navbar';
import { ParallaxShowcase } from '@/components/landing/parallax-showcase';
import { PricingSection } from '@/components/landing/pricing-section';
import { SmoothScrollProvider } from '@/components/shared/smooth-scroll-provider';

export const metadata = {
  title: 'QRCraft | Générateur de QR Codes Personnalisés & Trackables',
  description:
    'Créez des QR codes uniques, esthétiques et trackables. Formes de modules sur-mesure, dégradés dynamiques, incrustation de logos et exports vectoriels SVG & PDF 4K.',
};

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <LandingNavbar />
        <main>
          <HeroSection />
          <BentoFeatures />
          <ParallaxShowcase />
          <PricingSection />
          <FAQSection />
        </main>
        <LandingFooter />
      </div>
    </SmoothScrollProvider>
  );
}

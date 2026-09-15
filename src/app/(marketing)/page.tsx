import { BentoFeatures } from '@/components/landing/bento-features';
import { FAQSection } from '@/components/landing/faq-section';
import { LandingFooter } from '@/components/landing/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { LandingNavbar } from '@/components/landing/navbar';
import { ParallaxShowcase } from '@/components/landing/parallax-showcase';
import { PricingSection } from '@/components/landing/pricing-section';
import { SmoothScrollProvider } from '@/components/shared/smooth-scroll-provider';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('landing');
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  };
}

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <LandingNavbar />
        <main id="main-content">
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

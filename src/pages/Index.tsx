import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { ImageCarousel } from '@/components/landing/ImageCarousel';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { TravelersSection } from '@/components/landing/TravelersSection';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ImageCarousel />
        <FeaturesSection />
        <TravelersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

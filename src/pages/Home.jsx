
import HeroSection from '../components/sections/HeroSection';
import LunoCarouselSection from '../components/sections/LunoCarouselSection';
import ProductCatalogSection from '../components/sections/ProductCatalogSection';
import MethodologySection from '../components/sections/MethodologySection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import AboutSectionHome from '../components/sections/AboutSectionHome';

export default function Home() {
  return (
    <>
      <HeroSection />
      <LunoCarouselSection />
      <ProductCatalogSection />
      <MethodologySection />
      <TestimonialsSection />
      <AboutSectionHome />
    </>
  );
}
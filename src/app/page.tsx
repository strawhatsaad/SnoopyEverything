import { LogoCarousel } from "@/sections/LogoCarousel";
import { InteractiveGrid } from "@/sections/InteractiveGrid";
import { BrandsSlider } from "@/sections/BrandsSlider";
import { Testimonials } from "@/sections/Testimonials";
import { HeroVideo } from "@/sections/Hero";
import { ContactUs } from "@/sections/ContactUs";

export default function Home() {
  return (
    <main>
      <HeroVideo />
      <LogoCarousel />
      <InteractiveGrid />
      <BrandsSlider />
      <Testimonials />
      <ContactUs />
    </main>
  );
}

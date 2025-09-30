import { LogoCarousel } from "@/sections/LogoCarousel";
import { InteractiveGrid } from "@/sections/InteractiveGrid";
import { BrandsSlider } from "@/sections/BrandsSlider";
import { Testimonials } from "@/sections/Testimonials";

export default function Home() {
  return (
    <main>
      <LogoCarousel />
      <InteractiveGrid />
      <BrandsSlider />
      <Testimonials />
    </main>
  );
}

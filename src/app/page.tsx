import { LogoCarousel } from "@/sections/LogoCarousel";
import { InteractiveGrid } from "@/sections/InteractiveGrid";
import { BrandsSlider } from "@/sections/BrandsSlider";

export default function Home() {
  return (
    <main>
      <LogoCarousel />
      <InteractiveGrid />
      <BrandsSlider />
    </main>
  );
}

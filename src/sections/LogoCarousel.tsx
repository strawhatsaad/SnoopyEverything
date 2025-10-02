"use client";

import { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import logo from "@/assets/header-logo-light.png";
import logoAgency from "@/assets/SnoopyLogo01.png";
import logoCircle from "@/assets/SnoopyLogo02.png";
import logoEverything from "@/assets/SnoopyLogo03.png";
import logoRetreats from "@/assets/SnoopyLogo04.png";
import logoWeddings from "@/assets/SnoopyLogo05.png";
import logoBeats from "@/assets/SnoopyLogo06.png";
import logoProductions from "@/assets/SnoopyLogo07.png";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define a type for our logo objects for better type safety
interface Logo {
  src: StaticImageData;
  alt: string;
  description: string;
}

const smallLogos: Logo[] = [
  {
    src: logoAgency,
    alt: "Snoopy Agency",
    description:
      "Snoopy Agency is a creative hub, driving playful and effective campaigns with its signature charm and wit.",
  },
  {
    src: logoCircle,
    alt: "Snoopy Circle",
    description:
      "Snoopy Circle represents community and warmth, connecting fans and friends in a trusted, friendly network.",
  },
  {
    src: logoEverything,
    alt: "Snoopy Everything",
    description:
      "Snoopy Everything offers a complete, whimsical range of products and services, covering all your needs with fun.",
  },
  {
    src: logoRetreats,
    alt: "Snoopy Retreats",
    description:
      "Snoopy Retreats provides a peaceful escape, offering relaxing getaways and a chance to recharge with friends.",
  },
  {
    src: logoWeddings,
    alt: "Snoopy Weddings",
    description:
      "Snoopy Weddings brings heartwarming joy to special days, planning events with love, laughter, and a unique touch.",
  },
  {
    src: logoBeats,
    alt: "Snoopy Beats",
    description:
      "Snoopy Beats sets the rhythm for fun, offering a lively selection of music, sound, and entertainment for any event.",
  },
  {
    src: logoProductions,
    alt: "Snoopy Productions",
    description:
      "Snoopy Productions crafts engaging stories and content, delivering high-quality, charming media for all audiences.",
  },
];

const defaultDescription =
  "Our ecosystem is a suite of powerful, integrated tools designed to elevate your business. Click on a logo to learn more about each product.";

export const LogoCarousel = () => {
  const containerRef = useRef(null);
  const rotationRef = useRef(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  const [selectedLogo, setSelectedLogo] = useState<Logo | null>(null);

  useGSAP(
    () => {
      // Create a timeline with a single ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000", // Scroll 2000px to complete one full rotation
          scrub: 1,
          pin: true, // Pin the section in place
          anticipatePin: 1,
        },
      });

      // Add both rotations to the same timeline
      tl.to(
        rotationRef.current,
        {
          rotation: -360,
          ease: "none",
        },
        0
      ) // Start at time 0
        .to(
          ".small-logo-item",
          {
            rotation: 360,
            ease: "none",
          },
          0
        ); // Also start at time 0 (parallel animation)
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (!selectedLogo) return;

      const newText = selectedLogo.description;
      const descElement = descRef.current;
      const logoEl = logoContainerRef.current;

      const tl = gsap.timeline();

      // Fade out both the description and the (previous) logo container
      tl.to([descElement, logoEl], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (!descElement) return;
          descElement.innerHTML = "";
          const words = newText.split(" ");

          words.forEach((word) => {
            const span = document.createElement("span");
            span.textContent = word;
            span.style.display = "inline-block";
            span.style.opacity = "0";
            span.style.transform = "translateY(10px)";
            descElement.appendChild(span);
            descElement.appendChild(document.createTextNode(" "));
          });

          // Animate the logo and text back in
          gsap.to(descElement, { opacity: 1, duration: 0.2 });

          // Animate the new logo with a subtle slide-up effect
          gsap.fromTo(
            logoEl,
            { y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );

          // Animate the text word by word
          gsap.to(descElement.children, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.04,
          });
        },
      });
    },
    { dependencies: [selectedLogo] }
  );

  return (
    <section
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-x-72 min-h-screen place-items-center bg-[#080808] overflow-clip"
    >
      {/* Left Column */}
      <div className="relative flex items-center justify-center w-full h-[700px]">
        <div className="flex flex-col items-center z-10">
          <Image
            src={logo}
            alt="Snoopy Everything Logo"
            width={500}
            height={500}
          />
        </div>
        <div ref={rotationRef} className="absolute w-full h-full">
          {smallLogos.map((logoItem, index) => {
            const angle = (index / smallLogos.length) * 360;
            const lgRadius = 650;
            return (
              <div
                key={`${logoItem.alt}-${index}`}
                className="small-logo-item absolute top-1/2 left-1/2 bg-transparent p-4 rounded-lg shadow-md border-border-gray-200 cursor-pointer"
                onClick={() => setSelectedLogo(logoItem)}
                style={
                  {
                    "--angle": `${angle}deg`,
                    "--radius-lg": `${lgRadius}px`,
                    transform: `
                    rotate(var(--angle)) 
                    translate(var(--radius-lg))
                    rotate(calc(-1 * var(--angle)))
                    translateX(-50%)
                    translateY(-50%)
                  `,
                  } as React.CSSProperties
                }
              >
                <Image
                  src={logoItem.src}
                  alt={logoItem.alt}
                  width={200}
                  height={100}
                  className="object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Description */}
      <div className="flex flex-col items-center justify-center lg:items-start text-center lg:text-left">
        <div ref={logoContainerRef} className="h-[100px] opacity-0">
          {selectedLogo && (
            <Image
              src={selectedLogo.src}
              alt={`${selectedLogo.alt} logo`}
              width={150}
              height={75}
              className="object-contain mb-6"
            />
          )}
        </div>

        <p
          ref={descRef}
          className="text-white text-lg max-w-xs pt-6"
          style={{ minHeight: "150px" }}
        >
          {/* {defaultDescription} */}
        </p>
      </div>
    </section>
  );
};

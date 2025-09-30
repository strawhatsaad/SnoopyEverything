"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clientLogo from "@/assets/header-logo-light.png";

gsap.registerPlugin(ScrollTrigger);

// Import your logo images here
const logos = [
  { src: clientLogo, alt: "Client 1" },
  { src: clientLogo, alt: "Client 2" },
  { src: clientLogo, alt: "Client 3" },
  { src: clientLogo, alt: "Client 4" },
  { src: clientLogo, alt: "Client 5" },
  { src: clientLogo, alt: "Client 6" },
  { src: clientLogo, alt: "Client 7" },
  { src: clientLogo, alt: "Client 8" },
  { src: clientLogo, alt: "Client 9" },
  { src: clientLogo, alt: "Client 10" },
  { src: clientLogo, alt: "Client 11" },
  { src: clientLogo, alt: "Client 12" },
];

export const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const logosContainerRef = useRef<HTMLDivElement>(null);
  const logosScrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      const logosContainer = logosContainerRef.current;
      const logosScroll = logosScrollRef.current;

      if (!section || !title || !logosContainer || !logosScroll) return;

      // Split title into letters
      const text = "Our Clients and Partners";
      const letters = text.split("").map((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        return span;
      });

      title.innerHTML = "";
      letters.forEach((letter) => title.appendChild(letter));

      // Animate title letters with wave effect
      gsap.fromTo(
        letters,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: section,
            start: "top 40%",
            end: "top 10%",
            scrub: 1,
          },
        }
      );

      // Pin the title and reveal logos
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: title,
        pinSpacing: false,
      });

      // Animate logos sliding up
      gsap.fromTo(
        logosContainer,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 30%",
            end: "top -10%",
            scrub: 1,
          },
        }
      );

      // Infinite horizontal scroll for logos - all rows scroll continuously
      const row1 = logosScroll;
      const row2 = section.querySelector(".logos-row-2");
      const row3 = section.querySelector(".logos-row-3");

      // Calculate scroll width based on one set of logos
      const calculateScrollWidth = (element: Element) => {
        return element.scrollWidth / 3; // Divided by 3 since we tripled the logos
      };

      // Row 1 - scrolls right to left
      if (row1) {
        const width = calculateScrollWidth(row1);
        gsap.set(row1, { x: 0 });
        gsap.to(row1, {
          x: -width,
          duration: 40,
          ease: "none",
          repeat: -1,
        });
      }

      // Row 2 - scrolls left to right (opposite direction)
      if (row2) {
        const width = calculateScrollWidth(row2);
        gsap.set(row2, { x: -width });
        gsap.to(row2, {
          x: 0,
          duration: 45,
          ease: "none",
          repeat: -1,
        });
      }

      // Row 3 - scrolls right to left (faster)
      if (row3) {
        const width = calculateScrollWidth(row3);
        gsap.set(row3, { x: 0 });
        gsap.to(row3, {
          x: -width,
          duration: 35,
          ease: "none",
          repeat: -1,
        });
      }
    },
    { scope: sectionRef }
  );

  // Triple the logos for infinite scroll
  const infiniteLogos = [...logos, ...logos, ...logos];

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black py-20">
      <div className="container mx-auto px-8">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl text-white text-center font-bold mb-20"
        >
          Our Clients and Partners
        </h2>

        {/* Logos Grid with Infinite Scroll - 3 Rows */}
        <div
          ref={logosContainerRef}
          className="relative mt-32 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          }}
        >
          <div className="flex flex-col gap-6">
            {/* Row 1 */}
            <div ref={logosScrollRef} className="flex gap-8">
              {infiniteLogos.map((logo, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 w-48 h-32 bg-neutral-900 rounded-2xl p-6 flex items-center justify-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={80}
                    className="object-contain filter grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-8 logos-row-2">
              {infiniteLogos.map((logo, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 w-48 h-32 bg-neutral-900 rounded-2xl p-6 flex items-center justify-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={80}
                    className="object-contain filter grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Row 3 */}
            <div className="flex gap-8 logos-row-3">
              {infiniteLogos.map((logo, index) => (
                <div
                  key={`row3-${index}`}
                  className="flex-shrink-0 w-48 h-32 bg-neutral-900 rounded-2xl p-6 flex items-center justify-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={80}
                    className="object-contain filter grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

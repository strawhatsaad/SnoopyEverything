"use client";

import { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import logo from "@/assets/snoopy.png";
import logoApex from "@/assets/logo-apex.png";
import logoCelestial from "@/assets/logo-celestial.png";
import logoPulse from "@/assets/logo-pulse.png";
import logoQuantum from "@/assets/logo-quantum.png";

// Define a type for our logo objects for better type safety
interface Logo {
  src: StaticImageData;
  alt: string;
  description: string;
}

const smallLogos: Logo[] = [
  {
    src: logoApex,
    alt: "Apex",
    description:
      "Apex drives innovation with cutting-edge solutions, pushing the boundaries of what's possible in the tech industry.",
  },
  {
    src: logoCelestial,
    alt: "Celestial",
    description:
      "Celestial provides cloud-based services that are scalable, secure, and designed for the future of digital infrastructure.",
  },
  {
    src: logoPulse,
    alt: "Pulse",
    description:
      "Pulse is at the heart of data analytics, offering real-time insights and metrics to help businesses thrive.",
  },
  {
    src: logoQuantum,
    alt: "Quantum",
    description:
      "Quantum revolutionizes computing with next-generation processing power, tackling complex problems with ease.",
  },
  // Duplicates for carousel
  {
    src: logoApex,
    alt: "Apex",
    description:
      "Apex drives innovation with cutting-edge solutions, pushing the boundaries of what's possible in the tech industry.",
  },
  {
    src: logoCelestial,
    alt: "Celestial",
    description:
      "Celestial provides cloud-based services that are scalable, secure, and designed for the future of digital infrastructure.",
  },
  {
    src: logoPulse,
    alt: "Pulse",
    description:
      "Pulse is at the heart of data analytics, offering real-time insights and metrics to help businesses thrive.",
  },
  {
    src: logoQuantum,
    alt: "Quantum",
    description:
      "Quantum revolutionizes computing with next-generation processing power, tackling complex problems with ease.",
  },
  {
    src: logoApex,
    alt: "Apex",
    description:
      "Apex drives innovation with cutting-edge solutions, pushing the boundaries of what's possible in the tech industry.",
  },
  {
    src: logoCelestial,
    alt: "Celestial",
    description:
      "Celestial provides cloud-based services that are scalable, secure, and designed for the future of digital infrastructure.",
  },
  {
    src: logoPulse,
    alt: "Pulse",
    description:
      "Pulse is at the heart of data analytics, offering real-time insights and metrics to help businesses thrive.",
  },
  {
    src: logoQuantum,
    alt: "Quantum",
    description:
      "Quantum revolutionizes computing with next-generation processing power, tackling complex problems with ease.",
  },
  {
    src: logoApex,
    alt: "Apex",
    description:
      "Apex drives innovation with cutting-edge solutions, pushing the boundaries of what's possible in the tech industry.",
  },
  {
    src: logoCelestial,
    alt: "Celestial",
    description:
      "Celestial provides cloud-based services that are scalable, secure, and designed for the future of digital infrastructure.",
  },
  {
    src: logoPulse,
    alt: "Pulse",
    description:
      "Pulse is at the heart of data analytics, offering real-time insights and metrics to help businesses thrive.",
  },
  {
    src: logoQuantum,
    alt: "Quantum",
    description:
      "Quantum revolutionizes computing with next-generation processing power, tackling complex problems with ease.",
  },
];

const defaultDescription =
  "Our ecosystem is a suite of powerful, integrated tools designed to elevate your business. Click on a logo to learn more about each product.";

export const LogoCarousel = () => {
  const containerRef = useRef(null);
  const rotationRef = useRef(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null); // 👈 1. New ref for the logo container

  const [selectedLogo, setSelectedLogo] = useState<Logo | null>(null);

  useGSAP(
    () => {
      gsap.to(rotationRef.current, {
        rotation: -360,
        duration: 60,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".small-logo-item", {
        rotation: 360,
        duration: 60,
        ease: "none",
        repeat: -1,
      });
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

          // 👇 3. Animate the logo and text back in
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
      className="grid grid-cols-1 lg:grid-cols-2 gap-x-72 min-h-screen place-items-center bg-[#f5f5f5] overflow-clip"
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
            const lgRadius = 600;
            return (
              <div
                key={`${logoItem.alt}-${index}`}
                className="small-logo-item absolute top-1/2 left-1/2 bg-white p-4 rounded-lg shadow-md border-border-gray-200 cursor-pointer"
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
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Description */}
      {/* 👇 2. Updated JSX for the description area */}
      <div className="flex flex-col items-center justify-center lg:items-start text-center lg:text-left">
        <div
          ref={logoContainerRef}
          className="h-[100px] opacity-0" // Set height to prevent layout shift and start invisible
        >
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
          className="text-neutral-600 text-lg max-w-xs"
          style={{ minHeight: "150px" }} // Set min-height to prevent jumping
        >
          {defaultDescription}
        </p>
      </div>
    </section>
  );
};

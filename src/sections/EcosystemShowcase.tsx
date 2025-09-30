"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import logo from "@/assets/logosaas.png";
import logoApex from "@/assets/logo-apex.png";
import logoCelestial from "@/assets/logo-celestial.png";
import logoPulse from "@/assets/logo-pulse.png";
import logoQuantum from "@/assets/logo-quantum.png";
import logoEcho from "@/assets/logo-echo.png";
import logoAcme from "@/assets/logo-acme.png";

const ecosystemLogos = [
  { src: logoApex, alt: "Apex" },
  { src: logoCelestial, alt: "Celestial" },
  { src: logoPulse, alt: "Pulse" },
  { src: logoQuantum, alt: "Quantum" },
  { src: logoEcho, alt: "Echo" },
  { src: logoAcme, alt: "Acme" },
];

export const EcosystemShowcase = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Animate the logo container vertically
      gsap.to(".logo-container", {
        yPercent: -50, // Move up by half its height (since it's duplicated)
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="container grid grid-cols-1 lg:grid-cols-2 items-center gap-16 min-h-screen"
    >
      {/* Left Column: Main Logo */}
      <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
        <Image src={logo} alt="Snoopy Ecosystem" width={120} height={120} />
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mt-6">
          Snoopy Everything's Ecosystem
        </h2>
      </div>

      {/* Right Column: Scrolling Logos & Description */}
      <div className="relative h-[400px] w-full max-w-sm mx-auto lg:max-w-none overflow-hidden">
        {/* The text description */}
        <p className="text-neutral-600 text-lg max-w-xs mb-8">
          Add a small introductory description here.
        </p>

        {/* This div contains the duplicated logos and is the target of our animation */}
        <div className="logo-container absolute left-0 top-0 w-full">
          {/* We render the logos twice for a seamless loop */}
          {[...ecosystemLogos, ...ecosystemLogos].map((logoItem, index) => (
            <div
              key={`${logoItem.alt}-${index}`}
              className="w-full h-28 flex items-center"
            >
              <Image
                src={logoItem.src}
                alt={logoItem.alt}
                width={150}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

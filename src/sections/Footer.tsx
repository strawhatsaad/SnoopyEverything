"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "@/assets/header-logo-light.png";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const footer = footerRef.current;
      const logo = logoRef.current;
      if (!footer || !logo) return;

      gsap.fromTo(
        logo,
        {
          y: 100,
          scale: 0.8,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    },
    { scope: footerRef }
  );

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-black flex flex-col items-center justify-center -mt-36 pb-32"
    >
      <div
        ref={logoRef}
        className="flex flex-col items-center justify-center opacity-0"
      >
        <div className="-mb-16">
          <Image
            src={logo}
            alt="Company Logo"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        <p className="text-gray-400 text-sm">
          © {currentYear} Snoopy Everything Ecosystem. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Brands", href: "#brands" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const letterRefs = useRef<{ [key: string]: HTMLSpanElement[] }>({});
  const underlineRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Animate letters with wave effect
  useGSAP(
    () => {
      if (hoveredLink) {
        const letters = letterRefs.current[hoveredLink];
        const underline = underlineRefs.current[hoveredLink];

        if (letters) {
          // Wave effect - each letter animates with a stagger
          gsap.fromTo(
            letters,
            { y: 0 },
            {
              y: -8,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
            }
          );
        }

        if (underline) {
          // Animate underline in
          gsap.fromTo(
            underline,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.4,
              ease: "power2.out",
            }
          );
        }
      } else {
        // Animate all underlines out when no hover
        Object.values(underlineRefs.current).forEach((underline) => {
          if (underline) {
            gsap.to(underline, {
              scaleX: 0,
              duration: 0.3,
              ease: "power2.in",
            });
          }
        });
      }
    },
    { dependencies: [hoveredLink] }
  );

  const splitTextToLetters = (text: string, linkName: string) => {
    return text.split("").map((letter, index) => (
      <span
        key={`${linkName}-${index}`}
        ref={(el) => {
          if (!letterRefs.current[linkName]) {
            letterRefs.current[linkName] = [];
          }
          if (el) {
            letterRefs.current[linkName][index] = el;
          }
        }}
        className="inline-block"
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-20 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white text-2xl font-bold">
          Snoopy Everything
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-white text-lg font-medium"
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <span className="inline-block">
                {splitTextToLetters(link.name, link.name)}
              </span>

              {/* Animated underline */}
              <div
                ref={(el) => {
                  underlineRefs.current[link.name] = el;
                }}
                className="absolute bottom-0 left-0 w-full h-[2px] bg-white origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

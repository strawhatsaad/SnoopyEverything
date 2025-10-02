"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import headerLogo from "@/assets/SnoopyLogo03.png";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Brands", href: "#brands" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true); // Default to dark (white text)
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const logoDarkRef = useRef<HTMLDivElement>(null);
  const logoLightRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const letterRefs = useRef<{ [key: string]: HTMLSpanElement[] }>({});
  const underlineRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Detect section background color
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const bgColor = window.getComputedStyle(section).backgroundColor;
      const rgb = bgColor.match(/\d+/g);

      if (rgb) {
        const [r, g, b] = rgb.map(Number);
        // Calculate luminance to determine if background is light or dark
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const isLightSection = luminance > 0.5;

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 100px",
          end: "bottom 100px",
          onEnter: () => setIsDark(!isLightSection),
          onEnterBack: () => setIsDark(!isLightSection),
        });

        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  // Animate color change and logo switch
  useGSAP(
    () => {
      const textColor = isDark ? "#ffffff" : "#000000";

      if (logoRef.current) {
        gsap.to(logoRef.current, {
          color: textColor,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Swap logos with fade animation
      if (logoDarkRef.current && logoLightRef.current) {
        if (isDark) {
          // Show dark logo (for light backgrounds), hide light logo
          gsap.to(logoLightRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(logoDarkRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          // Show light logo (for dark backgrounds), hide dark logo
          gsap.to(logoDarkRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(logoLightRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }

      if (navRef.current) {
        const links = navRef.current.querySelectorAll("a");
        gsap.to(links, {
          color: textColor,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Update underlines color
      Object.values(underlineRefs.current).forEach((underline) => {
        if (underline) {
          gsap.to(underline, {
            backgroundColor: textColor,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    },
    { dependencies: [isDark] }
  );

  // Animate letters with wave effect
  useGSAP(
    () => {
      if (hoveredLink) {
        const letters = letterRefs.current[hoveredLink];
        const underline = underlineRefs.current[hoveredLink];

        if (letters) {
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
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-[1800px] mx-auto px-8 lg:px-20 py-0 flex items-center justify-between">
        {/* Logo - with dual images for light/dark backgrounds */}
        <Link
          ref={logoRef}
          href="/"
          className="relative text-2xl font-bold transition-colors h-32 w-80"
        >
          {/* Logo for dark backgrounds (white/light version) */}
          <div ref={logoLightRef} className="absolute inset-0">
            <Image
              src={headerLogo} // Replace with your light logo path
              alt="Snoopy Everything"
              fill
              className="object-contain object-left"
              priority
            />
          </div>

          {/* Logo for light backgrounds (dark version) */}
          <div ref={logoDarkRef} className="absolute inset-0 opacity-0">
            <Image
              src="/header-logo-dark.png" // Replace with your dark logo path
              alt="Snoopy Everything"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav ref={navRef} className="flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-white text-lg font-medium transition-colors"
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

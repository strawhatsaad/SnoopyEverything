"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  {
    id: 1,
    title: "Apex Innovation",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Celestial Cloud",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Pulse Analytics",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "Quantum Computing",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    title: "Nexus Networks",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    title: "Zenith AI",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 7,
    title: "Orion Systems",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 8,
    title: "Stellar Security",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60",
  },
];

export const BrandsSlider = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      const cardsContainer = cardsContainerRef.current;

      if (!section || !title || !cardsContainer) return;

      // Title animation - slides in from left when section is 30% in view
      gsap.fromTo(
        title,
        { x: -200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 40%",
            end: "top 0%",
            scrub: 1,
          },
        }
      );

      // Cards fade in animation - when section is 80% in view
      const cards = document.querySelectorAll(".brand-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          }
        );
      });

      // Calculate the total scroll distance needed for horizontal scrolling
      const scrollDistance = cardsContainer.scrollWidth - window.innerWidth;

      // Horizontal scroll animation - starts when section is fully in view
      gsap.to(cardsContainer, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top -10%",
          end: () => `+=${scrollDistance + window.innerHeight * 1.5}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black overflow-hidden py-24"
    >
      <div className="h-screen flex flex-col justify-center px-8 lg:px-20">
        {/* Title - Left aligned */}
        <h2
          ref={titleRef}
          className="text-7xl lg:text-9xl font-bold text-white mb-24 opacity-0"
        >
          Our Brands
        </h2>

        {/* Horizontal scrolling cards */}
        <div className="overflow-hidden">
          <div
            ref={cardsContainerRef}
            className="flex gap-40 items-center will-change-transform"
          >
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="brand-card flex-shrink-0 w-[600px] group cursor-pointer"
              >
                {/* Card */}
                <div className="relative">
                  {/* Image */}
                  <div className="relative w-full h-[400px] rounded-3xl overflow-hidden bg-neutral-900">
                    <Image
                      src={brand.image}
                      alt={brand.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="600px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl font-bold text-white mt-8 transition-colors duration-300 group-hover:text-blue-400">
                    {brand.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

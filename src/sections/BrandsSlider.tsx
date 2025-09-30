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
    description: "Revolutionizing industries with bold tech solutions.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Celestial Cloud",
    description: "Next-gen cloud infrastructure for limitless scalability.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Pulse Analytics",
    description: "Data-driven insights that power smarter decisions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "Quantum Computing",
    description: "Unlocking the future of computing with quantum leaps.",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    title: "Nexus Networks",
    description: "Connecting the world through robust digital highways.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    title: "Zenith AI",
    description: "Pioneering AI systems that learn and evolve with you.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 7,
    title: "Orion Systems",
    description: "Innovative solutions to scale your digital ecosystem.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 8,
    title: "Stellar Security",
    description: "Advanced protection for a safer digital future.",
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

      // Title animation
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

      // Cards fade in
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

        // Hover effects (raise + description wave)
        const descSpans = card.querySelectorAll(".brand-desc span");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -20,
            duration: 0.4,
            ease: "power3.out",
          });

          gsap.fromTo(
            descSpans,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.015,
              duration: 0.25,
              ease: "power3.out",
              overwrite: true,
            }
          );
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          });

          gsap.to(descSpans, {
            y: 20,
            opacity: 0,
            stagger: 0.01,
            duration: 0.2,
            ease: "power3.in",
            overwrite: true,
          });
        });
      });

      // Horizontal scroll
      const scrollDistance = cardsContainer.scrollWidth - window.innerWidth;
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
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-7xl lg:text-9xl font-bold text-white mb-24 opacity-0"
        >
          Our Brands
        </h2>

        {/* Horizontal cards */}
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

                  {/* Description (hidden by default, animated in) */}
                  <p className="brand-desc text-lg text-white mt-4 flex flex-wrap gap-[2px]">
                    {brand.description.split("").map((char, idx) => (
                      <span key={idx} className="inline-block opacity-0">
                        {char}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

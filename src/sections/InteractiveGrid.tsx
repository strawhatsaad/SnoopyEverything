"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const cards = [
  {
    id: 1,
    title: "Max Malkin",
    imgSrc:
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFic3RyYWN0JTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
    url: "#",
  },
  {
    id: 2,
    title: "Jason Bock",
    imgSrc:
      "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFic3RyYWN0JTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
    url: "#",
  },
  {
    id: 3,
    title: "Sophie Muller",
    imgSrc:
      "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0YXJzfGVufDB8fDB8fHww",
    url: "#",
  },
  {
    id: 4,
    title: "Yousef",
    imgSrc:
      "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmF0dXJlfGVufDB8fDB8fHww",
    url: "#",
  },
];

export const InteractiveGrid = () => {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const titleRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useGSAP(
    () => {
      const grid = gridContainerRef.current;
      const section = sectionRef.current;
      if (!grid || !section) return;

      let animationFrame: number;
      let velocityX = 0;
      let velocityY = 0;
      let currentX = 0;
      let currentY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        const { width, height } = rect;

        // Calculate mouse position relative to section center (-1 to 1)
        const xPercent = (clientX / width - 0.5) * 2;
        const yPercent = (clientY / height - 0.5) * 2;

        // Set velocity based on distance from center
        const maxVelocity = 9;
        velocityX = -xPercent * maxVelocity;
        velocityY = -yPercent * maxVelocity;
      };

      const animate = () => {
        // Continuously update position based on velocity
        currentX += velocityX;
        currentY += velocityY;

        // Apply the transform
        gsap.set(grid, {
          x: currentX,
          y: currentY,
        });

        animationFrame = requestAnimationFrame(animate);
      };

      section.addEventListener("mousemove", handleMouseMove);
      animate();

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(animationFrame);
      };
    },
    { scope: sectionRef }
  );

  // Animate title when card is hovered
  useGSAP(
    () => {
      if (hoveredCard !== null) {
        const titleEl = titleRefs.current[hoveredCard];
        if (titleEl) {
          gsap.fromTo(
            titleEl,
            {
              opacity: 0,
              x: 20,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              ease: "power2.out",
            }
          );
        }
      }
    },
    { dependencies: [hoveredCard] }
  );

  // Create infinite grid by repeating cards
  const infiniteCards = [
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-black"
    >
      <div
        ref={gridContainerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-6 gap-6 p-12"
        style={{ width: "300vw", height: "300vh" }}
      >
        {infiniteCards.map((card, index) => (
          <div key={`${card.id}-${index}`} className="relative w-64 h-80">
            <Link
              href={card.url}
              className="block relative overflow-hidden rounded-lg group cursor-pointer h-full"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={card.imgSrc}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  sizes="256px"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
            </Link>

            {/* Title appears on the LEFT side of card on hover */}
            {hoveredCard === index && (
              <div
                ref={(el) => {
                  titleRefs.current[index] = el;
                }}
                className="absolute top-1/2 right-[105%] -translate-y-1/2 z-10 pointer-events-none whitespace-nowrap"
              >
                <h2 className="text-white text-5xl font-bold tracking-tight drop-shadow-2xl">
                  {card.title}
                </h2>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

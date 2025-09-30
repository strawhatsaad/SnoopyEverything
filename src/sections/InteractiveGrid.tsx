"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 2,
    title: "Max Malkin",
    imgSrc:
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFic3RyYWN0JTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
    url: "#",
    width: 320,
    height: 240,
  },
  {
    id: 3,
    title: "Jason Bock",
    imgSrc:
      "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFic3RyYWN0JTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
    url: "#",
    width: 300,
    height: 400,
  },
  {
    id: 6,
    title: "Ley & Pablo",
    imgSrc:
      "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWJzdHJhY3QlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
    url: "#",
    width: 300,
    height: 300,
  },
  {
    id: 8,
    title: "Sophie Muller",
    imgSrc:
      "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0YXJzfGVufDB8fDB8fHww",
    url: "#",
    width: 280,
    height: 360,
  },
  {
    id: 9,
    title: "Yousef",
    imgSrc:
      "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmF0dXJlfGVufDB8fDB8fHww",
    url: "#",
    width: 320,
    height: 380,
  },
];

export const InteractiveGrid = () => {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const interactiveAreaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const titleRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useGSAP(
    () => {
      const grid = gridContainerRef.current;
      const interactiveArea = interactiveAreaRef.current;
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!grid || !interactiveArea || !section || !title) return;

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

      let animationFrame: number;
      let velocityX = 0;
      let velocityY = 0;
      let currentX = -400;
      let currentY = -300;
      let isMouseInSection = false;

      gsap.set(grid, {
        x: currentX,
        y: currentY,
      });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        const { width, height } = rect;

        const xPercent = (clientX / width - 0.5) * 2;
        const yPercent = (clientY / height - 0.5) * 2;

        const maxVelocity = 6;
        velocityX = -xPercent * maxVelocity;
        velocityY = -yPercent * maxVelocity;
      };

      const handleMouseEnter = () => {
        isMouseInSection = true;
      };

      const handleMouseLeave = () => {
        isMouseInSection = false;
        velocityX = 0;
        velocityY = 0;
      };

      const animate = () => {
        if (isMouseInSection) {
          currentX += velocityX;
          currentY += velocityY;

          gsap.set(grid, {
            x: currentX,
            y: currentY,
          });
        }

        animationFrame = requestAnimationFrame(animate);
      };

      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseenter", handleMouseEnter);
      section.addEventListener("mouseleave", handleMouseLeave);
      animate();

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseenter", handleMouseEnter);
        section.removeEventListener("mouseleave", handleMouseLeave);
        cancelAnimationFrame(animationFrame);
      };
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (hoveredCard !== null) {
        const titleEl = titleRefs.current[hoveredCard];
        const cardEl = cardRefs.current[hoveredCard];

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

        if (cardEl) {
          gsap.to(cardEl, {
            scale: 1.08,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      } else {
        Object.values(cardRefs.current).forEach((cardEl) => {
          if (cardEl) {
            gsap.to(cardEl, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        });
      }
    },
    { dependencies: [hoveredCard] }
  );

  const infiniteCards = [
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
  ];

  const getCardPositions = () => {
    const positions: Array<{
      left: number;
      top: number;
      card: (typeof cards)[0];
    }> = [];
    const margin = 70;

    infiniteCards.forEach((card, index) => {
      let attempts = 0;
      let validPosition = false;
      let newPos = { left: 0, top: 0 };

      while (!validPosition && attempts < 100) {
        const seed = index * 2654435761 + attempts * 1234567;
        const baseX = (index % 7) * 450;
        const baseY = Math.floor(index / 7) * 450;
        const randomOffsetX = (seed % 200) - 100;
        const randomOffsetY = ((seed >> 8) % 200) - 100;

        newPos = {
          left: baseX + randomOffsetX - 600,
          top: baseY + randomOffsetY - 500,
        };

        validPosition =
          positions.length === 0 ||
          positions.every((pos) => {
            const distanceX = Math.abs(newPos.left - pos.left);
            const distanceY = Math.abs(newPos.top - pos.top);

            const noOverlapX =
              distanceX > (card.width + pos.card.width) / 2 + margin;
            const noOverlapY =
              distanceY > (card.height + pos.card.height) / 2 + margin;

            return noOverlapX || noOverlapY;
          });

        attempts++;
      }

      positions.push({ ...newPos, card });
    });

    return positions.map((pos) => ({ left: pos.left, top: pos.top }));
  };

  const cardPositions = getCardPositions();

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[rgb(8,8,8)]"
    >
      {/* Title Container - Separate from interactive area */}
      <div className="relative z-10 py-20 px-8 lg:px-20 bg-[linear-gradient(to_bottom,rgba(8,8,8,1),rgba(8,8,8,0.8),rgba(8,8,8,0.6),rgba(8,8,8,0))]">
        <h2
          ref={titleRef}
          className="text-7xl lg:text-9xl font-bold text-white opacity-0"
        >
          Our Projects
        </h2>
      </div>

      {/* Interactive Cards Container */}
      <div
        ref={interactiveAreaRef}
        className="absolute inset-0 overflow-hidden"
      >
        <div
          ref={gridContainerRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "400vw",
            height: "400vh",
            transform: "translate(-50%, -50%) translate(-400px, -300px)",
          }}
        >
          {infiniteCards.map((card, index) => {
            const position = cardPositions[index];

            return (
              <div
                key={`${card.id}-${index}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="absolute"
                style={{
                  left: `${position.left}px`,
                  top: `${position.top}px`,
                  width: `${card.width}px`,
                  height: `${card.height}px`,
                }}
              >
                <Link
                  href={card.url}
                  className="block relative overflow-hidden rounded-lg group cursor-pointer h-full w-full"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={card.imgSrc}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes={`${card.width}px`}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  </div>
                </Link>

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
            );
          })}
        </div>
      </div>
    </section>
  );
};

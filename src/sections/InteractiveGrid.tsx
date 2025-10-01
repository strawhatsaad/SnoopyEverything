"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Card {
  id: number;
  title: string;
  imgSrc: string;
  url: string;
  width: number;
  height: number;
  description: {
    overview: string;
    challenge: string;
    solution: string;
    results: string;
  };
}

const cards: Card[] = [
  {
    id: 2,
    title: "Max Malkin",
    imgSrc:
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFic3RyYWN0JTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
    url: "#",
    width: 320,
    height: 240,
    description: {
      overview:
        "A comprehensive digital transformation project that revolutionized the way modern businesses interact with their customers through innovative technology solutions. The platform was designed from the ground up to address the evolving needs of digital-first consumers while maintaining the reliability and security that enterprise clients demand. This initiative marked a turning point in how the organization approached customer engagement and set new standards for the industry.",
      challenge:
        "The client faced significant obstacles in maintaining customer engagement and needed a complete overhaul of their digital infrastructure to stay competitive in the market. Legacy systems were creating bottlenecks, customer satisfaction scores were declining, and the technical debt had accumulated to a point where even minor updates required extensive resources. The organization needed a solution that could scale with their growing user base while simultaneously reducing operational complexity and costs.",
      solution:
        "We developed a cutting-edge platform that seamlessly integrates multiple touchpoints, providing a unified and intuitive experience across all channels while maintaining scalability and performance. Our approach involved implementing microservices architecture, adopting cloud-native technologies, and establishing automated deployment pipelines. The new system was built with modularity in mind, allowing for rapid iteration and continuous improvement based on user feedback and analytics.",
      results:
        "The implementation resulted in a remarkable increase in user engagement and customer satisfaction, with metrics showing substantial improvements across all key performance indicators. Within six months of launch, the platform processed over two million transactions and achieved a customer satisfaction score of ninety-eight percent. The solution reduced operational costs by forty percent while simultaneously improving service delivery speed by sixty-five percent, exceeding all initial projections and establishing a new benchmark for digital excellence.",
    },
  },
  {
    id: 3,
    title: "Jason Bock",
    imgSrc:
      "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFic3RyYWN0JTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
    url: "#",
    width: 300,
    height: 400,
    description: {
      overview:
        "An ambitious branding initiative that transformed a traditional business into a forward-thinking digital enterprise with a strong market presence and distinctive identity. This project encompassed everything from visual identity to brand messaging, creating a cohesive narrative that resonated with both existing customers and new audiences. The rebrand was more than cosmetic—it represented a fundamental shift in how the company positioned itself in an increasingly competitive marketplace.",
      challenge:
        "The brand struggled to differentiate itself in a saturated market and required a complete reimagining of its visual identity and messaging strategy. Research revealed that consumers perceived the brand as outdated and disconnected from contemporary values. Market share was eroding to more agile competitors, and internal stakeholders were divided on the best path forward. The challenge was to honor the brand's heritage while boldly stepping into the future with authenticity and confidence.",
      solution:
        "Our team crafted a bold new visual language and strategic positioning that resonated with the target audience while maintaining authenticity and building trust. We conducted extensive market research, competitive analysis, and stakeholder workshops to ensure every element of the new brand reflected genuine values and aspirations. The design system we developed was flexible enough to work across all media while maintaining strong recognition and consistency.",
      results:
        "The rebrand exceeded expectations, generating significant media attention and driving unprecedented growth in brand recognition and market share within the first quarter. Brand awareness increased by one hundred and twenty percent in the target demographic, with social media engagement growing by three hundred percent. The new identity attracted partnerships with five major industry leaders and opened doors to previously inaccessible markets. Most importantly, internal teams rallied around the new vision, creating a unified culture focused on innovation and customer-centricity.",
    },
  },
  {
    id: 8,
    title: "Sophie Muller",
    imgSrc:
      "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0YXJzfGVufDB8fDB8fHww",
    url: "#",
    width: 280,
    height: 360,
    description: {
      overview:
        "An ethereal visual experience that pushed the boundaries of digital art and interactive storytelling, creating an immersive journey through light and space. This project represented the convergence of artistic vision and technological innovation, resulting in an experience that transcended traditional media categories. Visitors were transported to otherworldly environments where they could interact with dynamic visual narratives that responded to their presence and movements in real-time.",
      challenge:
        "Creating a truly immersive experience that engaged audiences emotionally while maintaining technical excellence and cross-platform compatibility presented unique challenges. The vision required bleeding-edge rendering techniques that had never been implemented at this scale, while also ensuring the experience would be accessible across a wide range of devices and platforms. Balancing artistic ambition with technical feasibility demanded constant innovation and problem-solving throughout the development process.",
      solution:
        "We leveraged advanced rendering techniques and thoughtful interaction design to craft a seamless experience that transported users to otherworldly environments with stunning visual fidelity. The project employed real-time ray tracing, procedural generation algorithms, and spatial audio processing to create a multisensory experience. We developed custom shaders and particle systems optimized for both high-end installations and mobile devices, ensuring accessibility without compromising artistic vision or performance.",
      results:
        "The project garnered international recognition and was featured in prestigious digital art festivals, establishing new standards for interactive visual experiences. Over fifty thousand visitors experienced the installation across multiple venues in its first year, with overwhelmingly positive feedback highlighting the emotional impact and technical sophistication. The project sparked academic discussions about the future of digital art and inspired numerous derivative works. It received three major awards including the prestigious Digital Innovation Prize and established the team as pioneers in immersive digital experiences.",
    },
  },
];

export const InteractiveGrid = () => {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const interactiveAreaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalImageRef = useRef<HTMLDivElement>(null);
  const modalTitleRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const titleRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const modalDescriptionRefs = useRef<{
    [key: string]: HTMLParagraphElement | null;
  }>({});

  useGSAP(
    () => {
      const grid = gridContainerRef.current;
      const interactiveArea = interactiveAreaRef.current;
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!grid || !interactiveArea || !section || !title) return;

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
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
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

  useGSAP(
    () => {
      const modal = modalRef.current;
      const modalContent = modalContentRef.current;
      const modalImage = modalImageRef.current;
      const modalTitle = modalTitleRef.current;
      const scrollContainer = scrollContainerRef.current;

      if (
        !modal ||
        !modalContent ||
        !modalImage ||
        !modalTitle ||
        !scrollContainer
      )
        return;

      if (selectedCard) {
        scrollContainer.scrollTop = 0;

        const tl = gsap.timeline();

        gsap.set(modal, { display: "flex" });

        tl.fromTo(
          modal,
          { backgroundColor: "rgba(0, 0, 0, 0)" },
          {
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            duration: 0.4,
            ease: "power2.out",
          }
        )
          .fromTo(
            modalContent,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
            "<0.2"
          )
          .fromTo(
            modalImage,
            { y: 150, scale: 0.7, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power4.out" },
            "<0.2"
          );

        if (modalTitle.textContent) {
          modalTitle.innerHTML = "";
          const words = selectedCard.title.split(" ");

          words.forEach((word) => {
            const span = document.createElement("span");
            span.textContent = word;
            span.style.display = "inline-block";
            span.style.opacity = "0";
            modalTitle.appendChild(span);
            modalTitle.appendChild(document.createTextNode(" "));
          });

          tl.to(
            modalTitle.children,
            {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.08,
            },
            "<0.3"
          );
        }

        Object.entries(modalDescriptionRefs.current).forEach(
          ([key, element]) => {
            if (element && element.textContent) {
              element.innerHTML = "";
              const text =
                selectedCard.description[
                  key as keyof typeof selectedCard.description
                ];
              const words = text.split(" ");

              words.forEach((word) => {
                const span = document.createElement("span");
                span.textContent = word;
                span.style.display = "inline-block";
                span.style.opacity = "0";
                element.appendChild(span);
                element.appendChild(document.createTextNode(" "));
              });

              ScrollTrigger.create({
                trigger: element,
                start: "top 80%",
                onEnter: () => {
                  gsap.to(element.children, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out",
                    stagger: 0.02,
                  });
                },
                scroller: scrollContainer,
              });

              gsap.set(element.children, { scale: 0.95 });
            }
          }
        );
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.scroller === scrollContainer) {
            trigger.kill();
          }
        });
      };
    },
    { dependencies: [selectedCard] }
  );

  const handleCardClick = (e: React.MouseEvent, card: Card) => {
    e.preventDefault();
    scrollPositionRef.current = window.scrollY;
    setSelectedCard(card);
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = "100%";
  };

  const handleCloseModal = () => {
    const modal = modalRef.current;
    if (!modal) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedCard(null);
        gsap.set(modal, { display: "none" });
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("position");
        document.body.style.removeProperty("top");
        document.body.style.removeProperty("width");
        window.scrollTo(0, scrollPositionRef.current);
      },
    });

    tl.to(modal, {
      backgroundColor: "rgba(0, 0, 0, 0)",
      duration: 0.3,
      ease: "power2.in",
    }).to(
      modalContentRef.current,
      {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "<"
    );
  };

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
      card: Card;
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
    <>
      <section
        ref={sectionRef}
        className="relative w-full min-h-screen bg-[rgb(8,8,8)]"
      >
        <div className="relative z-10 py-20 px-8 lg:px-20 bg-[linear-gradient(to_bottom,rgba(8,8,8,1),rgba(8,8,8,0.8),rgba(8,8,8,0.6),rgba(8,8,8,0))]">
          <h2
            ref={titleRef}
            className="text-7xl lg:text-9xl font-bold text-white opacity-0"
          >
            Our Projects
          </h2>
        </div>

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
                    onClick={(e) => handleCardClick(e, card)}
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

      <div
        ref={modalRef}
        className="fixed inset-0 z-50 items-center justify-center hidden overflow-hidden"
        onClick={handleCloseModal}
      >
        <button
          onClick={handleCloseModal}
          className="absolute top-12 right-12 z-50 text-white hover:text-gray-300 transition-colors"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div
          ref={modalContentRef}
          className="relative w-[90vw] h-[85vh] bg-black rounded-2xl overflow-hidden flex"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            ref={scrollContainerRef}
            className="w-1/2 h-full overflow-y-scroll p-16"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#444 #000",
              overscrollBehavior: "contain",
            }}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="sticky -top-20 bg-black pb-8 pt-4 z-10 -mt-20 -mx-16 px-16 mb-8">
              <h2 ref={modalTitleRef} className="text-6xl font-bold text-white">
                {selectedCard?.title}
              </h2>
            </div>

            <div className="space-y-8 pb-16">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Overview
                </h3>
                <p
                  ref={(el) => {
                    modalDescriptionRefs.current.overview = el;
                  }}
                  className="text-gray-300 text-lg leading-relaxed"
                >
                  {selectedCard?.description.overview}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Challenge
                </h3>
                <p
                  ref={(el) => {
                    modalDescriptionRefs.current.challenge = el;
                  }}
                  className="text-gray-300 text-lg leading-relaxed"
                >
                  {selectedCard?.description.challenge}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Solution
                </h3>
                <p
                  ref={(el) => {
                    modalDescriptionRefs.current.solution = el;
                  }}
                  className="text-gray-300 text-lg leading-relaxed"
                >
                  {selectedCard?.description.solution}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Results
                </h3>
                <p
                  ref={(el) => {
                    modalDescriptionRefs.current.results = el;
                  }}
                  className="text-gray-300 text-lg leading-relaxed"
                >
                  {selectedCard?.description.results}
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 h-full relative">
            <div
              ref={modalImageRef}
              className="absolute inset-0 m-8 rounded-lg overflow-hidden"
            >
              {selectedCard && (
                <Image
                  src={selectedCard.imgSrc}
                  alt={selectedCard.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

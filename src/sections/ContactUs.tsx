"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const menuItems = [
  {
    id: 1,
    title: "START A PROJECT",
    content:
      "Scroll down to explore how we can collaborate on your next big idea. Whether you're looking to innovate, create, or transform, we're here to help.",
  },
  {
    id: 2,
    title: "PRESS & MEDIA",
    content:
      "Media inquiries and press releases. Contact our communications team for interviews, statements, and brand assets.",
  },
  {
    id: 3,
    title: "PARTNERSHIPS",
    content:
      "Explore collaboration opportunities. Join forces with us to create innovative solutions and grow together.",
  },
  {
    id: 4,
    title: "JOIN US",
    content:
      "Become part of our team. We are always looking for talented individuals who share our vision and passion.",
  },
  {
    id: 5,
    title: "EVERYTHING ELSE",
    content:
      "General inquiries and other matters. Reach out to us for any questions or concerns not covered above.",
  },
];

export const ContactUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleMenuClick = (index: number) => {
    const section = sectionRef.current;
    if (!section || !scrollTriggerRef.current) return;

    const scrollTrigger = scrollTriggerRef.current;
    const start = scrollTrigger.start;
    const end = scrollTrigger.end;
    const totalDistance = end - start;
    const targetProgress = index / menuItems.length;
    const targetScroll = start + totalDistance * targetProgress;

    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 1,
      ease: "power2.inOut",
    });
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      const container = containerRef.current;

      if (!section || !container) return;

      // Scale up section from bottom
      gsap.fromTo(
        container,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Pin the section
      const totalScrollDistance = 300 * menuItems.length;

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${totalScrollDistance}`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(
            Math.floor(progress * menuItems.length),
            menuItems.length - 1
          );

          // Calculate progress within current menu item (0 to 1)
          const itemProgress = progress * menuItems.length - newIndex;
          setScrollProgress(itemProgress);

          if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
          }
        },
      });

      scrollTriggerRef.current = st;
    },
    { scope: sectionRef }
  );

  // Animate content with fade-slide word by word
  useGSAP(
    () => {
      const content = contentRef.current;
      if (!content) return;

      const newText = menuItems[activeIndex].content;
      const words = newText.split(" ");

      content.innerHTML = "";

      const wordSpans = words.map((word) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.marginRight = "0.25em"; // Add space between words
        return span;
      });

      wordSpans.forEach((span) => content.appendChild(span));

      gsap.fromTo(
        wordSpans,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    },
    { dependencies: [activeIndex] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black overflow-hidden"
    >
      <div
        ref={containerRef}
        className="mx-auto px-8 lg:px-20 py-20 h-screen flex items-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 w-full items-center">
          {/* Left - Menu Items */}
          <div className="flex flex-col justify-center space-y-12">
            <button className="self-start px-8 py-3 rounded-full border-2 border-white text-white text-sm font-medium tracking-wider hover:bg-white hover:text-black transition-all duration-300">
              CONTACT US
            </button>

            <div className="space-y-6">
              {menuItems.map((item, index) => (
                <h2
                  key={item.id}
                  onClick={() => handleMenuClick(index)}
                  className={`text-3xl lg:text-4xl font-bold text-white cursor-pointer transition-opacity duration-300 ${
                    index === activeIndex ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {item.title}
                </h2>
              ))}
            </div>
          </div>

          {/* Middle - Content */}
          <div className="flex items-center justify-center">
            <p
              ref={contentRef}
              className="text-white/70 text-xl leading-relaxed"
            >
              {menuItems[0].content}
            </p>
          </div>

          {/* Right - Form */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-xl bg-black border-2 border-white rounded-3xl p-8 lg:p-12">
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-8 text-center">
                TELL US ABOUT YOUR PROJECT
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-6 py-4 bg-transparent border-2 border-white rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/70 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-6 py-4 bg-transparent border-2 border-white rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/70 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-6 py-4 bg-transparent border-2 border-white rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/70 transition-colors"
                  />
                  <select className="w-full px-6 py-4 bg-transparent border-2 border-white rounded-xl text-white/50 focus:outline-none focus:border-white/70 transition-colors">
                    <option value="">Choose</option>
                    <option value="project">Start a Project</option>
                    <option value="media">Press & Media</option>
                    <option value="partnership">Partnership</option>
                    <option value="career">Join Us</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <textarea
                  placeholder="Share more about the request"
                  rows={5}
                  className="w-full px-6 py-4 bg-transparent border-2 border-white rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/70 transition-colors resize-none"
                ></textarea>

                <button
                  type="button"
                  className="w-full py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-white/90 transition-all duration-300"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

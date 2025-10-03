"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HeroVideo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      const textContainer = textRef.current;
      if (!section || !video || !textContainer) return;

      // Animate text letters in on load
      const letters = textContainer.querySelectorAll(".letter");

      gsap.fromTo(
        letters,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.03,
          delay: 0.3,
        }
      );

      // Scale down and move video out of view on scroll
      gsap.to(video, {
        scale: 0.5,
        y: -window.innerHeight / 2,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Fade out text on scroll
      gsap.to(textContainer, {
        opacity: 0,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "center top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  const text = "WHATEVER THE HAT, WE WEAR IT";
  const lines = ["WHATEVER THE HAT,", "WE WEAR IT"];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/30" />

      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8 [text-shadow:_4px_4px_3px_rgba(0,0,0,0.7)]"
      >
        {lines.map((line, lineIndex) => (
          <div
            key={lineIndex}
            className="text-6xl md:text-8xl lg:text-7xl font-bold tracking-tight leading-tight"
          >
            {line.split("").map((char, charIndex) => (
              <span
                key={`${lineIndex}-${charIndex}`}
                className="letter inline-block opacity-0"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

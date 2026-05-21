'use client';

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/app/styles/showreel.css';

gsap.registerPlugin(ScrollTrigger);

import Image from 'next/image';
import { SHOWREEL_IMAGES as images, SHOWREEL_STICKERS as stickers } from '@/lib/data';

export default function Showreel() {
  const sectionRef = useRef(null);
  const horizontalWrapperRef = useRef(null);
  const introContainerRef = useRef(null);
  const parallaxRef = useRef(null);
  const progressLineRef = useRef(null);
  const progressSmileyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(".showreel-slide");
      const rows = gsap.utils.toArray(".showreel-parallax-row");
      const introTitle = introContainerRef.current.querySelector(".showreel-intro-title");
      const introStickers = introContainerRef.current.querySelectorAll(".showreel-intro-sticker");

      const mm = gsap.matchMedia();

      // ─── DESKTOP: Full horizontal scroll + pinning ───────────────────
      mm.add("all", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => {
              const isSmallScreen = window.innerWidth <= 1200;
              const multiplier = isSmallScreen ? 1.0 : 2.0;
              return `+=${window.innerHeight * (slides.length * multiplier + 2)}`;
            },
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onEnter: () => {
              gsap.to(".navbar", { yPercent: -100, duration: 0.5, ease: "power2.inOut" });
              window.dispatchEvent(new CustomEvent('run-scribble', {
                detail: { text: 'THE WORK', color: 'var(--color-darkblue)' }
              }));
            },
            onLeave: () => gsap.to(".navbar", { yPercent: 0, duration: 0.5, ease: "power2.inOut" }),
            onEnterBack: () => gsap.to(".navbar", { yPercent: -100, duration: 0.5, ease: "power2.inOut" }),
            onLeaveBack: () => gsap.to(".navbar", { yPercent: 0, duration: 0.5, ease: "power2.inOut" }),
            onUpdate: (self) => {
              if (progressLineRef.current) gsap.set(progressLineRef.current, { scaleX: self.progress });
              if (progressSmileyRef.current) gsap.set(progressSmileyRef.current, { x: self.progress * window.innerWidth });
            }
          }
        });

        // Intro Zoom Sequence
        tl.fromTo(introContainerRef.current,
          { width: "40vw", height: "25vw", border: "2px solid var(--color-dark)", backgroundColor: "transparent", opacity: 1 },
          { width: "100vw", height: "100vh", border: "0px solid var(--color-dark)", backgroundColor: "var(--color-darkblue)", duration: 0.8, ease: "power2.inOut" }
        );
        tl.to(sectionRef.current, { backgroundColor: "var(--color-darkblue)", "--current-transition-text-color": "#ffffff", duration: 0.5 }, 0.5);

        introStickers.forEach((sticker, i) => {
          const xDir = i % 2 === 0 ? -150 : 150;
          const yDir = i < 2 ? -150 : 150;
          tl.to(sticker, { x: xDir, y: yDir, rotation: i % 2 === 0 ? -45 : 45, opacity: 0, duration: 0.5 }, 0.2);
        });

        tl.to(introTitle, { opacity: 0, scale: 1.2, duration: 0.4 }, 0.4);
        tl.to(parallaxRef.current, { opacity: 0.25, duration: 0.5 }, 0.5);
        tl.to(introContainerRef.current, { opacity: 0, duration: 0.4 }, 0.8);
        tl.to(".showreel-top-progress", { opacity: 1, duration: 0.5 }, 0.8);
        tl.addLabel("scroll", 1.0);
        tl.to(horizontalWrapperRef.current, { opacity: 1, duration: 0.3 }, "scroll");
        tl.to(horizontalWrapperRef.current, {
          x: () => -(window.innerWidth * (slides.length - 1)),
          ease: "none",
          duration: (slides.length + 1) * 2,
        }, "scroll");
        rows.forEach((row, i) => {
          const direction = i % 2 === 0 ? 1 : -1;
          tl.to(row, { x: direction * 600, ease: "none", duration: (slides.length + 1) * 2 }, "scroll");
        });
      });



    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="gsap-wrapper">
      <section ref={sectionRef} className="showreel-section" id="showreel-section">
      <div className="showreel-top-progress">
        <div ref={progressLineRef} className="showreel-top-progress-line"></div>
        <Image 
          ref={progressSmileyRef} 
          src="/assets/Card-Sticker SVG/sticker-smiley.svg" 
          className="showreel-top-smiley" 
          alt="progress-smiley" 
          width={40}
          height={40}
          aria-hidden="true"
        />
      </div>

      <div ref={introContainerRef} className="showreel-intro-container">
        {stickers.map((sticker, index) => (
          <Image 
            key={index} 
            src={sticker.src} 
            className={`showreel-intro-sticker is--${sticker.pos}`} 
            alt="sticker" 
            width={100}
            height={100}
            aria-hidden="true"
          />
        ))}
        <h2 className="showreel-intro-title">THE WORK</h2>
      </div>

      <div ref={parallaxRef} className="showreel-parallax-bg">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="showreel-parallax-row">
            {"THE WORK THE WORK THE WORK THE WORK THE WORK THE WORK THE WORK THE WORK "}
          </div>
        ))}
      </div>

      <div ref={horizontalWrapperRef} className="showreel-horizontal-wrapper">
        <div className="showreel-slide is--spacer"></div>
        {images.map((image, index) => (
          <div key={index} className="showreel-slide">
            <a href={image.url} target="_blank" rel="noopener noreferrer" className="showreel-slide-link">
              <div className="showreel-slide-inner">
                <div className="showreel-slide-img-wrapper">
                  <Image
                    src={image.src}
                    className="showreel-slide-img"
                    alt={image.alt}
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="showreel-visit-overlay">
                    <span>
                      VISIT PROJECT
                      <svg className="showreel-visit-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="showreel-slide-text">
                  <h3 className="showreel-item-title">{image.alt}</h3>
                  <span className="showreel-item-desc">{image.desc}</span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      </section>
    </div>
  );
}

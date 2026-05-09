'use client';

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/app/styles/showreel.css';

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/{E6CB1B12-38C5-49DA-82C1-C2B52A399A42}.png",
    alt: "Fundverse",
    desc: "A Blockchain based crowdfunding Dapp, built with Solidity, Next js and Hardhat.",
    url: "https://fundverse.vercel.app/"
  },
  {
    src: "/{1BF58C71-5819-443C-B922-133885D5B2B9}.png",
    alt: "HNTRS",
    desc: "A premium full-stack anime NFT collectibles platform with gacha pulls, dynamic card store, and P2P marketplace built on Polygon.",
    url: "https://hntrs.vercel.app/"
  },
  {
    src: "/{BF9562C2-597D-48B2-BF9E-FBA50033FFFB}.png",
    alt: "Rovet",
    desc: "An on-chain AI model provenance with EIP-712 attestations, built with Solidity and Next.js.",
    url: "https://rovet.vercel.app/"
  },
  {
    src: "/{7BAFD691-8F99-44D9-AE2C-767531586372}.png",
    alt: "CSTATE",
    desc: "CSTATE is an institutional-grade blockchain terminal for the fractionalized ownership of real-world assets and programmatic yield distribution.",
    url: "https://cestate.vercel.app/"
  },
  {
    src: "/{7C08CEFF-D069-45E1-94B8-B2705B7AEFC8}.png",
    alt: "Capital Club",
    desc: "An exclusive community-based networking platform for elite entrepreneurs and high-net-worth individuals.",
    url: "https://capital.club/"
  },
  {
    src: "/{0B893655-D505-467D-817A-E8EDCBEE619C}.png",
    alt: "Ecom Society",
    desc: "A premium e-learning and networking platform for high-performance e-commerce entrepreneurs.",
    url: "https://www.ecomsociety.com/"
  },
];

const stickers = [
  { src: "/assets/Card-Sticker SVG/sticker-camera.svg", pos: "top-left" },
  { src: "/assets/Card-Sticker SVG/sticker-smiley.svg", pos: "top-right" },
  { src: "/assets/Card-Sticker SVG/sticker-phone.svg", pos: "bottom-left" },
  { src: "/assets/Card-Sticker SVG/sticker-heart.svg", pos: "bottom-right" },
];

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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (slides.length * 2 + 2)}`,
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
            if (progressLineRef.current) {
              gsap.set(progressLineRef.current, { scaleX: self.progress });
            }
            if (progressSmileyRef.current) {
              gsap.set(progressSmileyRef.current, { x: self.progress * window.innerWidth });
            }
          }
        }
      });

      // Intro Zoom Sequence
      tl.fromTo(introContainerRef.current, 
        { width: "40vw", height: "25vw", border: "2px solid var(--color-dark)", backgroundColor: "transparent", opacity: 1 },
        { width: "100vw", height: "100vh", border: "0px solid var(--color-dark)", backgroundColor: "var(--color-darkblue)", duration: 0.8, ease: "power2.inOut" }
      );

      tl.to(sectionRef.current, { 
        backgroundColor: "var(--color-darkblue)", 
        "--current-transition-text-color": "#ffffff",
        duration: 0.5 
      }, 0.5);

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

      // REMOVED individual slide reveals to ensure images are always visible
      // slides.forEach((slide, i) => { ... });

    }, sectionRef);

    return () => ctx.revert();
  }, [images.length]);

  return (
    <section ref={sectionRef} className="showreel-section" id="showreel-section">
      <div className="showreel-top-progress">
        <div ref={progressLineRef} className="showreel-top-progress-line"></div>
        <img 
          ref={progressSmileyRef} 
          src="/assets/Card-Sticker SVG/sticker-smiley.svg" 
          className="showreel-top-smiley" 
          alt="progress-smiley" 
        />
      </div>

      <div ref={introContainerRef} className="showreel-intro-container">
        {stickers.map((sticker, index) => (
          <img key={index} src={sticker.src} className={`showreel-intro-sticker is--${sticker.pos}`} alt="sticker" />
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
                  <img
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
  );
}

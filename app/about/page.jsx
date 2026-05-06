"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import ExpertiseFan from "@/components/about/ExpertiseFan";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import "@/app/styles/about.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const mainRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero text animation
            gsap.from(".about-hero__title span", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out"
            });

            // Image reveal
            gsap.from(".about-hero__image-wrap", {
                scale: 0.8,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                delay: 0.5
            });

            // Underline draw animation for intro
            const underline = document.querySelector(".about-intro__underline-path");
            if (underline) {
                const len = underline.getTotalLength();
                gsap.set(underline, { strokeDasharray: len, strokeDashoffset: len });
                gsap.to(underline, {
                    scrollTrigger: {
                        trigger: ".about-intro",
                        start: "top 75%",
                    },
                    strokeDashoffset: 0,
                    duration: 1.5,
                    ease: "power2.out"
                });
            }

            // Section reveals
            const revealSections = document.querySelectorAll(".reveal-section");
            revealSections.forEach((section) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            });

            // Wiggle animations for stickers
            const wiggles = document.querySelectorAll(".wiggle-element");
            wiggles.forEach((el) => {
                gsap.set(el, { transformOrigin: "center center" });
                let tween;
                el.addEventListener("mouseenter", () => {
                    tween = gsap.to(el, { rotation: 10, duration: 0.15, repeat: -1, yoyo: true, ease: "steps(1)" });
                });
                el.addEventListener("mouseleave", () => {
                    if (tween) tween.kill();
                    gsap.to(el, { rotation: 0, duration: 0.3 });
                });
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef} className="about-page">
            <Navbar forceTheme="light" />
            <AboutHero />
            <ExpertiseFan />
            <ExperienceTimeline />
            <Footer />
        </main>
    );
}

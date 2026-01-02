'use client';
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/navbar";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const [time, setTime] = useState("");
  const [isContactInView, setIsContactInView] = useState(false);
  const [isWorkInView, setIsWorkInView] = useState(false);
  
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll Progress for advanced animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    mass: 0.5
  });

  // Hero Parallax
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.85]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -150]);
  const heroPointerEvents = useTransform(smoothProgress, [0, 0.2], ["auto", "none"]);

  // Work Parallax (Perfectly Centered)
  const workScale = useTransform(smoothProgress, [0.05, 0.2, 0.8, 0.95], [0.9, 1, 1, 0.9]);
  const workPointerEvents = useTransform(smoothProgress, [0.1, 0.9], ["none", "auto"]);


  // Background Color Transition
  const bgColor = useTransform(smoothProgress, [0, 0.4], ["#000000", "#ff4800"]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Karachi'
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.2 };

    const contactObserver = new IntersectionObserver(([entry]) => {
      setIsContactInView(entry.isIntersecting);
    }, observerOptions);

    const workObserver = new IntersectionObserver(([entry]) => {
      setIsWorkInView(entry.isIntersecting);
    }, observerOptions);

    if (contactRef.current) contactObserver.observe(contactRef.current);
    if (workRef.current) workObserver.observe(workRef.current);

    return () => {
      if (contactRef.current) contactObserver.unobserve(contactRef.current);
      if (workRef.current) workObserver.unobserve(workRef.current);
    };
  }, []);

  return (
    <motion.main 
      id="home"
      ref={containerRef} 
      style={{ backgroundColor: bgColor }}
      className="relative min-h-screen"
    >
      {/* Home Section */}
      <motion.section 
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY, pointerEvents: heroPointerEvents }}
        className="h-screen w-full bg-black text-[#FEFDF8] flex flex-col z-30 sticky top-0"
      >
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center -mt-10 md:-mt-20">
          <div className="mx-auto mt-16 md:mt-20 lg:mt-32 w-[200px] sm:w-[250px] md:w-[280px] lg:w-[300px] h-[300px] sm:h-[350px] md:h-[380px] lg:h-[400px] overflow-hidden flex">
            <Image src="/profile.jpg" alt="hero" width={300} height={300} className="object-cover object-top" />
          </div>

          <div className="flex justify-center text-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl px-1 sm:px-4 md:px-6 lg:px-18 pt-2 pb-6 md:pt-4 md:pb-10 leading-[1.4] md:leading-[1.2] mt-8 md:mt-10 max-w-[95vw] md:max-w-[90vw] lg:max-w-none">
              Hey, I'm Shajar Ali. A creative frontend developer and an experienced blockchain developer as well, based in Lahore, Pakistan.
              From <span className="text-[#ff4800]">Solidity</span> to <span className="text-[#ff4800]">Next.js</span>, you name it we build it.
              <br className="hidden lg:block"/>
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl block mt-2 md:mt-4 lg:mt-0"> Bridging the gap between web2 & web3.</span>
            </h1>
          </div>
        </div>
      </motion.section>

      <motion.div 
        id="work"
        ref={workRef}
        style={{ scale: workScale, pointerEvents: workPointerEvents }}
        className="relative z-10"
      >
        <WorkSection />
      </motion.div>
      
      <div ref={contactRef} className="relative">
        <ContactSection />
      </div>

      {/* Fixed Bottom Info Bar */}
      <div className={`fixed ${isContactInView ? 'bottom-6 lg:bottom-12' : 'bottom-4 lg:bottom-10'} left-0 right-0 px-4 md:px-10 flex justify-between items-end text-base md:text-lg lg:text-2xl font-f1 z-40 pointer-events-none transition-all duration-500 ${isWorkInView ? 'text-black' : 'text-[#FEFDF8]'}`}>
        <div className="opacity-80">
          Local Time: <span className={`${isContactInView ? 'text-[#FEFDF8]' : 'text-[#ff4800]'} tabular-nums transition-colors duration-500`}>{time || "00:00:00 AM"}</span>
        </div>
        <div className="opacity-80 lg:translate-x-[-48px]">
          <span className={`${isContactInView ? 'text-[#FEFDF8]' : 'text-[#ff4800]'} transition-colors duration-500`}>XXIII</span>, Lahore, Pakistan
        </div>
      </div>
    </motion.main>
  );
}

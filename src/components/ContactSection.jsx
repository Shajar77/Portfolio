'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} id="contact" className="relative w-full bg-[#ff4800] py-20 md:py-32 px-4 md:px-10 overflow-hidden">
      {/* Intense Grainy Noise Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.25] mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Top Header: Socials & Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20 pb-8 border-b border-black/10">
          <div className="flex gap-8">
            <a href="https://www.linkedin.com/in/shajar-ali-8a3ba2364" target="_blank" rel="noopener noreferrer" className="text-black font-f1 text-xl font-semibold hover:text-[#FEFDF8] transition-colors duration-300">
              LinkedIn
            </a>
            <a href="https://github.com/Shajar77" target="_blank" rel="noopener noreferrer" className="text-black font-f1 text-xl font-semibold hover:text-[#FEFDF8] transition-colors duration-300">
              GitHub
            </a>
            <a href="mailto:shajralii773@gmail.com" className="text-black font-f1 text-xl font-semibold hover:text-[#FEFDF8] transition-colors duration-300">
              Mail
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="/Shajar Ali Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black font-f1 text-xl font-semibold hover:text-[#FEFDF8] transition-colors duration-300"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Main Content: Compact & Impactful */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-f1 font-black text-[#FEFDF8] leading-[0.8] uppercase tracking-tighter mb-8">
              LET'S <br /> 
              <span className="text-black">WORK.</span>
            </h2>
            <p className="text-black/80 font-f1 text-lg md:text-xl max-w-sm leading-tight">
              I'm always looking for new challenges and creative collaborations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start lg:items-end"
          >
            <div className="relative group">
              <p className="text-black/40 uppercase tracking-[0.2em] text-xs font-black mb-2 lg:text-right">Drop a line</p>
              <a href="mailto:shajralii773@gmail.com" className="text-3xl md:text-5xl font-f1 font-black text-[#FEFDF8] hover:text-black transition-all duration-500 tracking-tighter">
                shajralii773@gmail.com
              </a>
              <div className="absolute -bottom-2 left-0 w-0 h-1 bg-black transition-all duration-500 group-hover:w-full lg:left-auto lg:right-0" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar: Refined Editorial */}
        <div className="pt-10 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[#FEFDF8] font-f1 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
          <div className="flex gap-8">
            <p>© 2026 SHAJAR ALI</p>
            <p>LAHORE, PK</p>
          </div>
          <div className="flex gap-8">
            <p>LOCAL TIME: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            <p>V1.0.3</p>
          </div>
        </div>
      </div>
    </section>
  );
}

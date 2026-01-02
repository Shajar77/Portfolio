'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'HNTRS',
    category: 'Blockchain / UI Design',
    image: '/image1.png',
    thumbnail: '/image1.png',
    link: 'https://hntrs.vercel.app/',
    description: 'A high-performance decentralized finance dashboard with real-time analytics.'
  },
  {
    id: 2,
    title: 'SOLUNA',
    category: 'Web Development / UX',
    image: '/i2.png',
    thumbnail: '/i2.png',
    link: 'https://soluna.test.devteam.live/',
    description: 'A premium shopping experience for high-end fashion brands.'
  },
  {
    id: 3,
    title: 'MEO FUSCIUNI',
    category: 'App Development',
    image: '/img4.png',
    thumbnail: '/img4.png',
    link: 'https://meofusciuni.vercel.app/',
    description: 'Seamless financial management app with advanced security features.'
  },
  {
    id: 4,
    title: 'WALRUS',
    category: 'Branding / Identity',
    image: '/i4.png',
    thumbnail: '/i4.png',
    link: 'https://fundverse.vercel.app/launch-campaign',
    description: 'Minimalist brand identity and digital presence for a design agency.'
  }
];

export default function WorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Map scroll progress to project index (0 to 3 for 4 projects)
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // We want the projects to switch between 0.2 and 0.8 of the section's scroll
      if (latest < 0.2) {
        setActiveIndex(0);
      } else if (latest < 0.4) {
        setActiveIndex(1);
      } else if (latest < 0.6) {
        setActiveIndex(2);
      } else {
        setActiveIndex(3);
      }
    });
  }, [scrollYProgress]);

  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const activeProject = projects[displayIndex];

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-transparent">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden p-3 sm:p-6 md:p-12 lg:p-20">
        {/* The White Card */}
        <div className="w-full h-full shadow-2xl flex flex-col justify-center px-4 sm:px-6 md:px-16 relative overflow-hidden" style={{ backgroundColor: '#FEFDF8' }}>
          <div className="max-w-7xl mx-auto w-full py-4 md:py-0">
            {/* Section Header */}
            <div className="mb-4 md:mb-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "circOut" }}
              >
                <span className="text-[#ff4800] font-f1 text-sm md:text-xl font-medium uppercase tracking-widest block mb-1 md:mb-2">
                  WORK
                </span>
                <h2 className="text-3xl md:text-6xl lg:text-7xl font-f1 text-black leading-tight">
                  Recent{" "}
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-black"
                  >
                    Projects
                  </motion.span>
                </h2>
              </motion.div>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-center">
              {/* Main Image Container */}
              <div className="lg:col-span-7 flex items-center justify-center min-h-[250px] sm:min-h-[400px] md:min-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group w-full"
                  >
                    <div className="relative overflow-visible rounded-2xl shadow-2xl transition-all duration-500 lg:-translate-x-10 z-10 scale-100 sm:scale-105 lg:scale-110 group-hover:scale-[1.05] sm:group-hover:scale-[1.1] lg:group-hover:scale-[1.17]">
                      <Image
                        src={activeProject.image}
                        alt={activeProject.title}
                        width={1200}
                        height={800}
                        className={`w-full h-auto max-h-[40vh] sm:max-h-[60vh] lg:max-h-[70vh] object-contain transition-all duration-500 ${
                          activeProject.id === 4 ? 'grayscale' : ''
                        }`}
                        priority
                      />
                      
                      {/* Visit Project Button Overlay */}
                      <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 flex items-center justify-center z-20 ${
                        activeProject.id === 4 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <motion.a
                          href={activeProject.id === 4 ? '#' : activeProject.link}
                          target={activeProject.id === 4 ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, backgroundColor: '#ff4800', color: '#FEFDF8' }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FEFDF8] text-black rounded-full shadow-2xl flex items-center justify-center group/btn transition-colors duration-300 text-center p-1 sm:p-2"
                        >
                          <span className={`${
                            activeProject.id === 4 ? 'text-[8px] sm:text-[12px]' : 'text-[10px] sm:text-[14px]'
                          } font-f1 font-bold uppercase tracking-wider leading-none`}>
                            {activeProject.id === 4 ? 'Coming\nSoon' : 'View'}
                          </span>
                        </motion.a>
                      </div>
                    </div>

                    {/* Subtle Shadow Glow */}
                    <div className="absolute -inset-4 bg-[#ff4800]/5 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Project Names List */}
              <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-6 md:gap-8 justify-center lg:pl-12">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setActiveIndex(index)}
                    className="group cursor-pointer relative"
                  >
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className={`text-[10px] sm:text-sm font-f1 transition-colors duration-300 ${
                        displayIndex === index ? 'text-[#ff4800]' : 'text-gray-400'
                      }`}>
                        0{index + 1}
                      </span>
                      <h3 className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-f1 font-bold transition-all duration-300 ${
                        displayIndex === index 
                        ? 'text-[#ff4800] translate-x-2 sm:translate-x-4' 
                        : 'text-black/20 hover:text-black/40'
                      }`}>
                        {project.title}
                      </h3>
                    </div>
                    
                    {/* Hover Underline Effect */}
                    <motion.div 
                      className="h-px sm:h-[2px] bg-[#ff4800] mt-1 sm:mt-2 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: displayIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Info for Desktop & Tablet */}
            <div className="hidden sm:flex justify-between items-end mt-6 md:mt-10 border-t border-black/10 pt-4 md:pt-6">
              <div className="flex gap-8 md:gap-16">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Project</p>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={activeProject.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm md:text-lg font-f1 text-black"
                    >
                      {activeProject.title}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Category</p>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={activeProject.category}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm md:text-lg font-f1 text-black"
                    >
                      {activeProject.category}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              <div className="max-w-[200px] md:max-w-xs text-right hidden md:block">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={activeProject.description}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-400 text-xs md:text-sm leading-relaxed italic"
                  >
                    "{activeProject.description}"
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

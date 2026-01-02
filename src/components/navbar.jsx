'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleDownload = () => {
    // Create a hidden link and trigger download
    const link = document.createElement('a');
    link.href = '/Shajar Ali Resume.pdf';
    link.download = 'Shajar_Ali_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    
    // Close mobile menu if open
    setIsOpen(false);
  };

  return (
    <nav className="relative z-50 flex py-7 px-4 md:px-7">
      <div className="flex justify-between w-full relative items-center">
        
        <div className="flex flex-col font-f1">
          <Image src="/logo.png" alt="Logo" width={60} height={60} className="rounded-full border-2 border-[#FEFDF8] p-1"/>
        
        </div>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 justify-center items-start font-f1 text-xl font-semibold gap-7 pt-1 text-[#FEFDF8]">
          <a href="#home" className="hover:text-[#ff4800] transition-colors duration-300">Home</a>
          <a href="#work" className="hover:text-[#ff4800] transition-colors duration-300">Work</a>
          <a href="#contact" className="hover:text-[#ff4800] transition-colors duration-300">Contact</a>
        </div>

        <div className="hidden md:block relative pt-1">
          <button 
            onClick={handleDownload}
            className="text-xl border-2 border-[#FEFDF8] px-7 py-2 font-bold cursor-pointer rounded-full hover:bg-[#FEFDF8] hover:text-black transition-all"
          >
            Resume
          </button>
          {showToast && (
            <div className="absolute top-full mt-2 right-0 bg-[#ff4800] text-[#FEFDF8] px-4 py-2 rounded-lg shadow-lg z-100 whitespace-nowrap font-f1 font-bold text-sm animate-in fade-in slide-in-from-top-1">
              Resume downloaded.
            </div>
          )}
        </div>

        <button 
          className="md:hidden text-[#FEFDF8] focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      <div className={`fixed inset-0 bg-black transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col items-center justify-start pt-32 gap-8 z-40`}>
        <div className="flex flex-col items-center gap-8 font-f1 text-3xl font-bold">
          <a href="#home" onClick={() => setIsOpen(false)} className="hover:text-[#ff4800]">Home</a>
          <a href="#work" onClick={() => setIsOpen(false)} className="hover:text-[#ff4800]">Work</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-[#ff4800]">Contact</a>
          <div className="relative">
            <button 
              onClick={handleDownload}
              className="text-[#ff4800] font-bold"
            >
              Resume
            </button>
            {showToast && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#ff4800] text-[#FEFDF8] px-4 py-2 rounded-lg shadow-lg z-100 whitespace-nowrap font-f1 font-bold text-sm">
                Resume downloaded.
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
'use client';
import { useState, useEffect } from 'react';

const words = [
  "Hello", "Hola", "Bonjour", "Hallo", "Ciao", "Olá", "Привет", "你好", "こんにちは", "안녕하세요",
  "مرحبا", "नमस्ते", "হ্যালো", "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", "Merhaba", "Xin chào", "สวัสดี", "Halo", "Γεια σου", "שלום",
  "Cześć", "Hallå", "Hei", "Hej", "Ahoj", "Szia", "Salut", "Jambo", "Sawubona", "Namaste",
  "Zdravo", "Privet", "Sveiki", "Labas", "Tere", "Bula", "Kia Ora", "Aloha", "Marhaba", "Shalom",
  "Mingalaba", "Suostei", "Sabaidee", "Xin Chao", "Mingalaba", "Bula", "Talofa", "Malo e lelei", "Fakaalofa lahi atu", "السلام عليكم"
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 800);
      }, 1000);
      return;
    }

    const timeout = setTimeout(() => {
      setIndex(prev => prev + 1);
    }, 70);

    return () => clearTimeout(timeout);
  }, [index]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-[#0a0a0a] transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${isExiting ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className={`flex flex-col items-center transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="relative overflow-hidden h-24 flex items-center">
          <p className="text-[#FEFDF8] text-5xl md:text-7xl font-bold font-f1 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {words[index]}
          </p>
        </div>
        <div className="mt-8 w-48 h-[2px] bg-[#FEFDF8]/10 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#ff4800] transition-all duration-150 ease-linear"
            style={{ width: `${((index + 1) / words.length) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Decorative SVG Curve for smoother reveal */}
      <svg className="absolute top-full left-0 w-full h-[100px] fill-[#0a0a0a]">
        <path d="M0 0 L0 0 Q50 100 100 0 L100 0 Z" />
      </svg>
    </div>
  );
}

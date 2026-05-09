'use client';

import dynamic from 'next/dynamic';
import SvgSymbols from '@/components/SvgSymbols';

// Eagerly import only the hero video (the LCP element) — everything else is deferred
const VimeoHero = dynamic(() => import('@/components/VimeoHero'), { ssr: false });
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false });
const HorizontalWords = dynamic(() => import('@/components/HorizontalWords'), { ssr: false });
const MotionCards = dynamic(() => import('@/components/MotionCards'), { ssr: false });
const Showreel = dynamic(() => import('@/components/Showreel'), { ssr: false });
const ServiceCards = dynamic(() => import('@/components/ServiceCards'), { ssr: false });
const DoubleMarquee = dynamic(() => import('@/components/DoubleMarquee'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const TransitionScribble = dynamic(() => import('@/components/TransitionScribble'), { ssr: false });
const CursorBubble = dynamic(() => import('@/components/CursorBubble'), { ssr: false });

export default function Home() {
    return (
        <>
            <SvgSymbols />
            <header className="main-header">
                <Navbar />
                <VimeoHero />
            </header>
            <HorizontalWords />
            <main>
                <div className="content-section motion-cards-wrapper">
                    <MotionCards />
                </div>
                <Showreel />
                <div className="content-section service-cards-wrapper">
                    <ServiceCards />
                </div>
            </main>
            <section className="Double-marquee">
                <DoubleMarquee />
            </section>
            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
            {/* Non-visual utilities loaded last */}
            <SmoothScroll />
            <CursorBubble />
        </>
    );
}

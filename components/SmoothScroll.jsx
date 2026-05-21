'use client';

import { useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }) {
    const lenisRef = useRef();

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        gsap.registerPlugin(ScrollTrigger);

        function update(time) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        if (lenisRef.current?.lenis) {
            window.__lenis = lenisRef.current.lenis;
        }

        // Dynamic Tab Title Change
        const originalTitle = document.title;
        const handleVisibility = () => {
            document.title = document.hidden ? "Hey, come back! 👋" : originalTitle;
        };
        document.addEventListener('visibilitychange', handleVisibility);

        // Auto-refresh ScrollTrigger when DOM layout changes
        let rafId = null;
        const resizeObserver = new ResizeObserver(() => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        });
        resizeObserver.observe(document.body);

        return () => {
            gsap.ticker.remove(update);
            document.removeEventListener('visibilitychange', handleVisibility);
            resizeObserver.disconnect();
            if (rafId) cancelAnimationFrame(rafId);
            window.__lenis = null;
        };
    }, []);

    useLenis((lenis) => {
        ScrollTrigger.update();
    });

    return (
        <ReactLenis 
            root 
            ref={lenisRef} 
            autoRaf={false} 
            options={{ 
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 1.5
            }}
        >
            {children}
        </ReactLenis>
    );
}

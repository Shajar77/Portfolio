'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.5,
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        // Dynamic Tab Title Change
        const originalTitle = document.title;
        const handleVisibility = () => {
            document.title = document.hidden ? "Hey, come back! 👋" : originalTitle;
        };
        document.addEventListener('visibilitychange', handleVisibility);

        // Auto-refresh ScrollTrigger when DOM layout changes (dynamic imports, image loads, etc)
        // Debounced with rAF to avoid thrashing on rapid resize events
        let rafId = null;
        const resizeObserver = new ResizeObserver(() => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        });
        resizeObserver.observe(document.body);

        // Store lenis on window so other components can access it
        window.__lenis = lenis;

        return () => {
            lenis.destroy();
            document.removeEventListener('visibilitychange', handleVisibility);
            resizeObserver.disconnect();
            if (rafId) cancelAnimationFrame(rafId);
            delete window.__lenis;
        };
    }, []);

    return null;
}

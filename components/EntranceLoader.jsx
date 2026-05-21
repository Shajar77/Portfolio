'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function EntranceLoader() {
    const loaderRef = useRef(null);
    const starRef = useRef(null);
    const displacementRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [statusLog, setStatusLog] = useState('SYNCING CREATIVE PIPELINE...');

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Skip animation if already visited in this session to protect returning UX
        const urlParams = new URLSearchParams(window.location.search);
        const forceIntro = urlParams.get('intro') === 'true';
        const hasVisited = sessionStorage.getItem('hasVisitedEntrance');
        const isReload = typeof window !== 'undefined' && 
            window.performance?.getEntriesByType('navigation')[0]?.type === 'reload';

        const shouldPlayIntro = !hasVisited || forceIntro || isReload;

        if (!shouldPlayIntro) {
            document.body.classList.remove('is-loading');
            gsap.set(loaderRef.current, { display: 'none' });
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('entrance-complete', { detail: { skip: true } }));
            }, 50);
            return;
        }

        // Lock scroll & hide cursors
        document.body.classList.add('is-loading');
        window.__lenis?.stop();

        const frame1Chars = gsap.utils.toArray('.entrance-loader__frame-1 .entrance-loader__char');
        const frame2Chars = gsap.utils.toArray('.entrance-loader__frame-2 .entrance-loader__char');
        const counterEl = document.querySelector('.entrance-loader__counter');
        const pathEl = document.querySelector('.entrance-loader__path');
        const star = starRef.current;
        const displacement = displacementRef.current;

        // Set initial state for all characters (centered, pushed down, skewed and rotated slightly)
        gsap.set(frame1Chars, { yPercent: 120, opacity: 0, skewY: 8, rotate: 3 });
        gsap.set(frame2Chars, { yPercent: 120, opacity: 0, skewY: 8, rotate: 3 });
        if (star) gsap.set(star, { rotation: 0, scale: 0 });
        if (displacement) gsap.set(displacement, { attr: { scale: 0 } });

        // Hide brand and HUD elements initially to fade them in dynamically
        gsap.set('.entrance-loader__hud', { opacity: 0, y: 15 });
        gsap.set('.entrance-loader__frame', { visibility: 'hidden' });

        const tl = gsap.timeline({
            onComplete: () => {
                sessionStorage.setItem('hasVisitedEntrance', 'true');
                document.body.classList.remove('is-loading');
                window.__lenis?.start();
                gsap.set(loaderRef.current, { display: 'none' });
                // Trigger home page reveal timeline!
                window.dispatchEvent(new CustomEvent('entrance-complete', { detail: { skip: false } }));
            }
        });

        // 1. Technical HUD Fade-In (0.0s)
        tl.to('.entrance-loader__hud', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.1);

        // 2. Monospaced Loading Percentage Ticker & Status Updates (0.0s to 3.4s)
        const progressVal = { value: 0 };
        tl.to(progressVal, {
            value: 100,
            duration: 3.4,
            ease: 'power3.out',
            onUpdate: () => {
                const currentVal = Math.floor(progressVal.value);
                if (counterEl) {
                    counterEl.textContent = `${currentVal.toString().padStart(2, '0')}%`;
                }

                // Dynamic Status Logs synced to percentages
                if (currentVal < 30) {
                    setStatusLog('SYNCING CREATIVE PIPELINE...');
                } else if (currentVal >= 30 && currentVal < 60) {
                    setStatusLog('INITIALIZING WEB3 PROTOCOLS...');
                } else if (currentVal >= 60 && currentVal < 85) {
                    setStatusLog('OPTIMIZING GRAPHICS CORE...');
                } else {
                    setStatusLog('MOUNTING INTERACTIVE PLATFORM...');
                }
            }
        }, 0);

        // 3. Frame 1 Sequence ("Hi, i am shajar ali")
        tl.set('.entrance-loader__frame-1', { visibility: 'visible' }, 0.2)
          .to(frame1Chars, {
              yPercent: 0,
              opacity: 1,
              skewY: 0,
              rotate: 0,
              duration: 0.75,
              ease: 'back.out(1.3)',
              stagger: 0.02
          }, 0.2)
          // Frame 1 Exit
          .to(frame1Chars, {
              yPercent: -120,
              opacity: 0,
              skewY: -6,
              rotate: -2,
              duration: 0.45,
              ease: 'power4.in',
              stagger: 0.015
          }, 1.25);

        // 4. Frame 2 Sequence ("creative frontend & blockchain developer")
        tl.set('.entrance-loader__frame-2', { visibility: 'visible' }, 1.7)
          .to(frame2Chars, {
              yPercent: 0,
              opacity: 1,
              skewY: 0,
              rotate: 0,
              duration: 0.75,
              ease: 'back.out(1.3)',
              stagger: 0.012
          }, 1.7)
          .to(star, {
              rotation: 720,
              scale: 1,
              duration: 1.0,
              ease: 'back.out(1.7)'
          }, 1.85);

        // 5. Exit Transition: Organic SVG Liquid Wipe & Displacement Ripple (3.4s)
        const wipeStart = 3.4;

        // Frame 2 exit
        tl.to(frame2Chars, {
            yPercent: -120,
            opacity: 0,
            skewY: -8,
            rotate: -3,
            duration: 0.5,
            ease: 'power3.in',
            stagger: 0.008
        }, wipeStart)
        .to(star, {
            scale: 0,
            rotation: 1080,
            duration: 0.45,
            ease: 'power3.in'
        }, wipeStart)
        
        // Displacement Filter Wobble Ripple Animation
        .to(displacement, {
            attr: { scale: 45 },
            duration: 0.45,
            ease: 'power2.out'
        }, wipeStart)
        .to(displacement, {
            attr: { scale: 0 },
            duration: 0.85,
            ease: 'power3.inOut'
        }, wipeStart + 0.45)

        // Curtain Path Morph Animation
        .to(pathEl, {
            attr: { d: 'M 0 0 L 100 0 L 100 100 Q 50 15 0 100 Z' },
            duration: 0.55,
            ease: 'power3.in'
        }, wipeStart)
        // Slide entire loader container up
        .to(loaderRef.current, {
            yPercent: -100,
            duration: 1.25,
            ease: 'power4.inOut'
        }, wipeStart)
        // Rebound curve
        .to(pathEl, {
            attr: { d: 'M 0 0 L 100 0 L 100 100 Q 50 50 0 100 Z' },
            duration: 0.35,
            ease: 'sine.out'
        }, wipeStart + 0.35)
        // Flatten curve
        .to(pathEl, {
            attr: { d: 'M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z' },
            duration: 0.7,
            ease: 'power3.out'
        }, wipeStart + 0.65);

        // Clean up on unmount
        return () => {
            tl.kill();
        };
    }, [mounted]);

    if (!mounted) return null;

    // Helper functions for structured rendering of split characters
    const renderFrame1 = () => {
        const text = "Hi, i am shajar ali";
        return (
            <div className="entrance-loader__line-wrap">
                {text.split('').map((char, idx) => (
                    <span key={`f1-${idx}`} className="entrance-loader__char">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </div>
        );
    };

    const renderFrame2 = () => {
        const textNormal = "creative frontend";
        const textPink = "& blockchain developer";
        return (
            <div className="entrance-loader__frame-2-wrapper">
                <div className="entrance-loader__line-wrap">
                    {textNormal.split('').map((char, idx) => (
                        <span key={`f2-normal-${idx}`} className="entrance-loader__char">
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </div>
                <div className="entrance-loader__line-wrap">
                    <span className="is--pink">
                        {textPink.split('').map((char, idx) => (
                            <span key={`f2-pink-${idx}`} className="entrance-loader__char">
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </span>
                    <span className="entrance-loader__star" ref={starRef}>
                        <Image 
                            src="/assets/VimeoHero SVG/pink-star.svg" 
                            alt="" 
                            width={60} 
                            height={60} 
                            className="entrance-loader__star-svg"
                            priority
                        />
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div id="entrance-loader" ref={loaderRef}>
            {/* The liquid background curtain shape with SVG filter */}
            <svg 
                className="entrance-loader__svg-bg" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="liquid-distortion-filter">
                        <feTurbulence 
                            type="fractalNoise" 
                            baseFrequency="0.04 0.08" 
                            numOctaves="2" 
                            result="noise" 
                        />
                        <feDisplacementMap 
                            ref={displacementRef}
                            in="SourceGraphic" 
                            in2="noise" 
                            scale="0" 
                            xChannelSelector="R" 
                            yChannelSelector="G" 
                        />
                    </filter>
                </defs>
                <path 
                    className="entrance-loader__path" 
                    d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z" 
                    filter="url(#liquid-distortion-filter)"
                />
            </svg>


            {/* Typography and Metadata Panel */}
            <div className="entrance-loader__content">
                <div className="entrance-loader__text-container">
                    <div className="entrance-loader__frame entrance-loader__frame-1">
                        {renderFrame1()}
                    </div>
                    <div className="entrance-loader__frame entrance-loader__frame-2">
                        {renderFrame2()}
                    </div>
                </div>

                {/* Corner Metadata HUD Panel */}
                <div className="entrance-loader__hud">
                    <div className="entrance-loader__brand">shajar.co / portfolio</div>
                    <div className="entrance-loader__logger">
                        <span className="entrance-loader__status-log">
                            [ {statusLog} ]
                        </span>
                        <span className="entrance-loader__counter">00%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

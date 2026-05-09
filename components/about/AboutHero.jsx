import React from 'react';
import Image from 'next/image';

export default function AboutHero() {
    return (
        <section className="about-hero">
            <div className="container about-hero__container">
                <div className="about-hero__content">
                    <div className="about-hero__left">
                        <div className="about-hero__image-area">
                            <div className="about-hero__image-wrap">
                                <Image
                                    src="/project-hero.jpeg"
                                    alt="Shajar Ali — Creative Frontend & Blockchain Developer"
                                    width={350}
                                    height={467}
                                    className="about-hero__img"
                                    priority
                                />
                            </div>
                            <div className="about-status-tag">AVAILABLE FOR FREELANCE</div>
                            <Image src="/assets/Footer-Sticker SVG/footer-sticker-camera.svg" width={100} height={100} className="about-sticker about-sticker--camera wiggle-element" alt="" style={{ filter: 'invert(1)' }} aria-hidden="true" />
                        </div>
                    </div>

                    <div className="about-hero__right">
                        <h1 className="about-hero__title">
                            SHAJAR ALI
                            <Image src="/assets/Footer-Sticker SVG/footer-sticker-smiley.svg" width={80} height={80} className="about-hero__smiley wiggle-element" alt="" aria-hidden="true" />
                        </h1>
                        <div className="about-hero__intro">
                            <h2 className="about-hero__intro-text">
                                A <strong>Creative Frontend and Blockchain Developer</strong> with over <strong>6 years</strong> of experience. I specialize in merging
                                <span className="about-intro__highlight">
                                    pixel-perfect design
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 634 28" fill="none" className="about-intro__underline-svg" aria-hidden="true">
                                        <path className="about-intro__underline-path" d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436" stroke="var(--color-orange)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                with complex Web3 logic to build high-end, intuitive digital experiences.
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-hero__bg-blob" aria-hidden="true">
                <Image src="/assets/Service SVG/Service-card-pink-SVG.svg" width={600} height={600} alt="" />
            </div>
            <div className="about-hero__bg-grid" aria-hidden="true"></div>
        </section>
    );
}


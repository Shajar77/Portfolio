import React from 'react';

export default function ExpertiseFan() {
    return (
        <section className="about-skills reveal-section">
            <div className="container">
                <div className="about-skills__header">
                    <h2 className="about-section-title">WHAT I CAN DO?</h2>
                </div>
                <div className="expertise-fan">
                    {/* Frontend */}
                    <div className="expertise-fan-card expertise-fan-card--teal">
                        <img src="/assets/Card-Sticker SVG/sticker-camera.svg" className="fan-card__sticker fan-card__sticker--camera" alt="" />
                        <h3 className="fan-card__title">frontend</h3>
                        <div className="fan-card__divider"></div>
                        <ul className="fan-card__list">
                            <li>✦ Creative UI/UX</li>
                            <li>✦ Framer Motion</li>
                            <li>✦ GSAP Animations</li>
                            <li>✦ Advanced CSS</li>
                            <li>✦ Next.js Expertise</li>
                            <li>✦ WebGL / Three.js</li>
                        </ul>
                    </div>

                    {/* Blockchain */}
                    <div className="expertise-fan-card expertise-fan-card--blue">
                        <img src="/assets/Card-Sticker SVG/sticker-phone.svg" className="fan-card__sticker fan-card__sticker--phone" alt="" />
                        <h3 className="fan-card__title">blockchain</h3>
                        <div className="fan-card__divider"></div>
                        <ul className="fan-card__list">
                            <li>✦ Smart Contract Dev</li>
                            <li>✦ Solidity</li>
                            <li>✦ Web3 Integration</li>
                            <li>✦ DeFi Protocols</li>
                        </ul>
                    </div>

                    {/* Full Stack */}
                    <div className="expertise-fan-card expertise-fan-card--orange">
                        <img src="/assets/Card-Sticker SVG/sticker-smiley.svg" className="fan-card__sticker fan-card__sticker--smiley" alt="" />
                        <h3 className="fan-card__title">full stack</h3>
                        <div className="fan-card__divider"></div>
                        <ul className="fan-card__list">
                            <li>✦ Scalable Backends</li>
                            <li>✦ API Development</li>
                            <li>✦ Node.js / Go</li>
                            <li>✦ Database Design</li>
                            <li>✦ Cloud Infrastructure</li>
                            <li>✦ DevOps</li>
                        </ul>
                    </div>

                    {/* Creative */}
                    <div className="expertise-fan-card expertise-fan-card--maroon">
                        <img src="/assets/Card-Sticker SVG/sticker-hand.svg" className="fan-card__sticker fan-card__sticker--hand" alt="" />
                        <h3 className="fan-card__title">creative</h3>
                        <div className="fan-card__divider"></div>
                        <ul className="fan-card__list">
                            <li>✦ Brand Strategy</li>
                            <li>✦ Art Direction</li>
                            <li>✦ Motion Graphics</li>
                            <li>✦ Visual Identity</li>
                            <li>✦ Interaction Design</li>
                            <li>✦ Product Design</li>
                        </ul>
                    </div>

                    {/* Expertise */}
                    <div className="expertise-fan-card expertise-fan-card--purple">
                        <img src="/assets/Card-Sticker SVG/sticker-heart.svg" className="fan-card__sticker fan-card__sticker--heart" alt="" />
                        <h3 className="fan-card__title">expertise</h3>
                        <div className="fan-card__divider"></div>
                        <ul className="fan-card__list">
                            <li>✦ System Design</li>
                            <li>✦ Technical Leadership</li>
                            <li>✦ Rapid Prototyping</li>
                            <li>✦ Open Source Contrib</li>
                            <li>✦ AI Integration</li>
                            <li>✦ Mentorship</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

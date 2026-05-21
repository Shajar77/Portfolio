import React from 'react';

export default function ExperienceTimeline() {
    return (
        <section className="about-experience reveal-section">
            <div className="container">
                <div className="about-experience__header">
                    <h2 className="about-section-title">THE JOURNEY</h2>
                </div>
                <div className="timeline">
                    <div className="timeline-item">
                        <span className="timeline-year">2026 - Present</span>
                        <div className="timeline-content">
                            <h3 className="timeline-title">Lead Web3 Developer</h3>
                            <p className="timeline-desc">Directing smart contract architecture, building secure enterprise-grade Web3 protocols, and designing high-performance interactive interfaces.</p>
                        </div>
                        <div className="timeline-company">AHSANZ Digital</div>
                    </div>
                    <div className="timeline-item">
                        <span className="timeline-year">2025-2026</span>
                        <div className="timeline-content">
                            <h3 className="timeline-title">Full Stack Blockchain Developer</h3>
                            <p className="timeline-desc">Architecting secure Solidity smart contracts, building scalable backend servers, and integrating interactive frontends with Web3/EVM nodes.</p>
                        </div>
                        <div className="timeline-company">Redoya Inc</div>
                    </div>
                    <div className="timeline-item">
                        <span className="timeline-year">2021 - 2025</span>
                        <div className="timeline-content">
                            <h3 className="timeline-title">Web3 Developer</h3>
                            <p className="timeline-desc">Developing decentralized applications, writing smart contracts, and integrating dApp frontends with EVM networks.</p>
                        </div>
                        <div className="timeline-company">Softech Society</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

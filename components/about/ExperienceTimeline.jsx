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
                        <span className="timeline-year">2024 - PRESENT</span>
                        <div className="timeline-content">
                            <h3 className="timeline-title">Lead Web3 Developer</h3>
                            <p className="timeline-desc">Pioneering decentralized solutions and high-end interactive interfaces for global clients.</p>
                        </div>
                        <div className="timeline-company">Kryptomind LLC</div>
                    </div>
                    <div className="timeline-item">
                        <span className="timeline-year">2021 - 2023</span>
                        <div className="timeline-content">
                            <h3 className="timeline-title">Senior Frontend Engineer</h3>
                            <p className="timeline-desc">Specialized in motion design and React-based architectures for institutional platforms.</p>
                        </div>
                        <div className="timeline-company">Redoya Inc</div>
                    </div>
                    <div className="timeline-item">
                        <span className="timeline-year">2018 - 2020</span>
                        <div className="timeline-content">
                            <h3 className="timeline-title">Full Stack Developer</h3>
                            <p className="timeline-desc">Building the foundation of my career across diverse tech stacks and early blockchain experiments.</p>
                        </div>
                        <div className="timeline-company">Visacme Technologies</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

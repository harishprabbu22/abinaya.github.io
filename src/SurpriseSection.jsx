import React, { useRef, useState } from "react";
import gsap from "gsap";
import "./App.css";

const BASE_URL = import.meta.env.BASE_URL;

const memories = [
    {
        image: `${BASE_URL}images/abi-15.jpg`,
        text: "My favourite smile."
    },
    {
        image: `${BASE_URL}images/abi-14.jpg`,
        text: "My happiest memories."
    },
    {
        image: `${BASE_URL}images/abi-07.jpg`,
        text: "My safest place."
    },
    {
        image: `${BASE_URL}images/abi-16.jpg`,
        text: "My favourite person."
    }
];

export default function SurpriseSection() {
    const sectionRef = useRef(null);
    const overlayRef = useRef(null);
    const revealRef = useRef(null);

    const [opened, setOpened] = useState(false);

    const openSurprise = () => {
        if (opened) return;

        setOpened(true);

        const tl = gsap.timeline();

        // =========================================
        // INTRO
        // =========================================

        tl.to(".surprise-intro", {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: "power2.inOut"
        })

            // =========================================
            // BACKGROUND TRANSITION
            // =========================================

            .to(
                overlayRef.current,
                {
                    backgroundColor: "#07150f",
                    duration: 1.2
                },
                "-=0.2"
            )

            // =========================================
            // GOLDEN LIGHT BURST
            // =========================================

            .to(".surprise-light", {
                scale: 25,
                opacity: 1,
                duration: 2,
                ease: "power3.inOut"
            })

            .to(".surprise-light", {
                opacity: 0,
                duration: 1
            })

            // =========================================
            // REVEAL
            // =========================================

            .to(revealRef.current, {
                opacity: 1,
                duration: 1
            })

            // =========================================
            // TITLE
            // =========================================

            .fromTo(
                ".surprise-title",
                {
                    opacity: 0,
                    y: 35
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.3,
                    ease: "power3.out"
                }
            )

            // =========================================
            // TAMIL QUOTE
            // =========================================

            .fromTo(
                ".surprise-tamil-quote",
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.4,
                    ease: "power3.out"
                },
                "-=0.5"
            )

            // =========================================
            // MEMORY CARDS
            // =========================================

            .fromTo(
                ".memory-card",
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.85
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    stagger: 0.35,
                    ease: "power3.out"
                },
                "+=0.3"
            )

            // =========================================
            // GALLERY
            // =========================================

            .to(
                ".memory-gallery",
                {
                    opacity: 1,
                    duration: 0.5
                },
                "-=0.5"
            )

            .to(
                ".memories-container",
                {
                    opacity: 1,
                    duration: 0.5
                },
                "-=0.3"
            )

            // =========================================
            // FINAL MESSAGE
            // =========================================

            .to(
                ".final-message",
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out"
                },
                "+=0.4"
            );

        createParticles();
    };

    // =========================================
    // PARTICLES
    // =========================================

    const createParticles = () => {
        const container = sectionRef.current;

        if (!container) return;

        // Prevent duplicate particles
        if (container.querySelector(".surprise-particle")) {
            return;
        }

        for (let i = 0; i < 90; i++) {
            const particle = document.createElement("span");

            particle.className = "surprise-particle";

            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            container.appendChild(particle);

            // Glow / pulse
            gsap.fromTo(
                particle,
                {
                    opacity: 0,
                    scale: 0
                },
                {
                    opacity: Math.random() * 0.8 + 0.2,
                    scale: Math.random() * 1.5 + 0.5,
                    duration: Math.random() * 2 + 1,
                    delay: Math.random() * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

            // Floating movement
            gsap.to(particle, {
                x: Math.random() * 120 - 60,
                y: Math.random() * 120 - 60,
                duration: Math.random() * 4 + 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    };

    return (
        <section
            ref={sectionRef}
            className={`surprise-section ${opened ? "opened" : ""}`}
        >
            <div
                ref={overlayRef}
                className="surprise-overlay"
            >

                {/* =====================================
                    INITIAL SCREEN
                ====================================== */}

                <div className="surprise-intro">

                    <div className="tiny-star">
                        ✦
                    </div>

                    <p className="surprise-small">
                        Before you leave...
                    </p>

                    <h2>
                        Wait...
                    </h2>

                    <p className="surprise-subtitle">
                        I have one more little surprise for you.
                    </p>

                    <button
                        className="surprise-button"
                        onClick={openSurprise}
                    >
                        <span>✨</span>
                        Open Your Surprise
                        <span>✨</span>
                    </button>

                </div>


                {/* =====================================
                    LIGHT BURST
                ====================================== */}

                <div className="surprise-light"></div>


                {/* =====================================
                    MAIN REVEAL
                ====================================== */}

                <div
                    ref={revealRef}
                    className="surprise-reveal"
                >

                    {/* =================================
                        TITLE + TAMIL QUOTE
                    ================================== */}

                    <div className="surprise-heading">

                        <p className="surprise-title">
                            A little world...
                            <br />
                            made only for you.
                        </p>

                        <p className="surprise-tamil-quote">
                            “உன்னை நேசிப்பதற்கு காரணம் தேடவில்லை…<br />
                            நீ இருப்பதே எனக்கு போதுமான காரணம்.”
                            <span>♥</span>
                        </p>

                    </div>


                    {/* =================================
                        MEMORY GALLERY
                    ================================== */}

                    <div className="memories-container">

                        <div className="memory-gallery">

                            {memories.map((memory, index) => (
                                <div
                                    className={`memory-card memory-${index + 1}`}
                                    key={memory.image}
                                >

                                    <div className="memory-image-wrapper">

                                        <img
                                            src={memory.image}
                                            alt={memory.text}
                                        />

                                    </div>

                                    <p>
                                        {memory.text}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>


                    {/* =================================
                        FINAL EMOTIONAL MESSAGE
                    ================================== */}

                    <div className="final-message">

                        <div className="final-line"></div>

                        <p className="final-intro">
                            Out of all the beautiful things
                            <br />
                            life could have given me...
                        </p>

                        <h3>
                            It gave me <span>you.</span>
                        </h3>

                        <div className="heart">
                            ♥
                        </div>

                        <p className="birthday-final">
                            Happy Birthday, my love.
                        </p>

                        <p className="personal-note">
                            This little world was made just for you.
                        </p>

                        {/* =================================
                            AUDIO MESSAGE
                        ================================== */}

                        <audio
                            className="love-audio"
                            controls
                            src={`${BASE_URL}audio/message.mp3`}
                        />

                    </div>

                </div>

            </div>
        </section>
    );
}
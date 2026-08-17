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
    const magicRef = useRef(null);

    const [opened, setOpened] = useState(false);

    const openSurprise = () => {
        if (opened) return;

        setOpened(true);

        const tl = gsap.timeline();

        // =========================================
        // 1. INTRO FADES AWAY
        // =========================================

        tl.to(".surprise-intro", {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: "power2.inOut"
        })

            // =========================================
            // 2. DARK MAGICAL WORLD
            // =========================================

            .to(
                overlayRef.current,
                {
                    backgroundColor: "#040b08",
                    duration: 1
                },
                "-=0.2"
            )

            // =========================================
            // 3. SHOW MAGICAL WRITING
            // =========================================

            .to(
                magicRef.current,
                {
                    opacity: 1,
                    duration: 0.8
                }
            )

            // =========================================
            // 4. FIRST LINE
            // =========================================

            .to(".magic-line-1", {
                opacity: 1,
                duration: 0.5
            })

            .to(".magic-line-1 .magic-cursor", {
                opacity: 1,
                duration: 0.3
            })

            .to(".magic-line-1 .magic-cursor", {
                opacity: 0,
                duration: 0.3,
                repeat: 2,
                yoyo: true
            })

            // =========================================
            // 5. SECOND LINE
            // =========================================

            .fromTo(
                ".magic-line-2",
                {
                    opacity: 0,
                    y: 15
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out"
                },
                "+=0.4"
            )

            // =========================================
            // 6. THIRD LINE
            // =========================================

            .fromTo(
                ".magic-line-3",
                {
                    opacity: 0,
                    y: 15
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out"
                },
                "+=0.5"
            )

            // =========================================
            // 7. FOURTH LINE
            // =========================================

            .fromTo(
                ".magic-line-4",
                {
                    opacity: 0,
                    y: 15
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out"
                },
                "+=0.6"
            )

            // =========================================
            // 8. ABI LINE — BIG EMOTIONAL MOMENT
            // =========================================

            .fromTo(
                ".magic-final",
                {
                    opacity: 0,
                    scale: 0.92,
                    y: 20
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out"
                },
                "+=0.8"
            )

            // Golden glow
            .to(
                ".magic-final",
                {
                    textShadow:
                        "0 0 10px rgba(225,190,105,.4), 0 0 35px rgba(225,190,105,.25)",
                    duration: 1.2
                }
            )

            // =========================================
            // 9. EVERYTHING DISSOLVES
            // =========================================

            .to(
                ".magic-writing",
                {
                    opacity: 0,
                    scale: 1.05,
                    filter: "blur(8px)",
                    duration: 1.2,
                    ease: "power2.inOut"
                },
                "+=1"
            )

            // =========================================
            // 10. GOLDEN LIGHT BURST
            // =========================================

            .to(
                ".surprise-light",
                {
                    scale: 25,
                    opacity: 1,
                    duration: 2,
                    ease: "power3.inOut"
                },
                "-=0.3"
            )

            .to(".surprise-light", {
                opacity: 0,
                duration: 1
            })

            // =========================================
            // 11. MAIN REVEAL
            // =========================================

            .to(revealRef.current, {
                opacity: 1,
                duration: 1
            })

            // =========================================
            // 12. TITLE
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
            // 13. TAMIL QUOTE
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
            // 14. MEMORY CARDS
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
            // 15. GALLERY
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
            // 16. FINAL MESSAGE
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
        createMagicStars();
    };

    // =========================================
    // PARTICLES
    // =========================================

    const createParticles = () => {
        const container = sectionRef.current;

        if (!container) return;

        if (container.querySelector(".surprise-particle")) {
            return;
        }

        for (let i = 0; i < 90; i++) {
            const particle = document.createElement("span");

            particle.className = "surprise-particle";

            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            container.appendChild(particle);

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

    // =========================================
    // MAGICAL STARS
    // =========================================

    const createMagicStars = () => {
        const container = sectionRef.current;

        if (!container) return;

        if (container.querySelector(".magic-star")) {
            return;
        }

        for (let i = 0; i < 25; i++) {
            const star = document.createElement("span");

            star.className = "magic-star";

            star.innerHTML = "✦";

            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            container.appendChild(star);

            gsap.fromTo(
                star,
                {
                    opacity: 0,
                    scale: 0
                },
                {
                    opacity: Math.random() * 0.6 + 0.2,
                    scale: Math.random() * 0.8 + 0.4,
                    duration: Math.random() * 2 + 1,
                    delay: Math.random() * 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

            gsap.to(star, {
                y: Math.random() * -80,
                x: Math.random() * 60 - 30,
                duration: Math.random() * 5 + 4,
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
                    MAGICAL TAMIL WRITING
                ====================================== */}

                <div
                    ref={magicRef}
                    className="magic-writing"
                >

                    <div className="magic-writing-inner">

                        <p className="magic-line magic-line-1">
                            சில கதைகள் எழுதப்படுவதில்லை...
                            <span className="magic-cursor">
                                |
                            </span>
                        </p>

                        <p className="magic-line magic-line-2">
                            அவை... வாழப்படுகின்றன.
                        </p>

                        <p className="magic-line magic-line-3">
                            என் கதையில் நீ வந்த பிறகு...
                            <br />
                            சாதாரண நாட்களும் அழகான நினைவுகளாகிவிட்டன.
                        </p>

                        <p className="magic-line magic-line-4">
                            தூரம் நம்மை பிரிக்கவில்லை...
                            <br />
                            இன்னும் நெருக்கமாக்கியது.
                        </p>

                        <p className="magic-final">
                            அபி...
                            <br />
                            என் வாழ்க்கையின் அழகான அத்தியாயம் நீ.
                            <span className="magic-heart">♥</span>
                        </p>

                    </div>

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
                            “உன்னை நேசிப்பதற்கு காரணம் தேடவில்லை…
                            <br />
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
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

    const wait = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    /*
     * Tamil needs special handling because some visible
     * characters are made from multiple Unicode code points.
     *
     * Intl.Segmenter lets us type visible characters safely.
     */
    const getCharacters = (text) => {
        if (
            typeof Intl !== "undefined" &&
            Intl.Segmenter
        ) {
            const segmenter = new Intl.Segmenter("ta", {
                granularity: "grapheme"
            });

            return [
                ...segmenter.segment(text)
            ].map((item) => item.segment);
        }

        return [...text];
    };

    /*
     * Real live typing animation.
     */
    const typeLine = async (
        element,
        text,
        speed = 65
    ) => {
        if (!element) return;

        const cursor = element.querySelector(
            ".typing-cursor"
        );

        const textElement = element.querySelector(
            ".typing-text"
        );

        if (!textElement) return;

        textElement.textContent = "";

        const characters = getCharacters(text);

        for (const character of characters) {
            textElement.textContent += character;

            /*
             * Slightly random typing speed makes it feel
             * more human rather than robotic.
             */
            const randomSpeed =
                speed * (0.7 + Math.random() * 0.6);

            await wait(randomSpeed);
        }

        /*
         * Tiny pause after completing a sentence.
         */
        await wait(900);
    };

    const openSurprise = async () => {
        if (opened) return;

        setOpened(true);

        createParticles();
        createMagicStars();

        const tl = gsap.timeline();

        // =========================================
        // INTRO DISAPPEARS
        // =========================================

        tl.to(".surprise-intro", {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: "power2.inOut"
        })

            // =========================================
            // DARK FANTASY WORLD
            // =========================================

            .to(
                overlayRef.current,
                {
                    backgroundColor: "#030907",
                    duration: 1
                },
                "-=0.2"
            )

            .to(
                magicRef.current,
                {
                    opacity: 1,
                    duration: 0.8
                }
            );

        await tl;

        // =========================================
        // LIVE TYPING
        // =========================================

        const lines = [
            {
                selector: ".typing-line-1",
                text: "என் இருள் சூழ்ந்த வாழ்வில் வெளிச்சம் தந்த வெண்ணிலவே...",
                speed: 65
            },
            {
                selector: ".typing-line-2",
                text: "வரமாய் வந்து என் கைகளில் அடைக்கலம் அடைந்த தேவதையே!",
                speed: 60
            },
            {
                selector: ".typing-line-3",
                text: "இனி காலத்திற்கும் உன் கைகள் கோர்த்து...",
                speed: 65
            },
            {
                selector: ".typing-line-4",
                text: "ஆயுள் முழுவதும் தொடரக் கூட வருவாயா என் வழித்துணையே?",
                speed: 55
            },
            {
                selector: ".typing-line-5",
                text: "இந்தத் தூரம் நம்மைப் பிரிக்கவில்லை...",
                speed: 75
            },
            {
                selector: ".typing-line-6",
                text: "இன்னும் நெருக்கமாகத்தான் மாற்றியுள்ளது.",
                speed: 80
            },
            {
                selector: ".typing-final",
                text: "அபி...",
                speed: 110
            }
        ];

        for (const line of lines) {
            const element =
                magicRef.current.querySelector(
                    line.selector
                );

            gsap.to(element, {
                opacity: 1,
                duration: 0.4
            });

            await typeLine(
                element,
                line.text,
                line.speed
            );
        }

        // =========================================
        // FINAL LINE
        // =========================================

        const finalLoveLine =
            magicRef.current.querySelector(
                ".typing-final-love"
            );

        gsap.to(finalLoveLine, {
            opacity: 1,
            duration: 0.5
        });

        await typeLine(
            finalLoveLine,
            "என் வாழ்க்கையின் அழகான அத்தியாயம் நீ.",
            65
        );

        // =========================================
        // HEART
        // =========================================

        await wait(500);

        gsap.fromTo(
            ".typing-heart",
            {
                opacity: 0,
                scale: 0
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.9,
                ease: "back.out(2)"
            }
        );

        await wait(1800);

        // =========================================
        // DISSOLVE MAGIC WRITING
        // =========================================

        await gsap.to(
            ".magic-writing-inner",
            {
                opacity: 0,
                scale: 1.06,
                filter: "blur(8px)",
                duration: 1.2,
                ease: "power2.inOut"
            }
        );

        // =========================================
        // GOLDEN LIGHT BURST
        // =========================================

        const burst = gsap.timeline();

        burst
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
            // MAIN REVEAL
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
    };

    // =========================================
    // PARTICLES
    // =========================================

    const createParticles = () => {
        const container = sectionRef.current;

        if (!container) return;

        if (
            container.querySelector(
                ".surprise-particle"
            )
        ) {
            return;
        }

        for (let i = 0; i < 90; i++) {
            const particle =
                document.createElement("span");

            particle.className =
                "surprise-particle";

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            container.appendChild(particle);

            gsap.fromTo(
                particle,
                {
                    opacity: 0,
                    scale: 0
                },
                {
                    opacity:
                        Math.random() * 0.8 + 0.2,
                    scale:
                        Math.random() * 1.5 + 0.5,
                    duration:
                        Math.random() * 2 + 1,
                    delay:
                        Math.random() * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

            gsap.to(particle, {
                x:
                    Math.random() * 120 - 60,
                y:
                    Math.random() * 120 - 60,
                duration:
                    Math.random() * 4 + 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    };

    // =========================================
    // MAGIC STARS
    // =========================================

    const createMagicStars = () => {
        const container = sectionRef.current;

        if (!container) return;

        if (
            container.querySelector(".magic-star")
        ) {
            return;
        }

        for (let i = 0; i < 30; i++) {
            const star =
                document.createElement("span");

            star.className = "magic-star";

            star.innerHTML = "✦";

            star.style.left =
                `${Math.random() * 100}%`;

            star.style.top =
                `${Math.random() * 100}%`;

            container.appendChild(star);

            gsap.fromTo(
                star,
                {
                    opacity: 0,
                    scale: 0
                },
                {
                    opacity:
                        Math.random() * 0.7 + 0.2,
                    scale:
                        Math.random() * 0.8 + 0.4,
                    duration:
                        Math.random() * 2 + 1,
                    delay:
                        Math.random() * 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

            gsap.to(star, {
                y:
                    Math.random() * -80,
                x:
                    Math.random() * 60 - 30,
                duration:
                    Math.random() * 5 + 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    };

    return (
        <section
            ref={sectionRef}
            className={`surprise-section ${opened ? "opened" : ""
                }`}
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
                        I have one more little
                        surprise for you.
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
                    LIVE TYPING FANTASY
                ====================================== */}

                <div
                    ref={magicRef}
                    className="magic-writing"
                >

                    <div className="magic-writing-inner">

                        <p className="typing-line typing-line-1">
                            <span className="typing-text"></span>
                            <span className="typing-cursor">
                                |
                            </span>
                        </p>

                        <p className="typing-line typing-line-2">
                            <span className="typing-text"></span>
                            <span className="typing-cursor">
                                |
                            </span>
                        </p>

                        <p className="typing-line typing-line-3">
                            <span className="typing-text"></span>
                            <span className="typing-cursor">
                                |
                            </span>
                        </p>

                        <p className="typing-line typing-line-4">
                            <span className="typing-text"></span>
                            <span className="typing-cursor">
                                |
                            </span>
                        </p>

                        <p className="typing-line typing-line-5">
                            <span className="typing-text"></span>
                            <span className="typing-cursor">
                                |
                            </span>
                        </p>

                        <p className="typing-line typing-line-6">
                            <span className="typing-text"></span>
                            <span className="typing-cursor">
                                |
                            </span>
                        </p>

                        <p className="typing-final">
                            <span className="typing-text"></span>
                            <span className="typing-cursor">
                                |
                            </span>
                        </p>

                        <p className="typing-final-love">
                            <span className="typing-text"></span>
                            <span className="typing-cursor">
                                |
                            </span>
                        </p>

                        <div className="typing-heart">
                            ♥
                        </div>

                    </div>

                </div>


                {/* =====================================
                    GOLDEN BURST
                ====================================== */}

                <div className="surprise-light"></div>


                {/* =====================================
                    MAIN REVEAL
                ====================================== */}

                <div
                    ref={revealRef}
                    className="surprise-reveal"
                >

                    <div className="surprise-heading">

                        <p className="surprise-title">
                            A little world...
                            <br />
                            made only for you.
                        </p>

                        <p className="surprise-tamil-quote">
                            “உன்னை நேசிப்பதற்கு காரணம்
                            தேடவில்லை…
                            <br />
                            நீ இருப்பதே எனக்கு
                            போதுமான காரணம்.”
                            <span>♥</span>
                        </p>

                    </div>


                    <div className="memories-container">

                        <div className="memory-gallery">

                            {memories.map(
                                (memory, index) => (
                                    <div
                                        className={`memory-card memory-${index + 1
                                            }`}
                                        key={
                                            memory.image
                                        }
                                    >

                                        <div className="memory-image-wrapper">

                                            <img
                                                src={
                                                    memory.image
                                                }
                                                alt={
                                                    memory.text
                                                }
                                            />

                                        </div>

                                        <p>
                                            {
                                                memory.text
                                            }
                                        </p>

                                    </div>
                                )
                            )}

                        </div>

                    </div>


                    <div className="final-message">

                        <div className="final-line"></div>

                        <p className="final-intro">
                            Out of all the beautiful
                            things
                            <br />
                            life could have given me...
                        </p>

                        <h3>
                            It gave me{" "}
                            <span>you.</span>
                        </h3>

                        <div className="heart">
                            ♥
                        </div>

                        <p className="birthday-final">
                            Happy Birthday, my love.
                        </p>

                        <p className="personal-note">
                            This little world was made
                            just for you.
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
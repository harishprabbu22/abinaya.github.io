import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import "./App.css";
// import audioFile from "../public/audio/message.mp3";
import SurpriseSection from "./SurpriseSection";

const formatTime = (time) => {
  if (!Number.isFinite(time)) {
    return "00:00";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

function App() {
  const [opened, setOpened] = useState(false);
  const [clickBursts, setClickBursts] = useState([]);

  const openingRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const scrollProgressRef = useRef(null);
  const introRef = useRef(null);

  const dateRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const messageRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Aggressive buttery smooth scrolling.
    const lenis = new Lenis({
      duration: 0.95,
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.4,
      syncTouch: true,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const moveCursor = (event) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: event.clientX,
          y: event.clientY,
          duration: 0.18,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, {
          x: event.clientX,
          y: event.clientY,
          duration: 0.65,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleClickBurst = (event) => {
      // Avoid creating a burst from keyboard-generated synthetic clicks.
      if (event.detail === 0) return;

      const id = `${Date.now()}-${Math.random()}`;
      const count = 18 + Math.floor(Math.random() * 14);
      const particles = Array.from({ length: count }, (_, index) => {
        const angle = (Math.PI * 2 * index) / count + Math.random() * 0.45;
        const distance = 45 + Math.random() * 150;
        return {
          id: `${id}-${index}`,
          angle: `${angle}rad`,
          distance: `${distance}px`,
          size: `${7 + Math.random() * 18}px`,
          delay: `${Math.random() * 0.16}s`,
          spin: `${(Math.random() - 0.5) * 720}deg`,
        };
      });

      setClickBursts((bursts) => [
        ...bursts,
        { id, x: event.clientX, y: event.clientY, particles },
      ]);

      window.setTimeout(() => {
        setClickBursts((bursts) => bursts.filter((burst) => burst.id !== id));
      }, 1900);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const revealTargets = document.querySelectorAll(
      ".intro-inner, .memory-intro, .memory-feature, .memory-pair, .memory-text-break, .memory-offset, .memory-wide, .memory-small-feature, .memory-final-photo, .memory-last, .phd-intro, .phd-achievement, .phd-appreciation, .phd-equation, .little-things-intro, .little-thing, .little-things-ending, .radio-header, .radio-player, .radio-message, .letter-intro, .love-letter, .letter-closing, .outro-inner"
    );
    revealTargets.forEach((target, index) => {
      target.classList.add("reveal-on-scroll");
      target.style.setProperty("--reveal-delay", `${Math.min((index % 4) * 0.07, 0.21)}s`);
      revealObserver.observe(target);
    });

    const magneticTargets = document.querySelectorAll(
      ".open-button, .radio-play-button, .radio-skip-button"
    );

    const magneticHandlers = [];
    magneticTargets.forEach((element) => {
      const move = (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        gsap.to(element, {
          x: x * 0.18,
          y: y * 0.18,
          duration: 0.35,
          ease: "power3.out",
        });
      };
      const leave = () =>
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.45)",
        });
      element.addEventListener("mousemove", move);
      element.addEventListener("mouseleave", leave);
      magneticHandlers.push([element, move, leave]);
    });

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("click", handleClickBurst);
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    // Opening animation.
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    timeline
      .fromTo(dateRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.2 })
      .fromTo(eyebrowRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=0.6")
      .fromTo(titleRef.current, { opacity: 0, y: 35, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.3 }, "-=0.5")
      .fromTo(messageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=0.6")
      .fromTo(buttonRef.current, { opacity: 0, y: 20, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, "-=0.5");

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      revealObserver.disconnect();
      timeline.kill();
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("click", handleClickBurst);
      window.removeEventListener("scroll", updateProgress);
      magneticHandlers.forEach(([element, move, leave]) => {
        element.removeEventListener("mousemove", move);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  const handleOpen = () => {
    setOpened(true);

    setTimeout(() => {
      introRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 900);
  };

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggleAudio = async () => {

    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {

      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Unable to play audio:", error);
      }

    } else {

      audio.pause();

      setIsPlaying(false);

    }
  };


  const skipAudio = (seconds) => {

    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = Math.max(
      0,
      Math.min(
        audio.currentTime + seconds,
        audio.duration || 0
      )
    );

  };


  const handleTimeUpdate = () => {

    const audio = audioRef.current;

    if (!audio) return;

    setCurrentTime(audio.currentTime);

  };


  const handleLoadedMetadata = () => {

    const audio = audioRef.current;

    if (!audio) return;

    setDuration(audio.duration);

  };


  const handleAudioEnded = () => {

    setIsPlaying(false);

    setCurrentTime(0);

  };

  return (
    <main className="experience-shell">
      <div className="scroll-progress" aria-hidden="true">
        <span ref={scrollProgressRef}></span>
      </div>
      <div ref={cursorGlowRef} className="cursor-glow" aria-hidden="true"></div>
      <div ref={cursorRef} className="cursor-dot" aria-hidden="true"></div>

      <div className="click-burst-layer" aria-hidden="true">
        {clickBursts.map((burst) => (
          <div
            className="click-burst"
            key={burst.id}
            style={{ left: burst.x, top: burst.y }}
          >
            <span className="click-abi">அபி</span>
            <span className="click-ripple"></span>
            {burst.particles.map((particle) => (
              <span
                className="peacock-particle"
                key={particle.id}
                style={{
                  "--angle": particle.angle,
                  "--distance": particle.distance,
                  "--size": particle.size,
                  "--delay": particle.delay,
                  "--spin": particle.spin,
                }}
              >
                <i></i>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* =========================
          OPENING
      ========================== */}

      <section ref={openingRef} className="opening-page">
        <div className="grain"></div>

        <div className="ambient ambient-one"></div>
        <div className="ambient ambient-two"></div>

        <div className="opening-content">
          <div className="peacock-mark" aria-hidden="true">
            <span className="peacock-eye"></span>
            <span className="peacock-eye peacock-eye-two"></span>
            <span className="peacock-eye peacock-eye-three"></span>
          </div>

          <p className="opening-tamil">உனக்காக...</p>

          <p ref={dateRef} className="opening-date">
            21 · 08 · 2026
          </p>

          <div ref={eyebrowRef} className="opening-eyebrow">
            A little birthday world, made just for you
          </div>

          <h1 ref={titleRef} className="opening-title">
            For <span>Abi</span>
          </h1>

          <p ref={messageRef} className="opening-message">
            I could have simply wished you
            <br />
            <em>Happy Birthday.</em>
            <br />
            But you deserve a little more than that.
          </p>

          <button
            ref={buttonRef}
            className="open-button"
            onClick={handleOpen}
          >
            <span>Open</span>
            <span className="open-arrow">↗</span>
          </button>
        </div>

        <div className="opening-footer">
          <span>Made with love</span>
          <span>♥</span>
        </div>

        {opened && (
          <>
            <div className="opening-transition">
              <p>For you, my love.</p><br />
            </div>
            <div className="opening-transition opening-transition-second">
              <p>இனிய பிறந்தநாள் வாழ்த்துகள், அபி kutty.</p>
            </div>
          </>
        )}
      </section>

      {/* =========================
          INTRODUCTION
      ========================== */}

      <section ref={introRef} className="intro-section">
        <div className="intro-inner">
          <p className="section-label">THE BEGINNING · தொடக்கம்</p>

          <div className="heritage-word">நம்முடைய கதை</div>

          <h2>
            It's only been
            <br />
            <span>two months.</span>
          </h2>

          <div className="intro-divider"></div>

          <p className="intro-text">
            Two months of knowing you.
            <br />
            Two months of conversations, laughter,
            <br />
            late nights and little moments.
          </p>

          <p className="intro-text intro-text-secondary">
            And somehow...
          </p>

          <p className="intro-highlight">
            you already feel like
            <br />
            <em>someone I've known much longer.</em>
          </p>

          <div className="intro-signature">
            <span>— H</span>
          </div>
        </div>
      </section>

      {/* =========================
    MEMORY JOURNEY
========================== */}

      <section className="memory-section">

        <div className="memory-inner">

          {/* INTRO */}

          <div className="memory-intro">

            <p className="section-label memory-label">
              THE DAY I MET YOU
            </p>

            <h2>
              And then
              <br />
              <span>there was you.</span>
            </h2>

            <p className="memory-intro-text">
              Some moments don't look important
              <br />
              when they're happening.
              <br />
              You only realise later.
            </p>

          </div>


          {/* =========================
        PHOTO 01
    ========================== */}

          <div className="memory-feature">

            <div className="memory-photo-wrapper">

              <div className="memory-photo memory-photo-large">

                <div className="photo-placeholder">
                  <img src={`${import.meta.env.BASE_URL}images/abi-01.jpg`} alt="A beautiful memory with Abi" />
                </div>
              </div>

              <div className="photo-number">
                01
              </div>

            </div>

            <div className="memory-caption">

              <p className="memory-caption-number">
                01 / THE BEGINNING
              </p>

              <h3>
                The perfect eye contact.
              </h3>

              <p>
                Our beautiful little chapter.
              </p>

            </div>

          </div>


          {/* =========================
        PHOTO 02 + 03
    ========================== */}

          <div className="memory-pair">

            <div className="memory-card memory-card-left">

              <div className="memory-photo memory-photo-medium">

                <div className="photo-placeholder">
                  <img src={`${import.meta.env.BASE_URL}images/abi-02.jpg`} alt="A beautiful memory with Abi" />
                </div>

              </div>

              <p className="memory-card-caption">
                One of the first moments.
              </p>

            </div>


            <div className="memory-card memory-card-right">

              <div className="memory-photo memory-photo-medium">

                <div className="photo-placeholder">
                  <img src={`${import.meta.env.BASE_URL}images/abi-03.jpg`} alt="A beautiful memory with Abi" />
                </div>

              </div>

              <p className="memory-card-caption">
                And somehow, it already felt special.
              </p>

            </div>

          </div>


          {/* =========================
        TEXT MOMENT
    ========================== */}

          <div className="memory-text-break">

            <p>
              Two months may not sound like a long time.
            </p>

            <span>
              But sometimes time has very little to do with
              how quickly someone becomes important.
            </span>

          </div>


          {/* =========================
        PHOTO 04
    ========================== */}

          <div className="memory-offset">

            <div className="memory-photo memory-photo-tall">

              <div className="photo-placeholder">
                <img src={`${import.meta.env.BASE_URL}images/abi-04.jpg`} alt="A beautiful memory with Abi" />
              </div>

            </div>

            <div className="offset-caption">

              <p>04</p>

              <span>
                A moment worth remembering.
              </span>

            </div>

          </div>


          {/* =========================
        PHOTO 05
    ========================== */}

          <div className="memory-wide">

            <div className="memory-photo memory-photo-wide">

              <div className="photo-placeholder">
                <img src={`${import.meta.env.BASE_URL}images/abi-05.jpg`} alt="A beautiful memory with Abi" />
              </div>

            </div>

            <p>
              The little moments are usually the ones
              I remember the most.
            </p>

          </div>


          {/* =========================
        PHOTO 06 + 07
    ========================== */}

          <div className="memory-pair memory-pair-cultural">

            <div className="memory-card memory-card-left">

              <div className="memory-photo memory-photo-medium">

                <div className="photo-placeholder">
                  <img src={`${import.meta.env.BASE_URL}images/abi-06.jpg`} alt="A beautiful memory with Abi" />
                </div>

              </div>

              <p className="memory-card-location">
                ஒரு நினைவு
              </p>

              <p className="memory-card-caption">
                One little moment.
                A thousand feelings.
              </p>

            </div>


            <div className="memory-card memory-card-right">

              <div className="memory-photo memory-photo-medium">

                <div className="photo-placeholder">
                  <img src={`${import.meta.env.BASE_URL}images/abi-07.jpg`} alt="A beautiful memory with Abi" />
                </div>

              </div>

              <p className="memory-card-location">
                இன்னொரு நினைவு
              </p>

              <p className="memory-card-caption">
                One more little moment I want to keep.
              </p>

            </div>

          </div>


          {/* =========================
        PHOTO 08
    ========================== */}

          <div className="memory-feature memory-feature-second">

            <div className="memory-photo-wrapper">

              <div className="memory-photo memory-photo-large">

                <div className="photo-placeholder">
                  <img src={`${import.meta.env.BASE_URL}images/abi-08.jpg`} alt="A beautiful memory with Abi" />
                </div>

              </div>

              <div className="photo-number">
                08
              </div>

            </div>

            <div className="memory-caption">

              <p className="memory-caption-number">
                08 / JUST YOU
              </p>

              <h3>
                A picture I could look at forever.
              </h3>

            </div>

          </div>


          {/* =========================
        PHOTO 09
    ========================== */}

          <div className="memory-small-feature">

            <div className="memory-photo memory-photo-small">

              <div className="photo-placeholder">
                <img src={`${import.meta.env.BASE_URL}images/abi-09.jpg`} alt="A beautiful memory with Abi" />
              </div>

            </div>

            <div className="small-feature-text">

              <p>
                09
              </p>

              <h3>
                You being you.
              </h3>

              <span>
                And that's more than enough.
              </span>

            </div>

          </div>


          {/* =========================
        PHOTO 10
    ========================== */}

          <div className="memory-wide memory-wide-last">

            <div className="memory-photo memory-photo-wide">

              <div className="photo-placeholder">
                <img src={`${import.meta.env.BASE_URL}images/abi-10.jpg`} alt="A beautiful memory with Abi" />
              </div>

            </div>

            <p>
              There are photographs.
              And then there are photographs
              that become memories.
            </p>

          </div>


          {/* =========================
        PHOTO 11
    ========================== */}

          <div className="memory-final-photo">

            <div className="memory-photo memory-photo-final">

              <div className="photo-placeholder">
                <img src={`${import.meta.env.BASE_URL}images/abi-11.jpg`} alt="A beautiful memory with Abi" />
              </div>
            </div>

            <p>
              11
            </p>

          </div>


          {/* =========================
        PHOTO 12
    ========================== */}

          <div className="memory-last">

            <p className="section-label">
              AND THEN
            </p>

            <div className="memory-photo memory-photo-last">

              <div className="photo-placeholder">
                <img src={`${import.meta.env.BASE_URL}images/abi-12.jpg`} alt="A beautiful memory with Abi" />
              </div>

            </div>

            <h3>
              There's still so much
              <br />
              <em>more to come.</em>
            </h3>

          </div>

        </div>

      </section>
      {/* =========================
    PHD APPRECIATION
========================== */}

      <section className="phd-section">

        <div className="phd-inner">

          <div className="phd-intro">

            <p className="section-label">
              ONE THING I WANT YOU TO KNOW
            </p>

            <div className="phd-symbol">
              ∑
            </div>

            <div className="vel-mark" aria-hidden="true">வேல்</div>

            <h2>
              You did
              <br />
              <em>something incredible.</em>
            </h2>

            <p className="phd-subtitle">
              And I don't want your birthday
              to pass without saying this.
            </p>

          </div>


          {/* Achievement */}

          <div className="phd-achievement">

            <div className="phd-image">

              <div className="photo-placeholder">
                <img src={`${import.meta.env.BASE_URL}images/abi-13.jpg`} alt="PHD / CONVOCATION PHOTO" />
              </div>

            </div>

            <div className="phd-achievement-content">

              <p className="phd-overline">
                DR. ABINAYA · முனைவர்
              </p>

              <h3>
                PhD
                <br />
                <span>in Mathematics</span>
              </h3>

              <div className="phd-line"></div>

              <p className="phd-message">
                I know this journey wasn't just about
                getting a title after your name.
              </p>

              <p className="phd-message">
                It was years of learning, patience,
                persistence, frustration, doubt,
                and continuing anyway.
              </p>

              <p className="phd-message phd-message-final">
                And you did it.
              </p>

            </div>

          </div>


          {/* Appreciation */}

          <div className="phd-appreciation">

            <p className="phd-appreciation-small">
              I AM PROUD OF YOU
            </p>

            <h3>
              Not just because
              <br />
              you got the <em>Dr.</em>
            </h3>

            <p className="phd-appreciation-text">
              But because I know that behind those two letters
              is a girl who kept going when things weren't easy.
            </p>

            <p className="phd-appreciation-text">
              Your PhD is something you earned.
              Something nobody can take away from you.
            </p>

            <p className="phd-final-line">
              And I hope you always remember
              just how proud you should be of yourself.
            </p>

          </div>


          {/* Small mathematical detail */}

          <div className="phd-equation">
            <span>∞</span>
            <p>
              Some things cannot be measured.
            </p>
          </div>

        </div>

      </section>

      {/* =========================
    LITTLE THINGS ABOUT ABI
========================== */}

      <section className="little-things-section">

        <div className="little-things-inner">

          <div className="little-things-intro">

            <p className="section-label">
              THINGS I'VE LEARNED ABOUT YOU · உன்னைப் பற்றி
            </p>

            <h2>
              The little things
              <br />
              <em>that make you, you.</em>
            </h2>

          </div>


          <div className="little-things-list">

            <div className="little-thing">

              <span>01</span>

              <div>
                <p className="little-thing-title">
                  She hates coffee.
                </p>

                <p className="little-thing-description">
                  Yes, I'm still trying to understand this.
                </p>
              </div>

            </div>


            <div className="little-thing">

              <span>02</span>

              <div>
                <p className="little-thing-title">
                  Cares me like nobody else.
                </p>

                <p className="little-thing-description">
                  Can't explain how much that means to me.
                </p>
              </div>

            </div>


            <div className="little-thing">

              <span>03</span>

              <div>
                <p className="little-thing-title">
                  unapologetically herself.
                </p>

                <p className="little-thing-description">
                  And I love that about her.
                </p>

              </div>

            </div>

            <div className="little-thing">

              <span>04</span>

              <div>
                <p className="little-thing-title">
                  The voice of a girl who is confident, smart, and beautiful.
                </p>

                <p className="little-thing-description">
                  And I could listen to it forever.
                </p>

              </div>

            </div>


            <div className="little-thing">

              <span>05</span>

              <div>

                <p className="little-thing-title">
                  Two months isn't a long time.
                </p>

                <p className="little-thing-description">
                  And somehow, you've already become such a big part of my life.
                </p>

              </div>

            </div>

          </div>


          <div className="little-things-ending">

            <p>
              And honestly...
            </p>

            <h3>
              I wouldn't change
              <br />
              <em>any of it.</em>
            </h3>

          </div>

        </div>

      </section>

      {/* =========================
    LOVE RADIO
========================== */}

      <section className="radio-section">

        <div className="radio-inner">

          {/* =========================
        HEADER
    ========================== */}

          <div className="radio-header">

            <p className="section-label">
              A PRIVATE BROADCAST · உனக்காக ஒரு ஒலி
            </p>

            <h2>
              Love
              <br />
              <em>Radio.</em>
            </h2>

            <p className="radio-intro">
              For one very special listener.
            </p>

          </div>


          {/* =========================
        RADIO PLAYER
    ========================== */}

          <div
            className={`radio-player ${isPlaying ? "is-playing" : ""
              }`}
          >

            {/* Actual audio */}

            <audio
              ref={audioRef}
              src={`${import.meta.env.BASE_URL}audio/abi-message.m4a`}
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleAudioEnded}
            />


            {/* =========================
          RADIO TOP
      ========================== */}

            <div className="radio-top">

              <div className="radio-station">

                <span>ON AIR</span>

                <strong>
                  98.21
                </strong>

                <small>
                  FM
                </small>

              </div>


              <div className="radio-date">
                AUG 21
              </div>

            </div>


            {/* =========================
          RADIO DISPLAY
      ========================== */}

            <div className="radio-display">

              <div className="radio-display-label">
                {isPlaying ? "NOW PLAYING" : "READY TO PLAY"}
              </div>


              <div className="radio-display-title">
                Abi-க்காக ஒரு குரல்
              </div>


              <div className="radio-display-subtitle">
                என் குரல், உனக்காக.
              </div>


              {/* =========================
            ANIMATED SIGNAL
        ========================== */}

              <div className="radio-waves">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>


              {/* =========================
            PROGRESS
        ========================== */}

              <div className="radio-progress">

                <div className="radio-progress-track">

                  <div
                    className="radio-progress-fill"
                    style={{
                      width: duration
                        ? `${(currentTime / duration) * 100}%`
                        : "0%",
                    }}
                  />

                </div>


                <div className="radio-time">

                  <span>
                    {formatTime(currentTime)}
                  </span>

                  <span>
                    {formatTime(duration)}
                  </span>

                </div>

              </div>

            </div>


            {/* =========================
          CONTROLS
      ========================== */}

            <div className="radio-controls">

              <button
                className="radio-skip-button"
                onClick={() => skipAudio(-15)}
                aria-label="Skip back 15 seconds"
              >
                −15
              </button>


              <button
                className="radio-play-button"
                onClick={toggleAudio}
                aria-label={
                  isPlaying
                    ? "Pause message"
                    : "Play message"
                }
              >

                <span>
                  {isPlaying ? "❚❚" : "▶"}
                </span>

              </button>


              <button
                className="radio-skip-button"
                onClick={() => skipAudio(15)}
                aria-label="Skip forward 15 seconds"
              >
                +15
              </button>

            </div>


            {/* =========================
          BOTTOM
      ========================== */}

            <div className="radio-bottom">

              <span>
                PRIVATE FREQUENCY
              </span>

              <span>
                FOR ABI ONLY
              </span>

            </div>

          </div>


          {/* =========================
        MESSAGE BELOW PLAYER
    ========================== */}

          <div className="radio-message">

            <p>
              "Some things are better heard
              <br />
              than written."
            </p>

            <span>
              {isPlaying
                ? "Stay here and listen..."
                : "Press play when you're ready."}
            </span>

          </div>

        </div>

      </section>


      {/* =========================
    AI VIDEO
========================== */}


      {/* =========================
    THE LETTER
========================== */}

      <section className="letter-section">

        <div className="letter-inner">

          {/* Small introduction */}

          <div className="letter-intro">

            <p className="section-label">
              A LETTER FOR ABI · அன்புடன்
            </p>

            <div className="letter-line"></div>

          </div>


          {/* Letter */}

          <article className="love-letter">

            <div className="letter-top">

              <span>
                AUGUST 21
              </span>

              <span>
                FOR ABI
              </span>

            </div>


            <div className="letter-content">

              <p className="letter-greeting">
                My dear Baby Abi,
              </p>


              <p>
                I don't know if there is a perfect way
                to write everything I feel for you.
                But today, I wanted to try.
              </p>


              <p>
                It hasn't been years and years of knowing
                each other. In fact, it's only been a little
                while. But somehow, in that little while,
                you have become someone incredibly special
                to me.
              </p>


              <p>
                There are people we meet and remember.
                And then there are people who quietly
                become a part of our lives.
              </p>


              <p className="letter-emphasis">
                You became the second kind.
              </p>


              <p>
                I love the little things about you.
                The things that may seem ordinary to everyone
                else, but somehow make you, you.
              </p>


              <p>
                And today, there is something else I want
                you to know.
              </p>


              <p>
                Watching you complete your PhD in Mathematics
                makes me incredibly proud. And I don't just mean because you now have a title after your name. I mean because I know the journey you took to get there. The long nights, the hard work, the moments of doubt, and the persistence to keep going anyway.
              </p>


              <p className="letter-emphasis">
                You did something extraordinary. You should be more proud of yourself, my brainy girl.
              </p>


              <p>
                Behind those three letters — PhD — there are
                years of patience, difficult days, uncertainty,
                learning, persistence and countless moments
                when you had to keep going.
              </p>


              <p>
                And you did.
              </p>


              <p>
                So today isn't just about wishing you
                a happy birthday.
              </p>


              <p className="letter-emphasis">
                It's about celebrating the woman you are
                becoming.
              </p>


              <p>
                I hope the year ahead brings you the best of all
                things. New dreams. New adventures.
                And many reasons to smile.
              </p>


              <p>
                And selfishly, I hope I get to be there
                for a lot of them.
              </p>


              <p>
                Maybe this little website is my slightly
                ridiculous way of saying something very simple:
              </p>


              <p className="letter-big">
                I'm really happy
                <br />
                that I met you. You came into my life and made it better.
              </p>


              <p>
                Happy Birthday, baby.
              </p>


              <p>
                Here's to you, to us, and to everything
                that's still waiting for us.
              </p>

              <p>
                Love you to the moon and back, my love, my baby, my Abi and my entire world.
              </p>


              <p className="letter-signature">
                Always yours,
                <br />
                <em>Proud Pattu</em>
              </p>

            </div>


            <div className="letter-bottom">

              <span>
                21 · 08
              </span>

              <span>
                WITH LOVE
              </span>

            </div>

          </article>


          {/* Closing thought */}

          <div className="letter-closing">

            <p>
              Some stories don't need
              <br />
              a long beginning.
            </p>

          </div>

          <div className="letter-heritage-mark" aria-hidden="true">
            ✦ · வேல் · ✦
          </div>

        </div>

      </section>

      <SurpriseSection />

      {/* =========================
    FINAL OUTRO
========================== */}

      <section className="outro-section">

        <div className="outro-inner">

          <div className="outro-line"></div>


          <p className="outro-small">
            ஒரு சிறிய உலகம் · FOR YOU
          </p>


          <h2 className="outro-title">

            Happy
            <br />

            <em>Birthday, Abi.</em>

          </h2>


          <div className="outro-heart">
            ♥
          </div>

          <p className="outro-tamil">
            பிறந்தநாள் வாழ்த்துகள், அபி.
          </p>


          <p className="outro-date">
            21 · 08 · 2026
          </p>


          <p className="outro-final">
            Here's to the beginning
            <br />
            of everything.
            <br />
            <br />
            <em>Love you di chellam!</em>
          </p>


          <div className="outro-signature">
            Always,
            <br />
            <em>Pattu</em>
          </div>


          <div className="outro-end">
            <span></span>
            <span>FIN</span>
            <span></span>
          </div>

        </div>

      </section>
    </main>
  );
}

export default App;
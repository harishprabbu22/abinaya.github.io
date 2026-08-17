import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import "./App.css";
import audioFile from "../public/audio/message.mp3";

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

  const openingRef = useRef(null);
  const introRef = useRef(null);

  const dateRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const messageRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Opening animation
    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    timeline
      .fromTo(
        dateRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2 }
      )
      .fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.6"
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.3 },
        "-=0.5"
      )
      .fromTo(
        messageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.6"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5"
      );

    return () => {
      lenis.destroy();
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
    <main>
      {/* =========================
          OPENING
      ========================== */}

      <section ref={openingRef} className="opening-page">
        <div className="grain"></div>

        <div className="ambient ambient-one"></div>
        <div className="ambient ambient-two"></div>

        <div className="opening-content">
          <p ref={dateRef} className="opening-date">
            21 · 08 · 2026
          </p>

          <div ref={eyebrowRef} className="opening-eyebrow">
            A little something
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
          <div className="opening-transition">
            <p>For you, baby.</p>
          </div>
        )}
      </section>

      {/* =========================
          INTRODUCTION
      ========================== */}

      <section ref={introRef} className="intro-section">
        <div className="intro-inner">
          <p className="section-label">THE BEGINNING</p>

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
                  <span>PHOTO 01</span>
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
                The day I first met you.
              </h3>

              <p>
                Our first little chapter.
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
                  <span>PHOTO 02</span>
                </div>

              </div>

              <p className="memory-card-caption">
                One of the first moments.
              </p>

            </div>


            <div className="memory-card memory-card-right">

              <div className="memory-photo memory-photo-medium">

                <div className="photo-placeholder">
                  <span>PHOTO 03</span>
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
                <span>PHOTO 04</span>
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
                <span>PHOTO 05</span>
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

          <div className="memory-pair memory-pair-ooty">

            <div className="memory-card memory-card-left">

              <div className="memory-photo memory-photo-medium">

                <div className="photo-placeholder">
                  <span>PHOTO 06</span>
                </div>

              </div>

              <p className="memory-card-location">
                OOTY
              </p>

              <p className="memory-card-caption">
                One trip.
                A thousand little memories.
              </p>

            </div>


            <div className="memory-card memory-card-right">

              <div className="memory-photo memory-photo-medium">

                <div className="photo-placeholder">
                  <span>PHOTO 07</span>
                </div>

              </div>

              <p className="memory-card-location">
                OOTY
              </p>

              <p className="memory-card-caption">
                One of my favourite memories with you.
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
                  <span>PHOTO 08</span>
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
                <span>PHOTO 09</span>
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
                <span>PHOTO 10</span>
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
                <span>PHOTO 11</span>
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
                <span>PHOTO 12</span>
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
                <span>PHA / CONVOCATION PHOTO</span>
              </div>

            </div>

            <div className="phd-achievement-content">

              <p className="phd-overline">
                DR. ABINAYA
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
              THINGS I'VE LEARNED ABOUT YOU
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
                  We can argue about movies.
                </p>

                <p className="little-thing-description">
                  And somehow neither of us is ever wrong.
                </p>
              </div>

            </div>


            <div className="little-thing">

              <span>03</span>

              <div>
                <p className="little-thing-title">
                  You have your own little ways.
                </p>

                <p className="little-thing-description">
                  The kind of things I notice without telling you.
                </p>

              </div>

            </div>


            <div className="little-thing">

              <span>04</span>

              <div>

                <p className="little-thing-title">
                  Two months.
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
              A PRIVATE BROADCAST
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
              src={audioFile}
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

                <span>LIVE</span>

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
                A message for Abi
              </div>


              <div className="radio-display-subtitle">
                From someone who loves you.
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

      <section className="video-section">

        <div className="video-inner">

          {/* Intro */}

          <div className="video-intro">

            <p className="section-label">
              SOMETHING I MADE FOR YOU
            </p>

            <h2>
              A little
              <br />
              <em>film.</em>
            </h2>

            <p className="video-description">
              Some memories deserve more than a photograph.
            </p>

          </div>


          {/* Video */}

          <div className="video-frame">

            <video
              className="birthday-video"
              controls
              playsInline
              preload="metadata"
              poster="/images/video-poster.jpg"
            >
              <source
                src="/videos/abi-story.mp4"
                type="video/mp4"
              />

              Your browser does not support the video element.
            </video>


            {/* Cinematic corners */}

            <span className="video-corner video-corner-tl"></span>
            <span className="video-corner video-corner-tr"></span>
            <span className="video-corner video-corner-bl"></span>
            <span className="video-corner video-corner-br"></span>

          </div>


          {/* Caption */}

          <div className="video-caption">

            <span>
              A FILM FOR ABI
            </span>

            <span>
              21 · 08
            </span>

          </div>


          {/* Transition text */}

          <div className="video-after">

            <p>
              And if I could keep
              <br />
              one moment forever...
            </p>

          </div>

        </div>

      </section>

      {/* =========================
    THE LETTER
========================== */}

      <section className="letter-section">

        <div className="letter-inner">

          {/* Small introduction */}

          <div className="letter-intro">

            <p className="section-label">
              A LETTER FOR ABI
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
                My dear Abi,
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
                makes me incredibly proud.
              </p>


              <p className="letter-emphasis">
                You did something extraordinary.
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
                I hope the year ahead brings you beautiful
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
                that I met you.
              </p>


              <p>
                Happy Birthday, baby.
              </p>


              <p>
                Here's to you, to us, and to everything
                that's still waiting for us.
              </p>


              <p className="letter-signature">
                Always yours,
                <br />
                <em>Harish</em>
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

        </div>

      </section>

      {/* =========================
    FINAL OUTRO
========================== */}

      <section className="outro-section">

        <div className="outro-inner">

          <div className="outro-line"></div>


          <p className="outro-small">
            AND THAT'S ALL I WANTED TO SAY
          </p>


          <h2 className="outro-title">

            Happy
            <br />

            <em>Birthday, Abi.</em>

          </h2>


          <div className="outro-heart">
            ♥
          </div>


          <p className="outro-date">
            21 · 08 · 2026
          </p>


          <p className="outro-final">
            Here's to the beginning
            <br />
            of everything.
          </p>


          <div className="outro-signature">
            Always,
            <br />
            <em>Harish</em>
          </div>


          <div className="outro-end">
            <span></span>
            <span>FIN</span>
            <span></span>
          </div>

        </div>

      </section>
      <section className="video-section">

        <div className="video-inner">

          {/* Intro */}

          <div className="video-intro">

            <p className="section-label">
              SOMETHING I MADE FOR YOU · உனக்காக உருவாக்கியது
            </p>

            <h2>
              A little
              <br />
              <em>film.</em>
            </h2>

            <p className="video-description">
              Some memories deserve more than a photograph.
            </p>

          </div>


          {/* Video */}

          <div className="video-frame">

            <video
              className="birthday-video"
              controls
              playsInline
              preload="metadata"
              poster="/images/video-poster.jpg"
            >
              <source
                src="/videos/abi-story.mp4"
                type="video/mp4"
              />

              Your browser does not support the video element.
            </video>


            {/* Cinematic corners */}

            <span className="video-corner video-corner-tl"></span>
            <span className="video-corner video-corner-tr"></span>
            <span className="video-corner video-corner-bl"></span>
            <span className="video-corner video-corner-br"></span>

          </div>


          {/* Caption */}

          <div className="video-caption">

            <span>
              A FILM FOR ABI
            </span>

            <span>
              21 · 08
            </span>

          </div>


          {/* Transition text */}

          <div className="video-after">

            <p>
              And if I could keep
              <br />
              one moment forever...
            </p>

          </div>

        </div>

      </section>
    </main>
  );
}

export default App;
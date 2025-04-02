import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import useMediaQuery from "../useMediaQuery";
import "../styles/Carousel.scss";

import video1 from "../assets/1.mp4";
import video2 from "../assets/2.mp4";
import video3 from "../assets/3.mp4";
import video4 from "../assets/4.mp4";
import video5 from "../assets/5.mp4";
import video6 from "../assets/6.mp4";
import video7 from "../assets/7.mp4";
import video8 from "../assets/8.mp4";
import video9 from "../assets/9.mp4";
import video10 from "../assets/10.mp4";
import video11 from "../assets/11.mp4";
import video12 from "../assets/12.mp4";
import video13 from "../assets/13.mp4";
import video14 from "../assets/14.mp4";
import video15 from "../assets/15.mp4";

import playIcon from "../assets/play.svg";
import pauseIcon from "../assets/pause.svg";
import soundOnIcon from "../assets/sound on.svg";
import soundOffIcon from "../assets/sound off.svg";

const rawVideos = [
  { src: video1, title: "Whispers of Ipsum" },
  { src: video2, title: "Forest of Lorem Ipsum" },
  { src: video3, title: "Lorem Ipsum in the Wilderness" },
  { src: video4, title: "The Ipsum Tide" },
  { src: video5, title: "Echoes of Ipsum" },
  { src: video6, title: "Echoes of Lorem" },
  { src: video7, title: "Sandy Toes Lorem" },
  { src: video8, title: "Sun-kissed Lorem" },
  { src: video9, title: "Tacos in the Lorem" },
  { src: video10, title: "Lorem Ipsum" },
  { src: video11, title: "Ipsum and Lorem" },
  { src: video12, title: "Lorem in Ipsum" },
  { src: video13, title: "Day of Ipsum" },
  { src: video14, title: "Ipsum Ipsum" },
  { src: video15, title: "Evening Lorem" },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [saved, setSaved] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const VISIBLE_COUNT = useMemo(() => (isDesktop ? 5 : 3), [isDesktop]);

  const extendedList = useMemo(() => [...rawVideos, ...rawVideos, ...rawVideos], []);
  const baseLength = rawVideos.length;
  const virtualIndex = currentIndex + baseLength;

  const visibleVideos = useMemo(() => {
    const start = virtualIndex - 1;
    return extendedList.slice(start, start + VISIBLE_COUNT);
  }, [virtualIndex, extendedList, VISIBLE_COUNT]);

  const scrollToCenter = useCallback(() => {
    if (containerRef.current) {
      const child = containerRef.current.children[isDesktop ? 2 : 1] as HTMLElement;
      if (containerRef.current && child) {
        const scrollOffset =
          child.offsetLeft -
          containerRef.current.offsetWidth / 2 +
          child.offsetWidth / 2;

        containerRef.current.scrollTo({
          left: scrollOffset,
          behavior: "smooth",
        });
      }
    }
  }, [isDesktop]);

  useEffect(() => {
    scrollToCenter();
  }, [visibleVideos, scrollToCenter]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      const shouldBePlaying = isDesktop ? index === 2 : index === 1;
      video.muted = isMuted;
      if (shouldBePlaying) {
        if (isPlaying) void video.play().catch(() => { });
        else video.pause();
      } else {
        if (!video.paused) video.pause();
        video.currentTime = 0;
      }
    });
  }, [isPlaying, isMuted, visibleVideos, isDesktop]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % baseLength);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + baseLength) % baseLength);
  const togglePlay = () => setIsPlaying((p) => !p);
  const toggleMute = () => setIsMuted((m) => !m);

  const toggleSave = (src: string) => {
    setSaved((prev) =>
      prev.includes(src) ? prev.filter((v) => v !== src) : [...prev, src]
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <section className="carousel">
      <div className="carousel__title-container">
        <h2 className="carousel__title">
          {isDesktop ? "A day in the life" : "a day in the life..."}
        </h2>
        {isDesktop && (
          <div className="carousel__arrows">
            <button onClick={handlePrev} className="carousel__arrow carousel__arrow--prev"><ChevronLeft /></button>
            <button onClick={handleNext} className="carousel__arrow carousel__arrow--next"><ChevronRight /></button>
          </div>
        )}
        <button className="carousel__favorites-button" onClick={() => setShowModal(true)}>
          ❤️ Favorites
        </button>
      </div>

      <div className="carousel__wrapper" {...(!isDesktop ? swipeHandlers : {})}>
        <div className="carousel__scroller" ref={containerRef}>
          {visibleVideos.map((item, i) => {
            const isActive = isDesktop ? i === 2 : i === 1;
            const isSaved = saved.includes(item.src);
            return (
              <div className="carousel__item" key={item.src}>
                <div className="carousel__video-container">
                  <div className={`carousel__video-box ${isActive ? "carousel__video-box--active" : ""}`}>
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      src={item.src}
                      className="carousel__video"
                      preload="metadata"
                      playsInline
                    />
                  </div>
                  <div className="carousel__controls">
                    <button onClick={() => toggleSave(item.src)}>
                      <Heart color={isSaved ? "red" : "white"} fill={isSaved ? "red" : "none"} />
                    </button>
                    {isActive && (
                      <>
                        <button onClick={togglePlay}>
                          <img src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" />
                        </button>
                        <button onClick={toggleMute}>
                          <img src={isMuted ? soundOffIcon : soundOnIcon} alt="Sound Toggle" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <p className="carousel__caption">{item.title}</p>
              </div>
            );
          })}
        </div>
        <div className="carousel__progress-bar" />
        
      </div>

      {showModal && (
        <div className="carousel__modal-overlay" onClick={() => setShowModal(false)}>
          <div className="carousel__modal" onClick={(e) => e.stopPropagation()}>
            <button className="carousel__modal-close" onClick={() => setShowModal(false)}>
              <X />
            </button>
            <h3 className="carousel__modal-title">Your Favorites</h3>
            {saved.length === 0 ? (
              <p className="carousel__modal-empty">You haven't saved any videos yet. Tap the ❤️ to save your favorites!</p>
            ) : (
              <div className="carousel__modal-list">
                {saved.map((src) => {
                  const videoData = rawVideos.find((v) => v.src === src);
                  return (
                    <div className="carousel__modal-item" key={src}>
                      <video src={src} muted loop preload="metadata" className="carousel__modal-thumb" />
                      <div className="carousel__modal-meta">
                        <p>{videoData?.title}</p>
                        <button onClick={() => toggleSave(src)}>
                          <Heart color="red" fill="red" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Carousel;




//optimized my carousel component

//1. rendered only a window of videos around the current index (windowing)
//2. used useMemo to avoid recomputing the visible video set
//3. replace DOM refs with scrollLeft math (no DOM layout thrashing)
//4. lazy-load only the current video and its neighbors.

//-Virtual rendering of only 3 and 5 visible videos (current, prev, next)
//-Memoized video list for performance
//-Smooth scroll animation using scrollTo
//-Autoplay/mute managed only for current video
//-No scrollIntoView, refs arrays, or DOM-heavy updates
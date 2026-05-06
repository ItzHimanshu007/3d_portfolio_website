import React, { useEffect, useState, useRef } from 'react';
import './ScrollModel.css';

/**
 * ScrollModel - Creates a "3D pop-out" effect using the character PNG
 * with CSS 3D transforms. No WebGL needed.
 * 
 * The character PNG fades from the hero section and reappears as a 
 * floating, rotating, scroll-linked companion on the right side.
 */
const ScrollModel: React.FC = () => {
  const [modelOpacity, setModelOpacity] = useState(0);
  const [pngOpacity, setPngOpacity] = useState(1);
  const [rotateY, setRotateY] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [scaleVal, setScaleVal] = useState(0.5);
  const [isActive, setIsActive] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;

        const aboutTop = aboutSection.getBoundingClientRect().top + scrollY;

        const popStart = vh * 0.12;
        const popEnd = vh * 0.5;
        const fadeStart = aboutTop - vh * 0.8;
        const fadeEnd = aboutTop - vh * 0.15;

        if (scrollY < popStart) {
          // Hero PNG fully visible
          setPngOpacity(1);
          setModelOpacity(0);
          setIsActive(false);
          setRotateY(0);
          setRotateX(0);
          setScaleVal(0.5);
        } else if (scrollY < popEnd) {
          // POP-OUT TRANSITION
          const t = (scrollY - popStart) / (popEnd - popStart);
          const eased = t * t * (3 - 2 * t); // smoothstep

          setIsActive(true);
          setPngOpacity(1 - eased);
          setModelOpacity(eased);
          setScaleVal(0.5 + eased * 0.5);

          // Start rotating
          const scrollDelta = (scrollY - popStart) / (vh * 1.5);
          setRotateY(scrollDelta * 360);
          setRotateX(Math.sin(eased * Math.PI) * 10);
        } else if (scrollY < fadeStart) {
          // CRUISING - floating, rotating with scroll
          setIsActive(true);
          setPngOpacity(0);
          setModelOpacity(1);
          setScaleVal(1);

          const scrollDelta = (scrollY - popStart) / (vh * 1.5);
          setRotateY(scrollDelta * 360);

          // Gentle X oscillation
          const travelProgress = (scrollY - popEnd) / (fadeStart - popEnd);
          setRotateX(Math.sin(travelProgress * Math.PI * 2) * 8);
        } else if (scrollY < fadeEnd) {
          // FADE OUT before About
          const t = (scrollY - fadeStart) / (fadeEnd - fadeStart);
          const eased = t * t;

          setIsActive(true);
          setPngOpacity(0);
          setModelOpacity(1 - eased);
          setScaleVal(1 - eased * 0.3);

          const scrollDelta = (scrollY - popStart) / (vh * 1.5);
          setRotateY(scrollDelta * 360);
          setRotateX(0);
        } else {
          // Hidden
          setIsActive(false);
          setPngOpacity(0);
          setModelOpacity(0);
          setScaleVal(0.5);
          setRotateY(0);
          setRotateX(0);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Control hero PNG opacity
  useEffect(() => {
    const heroImg = document.querySelector('.cyber-character-img') as HTMLElement;
    if (heroImg) {
      heroImg.style.opacity = String(pngOpacity);
    }
  }, [pngOpacity]);

  return (
    <div
      className="scroll-model-container"
      style={{
        opacity: modelOpacity,
        visibility: isActive ? 'visible' : 'hidden',
      }}
    >
      {/* Holographic scan line */}
      <div className="holo-scanline" />

      {/* Orbit rings */}
      <div className="cyber-orbit-ring" />
      <div className="cyber-orbit-ring inner" />

      {/* 3D-Transformed Character Image */}
      <div className="model-3d-stage">
        <div
          className="model-3d-pivot"
          style={{
            transform: `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scaleVal})`,
          }}
        >
          <img
            src="/character-hero.png"
            alt="3D Character"
            className="model-3d-image"
          />
          {/* Reflection / depth layer */}
          <div className="model-depth-shadow" />
        </div>
      </div>

      {/* Glow */}
      <div className="model-backdrop-glow" />

      {/* HUD Label */}
      <div className="model-hud-label">
        <span className="hud-dot" />
        <span>3D_MODEL ▸ SCROLL_LINKED</span>
      </div>

      {/* Corner brackets */}
      <div className="model-bracket tl" />
      <div className="model-bracket tr" />
      <div className="model-bracket bl" />
      <div className="model-bracket br" />
    </div>
  );
};

export default ScrollModel;

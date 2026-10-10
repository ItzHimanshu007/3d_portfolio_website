import React from 'react';
import { motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion';
import { popEnd, popProgress, popStart } from '../utils/scrollCompanion';
import './ScrollModel.css';

/**
 * ScrollModel - Creates a "3D pop-out" effect using the character image with CSS 3D transforms.
 * The hero image fades out (see Hero) as this floating, scroll-linked companion appears on the right,
 * then the companion fades away before the About section.
 *
 * Everything is driven by motion values, so scrolling never re-renders React.
 */
const ScrollModel: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useMotionValue(0);
  const scale = useMotionValue(0.5);
  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const visibility = useMotionValue<'visible' | 'hidden'>('hidden');
  const transform = useMotionTemplate`perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;

  const update = (y: number) => {
    const vh = window.innerHeight;
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const aboutTop = aboutSection.getBoundingClientRect().top + y;
    const start = popStart(vh);
    const end = popEnd(vh);
    const fadeStart = aboutTop - vh * 0.8;
    const fadeEnd = aboutTop - vh * 0.15;
    const spin = ((y - start) / (vh * 1.5)) * 360;

    if (y < start || y >= fadeEnd) {
      // Before the pop-out, or past the About section: hidden
      visibility.set('hidden');
      opacity.set(0);
      scale.set(0.5);
      rotateY.set(0);
      rotateX.set(0);
    } else if (y < end) {
      // Pop-out transition
      const eased = popProgress(y, vh);
      visibility.set('visible');
      opacity.set(eased);
      scale.set(0.5 + eased * 0.5);
      rotateY.set(spin);
      rotateX.set(Math.sin(eased * Math.PI) * 10);
    } else if (y < fadeStart) {
      // Cruising: floating and rotating with scroll
      const travel = (y - end) / (fadeStart - end);
      visibility.set('visible');
      opacity.set(1);
      scale.set(1);
      rotateY.set(spin);
      rotateX.set(Math.sin(travel * Math.PI * 2) * 8);
    } else {
      // Fade out before About
      const t = (y - fadeStart) / (fadeEnd - fadeStart);
      const eased = t * t;
      visibility.set('visible');
      opacity.set(1 - eased);
      scale.set(1 - eased * 0.3);
      rotateY.set(spin);
      rotateX.set(0);
    }
  };

  useMotionValueEvent(scrollY, 'change', update);

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-model-container"
      style={{ opacity, visibility }}
    >
      {/* Holographic scan line */}
      <div className="holo-scanline" />

      {/* Orbit rings */}
      <div className="cyber-orbit-ring" />
      <div className="cyber-orbit-ring inner" />

      {/* 3D-Transformed Character Image */}
      <div className="model-3d-stage">
        <motion.div className="model-3d-pivot" style={{ transform }}>
          <img
            src="/character-hero.webp"
            width={583}
            height={1024}
            alt=""
            className="model-3d-image"
            loading="lazy"
            decoding="async"
          />
          {/* Reflection / depth layer */}
          <div className="model-depth-shadow" />
        </motion.div>
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
    </motion.div>
  );
};

export default ScrollModel;

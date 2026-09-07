import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function GlobalScrollLines() {
  const { scrollYProgress } = useScroll();

  // Smooth scroll progress for ultra-fluid movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Animated positional transformations driven by page scroll position
  const translateY1 = useTransform(smoothProgress, [0, 1], [0, -350]);
  const translateY2 = useTransform(smoothProgress, [0, 1], [0, 300]);
  const dashOffset = useTransform(smoothProgress, [0, 1], [0, -1200]);
  const scaleWave = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.15, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg
        className="w-full h-full opacity-45 dark:opacity-25 text-[#00A9B9] transition-opacity duration-500"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="globalScrollGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A9B9" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00A9B9" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00A9B9" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="globalScrollGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00A9B9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00A9B9" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* 1. Main Continuous Wave - Draws and shifts vertically as user scrolls */}
        <motion.path
          d="M-200 200 C 350 750, 950 50, 1640 650 C 950 1100, 350 350, -200 850"
          stroke="url(#globalScrollGrad1)"
          strokeWidth="2.5"
          fill="none"
          style={{
            y: translateY1,
            scale: scaleWave,
          }}
        />

        {/* 2. Secondary Flowing Dashed Wave Line */}
        <motion.path
          d="M-150 650 Q 400 100, 850 600 T 1650 250 T -150 650"
          stroke="url(#globalScrollGrad2)"
          strokeWidth="2"
          strokeDasharray="10 10"
          strokeDashoffset={dashOffset}
          fill="none"
          style={{
            y: translateY2,
          }}
        />

        {/* 3. Subtle Ambient Accent Curve */}
        <motion.path
          d="M-100 400 C 450 850, 1000 100, 1600 700"
          stroke="#00A9B9"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          fill="none"
          style={{
            y: translateY1,
          }}
        />
      </svg>
    </div>
  );
}

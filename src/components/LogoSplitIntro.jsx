import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';

export default function LogoSplitIntro({ children, onSkipIntro }) {
  const [isCompleted, setIsCompleted] = useState(false);

  // Motion value for scroll progress (0 to 1)
  const rawProgress = useMotionValue(0);

  // Smooth spring physics for fluid, luxurious wheel/touch response
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 45,
    damping: 22,
    restDelta: 0.0001
  });

  // Intercept wheel & touch scroll events during intro sequence + 5-second idle auto-scroll
  useEffect(() => {
    if (isCompleted) return;

    let autoScrollAnim = null;
    let idleTimer = null;

    const startAutoScroll = () => {
      const currentVal = rawProgress.get();
      if (currentVal >= 0.98) {
        setIsCompleted(true);
        if (onSkipIntro) onSkipIntro();
        return;
      }

      // Smoothly animate progress through the entire intro to reveal the website
      autoScrollAnim = animate(rawProgress, 1, {
        duration: Math.max(1.8, 2.6 * (1 - currentVal)),
        ease: [0.25, 1, 0.5, 1],
        onUpdate: (latest) => {
          if (latest >= 0.98) {
            setIsCompleted(true);
            if (onSkipIntro) onSkipIntro();
          }
        },
        onComplete: () => {
          setIsCompleted(true);
          if (onSkipIntro) onSkipIntro();
        }
      });
    };

    const resetIdleTimer = () => {
      if (autoScrollAnim) {
        autoScrollAnim.stop();
        autoScrollAnim = null;
      }
      if (idleTimer) {
        clearTimeout(idleTimer);
      }
      idleTimer = setTimeout(() => {
        startAutoScroll();
      }, 5000);
    };

    // Auto-scroll trigger if user does not scroll or wait for more than 5 seconds
    idleTimer = setTimeout(() => {
      startAutoScroll();
    }, 5000);

    let touchStartY = 0;

    const handleWheel = (e) => {
      if (isCompleted) return;
      if (autoScrollAnim) {
        autoScrollAnim.stop();
        autoScrollAnim = null;
      }
      resetIdleTimer();

      // Controlled, smooth scroll sensitivity so united logo state holds clearly
      const delta = e.deltaY * 0.00035;
      const current = rawProgress.get();
      const next = Math.max(0, Math.min(1, current + delta));
      rawProgress.set(next);

      if (next >= 0.98) {
        setIsCompleted(true);
        if (onSkipIntro) onSkipIntro();
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      if (autoScrollAnim) {
        autoScrollAnim.stop();
        autoScrollAnim = null;
      }
      resetIdleTimer();
    };

    const handleTouchMove = (e) => {
      if (isCompleted) return;
      if (autoScrollAnim) {
        autoScrollAnim.stop();
        autoScrollAnim = null;
      }
      resetIdleTimer();

      const touchY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchY) * 0.0007;
      touchStartY = touchY;

      const current = rawProgress.get();
      const next = Math.max(0, Math.min(1, current + deltaY));
      rawProgress.set(next);

      if (next >= 0.98) {
        setIsCompleted(true);
        if (onSkipIntro) onSkipIntro();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (autoScrollAnim) autoScrollAnim.stop();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isCompleted, onSkipIntro, rawProgress]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ------------------------------------------------------------------------
  // LOGO ASSEMBLY ALIGNMENT CONSTANTS
  // Desktop/Laptop: Exact original calibrated offsets (-1px, 1px, -2px)
  // Mobile (<640px): 0px seamless alignment
  // ------------------------------------------------------------------------
  const TOP_PART_TARGET_Y = isMobile ? "0px" : "-1px";
  const BOTTOM_PART_TARGET_Y = "0.4px";
  const TOP_PART_TARGET_X = isMobile ? "1.3px" : "1px";
  const BOTTOM_PART_TARGET_X = isMobile ? "0px" : "-2px";

  // ------------------------------------------------------------------------
  // ANIMATION TRANSFORMS BASED ON WHEEL PROGRESS
  // Progress 0.00 -> 0.30 : Vertical Assembly to Center (Top down, Bottom up)
  // Progress 0.30 -> 0.65 : EXTENDED UNITED HOLD PHASE (Logo stays fully assembled & visible)
  // Progress 0.65 -> 0.85 : Logo BREAKS APART (Top 1.png goes DOWN, Bottom 2.png goes UP)
  // Progress 0.72 -> 0.98 : Main Website Page Slides Up Slowly
  // ------------------------------------------------------------------------

  // 1. Initial Mouse Wheel Prompt (fades out as logo assembles)
  const initialPromptOpacity = useTransform(smoothProgress, [0, 0.20, 0.30], [1, 0.5, 0]);
  const initialPromptY = useTransform(smoothProgress, [0, 0.30], [0, -25]);

  // 2. United Prompt (shows clearly while logo is united at center)
  const unitedPromptOpacity = useTransform(smoothProgress, [0.28, 0.35, 0.60, 0.68], [0, 1, 1, 0]);
  const unitedPromptY = useTransform(smoothProgress, [0.28, 0.35, 0.60, 0.68], [20, 0, 0, -15]);

  // 3. Logo Assembly -> United Hold -> Break Apart Transforms
  const topPartY = useTransform(
    smoothProgress,
    [0, 0.30, 0.65, 0.85],
    ["-550px", TOP_PART_TARGET_Y, TOP_PART_TARGET_Y, "650px"]
  );
  const bottomPartY = useTransform(
    smoothProgress,
    [0, 0.30, 0.65, 0.85],
    ["550px", BOTTOM_PART_TARGET_Y, BOTTOM_PART_TARGET_Y, "-650px"]
  );
  const topPartX = useTransform(
    smoothProgress,
    [0, 0.30, 0.65, 0.85],
    ["0px", TOP_PART_TARGET_X, TOP_PART_TARGET_X, "0px"]
  );
  const bottomPartX = useTransform(
    smoothProgress,
    [0, 0.30, 0.65, 0.85],
    ["0px", BOTTOM_PART_TARGET_X, BOTTOM_PART_TARGET_X, "0px"]
  );

  const fragOpacity = useTransform(smoothProgress, [0, 0.75, 0.85], [1, 1, 0]);

  // 4. Main Website Page Slide Up Slowly
  const pageY = useTransform(smoothProgress, [0.72, 0.98], ["100vh", "0vh"]);
  const pageOpacity = useTransform(smoothProgress, [0.72, 0.80, 0.98], [0, 1, 1]);

  // Assembly percentage string
  const progressPercent = useTransform(smoothProgress, (v) => {
    if (v <= 0.30) {
      return `${Math.min(100, Math.round((v / 0.30) * 100))}%`;
    } else {
      return `100%`;
    }
  });

  const handleComplete = () => {
    setIsCompleted(true);
    if (onSkipIntro) onSkipIntro();
  };

  if (isCompleted) {
    return <div className="w-full min-h-screen text-slate-900 dark:text-white">{children}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 w-full h-full overflow-hidden bg-[#05070a] select-none text-white">
      
      {/* Dark Grid Background */}
      <div className="relative w-full h-full flex items-center justify-center bg-[#05070a]">
        
        <div className="absolute inset-0 bg-grid-light opacity-10 pointer-events-none" />

        {/* 1. INITIAL MOUSE SCROLL PROMPT */}
        <motion.div
          style={{ opacity: initialPromptOpacity, y: initialPromptY }}
          className="absolute z-40 flex flex-col items-center justify-center text-center px-6 pointer-events-none bottom-10 sm:bottom-14"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-10 rounded-full border-2 border-[#00A9B9] p-1 flex justify-center bg-black/60 backdrop-blur-md shadow-md">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-2.5 bg-[#00A9B9] rounded-full"
              />
            </div>
            <ChevronDown className="w-6 h-6 animate-bounce text-[#00A9B9]" />
          </div>
        </motion.div>

        {/* 2. UNITED LOGO PROMPT */}
        <motion.div
          style={{ opacity: unitedPromptOpacity, y: unitedPromptY }}
          onClick={handleComplete}
          className="absolute z-40 flex flex-col items-center justify-center text-center px-6 cursor-pointer bottom-10 sm:bottom-14 group"
        >
          <ChevronDown className="w-8 h-8 text-[#00A9B9] animate-bounce cursor-pointer group-hover:scale-125 transition-transform drop-shadow-[0_0_12px_rgba(0,169,185,0.7)]" />
        </motion.div>

        {/* 3. LOGO CANVAS */}
        <motion.div 
          style={{ opacity: fragOpacity }}
          className="relative z-30 w-[85vw] max-w-[900px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] flex items-center justify-center pointer-events-none"
        >
          
          {/* TOP PART (1.png) */}
          <motion.div
            style={{ y: topPartY, x: topPartX }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img src={img1} alt="Prittal Logo Top Part" className="w-full h-full object-contain" />
          </motion.div>

          {/* BOTTOM PART (2.png) */}
          <motion.div
            style={{ y: bottomPartY, x: bottomPartX }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img src={img2} alt="Prittal Logo Bottom Part" className="w-full h-full object-contain" />
          </motion.div>

        </motion.div>

        {/* 4. WEBSITE PAGE SLIDES UP FROM BOTTOM */}
        <motion.div
          style={{
            y: pageY,
            opacity: pageOpacity,
          }}
          className="absolute inset-0 z-40 w-full h-full overflow-y-auto overflow-x-hidden text-slate-900 dark:text-white shadow-[0_-25px_60px_rgba(0,0,0,0.6)]"
        >
          {children}
        </motion.div>



      </div>
    </div>
  );
}

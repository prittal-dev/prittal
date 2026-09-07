"use client";

// TODO create a how to collection and plce it in them

import { motion, useMotionValue, useSpring } from "framer-motion";
import React from "react";

const SPRING = {
  mass: 0.1, // avoid Controls inertia (how sluggish or responsive the object feels). Lower mass = snappier motion; higher mass = lethargic motion
  damping: 10, // its like the weight of the ball heavier the ball less it will bounce or harder the rubber band the more it will bounce
  stiffness: 131, // like rubber Band the more you strech the more speed it goes back to the original position
};

const SimpleMouseFollow = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);

  const handlePointerMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };

  return (
    <div
      onPointerMove={(e) => {
        handlePointerMove(e);
      }}
      onPointerEnter={() => {
        opacity.set(1);
      }}
      onPointerLeave={() => {
        opacity.set(0);
      }}
      className="rounded-4xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mt-6 size-[400px] sm:size-[500px] cursor-none overflow-hidden relative"
    >
      <motion.div
        style={{
          x,
          y,
          opacity,
        }}
        className="rounded-4xl size-5 bg-[#ccc]"
      ></motion.div>
    </div>
  );
};

const SpringMouseFollow = () => {
  const xSpring = useSpring(0, SPRING);
  const ySpring = useSpring(0, SPRING);
  const opacitySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(0, SPRING);

  return (
    <div
      onPointerMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        xSpring.set(e.clientX - bounds.left);
        ySpring.set(e.clientY - bounds.top);
      }}
      onPointerEnter={() => {
        opacitySpring.set(1);
        scaleSpring.set(1);
      }}
      onPointerLeave={() => {
        opacitySpring.set(0);
        scaleSpring.set(0);
      }}
      className="rounded-4xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mt-6 size-[400px] sm:size-[500px] overflow-hidden relative"
    >
      <motion.div
        style={{
          x: xSpring,
          y: ySpring,
          opacity: opacitySpring,
          scale: scaleSpring,
        }}
        className="rounded-4xl size-10 bg-[#00A5BE]"
      ></motion.div>
    </div>
  );
};

const WebsiteCustomCursor = () => {
  const xSpring = useSpring(-100, SPRING);
  const ySpring = useSpring(-100, SPRING);
  const opacitySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(0, SPRING);

  React.useEffect(() => {
    const handlePointerMove = (e) => {
      xSpring.set(e.clientX);
      ySpring.set(e.clientY);
      opacitySpring.set(1);
      scaleSpring.set(1);
    };

    const handlePointerLeave = () => {
      opacitySpring.set(0);
      scaleSpring.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [xSpring, ySpring, opacitySpring, scaleSpring]);

  return (
    <motion.div
      style={{
        x: xSpring,
        y: ySpring,
        opacity: opacitySpring,
        scale: scaleSpring,
      }}
      className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full size-10 bg-[#00A5BE] -translate-x-1/2 -translate-y-1/2 hidden md:block"
    />
  );
};

const Skiper61 = () => {
  return (
    <section className="py-20 w-full flex flex-col items-center justify-center bg-transparent">
      <div className="flex flex-col items-center justify-center px-5 mb-16">
        <div className="grid content-start justify-items-center gap-4 text-center mb-4">
          <span className="relative max-w-[20ch] text-xs uppercase tracking-widest leading-tight opacity-60 font-mono font-bold">
            Mouse follow simple
          </span>
        </div>
        <SimpleMouseFollow />
      </div>
      <div className="flex flex-col items-center justify-center px-5">
        <div className="grid content-start justify-items-center gap-4 text-center mb-4">
          <span className="relative max-w-[20ch] text-xs uppercase tracking-widest leading-tight opacity-60 font-mono font-bold">
            Mouse follow with Spring
          </span>
        </div>
        <SpringMouseFollow />
      </div>
    </section>
  );
};

export { SimpleMouseFollow, Skiper61, SpringMouseFollow, WebsiteCustomCursor };


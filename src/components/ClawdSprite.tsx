"use client";

import { motion } from "framer-motion";

type SpriteName =
  | "greeting"
  | "idea"
  | "science"
  | "nerd"
  | "scroll"
  | "flex"
  | "superhero"
  | "builder";

type AnimationType = "float" | "float-slow" | "bounce-slow" | "wobble" | "wiggle" | "none";

interface ClawdSpriteProps {
  sprite: SpriteName;
  size?: number;        // px width (height scales proportionally)
  animation?: AnimationType;
  className?: string;   // extra positioning / layout classes
  delay?: number;       // framer-motion entrance delay
  flip?: boolean;       // mirror horizontally
  title?: string;       // hover tooltip
}

const SPRITE_MAP: Record<SpriteName, string> = {
  greeting: "/clawd/clawd-greeting.png",
  idea: "/clawd/clawd-idea.png",
  science: "/clawd/clawd-science.png",
  nerd: "/clawd/clawd-nerd.png",
  scroll: "/clawd/clawd-scroll.png",
  flex: "/clawd/clawd-flex.png",
  superhero: "/clawd/clawd-superhero.png",
  builder: "/clawd/clawd-builder.png",
};

const ANIM_CLASS: Record<AnimationType, string> = {
  float: "animate-float",
  "float-slow": "animate-float-slow",
  "bounce-slow": "animate-bounce-slow",
  wobble: "animate-wobble",
  wiggle: "animate-wiggle",
  none: "",
};

export function ClawdSprite({
  sprite,
  size = 64,
  animation = "float",
  className = "",
  delay = 0,
  flip = false,
  title,
}: ClawdSpriteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 300,
        damping: 18,
      }}
      className={`inline-flex select-none pointer-events-none ${className}`}
      title={title}
    >
      <div className={ANIM_CLASS[animation]}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SPRITE_MAP[sprite]}
          alt={`Clawd ${sprite}`}
          width={size}
          height={size}
          className="image-rendering-pixelated drop-shadow-sm"
          style={{
            width: size,
            height: "auto",
            imageRendering: "pixelated",
            transform: flip ? "scaleX(-1)" : undefined,
          }}
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

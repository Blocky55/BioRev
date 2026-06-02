"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CLAWD_MESSAGES = [
  "Hey! I'm Clawd. Click me for biology tips!",
  "DNA is a double helix held together by hydrogen bonds!",
  "Active recall beats passive reading every time!",
  "The mitochondria is the powerhouse of the cell!",
  "Humans share about 60% of their DNA with bananas!",
  "Your brain uses roughly 20% of your total energy!",
  "There are more bacteria in your body than human cells!",
  "A single cell can contain about 6 feet of DNA!",
  "Take breaks! Spaced repetition works best.",
  "Focus on your weak spots -- that's where growth happens!",
  "Stem cells can differentiate into specialised cell types!",
  "Antibiotic resistance is a major global health threat!",
  "The human genome has about 3 billion base pairs!",
  "You're doing great -- keep revising!",
];

interface ClawdProps {
  isTopicPage: boolean;
}

export function Clawd({ isTopicPage }: ClawdProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  const showMessage = useCallback(() => {
    setMessage(CLAWD_MESSAGES[messageIndex]);
    setMessageIndex((i) => (i + 1) % CLAWD_MESSAGES.length);
  }, [messageIndex]);

  // Auto-hide message after 4 seconds
  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div
      className={`fixed z-30 bottom-5 transition-all duration-300 ${
        isTopicPage ? "left-4 lg:left-[276px]" : "left-4"
      }`}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            className="absolute bottom-full left-0 mb-3 p-3 bg-surface rounded-xl border border-border
              shadow-lg max-w-[220px] sm:max-w-[260px]"
          >
            <p className="text-[12px] sm:text-[13px] text-text-primary leading-relaxed">
              {message}
            </p>
            {/* Tail */}
            <div className="absolute bottom-0 left-5 translate-y-1/2 rotate-45 w-2.5 h-2.5 bg-surface border-r border-b border-border" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clawd character */}
      <motion.button
        onClick={showMessage}
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, -3, 0] }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -3, 0] }}
        transition={{
          y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
        }}
        className="w-12 h-12 relative cursor-pointer focus:outline-none"
        aria-label="Clawd the mascot — click for biology tips"
        title="Click me!"
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          {/* Left claw */}
          <circle cx="8" cy="30" r="5" fill="#065F46" />
          {/* Right claw */}
          <circle cx="40" cy="30" r="5" fill="#065F46" />
          {/* Body */}
          <circle cx="24" cy="28" r="15" fill="#047857" />
          {/* Eyes */}
          <circle cx="19" cy="25" r="3.5" fill="white" />
          <circle cx="29" cy="25" r="3.5" fill="white" />
          <circle cx="20" cy="25" r="1.8" fill="#111827" />
          <circle cx="30" cy="25" r="1.8" fill="#111827" />
          {/* Eye highlights */}
          <circle cx="20.8" cy="24" r="0.8" fill="white" />
          <circle cx="30.8" cy="24" r="0.8" fill="white" />
          {/* Mouth */}
          <path
            d="M20 32 Q24 35.5 28 32"
            stroke="white"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Cheeks */}
          <circle cx="15" cy="30" r="2" fill="#16A34A" opacity="0.35" />
          <circle cx="33" cy="30" r="2" fill="#16A34A" opacity="0.35" />
        </svg>
      </motion.button>
    </div>
  );
}

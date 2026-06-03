"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";

// ─── Hint generation (deterministic, no AI needed) ───
// Maps keywords in questions/flashcards to helpful hints
const HINT_PATTERNS: { keywords: string[]; hint: string }[] = [
  { keywords: ["mitosis", "meiosis", "cell division"], hint: "Remember: Mitosis = 2 identical copies (growth). Meiosis = 4 unique gametes (reproduction). PMAT!" },
  { keywords: ["dna", "double helix", "base pair"], hint: "A-T has 2 hydrogen bonds, C-G has 3. Think: 'AT' has 2 letters, 'CGo' has 3!" },
  { keywords: ["transcription", "translation", "mrna", "rna"], hint: "Transcription = DNA → mRNA (in nucleus). Translation = mRNA → protein (at ribosomes). Like copying notes then cooking from the recipe!" },
  { keywords: ["allele", "homozygous", "heterozygous"], hint: "Homo = same, hetero = different. Two alleles per gene — one from mum, one from dad!" },
  { keywords: ["dominant", "recessive", "co-dominant"], hint: "Dominant needs just ONE copy to show. Recessive needs TWO. Co-dominant? Both get to shine!" },
  { keywords: ["mutation", "snp", "frameshift"], hint: "SNPs swap one letter. Frameshifts move EVERYTHING downstream — usually catastrophic!" },
  { keywords: ["cystic fibrosis", "cftr"], hint: "CF = CFTR gene problem. Over 900 bad alleles, all recessive. Most common: ΔF508!" },
  { keywords: ["genome", "human genome project", "hgp"], hint: "Only ~20,500 genes! That's fewer than a grape. Alternative splicing makes up for it — ~5 proteins per gene." },
  { keywords: ["gwas", "association"], hint: "GWAS = comparing SNPs across thousands of people. Association ≠ causation — just risk!" },
  { keywords: ["natural selection", "fitness", "evolution"], hint: "Fitness = reproductive success, NOT gym strength! Advantageous alleles spread through populations." },
  { keywords: ["osmosis", "diffusion", "active transport"], hint: "Osmosis = water through a membrane. Diffusion = particles spread out. Active transport = needs ATP energy!" },
  { keywords: ["enzyme", "substrate", "active site"], hint: "Lock and key! The substrate fits the enzyme's active site. Denatured = shape lost = game over." },
  { keywords: ["photosynthesis", "chlorophyll", "chloroplast"], hint: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Light-dependent in thylakoids, light-independent in stroma!" },
  { keywords: ["respiration", "atp", "mitochondria"], hint: "The mitochondria IS the powerhouse! Glycolysis → Krebs → Electron transport chain. ~38 ATP total." },
  { keywords: ["antibody", "antigen", "immune", "lymphocyte"], hint: "Antigens trigger the response. Antibodies are Y-shaped proteins that lock onto them. B-cells make antibodies!" },
  { keywords: ["neuron", "synapse", "neurotransmitter", "nerve"], hint: "Electrical signal along the axon, chemical signal across the synapse. Neurotransmitters bridge the gap!" },
  { keywords: ["chromosome", "karyotype"], hint: "23 pairs = 46 total. Pair 23 = sex chromosomes (XX or XY). A karyotype lines them up by size!" },
  { keywords: ["genotype", "phenotype"], hint: "Genotype = what your genes SAY. Phenotype = what actually SHOWS. Environment can influence phenotype too!" },
  { keywords: ["twin", "monozygotic", "dizygotic"], hint: "Identical twins = same DNA. If they differ, it's the environment! Less than 100% concordance = environmental influence." },
  { keywords: ["lactase", "lactose", "dairy"], hint: "C→T SNP lets Oct-1 bind, keeping lactase ON into adulthood. Evolved ~10,000 years ago with cattle farming!" },
  { keywords: ["sickle cell", "malaria", "haemoglobin"], hint: "Heterozygous = malaria protection. Homozygous = sickle cell disease. Balancing selection in action!" },
  { keywords: ["protein", "amino acid", "polypeptide"], hint: "20 amino acids, coded by 64 codons. The genetic code is degenerate — multiple codons per amino acid!" },
  { keywords: ["stem cell", "differentiate", "specialise"], hint: "Stem cells = blank slates that can become any cell type. Embryonic > Adult in versatility!" },
  { keywords: ["antibiotic", "resistance", "bacteria"], hint: "Overuse = more resistant bacteria survive and multiply. It's natural selection happening in real time!" },
  { keywords: ["pharmacogenomics", "drug", "medicine"], hint: "Your genes affect how you respond to drugs! Same dose, different effect — that's pharmacogenomics." },
];

const FALLBACK_HINTS = [
  "Try breaking the question into smaller parts!",
  "Think about cause and effect — what leads to what?",
  "Look for keywords — they often point to the answer!",
  "Eliminate options you know are wrong first!",
  "Picture it in your head — biology is visual!",
  "Connect it to something you already know!",
  "If it's a process, think step-by-step!",
  "Remember: biology loves patterns and repetition!",
];

const IDLE_MESSAGES = [
  "I believe in you! 🧬",
  "Biology is beautiful once it clicks!",
  "You're building knowledge one card at a time!",
  "Fun fact: your brain rewires itself as you study!",
  "Keep going — consistency beats cramming!",
  "Every card you flip makes you stronger!",
];

export function getHintForContent(text: string): string {
  const lower = text.toLowerCase();
  for (const pattern of HINT_PATTERNS) {
    if (pattern.keywords.some((kw) => lower.includes(kw))) {
      return pattern.hint;
    }
  }
  return FALLBACK_HINTS[Math.floor(Math.random() * FALLBACK_HINTS.length)];
}

// ─── Animation types ───
type ClawdMood = "idle" | "thinking" | "happy" | "sad" | "excited" | "sleeping";

// Custom event types for cross-component communication
export type ClawdEvent =
  | { type: "hint-request"; text: string; hint?: string }
  | { type: "correct-answer" }
  | { type: "wrong-answer" }
  | { type: "streak-milestone"; days: number };

interface ClawdProps {
  isTopicPage: boolean;
}

export function Clawd({ isTopicPage }: ClawdProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [mood, setMood] = useState<ClawdMood>("idle");
  const [isVisible, setIsVisible] = useState(true);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const messageTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Show a message with auto-hide
  const showMessage = useCallback((msg: string, duration = 5000) => {
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    setMessage(msg);
    messageTimerRef.current = setTimeout(() => {
      setMessage(null);
      setMood("idle");
    }, duration);
  }, []);

  // Handle click — cycle through idle messages
  const handleClick = useCallback(() => {
    setMood("excited");
    const msg = IDLE_MESSAGES[Math.floor(Math.random() * IDLE_MESSAGES.length)];
    showMessage(msg, 4000);
    setTimeout(() => setMood("idle"), 2000);
  }, [showMessage]);

  // Listen for custom events from Flashcard/Quiz components
  useEffect(() => {
    const handler = (e: CustomEvent<ClawdEvent>) => {
      const event = e.detail;
      switch (event.type) {
        case "hint-request":
          setMood("thinking");
          // Delay hint to make thinking animation visible
          setTimeout(() => {
            // Prefer the tailored hint from data; fall back to keyword matching
            const hint = event.hint || getHintForContent(event.text);
            setMood("idle");
            showMessage(hint, 7000);
          }, 1200);
          break;
        case "correct-answer":
          setMood("happy");
          showMessage(
            ["Nice one! 🎉", "You're on fire! 🔥", "Nailed it! 💪", "Big brain energy! 🧠", "That's the one! ✨"][
              Math.floor(Math.random() * 5)
            ],
            3000
          );
          setTimeout(() => setMood("idle"), 3000);
          break;
        case "wrong-answer":
          setMood("sad");
          showMessage(
            ["Oof, so close!", "Don't worry, you'll get it next time!", "That's how we learn!", "Shake it off — try again!"][
              Math.floor(Math.random() * 4)
            ],
            3500
          );
          setTimeout(() => setMood("idle"), 3500);
          break;
        case "streak-milestone":
          setMood("excited");
          showMessage(`🔥 ${event.days}-day streak! You're unstoppable!`, 5000);
          setTimeout(() => setMood("idle"), 5000);
          break;
      }
    };

    window.addEventListener("clawd-event", handler as EventListener);
    return () => window.removeEventListener("clawd-event", handler as EventListener);
  }, [showMessage]);

  // Random idle animation every 15-20s
  useEffect(() => {
    const scheduleIdle = () => {
      const delay = 15000 + Math.random() * 5000;
      idleTimerRef.current = setTimeout(() => {
        if (!message) {
          setMood("sleeping");
          setTimeout(() => setMood("idle"), 2500);
        }
        scheduleIdle();
      }, delay);
    };
    scheduleIdle();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [message]);

  // Hide on very small viewports when scrolling to avoid obstruction
  useEffect(() => {
    let lastY = 0;
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastY + 100) setIsVisible(false);
      else if (y < lastY - 50 || y < 100) setIsVisible(true);
      lastY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Animation variants per mood ───
  const bodyVariants: Record<ClawdMood, TargetAndTransition> = {
    idle: {
      y: [0, -4, 0],
      rotate: 0,
      scale: 1,
      transition: { y: { repeat: Infinity, duration: 3, ease: "easeInOut" } },
    },
    thinking: {
      rotate: [0, -8, 8, -5, 5, 0],
      scale: [1, 1.05, 1],
      transition: { rotate: { repeat: Infinity, duration: 1.5 }, scale: { repeat: Infinity, duration: 1.5 } },
    },
    happy: {
      y: [0, -12, 0, -8, 0, -4, 0],
      rotate: [0, -10, 10, -5, 5, 0],
      scale: [1, 1.15, 0.95, 1.1, 1],
      transition: { duration: 1.2, ease: "easeOut" },
    },
    sad: {
      y: [0, 3, 0],
      rotate: [0, -3, 0],
      scale: [1, 0.92, 0.95],
      transition: { duration: 0.8, ease: "easeOut" },
    },
    excited: {
      y: [0, -15, 0, -10, 0, -6, 0],
      rotate: [0, 360],
      scale: [1, 1.2, 0.9, 1.15, 1],
      transition: { duration: 1.5, ease: "easeOut" },
    },
    sleeping: {
      y: [0, 2, 0],
      rotate: [0, -5, 0],
      scale: [1, 0.97, 1],
      transition: { y: { repeat: Infinity, duration: 2, ease: "easeInOut" }, rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" } },
    },
  };

  return (
    <div
      className={`fixed z-30 transition-all duration-500 ${
        isTopicPage ? "left-4 lg:left-[276px]" : "left-4"
      } ${isVisible ? "bottom-5" : "-bottom-20"}`}
    >
      {/* Speech bubble — redesigned as proper comic bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute bottom-full left-1 mb-4 w-[240px] sm:w-[280px]"
          >
            <div className="relative px-4 py-3.5 bg-surface rounded-2xl border border-border shadow-xl">
              <p className="text-[12px] sm:text-[13px] text-text-primary leading-[1.6]">
                {message}
              </p>
              {/* Bubble tail — triangular pointer */}
              <svg
                className="absolute -bottom-[10px] left-5 w-5 h-3 text-surface"
                viewBox="0 0 20 12"
                fill="none"
              >
                <path
                  d="M0 0 C4 0 6 0 10 10 C14 0 16 0 20 0 Z"
                  fill="currentColor"
                  className="drop-shadow-sm"
                />
                <path
                  d="M0 0 C4 0 6 0 10 10 C14 0 16 0 20 0"
                  stroke="rgb(var(--c-border))"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thinking indicator */}
      <AnimatePresence>
        {mood === "thinking" && !message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute bottom-full left-3 mb-3 flex items-center gap-1"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkles for excited/happy mood */}
      <AnimatePresence>
        {(mood === "excited" || mood === "happy") && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 24, y: 24 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: 24 + (Math.random() - 0.5) * 60,
                  y: (Math.random() - 0.5) * 50,
                }}
                transition={{ duration: 1, delay: i * 0.15 }}
                className="absolute w-2 h-2 pointer-events-none"
              >
                <svg viewBox="0 0 8 8" fill="none" className="w-full h-full">
                  <path d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z" fill="#FBBF24" />
                </svg>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Zzz for sleeping */}
      <AnimatePresence>
        {mood === "sleeping" && !message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-1 right-0 text-[10px] text-text-muted font-bold pointer-events-none"
          >
            <motion.span
              animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              z Z
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clawd character */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.12, rotate: [0, -6, 6, -4, 0] }}
        whileTap={{ scale: 0.85 }}
        animate={bodyVariants[mood]}
        className="w-14 h-14 relative cursor-pointer focus:outline-none"
        aria-label="Clawd the mascot — click for biology tips"
        title="Click me!"
      >
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          {/* Left claw/arm */}
          <motion.g
            animate={
              mood === "thinking"
                ? { rotate: [0, 15, 10, 15, 10], x: [0, 2, 0] }
                : mood === "happy"
                  ? { rotate: [0, -30, 30, -20, 20, 0], y: [0, -4, 0] }
                  : mood === "excited"
                    ? { rotate: [0, -45, 45, -30, 30, 0] }
                    : { rotate: 0 }
            }
            transition={{ duration: 1.2, repeat: mood === "thinking" ? Infinity : 0 }}
            style={{ transformOrigin: "10px 34px" }}
          >
            <circle cx="8" cy="34" r="6" fill="#065F46" />
            {/* Thinking hand on chin */}
            {mood === "thinking" && (
              <circle cx="10" cy="30" r="3" fill="#065F46" />
            )}
          </motion.g>
          {/* Right claw/arm */}
          <motion.g
            animate={
              mood === "happy" || mood === "excited"
                ? { rotate: [0, 30, -30, 20, -20, 0], y: [0, -4, 0] }
                : mood === "sad"
                  ? { rotate: 5, y: 3 }
                  : { rotate: 0 }
            }
            transition={{ duration: 1.2, repeat: mood === "happy" ? 2 : 0 }}
            style={{ transformOrigin: "46px 34px" }}
          >
            <circle cx="48" cy="34" r="6" fill="#065F46" />
          </motion.g>
          {/* Body */}
          <circle cx="28" cy="32" r="17" fill="#047857" />
          {/* Belly spot */}
          <ellipse cx="28" cy="37" rx="8" ry="6" fill="#059669" opacity="0.3" />
          {/* Eyes */}
          <motion.g
            animate={
              mood === "happy" || mood === "excited"
                ? { scaleY: [1, 0.1, 1] }
                : mood === "sleeping"
                  ? { scaleY: 0.1 }
                  : mood === "sad"
                    ? { y: 2 }
                    : {}
            }
            transition={
              mood === "sleeping"
                ? { duration: 0.5 }
                : { duration: 0.3, delay: 0.1 }
            }
            style={{ transformOrigin: "28px 28px" }}
          >
            <circle cx="22" cy="28" r="4" fill="white" />
            <circle cx="34" cy="28" r="4" fill="white" />
            {/* Pupils — look in different directions based on mood */}
            <motion.circle
              cx={mood === "thinking" ? 23.5 : 23}
              cy={mood === "thinking" ? 27 : mood === "sad" ? 29 : 28}
              r="2"
              fill="#111827"
            />
            <motion.circle
              cx={mood === "thinking" ? 35.5 : 35}
              cy={mood === "thinking" ? 27 : mood === "sad" ? 29 : 28}
              r="2"
              fill="#111827"
            />
            {/* Eye highlights */}
            <circle cx="23.8" cy="26.8" r="0.9" fill="white" />
            <circle cx="35.8" cy="26.8" r="0.9" fill="white" />
          </motion.g>
          {/* Eyebrows for mood */}
          {mood === "sad" && (
            <>
              <path d="M19 23 L25 25" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M37 23 L31 25" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}
          {mood === "thinking" && (
            <path d="M19 24 L25 23" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round" />
          )}
          {/* Mouth */}
          <motion.path
            d={
              mood === "happy" || mood === "excited"
                ? "M21 36 Q28 42 35 36"
                : mood === "sad"
                  ? "M22 38 Q28 35 34 38"
                  : mood === "thinking"
                    ? "M24 37 Q28 37 32 37"
                    : mood === "sleeping"
                      ? "M24 37 Q28 38 32 37"
                      : "M22 36 Q28 39.5 34 36"
            }
            stroke="white"
            strokeWidth="1.5"
            fill={mood === "happy" || mood === "excited" ? "rgba(255,255,255,0.3)" : "none"}
            strokeLinecap="round"
          />
          {/* Cheeks — more visible when happy */}
          <circle
            cx="16"
            cy="35"
            r="2.5"
            fill="#16A34A"
            opacity={mood === "happy" || mood === "excited" ? 0.55 : 0.3}
          />
          <circle
            cx="40"
            cy="35"
            r="2.5"
            fill="#16A34A"
            opacity={mood === "happy" || mood === "excited" ? 0.55 : 0.3}
          />
          {/* Sweat drop when sad */}
          {mood === "sad" && (
            <motion.ellipse
              cx="38"
              cy="24"
              rx="1.5"
              ry="2.5"
              fill="#7DD3FC"
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: [0, 1, 0], y: [-2, 4, 8] }}
              transition={{ duration: 1.5, repeat: 1 }}
            />
          )}
        </svg>
      </motion.button>
    </div>
  );
}

// ─── Helper to dispatch Clawd events from other components ───
export function dispatchClawdEvent(event: ClawdEvent) {
  window.dispatchEvent(new CustomEvent("clawd-event", { detail: event }));
}

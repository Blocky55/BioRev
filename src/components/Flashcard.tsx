"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Topic } from "@/lib/topics";
import { getFlashcardProgress, saveFlashcardProgress } from "@/lib/progress";

interface FlashcardProps {
  topic: Topic;
}

function ConfettiEffect() {
  const colors = ["#39ff14", "#ff2d78", "#ffb800", "#00ffff", "#ff6b00"];
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 1,
    size: Math.random() * 8 + 4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute confetti-particle"
          style={{
            left: `${p.x}%`,
            top: 0,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Flashcard({ topic }: FlashcardProps) {
  const [cards, setCards] = useState(topic.flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [learning, setLearning] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    const progress = getFlashcardProgress(topic.id);
    setKnown(progress.known);
    setLearning(progress.learning);
  }, [topic.id]);

  const remainingCards = cards.filter((c) => !known.includes(c.id));
  const currentCard = remainingCards[currentIndex];
  const totalCards = topic.flashcards.length;
  const knownCount = known.length;

  const save = useCallback((newKnown: string[], newLearning: string[]) => {
    saveFlashcardProgress(topic.id, { known: newKnown, learning: newLearning });
  }, [topic.id]);

  const handleKnown = () => {
    if (!currentCard) return;
    const newKnown = [...known, currentCard.id];
    const newLearning = learning.filter((id) => id !== currentCard.id);
    setKnown(newKnown);
    setLearning(newLearning);
    save(newKnown, newLearning);
    setIsFlipped(false);

    if (newKnown.length === totalCards) {
      setShowConfetti(true);
      setAllDone(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } else {
      setCurrentIndex((prev) => Math.min(prev, remainingCards.length - 2));
    }
  };

  const handleLearning = () => {
    if (!currentCard) return;
    const newLearning = learning.includes(currentCard.id) ? learning : [...learning, currentCard.id];
    setLearning(newLearning);
    save(known, newLearning);
    setIsFlipped(false);
    if (currentIndex < remainingCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % remainingCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + remainingCards.length) % remainingCards.length);
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleReset = () => {
    setKnown([]);
    setLearning([]);
    setAllDone(false);
    setCurrentIndex(0);
    save([], []);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsFlipped((f) => !f);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, remainingCards.length]);

  if (allDone) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center py-16"
      >
        {showConfetti && <ConfettiEffect />}
        <div className="text-6xl mb-6">🏆</div>
        <h3 className="font-pixel text-neon-green text-sm mb-4 text-glow-green">
          DECK COMPLETE!
        </h3>
        <p className="text-gray-300 text-center mb-6">
          You&apos;ve mastered all {totalCards} flashcards in this topic!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="font-pixel text-[10px] px-6 py-3 bg-hot-pink/20 text-hot-pink pixel-border-pink"
        >
          RESET & STUDY AGAIN
        </motion.button>
      </motion.div>
    );
  }

  if (!currentCard) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p>No cards remaining!</p>
        <button onClick={handleReset} className="mt-4 text-neon-green underline">Reset deck</button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {showConfetti && <ConfettiEffect />}

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-pixel text-[10px] text-neon-green">
            {knownCount}/{totalCards} KNOWN
          </span>
          <span className="text-xs text-gray-500">
            Card {currentIndex + 1} of {remainingCards.length} remaining
          </span>
        </div>
        <div className="h-2 bg-navy-lighter rounded-full overflow-hidden pixel-border-subtle">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-green to-neon-green/70"
            initial={{ width: 0 }}
            animate={{ width: `${(knownCount / totalCards) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div
        className="card-3d cursor-pointer mx-auto max-w-xl"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`card-3d-inner relative w-full min-h-[280px] ${isFlipped ? "flipped" : ""}`}>
          {/* Front */}
          <div className="card-3d-front absolute inset-0 p-8 bg-navy-lighter pixel-border rounded flex flex-col items-center justify-center">
            <span className="font-pixel text-[10px] text-hot-pink mb-4">QUESTION</span>
            <p className="text-lg text-center text-gray-100 leading-relaxed">
              {currentCard.front}
            </p>
            <span className="font-pixel text-[8px] text-gray-600 mt-6">
              CLICK TO FLIP
            </span>
          </div>

          {/* Back */}
          <div className="card-3d-back absolute inset-0 p-8 bg-navy-lighter pixel-border-pink rounded flex flex-col items-center justify-center">
            <span className="font-pixel text-[10px] text-neon-green mb-4">ANSWER</span>
            <p className="text-lg text-center text-gray-100 leading-relaxed">
              {currentCard.back}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="font-pixel text-[10px] px-4 py-2 bg-navy-lighter border border-gray-700 text-gray-300 hover:border-neon-green/50 transition-colors"
        >
          ◀ PREV
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleLearning}
          className="font-pixel text-[10px] px-5 py-3 bg-hot-pink/20 text-hot-pink border border-hot-pink/50 hover:bg-hot-pink/30 transition-colors"
        >
          STILL LEARNING
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleKnown}
          className="font-pixel text-[10px] px-5 py-3 bg-neon-green/20 text-neon-green border border-neon-green/50 hover:bg-neon-green/30 transition-colors"
        >
          GOT IT ✓
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="font-pixel text-[10px] px-4 py-2 bg-navy-lighter border border-gray-700 text-gray-300 hover:border-neon-green/50 transition-colors"
        >
          NEXT ▶
        </motion.button>
      </div>

      {/* Shuffle button */}
      <div className="text-center mt-4">
        <motion.button
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShuffle}
          className="font-pixel text-[9px] px-4 py-2 text-amber hover:text-amber/80 transition-colors"
        >
          🔀 SHUFFLE
        </motion.button>
      </div>
    </motion.div>
  );
}

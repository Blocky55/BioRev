"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Topic } from "@/lib/topics";
import { getFlashcardProgress, saveFlashcardProgress } from "@/lib/progress";

interface FlashcardProps {
  topic: Topic;
}

function ConfettiEffect() {
  const colors = ["#047857", "#16A34A", "#0D9488", "#CA8A04", "#065F46"];
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
          className="absolute confetti-particle rounded-sm"
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
        <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 12l2 2 4-4" stroke="#047857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="10" stroke="#047857" strokeWidth="2" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Deck complete
        </h3>
        <p className="text-text-secondary text-sm text-center mb-8 max-w-sm">
          You&apos;ve mastered all {totalCards} flashcards in this topic.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleReset}
          className="px-5 py-2.5 bg-surface text-danger text-sm font-medium rounded-lg
            border border-danger/20 hover:bg-danger-light transition-colors"
        >
          Reset and study again
        </motion.button>
      </motion.div>
    );
  }

  if (!currentCard) {
    return (
      <div className="text-center py-16">
        <p className="text-text-muted text-sm">No cards remaining.</p>
        <button
          onClick={handleReset}
          className="mt-4 text-sm text-primary hover:text-primary-hover underline underline-offset-2 transition-colors"
        >
          Reset deck
        </button>
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
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-[13px] font-medium text-primary">
            {knownCount}/{totalCards} mastered
          </span>
          <span className="text-[13px] text-text-muted">
            Card {currentIndex + 1} of {remainingCards.length} remaining
          </span>
        </div>
        <div className="h-2 bg-surface-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
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
          <div className="card-3d-front absolute inset-0 p-8 bg-surface rounded-2xl border border-border shadow-md
            flex flex-col items-center justify-center">
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-4">
              Question
            </span>
            <p className="text-lg text-center text-text-primary leading-relaxed">
              {currentCard.front}
            </p>
            <span className="text-[11px] text-text-muted mt-6">
              Click to flip
            </span>
          </div>

          {/* Back */}
          <div className="card-3d-back absolute inset-0 p-8 bg-primary-light rounded-2xl border border-primary/15 shadow-md
            flex flex-col items-center justify-center">
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-4">
              Answer
            </span>
            <p className="text-lg text-center text-text-primary leading-relaxed">
              {currentCard.back}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePrev}
          className="px-4 py-2.5 text-[13px] font-medium bg-surface rounded-lg border border-border
            text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-all"
        >
          Prev
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLearning}
          className="px-5 py-2.5 text-[13px] font-medium rounded-lg
            bg-danger-light text-danger border border-danger/20
            hover:bg-danger/10 transition-all"
        >
          Still learning
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleKnown}
          className="px-5 py-2.5 text-[13px] font-medium rounded-lg
            bg-success-light text-success border border-success/20
            hover:bg-success/10 transition-all"
        >
          Got it
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="px-4 py-2.5 text-[13px] font-medium bg-surface rounded-lg border border-border
            text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-all"
        >
          Next
        </motion.button>
      </div>

      {/* Shuffle button */}
      <div className="text-center mt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShuffle}
          className="text-[12px] font-medium px-4 py-2 text-text-muted hover:text-primary transition-colors"
        >
          Shuffle deck
        </motion.button>
      </div>
    </motion.div>
  );
}

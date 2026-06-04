"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Topic } from "@/lib/topics";
import {
  getFlashcardProgress,
  saveFlashcardProgress,
  resetFlashcardProgress,
  updateStreak,
} from "@/lib/progress";
import { ConfirmModal } from "@/components/ConfirmModal";
import { dispatchClawdEvent } from "@/components/Clawd";

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

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  return isTouch;
}

export function Flashcard({ topic }: FlashcardProps) {
  const [cards, setCards] = useState(topic.flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [learning, setLearning] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const isTouch = useIsTouchDevice();
  const [answerText, setAnswerText] = useState("");
  const [hintUsed, setHintUsed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const progress = getFlashcardProgress(topic.id);
    setKnown(progress.known);
    setLearning(progress.learning);
  }, [topic.id]);

  const remainingCards = cards.filter((c) => !known.includes(c.id));
  const currentCard = remainingCards[currentIndex];
  const totalCards = topic.flashcards.length;
  const knownCount = known.length;

  const save = useCallback(
    (newKnown: string[], newLearning: string[]) => {
      saveFlashcardProgress(topic.id, { known: newKnown, learning: newLearning });
    },
    [topic.id]
  );

  const handleKnown = () => {
    if (!currentCard) return;
    updateStreak();
    setAnswerText("");
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
    updateStreak();
    setAnswerText("");
    const newLearning = learning.includes(currentCard.id)
      ? learning
      : [...learning, currentCard.id];
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
    setAnswerText("");
    setCurrentIndex((prev) => (prev + 1) % remainingCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setAnswerText("");
    setCurrentIndex((prev) => (prev - 1 + remainingCards.length) % remainingCards.length);
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setAnswerText("");
  };

  // Confirmed reset — clears all mastered/learning state
  const confirmReset = () => {
    resetFlashcardProgress(topic.id);
    setKnown([]);
    setLearning([]);
    setAllDone(false);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowResetModal(false);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't intercept keys when user is typing in the answer box
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "TEXTAREA" || tag === "INPUT") return;

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

  // ── Deck Complete ──
  if (allDone) {
    return (
      <>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 sm:py-16"
        >
          {showConfetti && <ConfettiEffect />}
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-light rounded-2xl flex items-center justify-center mb-5 sm:mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="sm:w-7 sm:h-7">
              <path d="M9 12l2 2 4-4" stroke="#047857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" stroke="#047857" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2">Deck complete</h3>
          <p className="text-text-secondary text-[14px] sm:text-sm text-center mb-6 sm:mb-8 max-w-sm px-4">
            You&apos;ve mastered all {totalCards} flashcards in this topic.
          </p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowResetModal(true)}
            className="min-h-[44px] px-5 py-2.5 bg-surface text-danger text-sm font-medium rounded-lg
              border border-danger/20 hover:bg-danger-light active:bg-danger-light transition-colors"
          >
            Reset and study again
          </motion.button>
        </motion.div>

        <ConfirmModal
          open={showResetModal}
          title="Reset Flashcard Progress"
          message="This will clear all mastered and learning cards. You'll start from scratch."
          confirmLabel="Reset"
          onConfirm={confirmReset}
          onCancel={() => setShowResetModal(false)}
        />
      </>
    );
  }

  // ── Empty State ──
  if (!currentCard) {
    return (
      <>
        <div className="text-center py-12 sm:py-16">
          <p className="text-text-muted text-sm">No cards remaining.</p>
          <button
            onClick={() => setShowResetModal(true)}
            className="mt-4 min-h-[44px] text-sm text-primary hover:text-primary-hover underline underline-offset-2 transition-colors"
          >
            Reset deck
          </button>
        </div>

        <ConfirmModal
          open={showResetModal}
          title="Reset Flashcard Progress"
          message="This will clear all mastered and learning cards. You'll start from scratch."
          confirmLabel="Reset"
          onConfirm={confirmReset}
          onCancel={() => setShowResetModal(false)}
        />
      </>
    );
  }

  // ── Active Flashcard ──
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {showConfetti && <ConfettiEffect />}

      {/* Progress bar */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-2 sm:mb-2.5">
          <span className="text-[13px] font-medium text-primary">
            {knownCount}/{totalCards} mastered
          </span>
          <span className="text-[12px] sm:text-[13px] text-text-muted">
            {currentIndex + 1} of {remainingCards.length}
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
      <div className="card-3d cursor-pointer mx-auto max-w-xl" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`card-3d-inner relative w-full min-h-[220px] sm:min-h-[280px] ${isFlipped ? "flipped" : ""}`}>
          <div className="card-3d-front absolute inset-0 p-5 sm:p-8 bg-surface rounded-2xl border border-border shadow-md flex flex-col items-center justify-center">
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4">Question</span>
            <p className="text-[15px] sm:text-lg text-center text-text-primary leading-relaxed">{currentCard.front}</p>
            <span className="text-[11px] text-text-muted mt-4 sm:mt-6">
              {isTouch ? "Tap to flip" : "Click to flip"}
            </span>
          </div>
          <div className="card-3d-back absolute inset-0 p-5 sm:p-8 bg-primary-light rounded-2xl border border-primary/15 shadow-md flex flex-col items-center justify-center">
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4">Answer</span>
            <p className="text-[15px] sm:text-lg text-center text-text-primary leading-relaxed">{currentCard.back}</p>
          </div>
        </div>
      </div>

      {/* Ask Clawd hint button */}
      {!isFlipped && (
        <div className="mt-3 sm:mt-4 mx-auto max-w-xl flex justify-end">
          {hintUsed.has(currentCard.id) ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-text-muted">
              <svg width="14" height="14" viewBox="0 0 56 56" fill="none" className="flex-shrink-0 opacity-50">
                <circle cx="28" cy="32" r="12" fill="#6B7280" />
                <circle cx="24" cy="30" r="2.5" fill="white" />
                <circle cx="32" cy="30" r="2.5" fill="white" />
                <path d="M24 35 Q28 38 32 35" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
              Hint used
            </span>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHintUsed((prev) => new Set(prev).add(currentCard.id));
                dispatchClawdEvent({ type: "hint-request", text: currentCard.front, hint: currentCard.hint });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium
                text-primary hover:text-primary-hover bg-primary-light hover:bg-primary/10
                rounded-lg transition-all active:scale-95"
            >
              <svg width="14" height="14" viewBox="0 0 56 56" fill="none" className="flex-shrink-0">
                <circle cx="28" cy="32" r="12" fill="#047857" />
                <circle cx="24" cy="30" r="2.5" fill="white" />
                <circle cx="32" cy="30" r="2.5" fill="white" />
                <path d="M24 35 Q28 38 32 35" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
              Ask Clawd for a hint
            </button>
          )}
        </div>
      )}

      {/* Answer scratchpad */}
      <div className="mt-3 sm:mt-4 mx-auto max-w-xl">
        <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider block mb-1.5">
          Draft your answer
        </label>
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          placeholder="Type your answer here before flipping..."
          className="w-full px-4 py-3 text-[15px] sm:text-[15px] leading-relaxed text-text-primary bg-surface-secondary
            rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20
            focus:border-primary placeholder:text-text-muted transition-all resize-none"
          rows={4}
        />
      </div>

      {/* Controls */}
      <div className="mt-4 sm:mt-6">
        <div className="grid grid-cols-2 sm:flex sm:justify-center gap-2 sm:gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleLearning}
            className="min-h-[48px] sm:min-h-0 px-4 sm:px-5 py-2.5 text-[14px] sm:text-[13px] font-medium rounded-lg
              bg-danger-light text-danger border border-danger/20
              hover:bg-danger/10 active:bg-danger/10 transition-all"
          >
            Still learning
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleKnown}
            className="min-h-[48px] sm:min-h-0 px-4 sm:px-5 py-2.5 text-[14px] sm:text-[13px] font-medium rounded-lg
              bg-success-light text-success border border-success/20
              hover:bg-success/10 active:bg-success/10 transition-all"
          >
            Got it
          </motion.button>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handlePrev}
            className="min-h-[44px] px-4 py-2 text-[13px] font-medium bg-surface rounded-lg border border-border
              text-text-secondary hover:bg-surface-secondary active:bg-surface-secondary transition-all"
          >
            Prev
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleShuffle}
            className="min-h-[44px] px-4 py-2 text-[13px] font-medium text-text-muted hover:text-primary active:text-primary transition-colors"
          >
            Shuffle
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            className="min-h-[44px] px-4 py-2 text-[13px] font-medium bg-surface rounded-lg border border-border
              text-text-secondary hover:bg-surface-secondary active:bg-surface-secondary transition-all"
          >
            Next
          </motion.button>
        </div>

        {/* Reset progress link */}
        {knownCount > 0 && (
          <div className="text-center mt-4 pt-3 border-t border-border">
            <button
              onClick={() => setShowResetModal(true)}
              className="text-[12px] text-danger hover:text-red-700 active:text-red-700 transition-colors min-h-[32px]"
            >
              Reset progress
            </button>
          </div>
        )}
      </div>

      <ConfirmModal
        open={showResetModal}
        title="Reset Flashcard Progress"
        message="This will clear all mastered and learning cards. You'll start from scratch."
        confirmLabel="Reset"
        onConfirm={confirmReset}
        onCancel={() => setShowResetModal(false)}
      />
    </motion.div>
  );
}

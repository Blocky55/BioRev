"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Topic } from "@/lib/topics";
import { getQuizResult, saveQuizResult } from "@/lib/progress";

interface QuizProps {
  topic: Topic;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getGrade(percentage: number): { letter: string; message: string; color: string } {
  if (percentage >= 90) return { letter: "A+", message: "Outstanding. You've mastered this topic.", color: "text-success" };
  if (percentage >= 80) return { letter: "A", message: "Excellent work. Nearly perfect.", color: "text-success" };
  if (percentage >= 70) return { letter: "B", message: "Great job. You know this well.", color: "text-primary" };
  if (percentage >= 60) return { letter: "C", message: "Good effort. A bit more revision will help.", color: "text-primary" };
  if (percentage >= 50) return { letter: "D", message: "Getting there. Keep studying.", color: "text-danger" };
  return { letter: "F", message: "Review the notes and try again.", color: "text-danger" };
}

export function Quiz({ topic }: QuizProps) {
  const [questions, setQuestions] = useState(shuffleArray(topic.quiz));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const result = getQuizResult(topic.id);
    setBestScore(result.bestScore);
  }, [topic.id]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        saveQuizResult(topic.id, finalScore, totalQuestions);
        setBestScore((prev) => Math.max(prev, finalScore));
        setIsFinished(true);
      }
    }, 1500);
  }, [selectedAnswer, currentQuestion, currentIndex, totalQuestions, score, topic.id]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isFinished) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4 && currentQuestion) {
        handleAnswer(num - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleAnswer, isFinished, currentQuestion]);

  const handleRetry = () => {
    setQuestions(shuffleArray(topic.quiz));
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = (score / totalQuestions) * 100;
    const grade = getGrade(percentage);

    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="flex flex-col items-center py-12"
      >
        <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z"
              stroke="#047857" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-6">
          Quiz complete
        </h3>

        <div className="bg-surface rounded-2xl border border-border shadow-md p-8 text-center min-w-[300px]">
          <div className={`text-5xl font-bold ${grade.color} mb-3`}>
            {grade.letter}
          </div>
          <p className="text-2xl font-semibold text-text-primary mb-1">
            {score}/{totalQuestions}
          </p>
          <p className="text-sm text-text-secondary mb-6">{grade.message}</p>

          <div className="border-t border-border pt-4">
            <p className="text-[12px] font-medium text-text-muted">
              Personal best: <span className="text-primary">{bestScore}/{totalQuestions}</span>
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRetry}
          className="mt-8 px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg
            hover:bg-primary-hover transition-colors"
        >
          Try again
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Score header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[13px] font-medium text-primary">
          {score}/{currentIndex + (showResult ? 1 : 0)} correct
        </span>
        <span className="text-[13px] text-text-muted">
          Question {currentIndex + 1}/{totalQuestions}
        </span>
        {bestScore > 0 && (
          <span className="text-[12px] font-medium text-text-muted">
            Best: <span className="text-primary">{bestScore}/{totalQuestions}</span>
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="h-2 bg-surface-secondary rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-6 bg-surface rounded-xl border border-border mb-6">
            <p className="text-[16px] text-text-primary leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          {/* Options */}
          <div className="grid gap-3">
            {currentQuestion.options.map((option, i) => {
              let containerClass = "bg-surface border-border hover:border-primary/40 hover:shadow";
              let textClass = "text-text-primary";
              let numberClass = "text-text-muted bg-surface-secondary";

              if (showResult) {
                if (i === currentQuestion.correctIndex) {
                  containerClass = "bg-success-light border-success/30";
                  textClass = "text-success";
                  numberClass = "text-success bg-success-light";
                } else if (i === selectedAnswer && i !== currentQuestion.correctIndex) {
                  containerClass = "bg-danger-light border-danger/30";
                  textClass = "text-danger";
                  numberClass = "text-danger bg-danger-light";
                } else {
                  containerClass = "bg-surface border-border opacity-40";
                }
              }

              return (
                <motion.button
                  key={i}
                  whileHover={!showResult ? { scale: 1.01, x: 2 } : {}}
                  whileTap={!showResult ? { scale: 0.99 } : {}}
                  animate={
                    showResult && i === currentQuestion.correctIndex
                      ? { scale: [1, 1.02, 1] }
                      : showResult && i === selectedAnswer && i !== currentQuestion.correctIndex
                        ? { x: [0, -4, 4, -4, 0] }
                        : {}
                  }
                  onClick={() => handleAnswer(i)}
                  disabled={selectedAnswer !== null}
                  className={`flex items-center gap-4 p-4 border rounded-xl text-left transition-all duration-200 ${containerClass}`}
                >
                  <span className={`text-[12px] font-semibold w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${numberClass}`}>
                    {i + 1}
                  </span>
                  <span className={`text-[14px] ${textClass}`}>{option}</span>
                </motion.button>
              );
            })}
          </div>

          <p className="text-center text-[11px] text-text-muted mt-5">
            Press 1-4 to answer
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

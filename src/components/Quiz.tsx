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
  if (percentage >= 90) return { letter: "A+", message: "Absolutely brilliant! You've mastered this topic!", color: "text-neon-green" };
  if (percentage >= 80) return { letter: "A", message: "Excellent work! Nearly perfect!", color: "text-neon-green" };
  if (percentage >= 70) return { letter: "B", message: "Great job! You know this well.", color: "text-amber" };
  if (percentage >= 60) return { letter: "C", message: "Good effort! A bit more revision will help.", color: "text-amber" };
  if (percentage >= 50) return { letter: "D", message: "You're getting there! Keep studying.", color: "text-hot-pink" };
  return { letter: "F", message: "Don't worry — review the notes and try again!", color: "text-hot-pink" };
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
        <div className="text-6xl mb-4">
          {percentage >= 70 ? "🎉" : percentage >= 50 ? "📚" : "💪"}
        </div>
        <h3 className="font-pixel text-lg text-neon-green mb-2 text-glow-green">
          QUIZ COMPLETE
        </h3>

        <div className="pixel-border p-8 bg-navy-lighter mt-6 text-center min-w-[300px]">
          <div className={`font-pixel text-4xl ${grade.color} mb-4`}>
            {grade.letter}
          </div>
          <p className="text-2xl text-gray-100 mb-2">
            {score}/{totalQuestions}
          </p>
          <p className="text-sm text-gray-400 mb-4">{grade.message}</p>

          <div className="border-t border-neon-green/20 pt-4 mt-4">
            <p className="font-pixel text-[9px] text-amber">
              PERSONAL BEST: {bestScore}/{totalQuestions}
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRetry}
          className="mt-8 font-pixel text-[10px] px-6 py-3 bg-neon-green/20 text-neon-green pixel-border hover:bg-neon-green/30 transition-colors"
        >
          TRY AGAIN
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
      <div className="flex justify-between items-center mb-6">
        <span className="font-pixel text-[10px] text-neon-green">
          {score}/{currentIndex + (showResult ? 1 : 0)} CORRECT
        </span>
        <span className="text-xs text-gray-500">
          Question {currentIndex + 1}/{totalQuestions}
        </span>
        {bestScore > 0 && (
          <span className="font-pixel text-[9px] text-amber">
            BEST: {bestScore}/{totalQuestions}
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="h-2 bg-navy-lighter rounded-full overflow-hidden mb-8 pixel-border-subtle">
        <motion.div
          className="h-full bg-gradient-to-r from-hot-pink to-neon-green"
          animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-6 bg-navy-lighter pixel-border rounded mb-6">
            <p className="text-lg text-gray-100 leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          {/* Options */}
          <div className="grid gap-3">
            {currentQuestion.options.map((option, i) => {
              let bgClass = "bg-navy-lighter border-gray-700 hover:border-neon-green/50 hover:bg-neon-green/5";
              let textClass = "text-gray-200";

              if (showResult) {
                if (i === currentQuestion.correctIndex) {
                  bgClass = "bg-neon-green/20 border-neon-green";
                  textClass = "text-neon-green";
                } else if (i === selectedAnswer && i !== currentQuestion.correctIndex) {
                  bgClass = "bg-hot-pink/20 border-hot-pink";
                  textClass = "text-hot-pink";
                } else {
                  bgClass = "bg-navy-lighter border-gray-800 opacity-50";
                }
              }

              return (
                <motion.button
                  key={i}
                  whileHover={!showResult ? { scale: 1.02, x: 4 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  animate={
                    showResult && i === currentQuestion.correctIndex
                      ? { scale: [1, 1.03, 1] }
                      : showResult && i === selectedAnswer && i !== currentQuestion.correctIndex
                        ? { x: [0, -5, 5, -5, 0] }
                        : {}
                  }
                  onClick={() => handleAnswer(i)}
                  disabled={selectedAnswer !== null}
                  className={`flex items-center gap-4 p-4 border rounded text-left transition-all ${bgClass}`}
                >
                  <span className="font-pixel text-[10px] text-gray-500 w-6">
                    {i + 1}
                  </span>
                  <span className={`text-sm ${textClass}`}>{option}</span>
                </motion.button>
              );
            })}
          </div>

          <p className="text-center text-[10px] text-gray-600 mt-4 font-pixel">
            PRESS 1-4 TO ANSWER
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

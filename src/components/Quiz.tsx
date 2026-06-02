"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Topic, QuizQuestion } from "@/lib/topics";
import {
  getQuizProgress,
  saveQuizRound,
  resetQuizProgress,
  saveQuizSession,
  getQuizSession,
  clearQuizSession,
  QuizProgress,
  QuizQuestionStat,
} from "@/lib/progress";
import { ConfirmModal } from "@/components/ConfirmModal";

interface QuizProps {
  topic: Topic;
}

type QuizMode = "quick" | "weak" | "marathon";
type Phase = "select" | "active" | "review" | "results";

interface AnswerRecord {
  question: QuizQuestion;
  selected: number;
  correct: boolean;
}

const ROUND_SIZE = 10;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getGrade(percentage: number): { letter: string; message: string; color: string } {
  if (percentage >= 90) return { letter: "A+", message: "Outstanding. You've mastered this material.", color: "text-success" };
  if (percentage >= 80) return { letter: "A", message: "Excellent work. Nearly perfect.", color: "text-success" };
  if (percentage >= 70) return { letter: "B", message: "Great job. You know this well.", color: "text-primary" };
  if (percentage >= 60) return { letter: "C", message: "Good effort. A bit more revision will help.", color: "text-primary" };
  if (percentage >= 50) return { letter: "D", message: "Getting there. Keep at it.", color: "text-warning" };
  return { letter: "F", message: "Review the notes and try again.", color: "text-danger" };
}

function selectQuestions(
  pool: QuizQuestion[],
  mode: QuizMode,
  stats: Record<string, QuizQuestionStat>
): QuizQuestion[] {
  if (mode === "marathon") return shuffleArray(pool);

  if (mode === "weak") {
    const seen = pool.filter((q) => stats[q.id] && stats[q.id].asked > 0);
    const sorted = seen.sort((a, b) => {
      const aAcc = stats[a.id].correct / stats[a.id].asked;
      const bAcc = stats[b.id].correct / stats[b.id].asked;
      return aAcc - bAcc;
    });
    const pick = sorted.slice(0, ROUND_SIZE);
    return shuffleArray(pick.length > 0 ? pick : pool.slice(0, ROUND_SIZE));
  }

  const unseen: QuizQuestion[] = [];
  const weak: QuizQuestion[] = [];
  const ok: QuizQuestion[] = [];
  pool.forEach((q) => {
    const s = stats[q.id];
    if (!s || s.asked === 0) unseen.push(q);
    else if (s.correct / s.asked < 0.7) weak.push(q);
    else ok.push(q);
  });
  const ordered = [...shuffleArray(unseen), ...shuffleArray(weak), ...shuffleArray(ok)];
  return ordered.slice(0, ROUND_SIZE);
}

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  return isTouch;
}

export function Quiz({ topic }: QuizProps) {
  const [phase, setPhase] = useState<Phase>("select");
  const [mode, setMode] = useState<QuizMode>("quick");
  const [progress, setProgress] = useState<QuizProgress | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const isTouch = useIsTouchDevice();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  // Load progress + restore active session on mount / topic change
  useEffect(() => {
    // Reset local state for new topic
    setPhase("select");
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setShowResetModal(false);

    const prog = getQuizProgress(topic.id);
    setProgress(prog);

    // Restore active session if one exists (survives page navigation)
    const session = getQuizSession(topic.id);
    if (session) {
      const questionMap = new Map(topic.quiz.map((q) => [q.id, q]));
      const restored = session.questionIds
        .map((id) => questionMap.get(id))
        .filter((q): q is QuizQuestion => !!q);

      if (restored.length === session.questionIds.length) {
        setMode(session.mode as QuizMode);
        setQuestions(restored);
        setCurrentIndex(session.currentIndex);
        setScore(session.score);
        setAnswers(
          session.answers
            .map((a) => {
              const q = questionMap.get(a.questionId);
              return q ? { question: q, selected: a.selected, correct: a.correct } : null;
            })
            .filter((a): a is AnswerRecord => !!a)
        );
        setSelectedAnswer(null);
        setShowResult(false);
        setPhase("active");
      }
    }
  }, [topic.id, topic.quiz]);

  const poolSize = topic.quiz.length;

  const stats = useMemo(() => {
    if (!progress) return { seen: 0, accuracy: 0, weakCount: 0 };
    const qs = progress.questionStats;
    const seen = Object.values(qs).filter((s) => s.asked > 0).length;
    const accuracy =
      progress.totalAnswered > 0
        ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
        : 0;
    const weakCount = Object.values(qs).filter(
      (s) => s.asked > 0 && s.correct / s.asked < 0.7
    ).length;
    return { seen, accuracy, weakCount };
  }, [progress]);

  const startRound = (selectedMode: QuizMode) => {
    if (!progress) return;
    setMode(selectedMode);
    const picked = selectQuestions(topic.quiz, selectedMode, progress.questionStats);
    setQuestions(picked);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setPhase("active");

    // Save initial session
    saveQuizSession({
      topicId: topic.id,
      mode: selectedMode,
      questionIds: picked.map((q) => q.id),
      currentIndex: 0,
      score: 0,
      answers: [],
    });
  };

  const handleAnswer = useCallback(
    (index: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(index);
      setShowResult(true);

      const current = questions[currentIndex];
      const isCorrect = index === current.correctIndex;
      if (isCorrect) setScore((s) => s + 1);

      const newAnswers: AnswerRecord[] = [
        ...answers,
        { question: current, selected: index, correct: isCorrect },
      ];
      setAnswers(newAnswers);

      const newScore = isCorrect ? score + 1 : score;

      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          setSelectedAnswer(null);
          setShowResult(false);

          // Persist session so page navigation doesn't lose progress
          saveQuizSession({
            topicId: topic.id,
            mode,
            questionIds: questions.map((q) => q.id),
            currentIndex: nextIndex,
            score: newScore,
            answers: newAnswers.map((a) => ({
              questionId: a.question.id,
              selected: a.selected,
              correct: a.correct,
            })),
          });
        } else {
          // Round complete — save results and clear session
          clearQuizSession(topic.id);
          const results = newAnswers.map((a) => ({
            id: a.question.id,
            correct: a.correct,
          }));
          saveQuizRound(topic.id, newScore, questions.length, results);
          setProgress(getQuizProgress(topic.id));
          setPhase("results");
        }
      }, 1200);
    },
    [selectedAnswer, questions, currentIndex, score, answers, topic.id, mode]
  );

  // Keyboard shortcuts (desktop only)
  useEffect(() => {
    if (phase !== "active") return;
    const handleKey = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4 && questions[currentIndex]) {
        handleAnswer(num - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleAnswer, phase, currentIndex, questions]);

  // ── Reset handler ──
  const handleResetProgress = () => {
    resetQuizProgress(topic.id);
    setProgress(getQuizProgress(topic.id));
    setPhase("select");
    setQuestions([]);
    setAnswers([]);
    setShowResetModal(false);
  };

  // ─── Mode Selection ───
  if (phase === "select") {
    const modes: { id: QuizMode; label: string; desc: string; disabled?: boolean }[] = [
      {
        id: "quick",
        label: "Quick Round",
        desc: `${Math.min(ROUND_SIZE, poolSize)} questions, weighted toward unseen and weak spots.`,
      },
      {
        id: "weak",
        label: "Weak Spots",
        desc: `Your ${stats.weakCount} lowest-accuracy questions. Requires history.`,
        disabled: stats.seen === 0,
      },
      {
        id: "marathon",
        label: "Marathon",
        desc: `All ${poolSize} questions in one sitting.`,
      },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg font-semibold text-text-primary mb-1">Quiz</h3>
          <p className="text-[13px] sm:text-sm text-text-secondary">
            {poolSize} questions in the pool. Choose a mode to start.
          </p>
        </div>

        {/* Stats bar */}
        {progress && progress.roundsCompleted > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="p-3 bg-surface rounded-xl border border-border">
              <p className="text-lg sm:text-xl font-bold text-text-primary">{progress.roundsCompleted}</p>
              <p className="text-[11px] text-text-muted mt-0.5">Rounds played</p>
            </div>
            <div className="p-3 bg-surface rounded-xl border border-border">
              <p className="text-lg sm:text-xl font-bold text-primary">{stats.accuracy}%</p>
              <p className="text-[11px] text-text-muted mt-0.5">Overall accuracy</p>
            </div>
            <div className="p-3 bg-surface rounded-xl border border-border">
              <p className="text-lg sm:text-xl font-bold text-text-primary">
                {stats.seen}
                <span className="text-text-muted font-normal text-xs sm:text-sm">/{poolSize}</span>
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">Questions seen</p>
            </div>
            <div className="p-3 bg-surface rounded-xl border border-border">
              <p className="text-lg sm:text-xl font-bold text-danger">{stats.weakCount}</p>
              <p className="text-[11px] text-text-muted mt-0.5">Weak spots</p>
            </div>
          </div>
        )}

        {/* Mode cards */}
        <div className="grid gap-3">
          {modes.map((m) => (
            <motion.button
              key={m.id}
              whileTap={!m.disabled ? { scale: 0.99 } : {}}
              onClick={() => !m.disabled && startRound(m.id)}
              disabled={m.disabled}
              className={`p-4 sm:p-5 border rounded-xl text-left transition-all duration-200 min-h-[56px] ${
                m.disabled
                  ? "bg-surface-secondary border-border opacity-50 cursor-not-allowed"
                  : "bg-surface border-border hover:border-primary/40 hover:shadow active:bg-surface-secondary cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-text-primary">{m.label}</p>
                  <p className="text-[12px] sm:text-[13px] text-text-secondary mt-0.5">{m.desc}</p>
                </div>
                {!m.disabled && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-muted flex-shrink-0">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Reset progress (only show if there's history) */}
        {progress && progress.roundsCompleted > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <button
              onClick={() => setShowResetModal(true)}
              className="min-h-[44px] text-[13px] text-danger hover:text-red-700 active:text-red-700 transition-colors"
            >
              Reset quiz progress
            </button>
          </div>
        )}

        <ConfirmModal
          open={showResetModal}
          title="Reset Quiz Progress"
          message="This will clear all quiz history, scores, and badges for this topic. This cannot be undone."
          confirmLabel="Reset"
          onConfirm={handleResetProgress}
          onCancel={() => setShowResetModal(false)}
        />
      </motion.div>
    );
  }

  // ─── Mistake Review ───
  if (phase === "review") {
    const mistakes = answers.filter((a) => !a.correct);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Review mistakes ({mistakes.length})
          </h3>
          <button
            onClick={() => setPhase("results")}
            className="min-h-[44px] flex items-center text-[13px] text-text-muted hover:text-text-primary active:text-text-primary transition-colors"
          >
            Back
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {mistakes.map((a, i) => (
            <div key={i} className="p-4 sm:p-5 bg-surface rounded-xl border border-border">
              <p className="text-[13px] sm:text-[14px] font-medium text-text-primary mb-3">
                {a.question.question}
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-[11px] font-medium text-danger bg-danger-light px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0">
                    Yours
                  </span>
                  <p className="text-[13px] text-danger">{a.question.options[a.selected]}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[11px] font-medium text-success bg-success-light px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0">
                    Correct
                  </span>
                  <p className="text-[13px] text-success">{a.question.options[a.question.correctIndex]}</p>
                </div>
              </div>
            </div>
          ))}
          {mistakes.length === 0 && (
            <p className="text-sm text-text-muted text-center py-8">No mistakes this round. Well done.</p>
          )}
        </div>
      </motion.div>
    );
  }

  // ─── Results ───
  if (phase === "results") {
    const finalScore = answers.filter((a) => a.correct).length;
    const totalQ = answers.length;
    const percentage = totalQ > 0 ? (finalScore / totalQ) * 100 : 0;
    const grade = getGrade(percentage);
    const mistakeCount = totalQ - finalScore;
    const overallAcc =
      progress && progress.totalAnswered > 0
        ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
        : 0;

    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="flex flex-col items-center py-6 sm:py-10"
      >
        <h3 className="text-lg font-semibold text-text-primary mb-5 sm:mb-6">Round complete</h3>

        <div className="bg-surface rounded-2xl border border-border shadow-md p-6 sm:p-8 text-center w-full max-w-sm">
          <div className={`text-4xl sm:text-5xl font-bold ${grade.color} mb-2`}>{grade.letter}</div>
          <p className="text-xl sm:text-2xl font-semibold text-text-primary mb-1">
            {finalScore}/{totalQ}
          </p>
          <p className="text-[13px] sm:text-sm text-text-secondary mb-4 sm:mb-5">{grade.message}</p>

          <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
            <div>
              <p className="text-lg sm:text-xl font-bold text-primary">{overallAcc}%</p>
              <p className="text-[11px] text-text-muted">Overall accuracy</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold text-text-primary">
                {progress?.bestRoundScore ?? 0}/{progress?.bestRoundTotal ?? 0}
              </p>
              <p className="text-[11px] text-text-muted">Personal best</p>
            </div>
          </div>
        </div>

        {/* Answer breakdown */}
        <div className="w-full max-w-sm mt-5 sm:mt-6 space-y-1.5">
          {answers.map((a, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 sm:gap-3 p-2.5 rounded-lg text-[12px] sm:text-[13px] ${
                a.correct ? "bg-success-light text-success" : "bg-danger-light text-danger"
              }`}
            >
              <span className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0">
                {a.correct ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </span>
              <span className="truncate flex-1">{a.question.question}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 w-full max-w-sm sm:max-w-none">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => startRound(mode)}
            className="min-h-[48px] sm:min-h-0 px-5 py-2.5 bg-primary text-white text-[15px] sm:text-sm font-medium rounded-lg hover:bg-primary-hover active:bg-primary-hover transition-colors"
          >
            Another round
          </motion.button>
          {mistakeCount > 0 && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setPhase("review")}
              className="min-h-[48px] sm:min-h-0 px-5 py-2.5 bg-surface text-text-primary text-[15px] sm:text-sm font-medium rounded-lg border border-border hover:bg-surface-secondary active:bg-surface-secondary transition-colors"
            >
              Review mistakes ({mistakeCount})
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setPhase("select")}
            className="min-h-[48px] sm:min-h-0 px-5 py-2.5 text-[15px] sm:text-sm font-medium text-text-muted hover:text-text-primary active:text-text-primary transition-colors"
          >
            Change mode
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // ─── Active Quiz ───
  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;

  const modeLabel = mode === "quick" ? "Quick Round" : mode === "weak" ? "Weak Spots" : "Marathon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <span className="text-[12px] sm:text-[13px] font-medium text-primary">
          {score}/{currentIndex + (showResult ? 1 : 0)} correct
        </span>
        <span className="text-[11px] sm:text-[12px] text-text-muted px-2 py-0.5 bg-surface-secondary rounded">
          {modeLabel}
        </span>
        <button
          onClick={() => {
            clearQuizSession(topic.id);
            setPhase("select");
          }}
          className="text-[12px] sm:text-[13px] text-text-muted hover:text-danger active:text-danger transition-colors min-h-[32px] flex items-center"
        >
          Quit
        </button>
      </div>

      {/* Progress */}
      <div className="h-2 bg-surface-secondary rounded-full overflow-hidden mb-5 sm:mb-8">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
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
          <div className="p-4 sm:p-6 bg-surface rounded-xl border border-border mb-4 sm:mb-6">
            <p className="text-[14px] sm:text-[16px] text-text-primary leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          <div className="grid gap-2.5 sm:gap-3">
            {currentQuestion.options.map((option, i) => {
              let containerClass =
                "bg-surface border-border hover:border-primary/40 hover:shadow active:bg-surface-secondary";
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
                  className={`flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 border rounded-xl text-left
                    transition-all duration-200 min-h-[52px] ${containerClass}`}
                >
                  <span
                    className={`text-[12px] font-semibold w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${numberClass}`}
                  >
                    {i + 1}
                  </span>
                  <span className={`text-[13px] sm:text-[14px] ${textClass}`}>{option}</span>
                </motion.button>
              );
            })}
          </div>

          {!isTouch && (
            <p className="text-center text-[11px] text-text-muted mt-4 sm:mt-5">Press 1-4 to answer</p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

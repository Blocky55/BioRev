"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { topics } from "@/lib/topics";
import { getFlashcardProgress, getQuizResult } from "@/lib/progress";

interface TopicStats {
  flashcardProgress: number;
  quizBest: number;
  quizTotal: number;
  quizzesCompleted: number;
}

const EXAM_DATE = new Date("2026-06-16T09:00:00");

function useCountdown(target: Date): number {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now();
      setDays(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    };
    calc();
    const id = setInterval(calc, 60_000);
    return () => clearInterval(id);
  }, [target]);
  return days;
}

const studyPlan: { days: string; title: string; description: string; color: string; bg: string }[] = [
  {
    days: "Mon – Tue",
    title: "DNA & Stem Cells",
    description: "Fostier's two lectures: potency hierarchy, SNP types, HGP findings, iPSCs & Dolly.",
    color: "text-accent",
    bg: "bg-accent-light",
  },
  {
    days: "Wed – Thu",
    title: "Precision Medicine & Brain",
    description: "Biomarker uses 1–6, HER2/Herceptin, CYP2C19. Four lobes, action potential, MIA & DOHaD.",
    color: "text-success",
    bg: "bg-success-light",
  },
  {
    days: "Fri – Sun",
    title: "Microbes & Conservation",
    description: "5 resistance mechanisms, FMT, STI stats. Extinction vortex, invasive Big Four, 30x30 target.",
    color: "text-danger",
    bg: "bg-danger-light",
  },
];

export default function Home() {
  const [stats, setStats] = useState<Record<string, TopicStats>>({});
  const daysLeft = useCountdown(EXAM_DATE);

  useEffect(() => {
    const s: Record<string, TopicStats> = {};
    topics.forEach((topic) => {
      const fc = getFlashcardProgress(topic.id);
      const quiz = getQuizResult(topic.id);
      s[topic.id] = {
        flashcardProgress: Math.round((fc.known.length / topic.flashcards.length) * 100),
        quizBest: quiz.bestScore,
        quizTotal: topic.quiz.length,
        quizzesCompleted: quiz.completedCount,
      };
    });
    setStats(s);
  }, []);

  const totalFlashcardsKnown = topics.reduce((sum, topic) => {
    const s = stats[topic.id];
    if (!s) return sum;
    return sum + Math.round((s.flashcardProgress / 100) * topic.flashcards.length);
  }, 0);
  const totalFlashcards = topics.reduce((sum, t) => sum + t.flashcards.length, 0);
  const totalQuizzesCompleted = Object.values(stats).reduce((sum, s) => sum + s.quizzesCompleted, 0);
  const topicsStarted = Object.values(stats).filter((s) => s.flashcardProgress > 0 || s.quizzesCompleted > 0).length;

  return (
    <div className="px-6 lg:px-10 py-8 max-w-[1100px] mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-10"
      >
        <span className="inline-block text-[12px] font-medium text-accent bg-accent-light px-3 py-1 rounded-full mb-4">
          UCIL20892 · Biology for Curious Minds
        </span>
        <h1 className="text-3xl lg:text-[42px] font-bold text-text-primary leading-tight tracking-tight mb-3">
          Biology, remembered.
        </h1>
        <p className="text-text-secondary text-base max-w-xl leading-relaxed">
          Six lectures distilled into notes, flashcards, and quizzes — master what actually shows up on the exam.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <a href="#topics" className="px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors">
            Browse topics
          </a>
          <a href="#plan" className="px-5 py-2.5 bg-surface text-text-primary text-sm font-medium rounded-lg border border-border hover:bg-surface-secondary transition-colors">
            Study plan
          </a>
        </div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12"
      >
        <div className="p-4 bg-surface rounded-xl border border-border shadow-figma-sm">
          <p className="text-3xl font-bold text-accent">{daysLeft}</p>
          <p className="text-[12px] text-text-muted mt-1 font-medium">Days until exam</p>
        </div>
        <div className="p-4 bg-surface rounded-xl border border-border shadow-figma-sm">
          <p className="text-3xl font-bold text-text-primary">{topicsStarted}<span className="text-text-muted font-normal text-lg">/{topics.length}</span></p>
          <p className="text-[12px] text-text-muted mt-1 font-medium">Topics started</p>
        </div>
        <div className="p-4 bg-surface rounded-xl border border-border shadow-figma-sm">
          <p className="text-3xl font-bold text-success">{totalFlashcardsKnown}<span className="text-text-muted font-normal text-lg">/{totalFlashcards}</span></p>
          <p className="text-[12px] text-text-muted mt-1 font-medium">Cards mastered</p>
        </div>
        <div className="p-4 bg-surface rounded-xl border border-border shadow-figma-sm">
          <p className="text-3xl font-bold text-text-primary">{totalQuizzesCompleted}</p>
          <p className="text-[12px] text-text-muted mt-1 font-medium">Quizzes done</p>
        </div>
      </motion.div>

      {/* Topics */}
      <div id="topics" className="scroll-mt-20 mb-14">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-text-primary">The syllabus</h2>
          <p className="text-sm text-text-muted mt-0.5">Six topics. One exam. Pick a card to start revising.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic, i) => {
            const topicStats = stats[topic.id];
            const progress = topicStats?.flashcardProgress ?? 0;
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.35 }}
              >
                <Link href={`/topic/${topic.id}`}>
                  <div className="p-5 bg-surface rounded-xl border border-border shadow-figma-sm hover:shadow-figma hover:border-border-strong transition-all duration-200 group h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{topic.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-medium text-text-muted">0{i + 1}</span>
                          {progress === 100 && (
                            <span className="text-[11px] font-medium text-success bg-success-light px-1.5 py-0.5 rounded">Done</span>
                          )}
                        </div>
                        <h3 className="text-[14px] font-semibold text-text-primary group-hover:text-accent transition-colors leading-snug">
                          {topic.name}
                        </h3>
                      </div>
                    </div>

                    {/* Lecturer */}
                    <p className="text-[12px] text-text-muted mb-3">{topic.lecturer}</p>

                    {/* Key topics */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {topic.keyTopics.map((kt) => (
                        <span key={kt} className="text-[11px] text-text-secondary bg-surface-secondary px-2 py-0.5 rounded-md">
                          {kt}
                        </span>
                      ))}
                    </div>

                    {/* Progress */}
                    <div className="mt-auto pt-3 border-t border-border">
                      <div className="flex items-center justify-between text-[12px] mb-1.5">
                        <span className="text-text-muted">{progress}% cards mastered</span>
                        <span className="text-text-muted">
                          best {topicStats ? `${topicStats.quizBest}/${topicStats.quizTotal}` : "—"}
                        </span>
                      </div>
                      <div className="h-1.5 bg-surface-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all duration-700"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Study Plan */}
      <div id="plan" className="scroll-mt-20 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-text-primary mb-1">Study plan</h2>
          <p className="text-sm text-text-muted mb-6">A weekly rotation to cover everything before the exam.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {studyPlan.map((block, i) => (
              <motion.div
                key={block.days}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08, duration: 0.35 }}
                className={`p-5 rounded-xl ${block.bg}`}
              >
                <p className={`text-[12px] font-semibold ${block.color} mb-1`}>{block.days}</p>
                <h4 className="font-semibold text-[15px] text-text-primary mb-2">{block.title}</h4>
                <p className="text-[13px] text-text-secondary leading-relaxed">{block.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 border-t border-border pt-8">
        <p className="text-[13px] text-text-muted">BioRevise · UCIL20892 · 2026</p>
        <p className="text-[13px] text-text-muted mt-1">Good luck out there.</p>
      </div>
    </div>
  );
}

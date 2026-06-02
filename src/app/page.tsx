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

/** Exam date — set to the actual UCIL20892 exam date */
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

const studyPlan: { days: string; title: string; description: string; accent: string }[] = [
  {
    days: "Mon – Tue",
    title: "DNA & Stem Cells",
    description: "Fostier's two lectures: potency hierarchy, SNP types, HGP findings, iPSCs & Dolly.",
    accent: "border-neon-green/50",
  },
  {
    days: "Wed – Thu",
    title: "Precision Medicine & Brain",
    description: "Biomarker uses 1–6, HER2/Herceptin, CYP2C19. Four lobes, action potential, MIA & DOHaD.",
    accent: "border-hot-pink/50",
  },
  {
    days: "Fri – Sun",
    title: "Microbes & Conservation",
    description: "5 resistance mechanisms, FMT, STI stats. Extinction vortex, invasive Big Four, 30x30 target. Past paper practice.",
    accent: "border-amber/50",
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
  const topicsRevised = Object.values(stats).filter((s) => s.flashcardProgress > 0 || s.quizzesCompleted > 0).length;
  const overallProgress = topics.length > 0 ? Math.round((topicsRevised / topics.length) * 100) : 0;

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center mb-8 pt-4"
      >
        <span className="inline-block font-pixel text-[9px] text-gray-500 bg-navy-lighter px-3 py-1 rounded mb-4 border border-gray-700">
          UCIL20892 · Biology for Curious Minds
        </span>
        <div className="scanlines inline-block w-full">
          <h1 className="font-pixel text-2xl lg:text-4xl text-neon-green text-glow-green crt-flicker mb-3">
            BioRevise
          </h1>
        </div>
        <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto">
          Six lectures distilled into notes, flashcards, and quizzes — master what actually shows up on the exam.
        </p>

        {/* Quick action buttons */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href="#topics" className="font-pixel text-[10px] px-5 py-2.5 bg-neon-green/20 text-neon-green border border-neon-green/50 hover:bg-neon-green/30 transition-colors inline-block">
              BROWSE TOPICS
            </a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href="#plan" className="font-pixel text-[10px] px-5 py-2.5 bg-navy-lighter text-gray-300 border border-gray-600 hover:border-neon-green/30 transition-colors inline-block">
              STUDY PLAN
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Countdown + Stats Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
      >
        {/* Exam countdown */}
        <div className="p-4 bg-navy-light border border-hot-pink/30 rounded text-center">
          <p className="font-pixel text-2xl text-hot-pink text-glow-pink">{daysLeft}</p>
          <p className="text-[10px] text-gray-500 mt-1 font-pixel">DAYS LEFT</p>
        </div>
        {/* Overall progress */}
        <div className="p-4 bg-navy-light border border-neon-green/30 rounded text-center">
          <p className="font-pixel text-2xl text-neon-green text-glow-green">{overallProgress}%</p>
          <p className="text-[10px] text-gray-500 mt-1 font-pixel">REVISED</p>
        </div>
        {/* Cards mastered */}
        <div className="p-4 bg-navy-light border border-amber/30 rounded text-center">
          <p className="font-pixel text-lg text-amber">{totalFlashcardsKnown}<span className="text-gray-600">/{totalFlashcards}</span></p>
          <p className="text-[10px] text-gray-500 mt-1 font-pixel">CARDS</p>
        </div>
        {/* Quizzes */}
        <div className="p-4 bg-navy-light border border-gray-700 rounded text-center">
          <p className="font-pixel text-lg text-gray-300">{totalQuizzesCompleted}</p>
          <p className="text-[10px] text-gray-500 mt-1 font-pixel">QUIZZES</p>
        </div>
      </motion.div>

      {/* Topic Grid */}
      <div id="topics" className="scroll-mt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex items-baseline justify-between mb-6"
        >
          <div>
            <h2 className="font-pixel text-xs text-neon-green">THE SYLLABUS</h2>
            <p className="text-xs text-gray-500 mt-1">Six topics. One exam.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {topics.map((topic, i) => {
            const topicStats = stats[topic.id];
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 200, damping: 20 }}
              >
                <Link href={`/topic/${topic.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-5 bg-navy-light border border-neon-green/15 rounded transition-all duration-300 hover:border-neon-green/50 hover:glow-green group h-full flex flex-col"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-pixel text-[10px] text-gray-600">0{i + 1}</span>
                        <span className="text-2xl group-hover:scale-110 transition-transform">{topic.icon}</span>
                      </div>
                      {topicStats && topicStats.flashcardProgress === 100 && (
                        <span className="font-pixel text-[8px] text-neon-green bg-neon-green/10 px-2 py-1 rounded">✓</span>
                      )}
                    </div>

                    {/* Title & lecturer */}
                    <h3 className="font-pixel text-[10px] text-gray-200 group-hover:text-neon-green transition-colors mb-1 leading-relaxed">
                      {topic.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 mb-3">{topic.lecturer}</p>

                    {/* Key topics */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {topic.keyTopics.map((kt) => (
                        <span key={kt} className="text-[10px] text-gray-400 bg-navy px-2 py-0.5 rounded border border-gray-800">
                          {kt}
                        </span>
                      ))}
                    </div>

                    {/* Progress */}
                    <div className="mt-auto space-y-2 text-xs text-gray-500">
                      <div className="h-1 bg-navy rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neon-green/50 transition-all duration-700"
                          style={{ width: `${topicStats?.flashcardProgress ?? 0}%` }}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span>{topicStats ? `${topicStats.flashcardProgress}%` : "0%"} cards</span>
                        <span className="text-amber/70">
                          best {topicStats ? `${topicStats.quizBest}/${topicStats.quizTotal}` : "—"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Study Plan */}
      <div id="plan" className="scroll-mt-20 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          <h2 className="font-pixel text-xs text-amber mb-1">STUDY PLAN</h2>
          <p className="text-xs text-gray-500 mb-6">A weekly rotation to cover everything before the exam.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {studyPlan.map((block, i) => (
              <motion.div
                key={block.days}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                className={`p-5 bg-navy-light rounded border-l-4 ${block.accent}`}
              >
                <p className="font-pixel text-[10px] text-gray-400 mb-2">{block.days}</p>
                <h4 className="font-semibold text-sm text-gray-200 mb-2">{block.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{block.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8">
        <p className="font-pixel text-[8px] text-gray-600">
          BioRevise · UCIL20892 · 2026
        </p>
        <p className="text-xs text-gray-700 mt-1">Good luck out there.</p>
      </div>
    </div>
  );
}

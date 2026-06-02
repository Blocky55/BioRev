"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { topics } from "@/lib/topics";
import { getFlashcardProgress, getQuizResult } from "@/lib/progress";
import { Navbar } from "@/components/Navbar";

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

const TOPIC_COLORS = [
  { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  { bg: "bg-lime-50", text: "text-lime-700", border: "border-lime-200" },
];

const studyPlan: { days: string; title: string; description: string }[] = [
  {
    days: "Mon - Tue",
    title: "DNA & Stem Cells",
    description: "Fostier's two lectures: potency hierarchy, SNP types, HGP findings, iPSCs & Dolly.",
  },
  {
    days: "Wed - Thu",
    title: "Precision Medicine & Brain",
    description: "Biomarker uses 1-6, HER2/Herceptin, CYP2C19. Four lobes, action potential, MIA & DOHaD.",
  },
  {
    days: "Fri - Sun",
    title: "Microbes & Conservation",
    description: "5 resistance mechanisms, FMT, STI stats. Extinction vortex, invasive Big Four, 30x30 target.",
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
    <>
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Hero */}
        <section className="pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-40 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="text-[13px] sm:text-sm font-medium text-primary mb-3 sm:mb-4 tracking-wide">
              UCIL20892 &middot; Biology for Curious Minds
            </p>
            <h1 className="text-[28px] sm:text-4xl lg:text-[56px] font-bold text-text-primary leading-[1.1] tracking-tight mb-4 sm:mb-5">
              Master biology through active recall.
            </h1>
            <p className="text-[15px] sm:text-lg text-text-secondary leading-relaxed mb-6 sm:mb-8 max-w-lg">
              Six lectures distilled into notes, flashcards, and quizzes.
              Everything you need for the exam, nothing you don&apos;t.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#topics"
                className="flex items-center justify-center min-h-[48px] sm:min-h-0 px-6 py-3 bg-primary text-white text-[15px] sm:text-sm font-medium rounded-lg hover:bg-primary-hover active:bg-primary-hover transition-colors"
              >
                Browse topics
              </a>
              <a
                href="#plan"
                className="flex items-center justify-center min-h-[48px] sm:min-h-0 px-6 py-3 bg-surface text-text-primary text-[15px] sm:text-sm font-medium rounded-lg border border-border hover:bg-surface-secondary active:bg-surface-secondary transition-colors"
              >
                Study plan
              </a>
            </div>
          </motion.div>
        </section>

        {/* Stats */}
        <section id="progress" className="scroll-mt-20 sm:scroll-mt-24 pb-14 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            <div className="p-4 sm:p-5 bg-surface rounded-xl border border-border">
              <p className="text-2xl sm:text-3xl font-bold text-primary">{daysLeft}</p>
              <p className="text-[12px] sm:text-[13px] text-text-muted mt-1">Days until exam</p>
            </div>
            <div className="p-4 sm:p-5 bg-surface rounded-xl border border-border">
              <p className="text-2xl sm:text-3xl font-bold text-text-primary">
                {topicsStarted}
                <span className="text-text-muted font-normal text-base sm:text-lg">/{topics.length}</span>
              </p>
              <p className="text-[12px] sm:text-[13px] text-text-muted mt-1">Topics started</p>
            </div>
            <div className="p-4 sm:p-5 bg-surface rounded-xl border border-border">
              <p className="text-2xl sm:text-3xl font-bold text-success">
                {totalFlashcardsKnown}
                <span className="text-text-muted font-normal text-base sm:text-lg">/{totalFlashcards}</span>
              </p>
              <p className="text-[12px] sm:text-[13px] text-text-muted mt-1">Cards mastered</p>
            </div>
            <div className="p-4 sm:p-5 bg-surface rounded-xl border border-border">
              <p className="text-2xl sm:text-3xl font-bold text-text-primary">{totalQuizzesCompleted}</p>
              <p className="text-[12px] sm:text-[13px] text-text-muted mt-1">Quizzes completed</p>
            </div>
          </motion.div>
        </section>

        {/* Topics */}
        <section id="topics" className="scroll-mt-20 sm:scroll-mt-24 pb-16 sm:pb-24">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary">The syllabus</h2>
            <p className="text-[14px] sm:text-base text-text-secondary mt-1">
              Six topics, one exam. Pick a topic to start revising.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {topics.map((topic, i) => {
              const topicStats = stats[topic.id];
              const progress = topicStats?.flashcardProgress ?? 0;
              const color = TOPIC_COLORS[i % TOPIC_COLORS.length];
              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.35 }}
                >
                  <Link href={`/topic/${topic.id}`}>
                    <div className="p-4 sm:p-5 bg-surface rounded-xl border border-border hover:border-primary/30 hover:shadow-md active:shadow transition-all duration-200 group h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg ${color.bg} ${color.border} border flex items-center justify-center flex-shrink-0`}>
                          <span className={`text-[11px] font-bold ${color.text}`}>{topic.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-medium text-text-muted">0{i + 1}</span>
                            {progress === 100 && (
                              <span className="text-[11px] font-medium text-success bg-success-light px-1.5 py-0.5 rounded">
                                Done
                              </span>
                            )}
                          </div>
                          <h3 className="text-[14px] font-semibold text-text-primary group-hover:text-primary transition-colors leading-snug">
                            {topic.name}
                          </h3>
                        </div>
                      </div>

                      {/* Lecturer */}
                      <p className="text-[12px] text-text-muted mb-3">{topic.lecturer}</p>

                      {/* Key topics — hide on very small phones to save space, show on sm+ */}
                      <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                        {topic.keyTopics.map((kt) => (
                          <span key={kt} className="text-[11px] text-text-secondary bg-surface-secondary px-2 py-0.5 rounded-md">
                            {kt}
                          </span>
                        ))}
                      </div>
                      {/* On mobile, show only first 3 key topics */}
                      <div className="flex sm:hidden flex-wrap gap-1.5 mb-4">
                        {topic.keyTopics.slice(0, 3).map((kt) => (
                          <span key={kt} className="text-[11px] text-text-secondary bg-surface-secondary px-2 py-0.5 rounded-md">
                            {kt}
                          </span>
                        ))}
                        {topic.keyTopics.length > 3 && (
                          <span className="text-[11px] text-text-muted px-1">
                            +{topic.keyTopics.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Progress */}
                      <div className="mt-auto pt-3 border-t border-border">
                        <div className="flex items-center justify-between text-[11px] sm:text-[12px] mb-1.5">
                          <span className="text-text-muted">{progress}% cards mastered</span>
                          <span className="text-text-muted">
                            best {topicStats ? `${topicStats.quizBest}/${topicStats.quizTotal}` : "--"}
                          </span>
                        </div>
                        <div className="h-1.5 bg-surface-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-700"
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
        </section>

        {/* Study Plan */}
        <section id="plan" className="scroll-mt-20 sm:scroll-mt-24 pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">Study plan</h2>
            <p className="text-[14px] sm:text-base text-text-secondary mb-6 sm:mb-8">
              A weekly rotation to cover everything before the exam.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {studyPlan.map((block, i) => {
                const colors = [
                  "bg-primary-light border-primary/10",
                  "bg-emerald-50 border-emerald-200/60",
                  "bg-teal-50 border-teal-200/60",
                ];
                const dayColors = [
                  "text-primary",
                  "text-emerald-700",
                  "text-teal-700",
                ];
                return (
                  <motion.div
                    key={block.days}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.35 }}
                    className={`p-5 sm:p-6 rounded-xl border ${colors[i]}`}
                  >
                    <p className={`text-[12px] font-semibold ${dayColors[i]} mb-1`}>
                      {block.days}
                    </p>
                    <h4 className="font-semibold text-[15px] text-text-primary mb-2">
                      {block.title}
                    </h4>
                    <p className="text-[13px] text-text-secondary leading-relaxed">
                      {block.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 sm:py-10 safe-bottom">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">B</span>
              </div>
              <span className="text-[13px] sm:text-sm text-text-muted">
                BioRevise &middot; UCIL20892 &middot; 2026
              </span>
            </div>
            <p className="text-[13px] sm:text-sm text-text-muted">
              University of Manchester
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

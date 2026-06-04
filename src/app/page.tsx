"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { topics } from "@/lib/topics";
import {
  getFlashcardProgress,
  getStartedTopics,
  getTopicBadge,
  startTopic,
  stopTopic,
  BadgeLevel,
} from "@/lib/progress";
import { BadgeIcon } from "@/components/Badge";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Navbar } from "@/components/Navbar";

interface TopicStats {
  flashcardKnown: number;
  flashcardTotal: number;
  flashcardPercent: number;
  badge: BadgeLevel | null;
  isStarted: boolean;
}

const TOPIC_COLORS = [
  { bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  { bg: "bg-teal-50 dark:bg-teal-950/40", text: "text-teal-700 dark:text-teal-400", border: "border-teal-200 dark:border-teal-800" },
  { bg: "bg-cyan-50 dark:bg-cyan-950/40", text: "text-cyan-700 dark:text-cyan-400", border: "border-cyan-200 dark:border-cyan-800" },
  { bg: "bg-sky-50 dark:bg-sky-950/40", text: "text-sky-700 dark:text-sky-400", border: "border-sky-200 dark:border-sky-800" },
  { bg: "bg-violet-50 dark:bg-violet-950/40", text: "text-violet-700 dark:text-violet-400", border: "border-violet-200 dark:border-violet-800" },
  { bg: "bg-lime-50 dark:bg-lime-950/40", text: "text-lime-700 dark:text-lime-400", border: "border-lime-200 dark:border-lime-800" },
];

const studyPlan: { days: string; title: string; description: string }[] = [
  {
    days: "Mon - Tue",
    title: "DNA & Human Genome Project",
    description:
      "Chromosomes, replication, mutations, SNPs, GWAS, Human Genome Project findings.",
  },
  {
    days: "Wed",
    title: "Development & Stem Cells",
    description:
      "Potency hierarchy, iPSCs, cloning, differentiation, and ethical considerations.",
  },
  {
    days: "Thu - Fri",
    title: "Precision Medicine",
    description:
      "Biomarker uses, HER2/Herceptin, pharmacogenomics, companion diagnostics.",
  },
  {
    days: "Sat",
    title: "The Human Brain",
    description:
      "Brain lobes, action potentials, developmental origins, neurotransmission.",
  },
  {
    days: "Sun - Mon",
    title: "Microbes & Infectious Disease",
    description:
      "Resistance mechanisms, FMT, STI trends, Koch's postulates, epidemiology.",
  },
  {
    days: "Tue",
    title: "Conservation Biology",
    description:
      "Extinction vortex, invasive species, conservation targets, biodiversity metrics.",
  },
];

export default function Home() {
  const [topicStats, setTopicStats] = useState<Record<string, TopicStats>>({});
  const [confirmStopId, setConfirmStopId] = useState<string | null>(null);

  const refreshStats = useCallback(() => {
    const started = getStartedTopics();
    const s: Record<string, TopicStats> = {};
    topics.forEach((topic) => {
      const fc = getFlashcardProgress(topic.id);
      s[topic.id] = {
        flashcardKnown: fc.known.length,
        flashcardTotal: topic.flashcards.length,
        flashcardPercent:
          topic.flashcards.length > 0
            ? Math.round((fc.known.length / topic.flashcards.length) * 100)
            : 0,
        badge: getTopicBadge(topic.id),
        isStarted: started.includes(topic.id),
      };
    });
    setTopicStats(s);
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  const handleStart = (topicId: string) => {
    startTopic(topicId);
    refreshStats();
  };

  const handleConfirmStop = () => {
    if (!confirmStopId) return;
    stopTopic(confirmStopId);
    setConfirmStopId(null);
    refreshStats();
  };

  // Derived global stats
  const startedCount = Object.values(topicStats).filter((s) => s.isStarted).length;
  const totalFlashcardsKnown = Object.values(topicStats).reduce(
    (sum, s) => sum + s.flashcardKnown,
    0
  );
  const totalFlashcards = topics.reduce((sum, t) => sum + t.flashcards.length, 0);
  const badgesEarned = Object.values(topicStats).filter((s) => s.badge !== null).length;

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
              Active Recall &middot; Spaced Repetition
            </p>
            <h1 className="text-[28px] sm:text-4xl lg:text-[56px] font-bold text-text-primary leading-[1.1] tracking-tight mb-4 sm:mb-5">
              Master biology through active recall.
            </h1>
            <p className="text-[15px] sm:text-lg text-text-secondary leading-relaxed mb-6 sm:mb-8 max-w-lg">
              Six topics distilled into notes, flashcards, and quizzes.
              Everything you need to master biology.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#topics"
                className="flex items-center justify-center min-h-[48px] sm:min-h-0 px-6 py-3 bg-primary text-white text-[15px] sm:text-sm font-medium rounded-lg hover:bg-primary-hover active:bg-primary-hover transition-colors bio-btn"
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

        {/* Stats — 3 cards */}
        <section id="progress" className="scroll-mt-20 sm:scroll-mt-24 pb-14 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="grid grid-cols-3 gap-3 sm:gap-4"
          >
            <div className="p-4 sm:p-5 bg-surface rounded-xl border border-border">
              <p className="text-2xl sm:text-3xl font-bold text-text-primary">
                {startedCount}
                <span className="text-text-muted font-normal text-base sm:text-lg">
                  /{topics.length}
                </span>
              </p>
              <p className="text-[12px] sm:text-[13px] text-text-muted mt-1">Topics started</p>
            </div>
            <div className="p-4 sm:p-5 bg-surface rounded-xl border border-border">
              <p className="text-2xl sm:text-3xl font-bold text-success">
                {totalFlashcardsKnown}
                <span className="text-text-muted font-normal text-base sm:text-lg">
                  /{totalFlashcards}
                </span>
              </p>
              <p className="text-[12px] sm:text-[13px] text-text-muted mt-1">Cards mastered</p>
            </div>
            <div className="p-4 sm:p-5 bg-surface rounded-xl border border-border">
              <p className="text-2xl sm:text-3xl font-bold text-warning">{badgesEarned}</p>
              <p className="text-[12px] sm:text-[13px] text-text-muted mt-1">Badges earned</p>
            </div>
          </motion.div>
        </section>

        {/* Topics */}
        <section id="topics" className="scroll-mt-20 sm:scroll-mt-24 pb-16 sm:pb-24">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Topics</h2>
            <p className="text-[14px] sm:text-base text-text-secondary mt-1">
              Six topics to master. Pick one to start revising.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {topics.map((topic, i) => {
              const ts = topicStats[topic.id];
              const isStarted = ts?.isStarted ?? false;
              const progress = ts?.flashcardPercent ?? 0;
              const badge = ts?.badge ?? null;
              const color = TOPIC_COLORS[i % TOPIC_COLORS.length];
              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.35 }}
                >
                  <div className="bg-surface rounded-xl border border-border hover:border-primary/30 transition-all duration-200 h-full flex flex-col bio-card">
                    {/* Clickable content area */}
                    <Link
                      href={`/topic/${topic.id}`}
                      className="flex-1 p-4 sm:p-5 group"
                    >
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${color.bg} ${color.border} border flex items-center justify-center flex-shrink-0`}
                        >
                          <span className={`text-[11px] font-bold ${color.text}`}>
                            {topic.icon}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-medium text-text-muted">
                              0{i + 1}
                            </span>
                            {badge && <BadgeIcon level={badge} size="sm" />}
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

                      {/* Key topics — hide on very small phones, show on sm+ */}
                      <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                        {topic.keyTopics.map((kt) => (
                          <span
                            key={kt}
                            className="text-[11px] text-text-secondary bg-surface-secondary px-2 py-0.5 rounded-md"
                          >
                            {kt}
                          </span>
                        ))}
                      </div>
                      {/* On mobile, show only first 3 key topics */}
                      <div className="flex sm:hidden flex-wrap gap-1.5 mb-4">
                        {topic.keyTopics.slice(0, 3).map((kt) => (
                          <span
                            key={kt}
                            className="text-[11px] text-text-secondary bg-surface-secondary px-2 py-0.5 rounded-md"
                          >
                            {kt}
                          </span>
                        ))}
                        {topic.keyTopics.length > 3 && (
                          <span className="text-[11px] text-text-muted px-1">
                            +{topic.keyTopics.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Progress — only shown if started */}
                      {isStarted && (
                        <div className="pt-3 border-t border-border">
                          <div className="flex items-center justify-between text-[11px] sm:text-[12px] mb-1.5">
                            <span className="text-text-muted">
                              {progress}% cards mastered
                            </span>
                          </div>
                          <div className="h-1.5 bg-surface-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all duration-700"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </Link>

                    {/* Footer with Start/Stop — outside Link */}
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                      {isStarted ? (
                        <button
                          onClick={() => setConfirmStopId(topic.id)}
                          className="w-full min-h-[40px] text-[12px] font-medium text-danger hover:text-red-700
                            border border-danger/20 rounded-lg hover:bg-danger-light active:bg-danger-light transition-colors"
                        >
                          Stop studying
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStart(topic.id)}
                          className="w-full min-h-[40px] text-[13px] font-medium text-primary
                            border border-primary/20 rounded-lg hover:bg-primary-light active:bg-primary-light transition-colors"
                        >
                          Start studying
                        </button>
                      )}
                    </div>
                  </div>
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
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">
              Study plan
            </h2>
            <p className="text-[14px] sm:text-base text-text-secondary mb-6 sm:mb-8">
              A two-week rotation. Odd topics get 2 days, even topics get 1 day.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {studyPlan.map((block, i) => {
                const colors = [
                  "bg-primary-light border-primary/10",
                  "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-800/60",
                  "bg-teal-50 dark:bg-teal-950/40 border-teal-200/60 dark:border-teal-800/60",
                  "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200/60 dark:border-cyan-800/60",
                  "bg-sky-50 dark:bg-sky-950/40 border-sky-200/60 dark:border-sky-800/60",
                  "bg-violet-50 dark:bg-violet-950/40 border-violet-200/60 dark:border-violet-800/60",
                ];
                const dayColors = [
                  "text-primary",
                  "text-emerald-700 dark:text-emerald-400",
                  "text-teal-700 dark:text-teal-400",
                  "text-cyan-700 dark:text-cyan-400",
                  "text-sky-700 dark:text-sky-400",
                  "text-violet-700 dark:text-violet-400",
                ];
                // Odd topics (1,3,5) get 2 days, even topics (2,4,6) get 1 day
                const isDualDay = i % 2 === 0; // index 0,2,4 = topics 1,3,5
                return (
                  <motion.div
                    key={block.days}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.06, duration: 0.35 }}
                    className={`p-5 sm:p-6 rounded-xl border bio-card ${colors[i]}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-[12px] font-semibold ${dayColors[i]}`}>
                        {block.days}
                      </p>
                      {isDualDay && (
                        <span className="text-[10px] font-medium text-text-muted bg-surface-secondary px-1.5 py-0.5 rounded">
                          2 days
                        </span>
                      )}
                    </div>
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

        {/* Manga panel */}
        <section className="pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="rounded-2xl overflow-hidden border border-border shadow-md"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/manga-panel.jpg"
              alt="Manga panel"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-10 safe-bottom">
          <div className="bio-divider mb-8 sm:mb-10" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">B</span>
              </div>
              <span className="text-[13px] sm:text-sm text-text-muted">
                BioRevise &middot; 2026
              </span>
            </div>
            <p className="text-[13px] sm:text-sm text-text-muted">Made by AL</p>
          </div>
        </footer>
      </div>

      {/* Stop studying confirmation modal */}
      <ConfirmModal
        open={!!confirmStopId}
        title="Stop Studying"
        message="This will remove the topic from your active list and reset all flashcard and quiz progress. Your notes will be preserved."
        confirmLabel="Stop"
        onConfirm={handleConfirmStop}
        onCancel={() => setConfirmStopId(null)}
      />
    </>
  );
}

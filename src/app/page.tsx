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

export default function Home() {
  const [stats, setStats] = useState<Record<string, TopicStats>>({});

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

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center mb-12 pt-8"
      >
        <div className="scanlines inline-block">
          <h1 className="font-pixel text-2xl lg:text-4xl text-neon-green text-glow-green crt-flicker mb-4">
            BioRevise
          </h1>
        </div>
        <p className="text-gray-400 text-sm mt-4 max-w-md mx-auto">
          Your retro-pixel biology revision companion. Master all 6 topics through notes, flashcards, and quizzes.
        </p>
        <p className="font-pixel text-[9px] text-gray-600 mt-2">
          UCIL20892 — BIOLOGY FOR CURIOUS MINDS
        </p>
      </motion.div>

      {/* Topic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {topics.map((topic, i) => {
          const topicStats = stats[topic.id];
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
            >
              <Link href={`/topic/${topic.id}`}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-6 bg-navy-light border border-neon-green/20 rounded transition-all duration-300 hover:border-neon-green/50 hover:glow-green group h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {topic.icon}
                    </span>
                    {topicStats && topicStats.flashcardProgress === 100 && (
                      <span className="font-pixel text-[9px] text-neon-green bg-neon-green/10 px-2 py-1 rounded">
                        ✓ DONE
                      </span>
                    )}
                  </div>

                  <h3 className="font-pixel text-[10px] text-gray-200 group-hover:text-neon-green transition-colors mb-3 leading-relaxed">
                    {topic.name}
                  </h3>

                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Flashcards</span>
                      <span className="text-neon-green/70">
                        {topicStats ? `${topicStats.flashcardProgress}%` : "0%"}
                      </span>
                    </div>
                    <div className="h-1 bg-navy rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neon-green/50 transition-all duration-700"
                        style={{ width: `${topicStats?.flashcardProgress ?? 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between">
                      <span>Quiz best</span>
                      <span className="text-amber/70">
                        {topicStats ? `${topicStats.quizBest}/${topicStats.quizTotal}` : "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cards</span>
                      <span className="text-gray-400">{topic.flashcards.length}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Global Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="pixel-border p-6 bg-navy-light"
      >
        <h3 className="font-pixel text-[10px] text-amber mb-4">GLOBAL STATS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="font-pixel text-lg text-neon-green text-glow-green">
              {totalFlashcardsKnown}/{totalFlashcards}
            </p>
            <p className="text-xs text-gray-500 mt-1">Cards Mastered</p>
          </div>
          <div className="text-center">
            <p className="font-pixel text-lg text-hot-pink text-glow-pink">
              {totalQuizzesCompleted}
            </p>
            <p className="text-xs text-gray-500 mt-1">Quizzes Completed</p>
          </div>
          <div className="text-center">
            <p className="font-pixel text-lg text-amber">
              {topics.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Topics Available</p>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="text-center mt-8 pb-8">
        <p className="font-pixel text-[8px] text-gray-700">
          BUILT FOR REVISION • NOT AFFILIATED WITH UOM
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { topics } from "@/lib/topics";
import { Notes } from "@/components/Notes";
import { Flashcard } from "@/components/Flashcard";
import { Quiz } from "@/components/Quiz";
import { BackToTop } from "@/components/BackToTop";

type TabType = "notes" | "flashcards" | "quiz";

const TOPIC_COLORS = [
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-teal-100 text-teal-700 border-teal-200",
  "bg-cyan-100 text-cyan-700 border-cyan-200",
  "bg-sky-100 text-sky-700 border-sky-200",
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-lime-100 text-lime-700 border-lime-200",
];

export default function TopicPage() {
  const params = useParams();
  const topicId = params.id as string;
  const topicIndex = topics.findIndex((t) => t.id === topicId);
  const topic = topicIndex >= 0 ? topics[topicIndex] : undefined;
  const [activeTab, setActiveTab] = useState<TabType>("notes");

  if (!topic) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-text-muted text-sm">Topic not found</p>
      </div>
    );
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: "notes", label: "Notes" },
    { id: "flashcards", label: "Flashcards" },
    { id: "quiz", label: "Quiz" },
  ];

  const colorClass = TOPIC_COLORS[topicIndex % TOPIC_COLORS.length];

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-[860px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-5 sm:mb-6"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center ${colorClass}`}>
            <span className="text-[10px] sm:text-[11px] font-bold">{topic.icon}</span>
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary leading-tight truncate">
              {topic.name}
            </h2>
            <p className="text-[12px] sm:text-[13px] text-text-muted">{topic.lecturer}</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs — full-width on mobile, fit on desktop */}
      <div className="sticky top-14 lg:top-0 z-30 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0 py-2 bg-surface/95 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none mb-6 sm:mb-8">
        <div className="flex gap-1 bg-surface-secondary rounded-lg p-1 w-full sm:w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 sm:flex-none text-[14px] sm:text-[13px] font-medium
                min-h-[44px] sm:min-h-0 px-4 sm:px-5 py-2.5 sm:py-2
                rounded-md transition-all duration-150
                ${activeTab === tab.id
                  ? "bg-surface text-text-primary shadow-sm"
                  : "text-text-muted hover:text-text-secondary active:bg-surface/50"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content — all tabs stay mounted to preserve state (quiz progress, flashcard position) */}
      <div className={activeTab === "notes" ? "" : "hidden"}>
        <Notes topic={topic} />
      </div>
      <div className={activeTab === "flashcards" ? "" : "hidden"}>
        <Flashcard topic={topic} />
      </div>
      <div className={activeTab === "quiz" ? "" : "hidden"}>
        <Quiz topic={topic} />
      </div>

      <BackToTop />
    </div>
  );
}

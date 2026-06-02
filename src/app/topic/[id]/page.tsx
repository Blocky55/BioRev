"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { topics } from "@/lib/topics";
import { Notes } from "@/components/Notes";
import { Flashcard } from "@/components/Flashcard";
import { Quiz } from "@/components/Quiz";
import { BackToTop } from "@/components/BackToTop";

type TabType = "notes" | "flashcards" | "quiz";

export default function TopicPage() {
  const params = useParams();
  const topicId = params.id as string;
  const topic = topics.find((t) => t.id === topicId);
  const [activeTab, setActiveTab] = useState<TabType>("notes");

  if (!topic) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-text-muted text-sm">Topic not found</p>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: "notes", label: "Notes", icon: "📝" },
    { id: "flashcards", label: "Flashcards", icon: "🃏" },
    { id: "quiz", label: "Quiz", icon: "⚡" },
  ];

  return (
    <div className="px-6 lg:px-10 py-8 max-w-[860px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">{topic.icon}</span>
          <div>
            <h2 className="text-xl font-semibold text-text-primary leading-tight">
              {topic.name}
            </h2>
            <p className="text-[13px] text-text-muted">{topic.lecturer}</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-surface-secondary rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-[13px] font-medium px-4 py-2 rounded-md transition-all duration-150 flex items-center gap-1.5
              ${activeTab === tab.id
                ? "bg-surface text-text-primary shadow-figma-sm"
                : "text-text-muted hover:text-text-secondary"
              }`}
          >
            <span className="text-sm">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "notes" && <Notes topic={topic} />}
          {activeTab === "flashcards" && <Flashcard topic={topic} />}
          {activeTab === "quiz" && <Quiz topic={topic} />}
        </motion.div>
      </AnimatePresence>

      <BackToTop />
    </div>
  );
}

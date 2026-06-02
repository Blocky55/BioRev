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
        <p className="font-pixel text-hot-pink text-sm">TOPIC NOT FOUND</p>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: "notes", label: "NOTES", icon: "📝" },
    { id: "flashcards", label: "CARDS", icon: "🃏" },
    { id: "quiz", label: "QUIZ", icon: "⚡" },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{topic.icon}</span>
          <h2 className="font-pixel text-neon-green text-xs lg:text-sm text-glow-green">
            {topic.name}
          </h2>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`font-pixel text-[10px] px-4 py-2 transition-all duration-200 flex items-center gap-2
              ${activeTab === tab.id
                ? "bg-neon-green/20 text-neon-green border border-neon-green/50 glow-green"
                : "bg-navy-lighter text-gray-400 border border-gray-700 hover:border-neon-green/30 hover:text-gray-200"
              }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
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

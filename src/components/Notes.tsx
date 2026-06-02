"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Topic } from "@/lib/topics";
import { getStickyNotes, saveStickyNotes } from "@/lib/progress";

interface NotesProps {
  topic: Topic;
}

export function Notes({ topic }: NotesProps) {
  const [userNotes, setUserNotes] = useState("");
  const [showToast, setShowToast] = useState(false);
  const MAX_CHARS = 2000;

  useEffect(() => {
    setUserNotes(getStickyNotes(topic.id));
  }, [topic.id]);

  const handleSave = useCallback((value: string) => {
    saveStickyNotes(topic.id, value);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, [topic.id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (userNotes) handleSave(userNotes);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [userNotes, handleSave]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-8"
    >
      {/* Topic Notes */}
      <div>
        <h3 className="font-pixel text-neon-green text-xs mb-4">TOPIC NOTES</h3>
        <div className="space-y-3">
          {topic.notes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 30 }}
              className="p-4 bg-navy-lighter rounded border border-neon-green/10 hover:border-neon-green/30 transition-colors"
            >
              <p
                className="text-sm text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: note
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-neon-green font-semibold">$1</strong>')
                    .replace(/—/g, '<span class="text-hot-pink"> — </span>')
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Personal Notes */}
      <div className="relative">
        <h3 className="font-pixel text-amber text-xs mb-4">YOUR NOTES</h3>
        <div className="pixel-border-amber p-1 rounded">
          <textarea
            value={userNotes}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                setUserNotes(e.target.value);
              }
            }}
            placeholder="Type your personal notes here... They auto-save!"
            className="w-full h-40 bg-navy-light p-4 text-sm text-gray-200 rounded resize-none
              focus:outline-none focus:ring-1 focus:ring-amber/50 placeholder:text-gray-600"
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">
            {userNotes.length}/{MAX_CHARS}
          </span>
          <AnimatePresence>
            {showToast && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-pixel text-[10px] text-neon-green toast-animate"
              >
                ✓ SAVED!
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Topic } from "@/lib/topics";
import { getStickyNotes, saveStickyNotes } from "@/lib/progress";

interface NotesProps {
  topic: Topic;
}

/**
 * Render markdown-lite note strings into HTML.
 * Handles **bold** with primary-coloured strong tags.
 * Only colourises the FIRST em-dash in a note (the title separator).
 */
function renderNote(note: string): string {
  let html = note.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>');
  html = html.replace(/—/, '<span class="text-text-muted font-normal"> — </span>');
  return html;
}

export function Notes({ topic }: NotesProps) {
  const [userNotes, setUserNotes] = useState("");
  const [showToast, setShowToast] = useState(false);
  const hasLoadedRef = useRef(false);
  const MAX_CHARS = 2000;

  useEffect(() => {
    hasLoadedRef.current = false;
    setUserNotes(getStickyNotes(topic.id));
    requestAnimationFrame(() => { hasLoadedRef.current = true; });
  }, [topic.id]);

  const handleSave = useCallback((value: string) => {
    saveStickyNotes(topic.id, value);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, [topic.id]);

  useEffect(() => {
    if (!hasLoadedRef.current) return;
    const timeout = setTimeout(() => {
      handleSave(userNotes);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [userNotes, handleSave]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-10"
    >
      {/* Topic Notes */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-primary rounded-full" />
          <h3 className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
            Topic Notes
          </h3>
        </div>
        <div className="space-y-2.5">
          {topic.notes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.025, type: "spring", stiffness: 300, damping: 30 }}
              className="p-4 bg-surface rounded-xl border border-border
                hover:border-border-strong transition-all duration-200"
            >
              <p
                className="text-[14px] text-text-primary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderNote(note) }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Personal Notes */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-warning rounded-full" />
          <h3 className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
            Your Notes
          </h3>
        </div>
        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <textarea
            value={userNotes}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                setUserNotes(e.target.value);
              }
            }}
            placeholder="Type your personal notes here... They auto-save."
            className="w-full h-40 p-4 text-[14px] text-text-primary bg-transparent rounded-xl resize-none
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
              placeholder:text-text-muted transition-all duration-200"
          />
        </div>
        <div className="flex justify-between items-center mt-2 px-1">
          <span className="text-[12px] text-text-muted">
            {userNotes.length}/{MAX_CHARS}
          </span>
          <AnimatePresence>
            {showToast && (
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-[12px] font-medium text-success flex items-center gap-1"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 7L6 9.5L10.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Saved
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

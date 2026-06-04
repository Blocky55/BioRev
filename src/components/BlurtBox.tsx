"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getStickyNotes, saveStickyNotes } from "@/lib/progress";

interface BlurtBoxProps {
  topicId: string;
  topicName: string;
}

const MAX_CHARS = 2000;
const MIN_HEIGHT = 120;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export function BlurtBox({ topicId, topicName }: BlurtBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const isMobile = useIsMobile();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasLoadedRef = useRef(false);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load notes when topic changes
  useEffect(() => {
    hasLoadedRef.current = false;
    setNotes(getStickyNotes(topicId));
    requestAnimationFrame(() => {
      hasLoadedRef.current = true;
    });
  }, [topicId]);

  // Sync from Notes tab when it saves
  useEffect(() => {
    const handler = (e: CustomEvent<{ topicId: string; source: string }>) => {
      if (e.detail.topicId === topicId && e.detail.source === "notes") {
        setNotes(getStickyNotes(topicId));
      }
    };
    window.addEventListener("notes-updated", handler as EventListener);
    return () => window.removeEventListener("notes-updated", handler as EventListener);
  }, [topicId]);

  // Auto-focus textarea when panel opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      // Small delay so the animation can start first
      const t = setTimeout(() => textareaRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Auto-save with debounce + notify other components
  const handleSave = useCallback(
    (value: string) => {
      saveStickyNotes(topicId, value);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      // Let the Notes tab know we updated
      window.dispatchEvent(new CustomEvent("notes-updated", { detail: { topicId, source: "blurtbox" } }));
    },
    [topicId]
  );

  useEffect(() => {
    if (!hasLoadedRef.current) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => handleSave(notes), 800);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [notes, handleSave]);

  // Auto-resize textarea
  const autoResize = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const maxH = window.innerHeight * 0.45;
    const newH = Math.max(MIN_HEIGHT, Math.min(ta.scrollHeight, maxH));
    ta.style.height = `${newH}px`;
  }, []);

  useEffect(() => {
    autoResize();
  }, [notes, autoResize, isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (!isOpen) return;
    const mq = window.matchMedia("(max-width: 767px)");
    if (mq.matches) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* ── Floating trigger button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="fixed z-40 bottom-5 right-5 flex items-center gap-2
              px-4 py-2.5 bg-warning text-white
              rounded-full shadow-lg hover:shadow-xl
              text-[13px] font-semibold
              hover:bg-yellow-600 active:scale-95
              transition-all duration-150"
            aria-label="Open Blurt Box"
          >
            {/* Pencil icon */}
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 3.5L12.5 6.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            Blurt Box
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-black/25 backdrop-blur-[2px] z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="blurt-panel"
            initial={isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
            animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
            exit={isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed z-50 bg-surface shadow-xl flex flex-col
              inset-x-0 bottom-0 top-auto max-h-[80vh] rounded-t-2xl border-t border-border
              md:inset-y-0 md:right-0 md:left-auto md:top-0 md:bottom-0
              md:w-[380px] md:max-h-none md:rounded-t-none md:border-t-0 md:border-l"
          >
            {/* Drag handle — mobile only */}
            <div className="md:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border-strong" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-warning/15 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-warning"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-[14px] font-semibold text-text-primary leading-tight">
                    Blurt Box
                  </h3>
                  <p className="text-[11px] text-text-muted truncate">{topicName}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg
                  text-text-muted hover:text-text-primary hover:bg-surface-secondary
                  transition-colors flex-shrink-0"
                aria-label="Close Blurt Box"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col overflow-hidden px-5 py-4">
              <p className="text-[11px] text-text-muted mb-2">
                Jot down anything — key terms, connections, questions. It auto-saves.
              </p>
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={notes}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_CHARS) {
                      setNotes(e.target.value);
                    }
                  }}
                  placeholder="Start typing your thoughts..."
                  className="w-full text-[14px] text-text-primary bg-surface-secondary
                    rounded-xl border border-border p-4 resize-none
                    focus:outline-none focus:ring-2 focus:ring-warning/25
                    focus:border-warning/40
                    placeholder:text-text-muted transition-all duration-200"
                  style={{ minHeight: `${MIN_HEIGHT}px` }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-border flex-shrink-0">
              <span className="text-[11px] text-text-muted">
                {notes.length}/{MAX_CHARS}
              </span>
              <AnimatePresence mode="wait">
                {saved ? (
                  <motion.span
                    key="saved"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-[12px] font-medium text-success flex items-center gap-1"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Saved
                  </motion.span>
                ) : (
                  <motion.span
                    key="auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[11px] text-text-muted"
                  >
                    Auto-saves
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

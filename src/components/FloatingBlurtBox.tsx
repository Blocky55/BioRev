"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getStickyNotes, saveStickyNotes } from "@/lib/progress";

interface FloatingBlurtBoxProps {
  topicId: string;
  topicName: string;
  open: boolean;
  onClose: () => void;
}

const MIN_HEIGHT = 160;
const MAX_HEIGHT_VH = 0.4; // 40vh
const DEFAULT_HEIGHT = 200;

export function FloatingBlurtBox({
  topicId,
  topicName,
  open,
  onClose,
}: FloatingBlurtBoxProps) {
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasLoadedRef = useRef(false);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ y: 0, h: 0 });

  // Load notes
  useEffect(() => {
    hasLoadedRef.current = false;
    setNotes(getStickyNotes(topicId));
    requestAnimationFrame(() => {
      hasLoadedRef.current = true;
    });
  }, [topicId]);

  // Sync from Notes tab
  useEffect(() => {
    const handler = (e: CustomEvent<{ topicId: string; source: string }>) => {
      if (e.detail.topicId === topicId && e.detail.source === "notes") {
        setNotes(getStickyNotes(topicId));
      }
    };
    window.addEventListener("notes-updated", handler as EventListener);
    return () =>
      window.removeEventListener("notes-updated", handler as EventListener);
  }, [topicId]);

  // Auto-focus when opened
  useEffect(() => {
    if (open && textareaRef.current) {
      const t = setTimeout(() => textareaRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Save with debounce
  const handleSave = useCallback(
    (value: string) => {
      saveStickyNotes(topicId, value);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      window.dispatchEvent(
        new CustomEvent("notes-updated", {
          detail: { topicId, source: "blurtbox" },
        })
      );
    },
    [topicId]
  );

  useEffect(() => {
    if (!hasLoadedRef.current) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      // Preserve scroll position during save
      const ta = textareaRef.current;
      const scrollTop = ta?.scrollTop ?? 0;
      handleSave(notes);
      if (ta) requestAnimationFrame(() => { ta.scrollTop = scrollTop; });
    }, 10000);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [notes, handleSave]);

  // Save on close
  const handleClose = useCallback(() => {
    if (hasLoadedRef.current) {
      saveStickyNotes(topicId, notes);
      window.dispatchEvent(
        new CustomEvent("notes-updated", {
          detail: { topicId, source: "blurtbox" },
        })
      );
    }
    onClose();
  }, [topicId, notes, onClose]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, handleClose]);

  // ── Drag-to-resize ──
  const handleDragStart = useCallback(
    (clientY: number) => {
      isDraggingRef.current = true;
      dragStartRef.current = { y: clientY, h: height };
      document.body.style.cursor = "ns-resize";
      document.body.style.userSelect = "none";
    },
    [height]
  );

  useEffect(() => {
    if (!open) return;

    const handleMove = (clientY: number) => {
      if (!isDraggingRef.current) return;
      const delta = dragStartRef.current.y - clientY; // dragging up = positive
      const maxH = window.innerHeight * MAX_HEIGHT_VH;
      const newH = Math.max(MIN_HEIGHT, Math.min(dragStartRef.current.h + delta, maxH));
      setHeight(newH);
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientY);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientY);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.97 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: [0, -0.8, 0.6, -0.3, 0],
          }}
          exit={{ y: 40, opacity: 0, scale: 0.97 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 22,
            rotate: { duration: 0.5, ease: "easeOut" },
          }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:left-[260px]"
        >
          <div
            className="mx-3 sm:mx-6 lg:mx-10 mb-3 sm:mb-4 rounded-2xl overflow-hidden
              bg-surface border border-border shadow-lg
              flex flex-col"
            style={{ height: `${height}px` }}
          >
            {/* Drag handle — top edge */}
            <div
              onMouseDown={(e) => handleDragStart(e.clientY)}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
              className="flex items-center justify-center h-5 cursor-ns-resize
                group hover:bg-surface-secondary transition-colors flex-shrink-0"
            >
              <div className="w-8 h-1 rounded-full bg-border-strong group-hover:bg-primary/40 transition-colors" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-2 flex-shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-warning flex-shrink-0"
                >
                  <path
                    d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[13px] font-semibold text-text-primary">
                  Quick Blurt
                </span>
                <span className="text-[11px] text-text-muted truncate hidden sm:inline">
                  {topicName}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Save indicator */}
                <AnimatePresence mode="wait">
                  {saved && (
                    <motion.span
                      key="saved"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-[11px] font-medium text-success flex items-center gap-0.5"
                    >
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
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
                  )}
                </AnimatePresence>

                {/* Char count */}
                <span className="text-[10px] text-text-muted tabular-nums">
                  {notes.length} chars
                </span>

                {/* Close */}
                <button
                  onClick={handleClose}
                  className="w-6 h-6 flex items-center justify-center rounded-md
                    text-text-muted hover:text-text-primary hover:bg-surface-secondary
                    transition-colors"
                  aria-label="Close Quick Blurt"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3.5 3.5l7 7M10.5 3.5l-7 7"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Textarea */}
            <div className="flex-1 px-4 pb-3 overflow-hidden">
              <textarea
                ref={textareaRef}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={() => {
                  if (hasLoadedRef.current) handleSave(notes);
                }}
                placeholder="Blurt your thoughts here... key terms, connections, anything."
                className="w-full h-full text-[14px] leading-relaxed text-text-primary
                  bg-surface-secondary rounded-xl border border-border
                  p-3.5 resize-none
                  focus:outline-none focus:ring-2 focus:ring-warning/20
                  focus:border-warning/30
                  placeholder:text-text-muted transition-shadow duration-200"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { topics } from "@/lib/topics";
import {
  getUserProfile,
  saveUserProfile,
  getStartedTopics,
  getFlashcardProgress,
  getTopicBadge,
  exportAllProgress,
  validateProgressExport,
  importProgress,
  ProgressExport,
} from "@/lib/progress";
import { BadgeIcon, BADGE_STYLES } from "@/components/Badge";
import { ConfirmModal } from "@/components/ConfirmModal";

export function ProfilePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");
  const [importError, setImportError] = useState("");
  const [pendingImport, setPendingImport] = useState<ProgressExport | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Listen for toggle event dispatched from Navbar / Sidebar
  useEffect(() => {
    const handler = () => setIsOpen((o) => !o);
    window.addEventListener("toggle-profile", handler);
    return () => window.removeEventListener("toggle-profile", handler);
  }, []);

  // Load profile when panel opens
  useEffect(() => {
    if (isOpen) {
      setName(getUserProfile().name);
    }
  }, [isOpen]);

  // Save name with debounce
  useEffect(() => {
    if (!isOpen) return;
    const timeout = setTimeout(() => {
      saveUserProfile({ name });
    }, 500);
    return () => clearTimeout(timeout);
  }, [name, isOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Compute stats (refreshed each time panel opens)
  const stats = useMemo(() => {
    if (!isOpen) return null;
    const startedTopics = getStartedTopics();
    const totalFlashcards = topics.reduce((sum, t) => sum + t.flashcards.length, 0);
    const totalMastered = topics.reduce((sum, topic) => {
      return sum + getFlashcardProgress(topic.id).known.length;
    }, 0);

    const badges: { topicName: string; level: "gold" | "silver" | "bronze" }[] = [];
    topics.forEach((topic) => {
      const badge = getTopicBadge(topic.id);
      if (badge) badges.push({ topicName: topic.name, level: badge });
    });

    return { startedTopics, totalFlashcards, totalMastered, badges };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── Export handler ──
  const handleExport = useCallback(() => {
    const data = exportAllProgress();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `biorev-progress-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  // ── Import handler ──
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (!validateProgressExport(parsed)) {
            setImportStatus("error");
            setImportError("Invalid file format. Please use a BioRevise export file.");
            return;
          }
          setPendingImport(parsed as ProgressExport);
        } catch {
          setImportStatus("error");
          setImportError("Could not read file. Make sure it's a valid JSON file.");
        }
      };
      reader.readAsText(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    []
  );

  const confirmImport = useCallback(() => {
    if (!pendingImport) return;
    importProgress(pendingImport);
    setPendingImport(null);
    setImportStatus("success");
    setTimeout(() => window.location.reload(), 1500);
  }, [pendingImport]);

  // Clear status message after 4s
  useEffect(() => {
    if (importStatus !== "idle") {
      const timeout = setTimeout(() => {
        setImportStatus("idle");
        setImportError("");
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [importStatus]);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/25 backdrop-blur-sm z-[60]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-[300px] sm:w-[340px] bg-surface border-l border-border z-[70]
          flex flex-col overflow-y-auto transition-transform duration-200 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-[15px] font-semibold text-text-primary">Profile</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 flex items-center justify-center text-text-muted
              hover:text-text-primary rounded-lg active:bg-surface-secondary transition-colors"
            aria-label="Close profile"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {stats && (
          <div className="flex-1 px-5 py-5 space-y-6">
            {/* Name */}
            <div>
              <label className="text-[12px] font-medium text-text-muted uppercase tracking-wide block mb-2">
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2.5 text-[14px] text-text-primary bg-surface-secondary
                  rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20
                  focus:border-primary placeholder:text-text-muted transition-all"
                maxLength={50}
              />
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-[12px] font-medium text-text-muted uppercase tracking-wide mb-3">
                Progress
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-surface-secondary rounded-xl">
                  <p className="text-lg font-bold text-text-primary">
                    {stats.startedTopics.length}
                    <span className="text-text-muted font-normal text-sm">/{topics.length}</span>
                  </p>
                  <p className="text-[11px] text-text-muted mt-0.5">Topics started</p>
                </div>
                <div className="p-3 bg-surface-secondary rounded-xl">
                  <p className="text-lg font-bold text-primary">
                    {stats.totalMastered}
                    <span className="text-text-muted font-normal text-sm">/{stats.totalFlashcards}</span>
                  </p>
                  <p className="text-[11px] text-text-muted mt-0.5">Cards mastered</p>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-[12px] font-medium text-text-muted uppercase tracking-wide mb-3">
                Quiz Badges
              </h3>
              {stats.badges.length > 0 ? (
                <div className="space-y-2">
                  {stats.badges.map((b) => (
                    <div
                      key={b.topicName}
                      className="flex items-center gap-3 p-2.5 bg-surface-secondary rounded-lg"
                    >
                      <BadgeIcon level={b.level} size="md" />
                      <div>
                        <p className="text-[13px] font-medium text-text-primary">{b.topicName}</p>
                        <p className="text-[11px] text-text-muted">{BADGE_STYLES[b.level].label} badge</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-text-muted py-2">
                  Score 60%+ on a quiz to earn your first badge.
                </p>
              )}
            </div>

            {/* Export / Import */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-[12px] font-medium text-text-muted uppercase tracking-wide">
                  Data
                </h3>
                {/* Help tooltip */}
                <div className="group relative">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-text-muted cursor-help"
                  >
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                    <path
                      d="M7 6v3.5M7 4.5v.01"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div
                    className="hidden group-hover:block absolute bottom-full left-0 mb-1.5 p-2.5
                      bg-text-primary text-white text-[11px] leading-relaxed rounded-lg shadow-lg w-52 z-10"
                  >
                    Use Export/Import to sync BioRevise across devices (phone + laptop). Progress is
                    saved locally in your browser.
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleExport}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5
                    bg-surface text-text-primary text-[13px] font-medium rounded-lg border border-border
                    hover:bg-surface-secondary active:bg-surface-secondary transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 2v7M4 6l3 3 3-3M2.5 10.5v1h9v-1"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Export Progress
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5
                    bg-surface text-text-primary text-[13px] font-medium rounded-lg border border-border
                    hover:bg-surface-secondary active:bg-surface-secondary transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 9V2M4 5l3-3 3 3M2.5 10.5v1h9v-1"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Import Progress
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Status messages */}
              <AnimatePresence>
                {importStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[12px] text-success mt-2 flex items-center gap-1"
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
                    Imported successfully! Refreshing...
                  </motion.p>
                )}
                {importStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[12px] text-danger mt-2"
                  >
                    {importError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border">
          <p className="text-[11px] text-text-muted">Made by AL</p>
        </div>
      </aside>

      {/* Import confirmation modal */}
      <ConfirmModal
        open={!!pendingImport}
        title="Import Progress"
        message="This will overwrite all your current progress with the imported data. This cannot be undone."
        confirmLabel="Import"
        confirmVariant="danger"
        onConfirm={confirmImport}
        onCancel={() => setPendingImport(null)}
      />
    </>
  );
}

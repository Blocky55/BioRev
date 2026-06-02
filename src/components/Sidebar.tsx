"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { topics } from "@/lib/topics";
import { getFlashcardProgress } from "@/lib/progress";

const TOPIC_COLORS = [
  "bg-emerald-100 text-emerald-700",
  "bg-teal-100 text-teal-700",
  "bg-cyan-100 text-cyan-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
  "bg-lime-100 text-lime-700",
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const map: Record<string, number> = {};
    topics.forEach((topic) => {
      const progress = getFlashcardProgress(topic.id);
      const total = topic.flashcards.length;
      map[topic.id] = total > 0 ? Math.round((progress.known.length / total) * 100) : 0;
    });
    setProgressMap(map);
  }, [pathname]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const navItems = topics.map((topic, i) => ({
    id: topic.id,
    name: topic.name,
    icon: topic.icon,
    href: `/topic/${topic.id}`,
    progress: progressMap[topic.id] ?? 0,
    index: i,
  }));

  return (
    <>
      {/* Mobile hamburger — 44px touch target */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-3 left-3 z-50
            flex items-center justify-center w-11 h-11
            bg-surface rounded-xl shadow-md border border-border
            active:bg-surface-secondary transition-colors"
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/25 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] sm:w-[260px] bg-surface border-r border-border z-50 flex flex-col overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-200 ease-out`}
      >
        {/* Header with logo + close button */}
        <div className="px-4 sm:px-5 py-4 sm:py-5 border-b border-border flex items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 min-h-[44px]">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <div>
              <h1 className="font-semibold text-text-primary text-[15px] leading-tight">BioRevise</h1>
              <p className="text-[11px] text-text-muted leading-tight">UCIL20892</p>
            </div>
          </Link>

          {/* Close button — visible on mobile only */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden flex items-center justify-center w-9 h-9
              text-text-muted hover:text-text-primary rounded-lg
              active:bg-surface-secondary transition-colors"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 sm:px-3 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const colorClass = TOPIC_COLORS[item.index % TOPIC_COLORS.length];
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 sm:py-2.5 rounded-lg transition-all duration-150 group
                  ${isActive
                    ? "bg-primary-light text-primary"
                    : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary active:bg-surface-secondary"
                  }`}
              >
                <div className={`w-8 h-8 sm:w-7 sm:h-7 rounded-md flex items-center justify-center flex-shrink-0 text-[9px] font-bold ${
                  isActive ? "bg-primary text-white" : colorClass
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-[14px] sm:text-[13px] font-medium block truncate ${isActive ? "text-primary" : ""}`}>
                    {item.name}
                  </span>
                </div>
                {/* Progress circle */}
                <div className="relative w-7 h-7 sm:w-6 sm:h-6 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#E5E7EB" strokeWidth="2" />
                    <circle
                      cx="12" cy="12" r="10" fill="none"
                      stroke={isActive ? "#047857" : "#16A34A"}
                      strokeWidth="2"
                      strokeDasharray={`${(item.progress / 100) * 62.83} 62.83`}
                      strokeLinecap="round"
                    />
                  </svg>
                  {item.progress === 100 && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 sm:px-5 py-4 border-t border-border safe-bottom">
          <p className="text-[11px] text-text-muted">Biology for Curious Minds</p>
          <p className="text-[11px] text-text-muted">University of Manchester</p>
        </div>
      </aside>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { topics } from "@/lib/topics";
import { getFlashcardProgress } from "@/lib/progress";

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

  const navItems = topics.map((topic, i) => ({
    id: topic.id,
    name: topic.name,
    icon: topic.icon,
    href: `/topic/${topic.id}`,
    progress: progressMap[topic.id] ?? 0,
    index: i + 1,
  }));

  return (
    <>
      {/* Mobile hamburger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-3 left-4 z-50 p-2 bg-surface rounded-lg shadow-figma border border-border"
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round"/>
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
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[260px] bg-surface border-r border-border z-50 flex flex-col overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-200 ease-out`}
      >
        {/* Logo */}
        <Link href="/" onClick={() => setIsOpen(false)} className="block px-5 py-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <div>
              <h1 className="font-semibold text-text-primary text-[15px] leading-tight">BioRevise</h1>
              <p className="text-[11px] text-text-muted leading-tight">UCIL20892</p>
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group
                  ${isActive
                    ? "bg-accent-light text-accent"
                    : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                  }`}
              >
                <span className="text-base">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className={`text-[13px] font-medium block truncate
                    ${isActive ? "text-accent" : ""}`}>
                    {item.name}
                  </span>
                </div>
                {/* Progress circle */}
                <div className="relative w-6 h-6 flex-shrink-0">
                  <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#E5E5E5" strokeWidth="2" />
                    <circle
                      cx="12" cy="12" r="10" fill="none"
                      stroke={isActive ? "#7B61FF" : "#14AE5C"}
                      strokeWidth="2"
                      strokeDasharray={`${(item.progress / 100) * 62.83} 62.83`}
                      strokeLinecap="round"
                    />
                  </svg>
                  {item.progress === 100 && (
                    <span className="absolute inset-0 flex items-center justify-center text-[8px]">✓</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border">
          <p className="text-[11px] text-text-muted">Biology for Curious Minds</p>
          <p className="text-[11px] text-text-muted">University of Manchester</p>
        </div>
      </aside>
    </>
  );
}

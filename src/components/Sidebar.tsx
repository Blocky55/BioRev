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

  const navItems = topics.map((topic) => ({
    id: topic.id,
    name: topic.name,
    icon: topic.icon,
    href: `/topic/${topic.id}`,
    progress: progressMap[topic.id] ?? 0,
  }));

  return (
    <>
      {/* Mobile hamburger — hidden when sidebar is open */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-3 left-4 z-50 p-2 pixel-border bg-navy-light"
          aria-label="Open menu"
        >
          <span className="font-pixel text-neon-green text-xs">☰</span>
        </button>
      )}

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/70 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-navy-light border-r-2 border-neon-green/30 z-50 flex flex-col overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-out`}
      >
            {/* Logo */}
            <Link href="/" className="block p-6 border-b border-neon-green/20">
              <h1 className="font-pixel text-neon-green text-sm text-glow-green crt-flicker">
                BioRevise
              </h1>
              <p className="text-[10px] text-gray-500 mt-2 font-pixel">
                UCIL20892
              </p>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block p-3 rounded transition-all duration-200 group relative
                      ${isActive
                        ? "bg-neon-green/10 border border-neon-green/50"
                        : "hover:bg-neon-green/5 border border-transparent hover:border-neon-green/20"
                      }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className={`text-xs font-medium leading-tight block
                          ${isActive ? "text-neon-green" : "text-gray-300 group-hover:text-neon-green"}`}>
                          {item.name}
                        </span>
                        {/* Progress bar */}
                        <div className="mt-2 h-1 bg-navy rounded-full overflow-hidden">
                          <div
                            className="h-full bg-neon-green/60 transition-all duration-500"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    {item.progress === 100 && (
                      <span className="absolute top-2 right-2 text-[10px]">✓</span>
                    )}
                  </Link>
                );
              })}
            </nav>

        {/* Footer */}
        <div className="p-4 border-t border-neon-green/20">
          <p className="font-pixel text-[8px] text-gray-600 text-center">
            Biology for Curious Minds
          </p>
        </div>
      </aside>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getStreakData, getUserProfile } from "@/lib/progress";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [streak, setStreak] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Read theme, streak, profile on mount
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setStreak(getStreakData().currentStreak);
    setUserName(getUserProfile().name);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("biorevise-theme", next ? "dark" : "light");
    setIsDark(next);
  };

  const navLinks = [
    { label: "Topics", href: "#topics" },
    { label: "Study Plan", href: "#plan" },
    { label: "Progress", href: "#progress" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top bio-nav-accent ${
        scrolled || mobileOpen
          ? "bg-surface/95 backdrop-blur-md border-b border-border shadow-sm scrolled"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-14 sm:h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 min-h-[44px]">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-semibold text-text-primary text-[15px]">
            BioRevise
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2">
          {/* Username greeting */}
          {userName && (
            <span className="text-[13px] text-text-secondary hidden lg:inline mr-1">
              Hey, {userName}
            </span>
          )}

          {/* Streak */}
          {streak > 0 && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-lg"
              title={`${streak}-day study streak`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1C7 1 3 5.5 3 8.5C3 10.71 4.79 12.5 7 12.5C9.21 12.5 11 10.71 11 8.5C11 5.5 7 1 7 1Z"
                  fill="currentColor"
                  className="text-warning"
                />
              </svg>
              <span className="text-[13px] font-semibold text-warning">
                {streak}
              </span>
            </div>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-secondary transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3" />
                <path
                  d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.06 1.06M11.54 11.54l1.06 1.06M3.4 12.6l1.06-1.06M11.54 4.46l1.06-1.06"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.5 9.5a5.5 5.5 0 01-7-7A5.5 5.5 0 1013.5 9.5z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* Profile */}
          <button
            onClick={() =>
              window.dispatchEvent(new Event("toggle-profile"))
            }
            className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-secondary transition-colors"
            aria-label="Open profile"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>

          {/* CTA */}
          <a
            href="#topics"
            className="ml-1 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors bio-btn"
          >
            Start learning
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-1.5 text-text-secondary hover:text-text-primary rounded-lg active:bg-surface-secondary transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {mobileOpen ? (
              <path d="M6 6l10 10M16 6L6 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top-14 bg-black/20 backdrop-blur-[2px] z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden relative z-50 bg-surface border-b border-border px-4 sm:px-6 pb-5 pt-1 shadow-lg"
            >
              {/* Streak */}
              {streak > 0 && (
                <div className="flex items-center gap-2 px-2 min-h-[44px] mb-1">
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1C7 1 3 5.5 3 8.5C3 10.71 4.79 12.5 7 12.5C9.21 12.5 11 10.71 11 8.5C11 5.5 7 1 7 1Z"
                      fill="currentColor"
                      className="text-warning"
                    />
                  </svg>
                  <span className="text-[15px] font-semibold text-warning">
                    {streak}-day streak
                  </span>
                </div>
              )}

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center min-h-[48px] px-2 text-[15px] text-text-secondary
                    hover:text-text-primary active:bg-surface-secondary rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center min-h-[48px] px-2 gap-2.5 text-[15px] text-text-secondary
                  hover:text-text-primary active:bg-surface-secondary rounded-lg transition-colors w-full"
              >
                {isDark ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3" />
                    <path
                      d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.06 1.06M11.54 11.54l1.06 1.06M3.4 12.6l1.06-1.06M11.54 4.46l1.06-1.06"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13.5 9.5a5.5 5.5 0 01-7-7A5.5 5.5 0 1013.5 9.5z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {isDark ? "Light mode" : "Dark mode"}
              </button>

              {/* Profile */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  window.dispatchEvent(new Event("toggle-profile"));
                }}
                className="flex items-center min-h-[48px] px-2 gap-2.5 text-[15px] text-text-secondary
                  hover:text-text-primary active:bg-surface-secondary rounded-lg transition-colors w-full"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Profile
              </button>

              <a
                href="#topics"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center mt-3 min-h-[48px] px-4
                  bg-primary text-white text-[15px] font-medium rounded-lg
                  hover:bg-primary-hover active:bg-primary-hover transition-colors bio-btn"
              >
                Start learning
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

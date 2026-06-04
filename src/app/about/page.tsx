"use client";

import { motion } from "framer-motion";

/*
 * ============================================================
 *  ABOUT PAGE — Edit your copy below
 *  Each section is clearly labelled so you can change text,
 *  links, or the profile picture URL without touching layout.
 * ============================================================
 */

// ── Profile picture ──
// Replace this URL with your own image (hosted anywhere).
// Recommended: square image, at least 200x200px.
const PROFILE_IMAGE_URL = "/profile-placeholder.svg";

export default function AboutPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-[700px] mx-auto">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 sm:mb-10"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary leading-tight">
          About BioRevise
        </h1>
      </motion.div>

      <div className="space-y-5 sm:space-y-6">
        {/* ─────────────────────────────────────────────
         *  SECTION 1: About BioRevise + Profile Picture
         * ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
          className="p-5 sm:p-6 bg-surface rounded-xl border border-border bio-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-primary rounded-full" />
            <h2 className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
              About BioRevise
            </h2>
          </div>

          {/* Profile picture + intro */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* ── Profile image ──
             *  Change PROFILE_IMAGE_URL at the top of this file
             *  to swap the placeholder for your own photo. */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-border overflow-hidden bg-surface-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PROFILE_IMAGE_URL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* ── About copy (EDIT HERE) ── */}
            <div className="space-y-3 text-[14px] text-text-primary leading-relaxed">
              <p>
                Ohayou youkoso. Welcome to my site.
              </p>
              <p>
                I created this site for fun and to revise my upcoming exam (i know, its overkill) but why not. I&apos;m also planning on expanding it beyond whatever this is but we&apos;ll see if I&apos;m lazy or not.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────
         *  SECTION 2: Meet Clawdy
         * ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="p-5 sm:p-6 bg-surface rounded-xl border border-border bio-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-primary rounded-full" />
            <h2 className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
              Meet Clawdy!
            </h2>
          </div>

          <div className="flex items-start gap-4">
            {/* Clawd mini icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="32" r="14" fill="#047857" />
                <circle cx="23" cy="29" r="3" fill="white" />
                <circle cx="33" cy="29" r="3" fill="white" />
                <circle cx="24" cy="28" r="1.5" fill="#111827" />
                <circle cx="34" cy="28" r="1.5" fill="#111827" />
                <path d="M23 36 Q28 40 33 36" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            {/* ── Clawdy copy (EDIT HERE) ── */}
            <p className="text-[14px] text-text-primary leading-relaxed">
              He&apos;ll help you throughout your revision if you don&apos;t mind. Bro&apos;s a little weird but he means well.
            </p>
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────
         *  SECTION 3: Behind the Scenes
         * ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          className="p-5 sm:p-6 bg-surface rounded-xl border border-border bio-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-primary rounded-full" />
            <h2 className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
              Behind the Scenes
            </h2>
          </div>

          {/* ── BTS copy (EDIT HERE) ── */}
          <div className="space-y-3 text-[14px] text-text-primary leading-relaxed">
            <p>
              This app was built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Everything is stored locally in your browser so your notes and progress stay private.
            </p>
            <p>
              Started this as a small personal project and it slowly grew from there.
            </p>
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"].map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium text-text-secondary bg-surface-secondary px-2.5 py-1 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────
         *  SECTION 4: Acknowledgments
         * ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="p-5 sm:p-6 bg-surface rounded-xl border border-border bio-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-primary rounded-full" />
            <h2 className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
              Acknowledgments
            </h2>
          </div>

          {/* ── Acknowledgments copy (EDIT HERE) ── */}
          <p className="text-[14px] text-text-primary leading-relaxed">
            Big thanks to Dr Maggy Fostier and the other lecturers (of whom I didn&apos;t attend their lectures lol).
          </p>
        </motion.div>

        {/* ─────────────────────────────────────────────
         *  SECTION 5: Links
         * ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          className="p-5 sm:p-6 bg-surface rounded-xl border border-border bio-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-primary rounded-full" />
            <h2 className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
              Links
            </h2>
          </div>

          {/* ── Links (EDIT HERE) ── */}
          <div className="space-y-3">
            <a
              href="https://github.com/Blocky55/BioRev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-[14px] text-primary hover:text-primary-hover transition-colors group"
            >
              {/* GitHub icon */}
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="flex-shrink-0">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span className="group-hover:underline underline-offset-2">GitHub Repository</span>
            </a>

            <p className="text-[13px] text-text-secondary leading-relaxed">
              Found a bug? Have content suggestions? Let me know (pls don&apos;t).
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

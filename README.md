# BioRevise

An interactive biology revision web app built for UCIL exam prep. Covers six core topics with flashcards, quizzes, lecture notes, and progress tracking — all running locally in the browser with no account required.

## Topics

1. **DNA & Human Genome Project** — chromosomes, replication, mutations, SNPs, GWAS
2. **Development & Stem Cells** — potency, iPSCs, cloning, differentiation
3. **Precision Medicine** — biomarkers, pharmacogenomics, HER2/Herceptin
4. **The Human Brain** — lobes, action potentials, developmental origins
5. **Microbes & Infectious Disease** — resistance mechanisms, FMT, STI trends
6. **Conservation Biology** — extinction vortex, invasive species, conservation targets

## Features

### Study Tools

- **Flashcards** — 87 cards across all topics with flip animations and a built-in answer scratchpad for self-testing
- **Quizzes** — 183 multiple-choice questions with three modes: study all, retry missed, or random selection
- **Lecture Notes** — structured key topics and summaries for each topic

### Clawd — Your Study Companion

Clawd is an animated mascot that lives in the bottom-right corner of the screen. He reacts to your progress and provides contextual help:

- **Tailored hints** — every single flashcard and quiz question has its own unique hint derived from the learning material. Click "Ask Clawd" for a nudge in the right direction (limited to one hint per card to encourage active recall)
- **Mood-based animations** — 6 moods (idle, thinking, happy, sad, excited, sleeping) with distinct SVG expressions and Framer Motion animations
- **Reactive behaviour** — celebrates correct answers, commiserates wrong ones, and cheers streak milestones
- **Speech bubble** — styled with a triangular SVG tail and spring entrance animation

### Progress & Motivation

- **Progress tracking** — per-topic completion percentages stored in localStorage
- **Badges** — bronze, silver, and gold badges earned by mastering flashcards and quizzes
- **Study streaks** — daily streak counter with milestones at 7, 14, 30, 60, and 100 days
- **Toast notifications** — non-blocking alerts for achievements, streak milestones, and actions
- **Profile panel** — view stats, current and longest streaks, earned badges, and export/import progress as JSON

### Theming & Layout

- **Dark mode** — system-aware toggle with FOUC prevention; uses CSS custom properties in RGB channel format for opacity modifier support
- **Responsive design** — fully optimised for mobile, tablet, and desktop with touch-friendly controls
- **Persistent tab state** — Notes, Flashcards, and Quiz tabs all stay mounted so you never lose your place

## Tech Stack

- [Next.js](https://nextjs.org) 14 (App Router)
- [React](https://react.dev) 18
- [TypeScript](https://www.typescriptlang.org) 5
- [Tailwind CSS](https://tailwindcss.com) 3
- [Framer Motion](https://www.framer.com/motion/) 12 for animations
- localStorage for all persistent data (no backend)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start revising.

## Project Structure

```
src/
  app/
    layout.tsx            # Root layout — dark mode script, font loading
    page.tsx              # Home — topic grid, exam countdown, study plan
    topic/[id]/page.tsx   # Topic page — notes, flashcards, quiz tabs
  components/
    Clawd.tsx             # Animated mascot with mood system and hint delivery
    Flashcard.tsx         # Flashcard viewer with flip, scratchpad, and hints
    Quiz.tsx              # Quiz engine with modes, scoring, and hints
    Notes.tsx             # Lecture notes renderer
    Navbar.tsx            # Top navigation bar with dark mode toggle
    Sidebar.tsx           # Collapsible topic list sidebar
    ProfilePanel.tsx      # Stats, streaks, badges, export/import
    Badge.tsx             # Badge display component
    Toast.tsx             # Toast notification system (React Context)
    ConfirmModal.tsx      # Reusable confirmation dialog
    BackToTop.tsx         # Scroll-to-top button
    LayoutShell.tsx       # Wraps app in ToastProvider, renders Sidebar/Profile/Clawd
  lib/
    topics.ts             # All topic data — 87 flashcards, 183 questions, notes, hints
    progress.ts           # localStorage helpers for progress, streaks, and stats
```

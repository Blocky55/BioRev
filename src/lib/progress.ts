export interface FlashcardProgress {
  known: string[];
  learning: string[];
}

export interface QuizResult {
  score: number;
  total: number;
  bestScore: number;
  completedCount: number;
}

export interface QuizQuestionStat {
  asked: number;
  correct: number;
}

export interface QuizProgress {
  roundsCompleted: number;
  totalAnswered: number;
  totalCorrect: number;
  bestRoundScore: number;
  bestRoundTotal: number;
  bestPercentage: number;
  questionStats: Record<string, QuizQuestionStat>;
}

export type BadgeLevel = "gold" | "silver" | "bronze";

export interface UserProfile {
  name: string;
}

export interface ProgressExport {
  version: 1;
  exportedAt: string;
  data: Record<string, string>;
}

/** Active quiz round saved to sessionStorage so page navigation doesn't lose it */
export interface QuizSessionData {
  topicId: string;
  mode: string;
  questionIds: string[];
  currentIndex: number;
  score: number;
  answers: { questionId: string; selected: number; correct: boolean }[];
}

const EMPTY_PROGRESS: QuizProgress = {
  roundsCompleted: 0,
  totalAnswered: 0,
  totalCorrect: 0,
  bestRoundScore: 0,
  bestRoundTotal: 0,
  bestPercentage: 0,
  questionStats: {},
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// ── Flashcards ──

export function getFlashcardProgress(topicId: string): FlashcardProgress {
  if (!isBrowser()) return { known: [], learning: [] };
  const raw = localStorage.getItem(`biorevise-flashcards-${topicId}`);
  if (!raw) return { known: [], learning: [] };
  return JSON.parse(raw) as FlashcardProgress;
}

export function saveFlashcardProgress(topicId: string, progress: FlashcardProgress): void {
  if (!isBrowser()) return;
  localStorage.setItem(`biorevise-flashcards-${topicId}`, JSON.stringify(progress));
}

export function resetFlashcardProgress(topicId: string): void {
  if (!isBrowser()) return;
  localStorage.removeItem(`biorevise-flashcards-${topicId}`);
}

// ── Quiz (legacy — used for backward compat) ──

export function getQuizResult(topicId: string): QuizResult {
  if (!isBrowser()) return { score: 0, total: 0, bestScore: 0, completedCount: 0 };
  const v2 = localStorage.getItem(`biorevise-quiz-v2-${topicId}`);
  if (v2) {
    const p = JSON.parse(v2) as QuizProgress;
    return {
      score: 0,
      total: p.bestRoundTotal,
      bestScore: p.bestRoundScore,
      completedCount: p.roundsCompleted,
    };
  }
  const raw = localStorage.getItem(`biorevise-quiz-${topicId}`);
  if (!raw) return { score: 0, total: 0, bestScore: 0, completedCount: 0 };
  return JSON.parse(raw) as QuizResult;
}

export function saveQuizResult(topicId: string, score: number, total: number): void {
  if (!isBrowser()) return;
  const current = getQuizResult(topicId);
  const result: QuizResult = {
    score,
    total,
    bestScore: Math.max(current.bestScore, score),
    completedCount: current.completedCount + 1,
  };
  localStorage.setItem(`biorevise-quiz-${topicId}`, JSON.stringify(result));
}

// ── Quiz v2 (detailed per-question tracking) ──

export function getQuizProgress(topicId: string): QuizProgress {
  if (!isBrowser()) return { ...EMPTY_PROGRESS };
  const raw = localStorage.getItem(`biorevise-quiz-v2-${topicId}`);
  if (raw) {
    const parsed = JSON.parse(raw) as QuizProgress;
    // Migration: add bestPercentage if missing from older data
    if (parsed.bestPercentage === undefined) {
      parsed.bestPercentage = parsed.bestRoundTotal > 0
        ? Math.round((parsed.bestRoundScore / parsed.bestRoundTotal) * 100)
        : 0;
    }
    return parsed;
  }
  // Migrate from v1
  const oldRaw = localStorage.getItem(`biorevise-quiz-${topicId}`);
  if (oldRaw) {
    const old = JSON.parse(oldRaw) as QuizResult;
    return {
      ...EMPTY_PROGRESS,
      roundsCompleted: old.completedCount,
      bestRoundScore: old.bestScore,
      bestRoundTotal: old.total,
      bestPercentage: old.total > 0 ? Math.round((old.bestScore / old.total) * 100) : 0,
    };
  }
  return { ...EMPTY_PROGRESS };
}

export function saveQuizRound(
  topicId: string,
  roundScore: number,
  roundTotal: number,
  questionResults: { id: string; correct: boolean }[]
): void {
  if (!isBrowser()) return;
  const progress = getQuizProgress(topicId);

  progress.roundsCompleted += 1;
  progress.totalAnswered += roundTotal;
  progress.totalCorrect += roundScore;

  if (
    roundScore > progress.bestRoundScore ||
    (roundScore === progress.bestRoundScore && roundTotal > progress.bestRoundTotal)
  ) {
    progress.bestRoundScore = roundScore;
    progress.bestRoundTotal = roundTotal;
  }

  // Track best percentage ever achieved (badges never downgrade)
  const roundPercentage = roundTotal > 0 ? Math.round((roundScore / roundTotal) * 100) : 0;
  progress.bestPercentage = Math.max(progress.bestPercentage || 0, roundPercentage);

  questionResults.forEach(({ id, correct }) => {
    const stat = progress.questionStats[id] || { asked: 0, correct: 0 };
    stat.asked += 1;
    if (correct) stat.correct += 1;
    progress.questionStats[id] = stat;
  });

  localStorage.setItem(`biorevise-quiz-v2-${topicId}`, JSON.stringify(progress));
}

export function resetQuizProgress(topicId: string): void {
  if (!isBrowser()) return;
  localStorage.removeItem(`biorevise-quiz-${topicId}`);
  localStorage.removeItem(`biorevise-quiz-v2-${topicId}`);
  clearQuizSession(topicId);
}

// ── Quiz Session (survives page navigation via sessionStorage) ──

export function saveQuizSession(data: QuizSessionData): void {
  if (!isBrowser()) return;
  sessionStorage.setItem(`biorevise-quiz-session-${data.topicId}`, JSON.stringify(data));
}

export function getQuizSession(topicId: string): QuizSessionData | null {
  if (!isBrowser()) return null;
  const raw = sessionStorage.getItem(`biorevise-quiz-session-${topicId}`);
  if (!raw) return null;
  try { return JSON.parse(raw) as QuizSessionData; }
  catch { return null; }
}

export function clearQuizSession(topicId: string): void {
  if (!isBrowser()) return;
  sessionStorage.removeItem(`biorevise-quiz-session-${topicId}`);
}

// ── Sticky Notes ──

export function getStickyNotes(topicId: string): string {
  if (!isBrowser()) return "";
  return localStorage.getItem(`biorevise-notes-${topicId}`) ?? "";
}

export function saveStickyNotes(topicId: string, content: string): void {
  if (!isBrowser()) return;
  localStorage.setItem(`biorevise-notes-${topicId}`, content);
}

// ── Topics Started ──

export function getStartedTopics(): string[] {
  if (!isBrowser()) return [];
  const raw = localStorage.getItem("biorevise-started-topics");
  if (raw !== null) {
    try { return JSON.parse(raw) as string[]; }
    catch { return []; }
  }
  // First run: auto-detect from existing flashcard/quiz progress
  const started = new Set<string>();
  const prefixes = ["biorevise-flashcards-", "biorevise-quiz-v2-", "biorevise-quiz-"];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    for (const prefix of prefixes) {
      if (key.startsWith(prefix)) {
        const topicId = key.slice(prefix.length);
        if (topicId) started.add(topicId);
        break;
      }
    }
  }
  const result = Array.from(started);
  localStorage.setItem("biorevise-started-topics", JSON.stringify(result));
  return result;
}

export function startTopic(topicId: string): void {
  if (!isBrowser()) return;
  const started = getStartedTopics();
  if (!started.includes(topicId)) {
    started.push(topicId);
    localStorage.setItem("biorevise-started-topics", JSON.stringify(started));
  }
}

/** Remove from started list and reset all flashcard + quiz progress. Notes are preserved. */
export function stopTopic(topicId: string): void {
  if (!isBrowser()) return;
  const started = getStartedTopics().filter((id) => id !== topicId);
  localStorage.setItem("biorevise-started-topics", JSON.stringify(started));
  localStorage.removeItem(`biorevise-flashcards-${topicId}`);
  localStorage.removeItem(`biorevise-quiz-${topicId}`);
  localStorage.removeItem(`biorevise-quiz-v2-${topicId}`);
  clearQuizSession(topicId);
}

// ── Badges ──

export function computeBadgeLevel(percentage: number): BadgeLevel | null {
  if (percentage >= 80) return "gold";
  if (percentage >= 70) return "silver";
  if (percentage >= 60) return "bronze";
  return null;
}

export function getTopicBadge(topicId: string): BadgeLevel | null {
  const progress = getQuizProgress(topicId);
  if (!progress.bestPercentage || progress.bestPercentage <= 0) return null;
  return computeBadgeLevel(progress.bestPercentage);
}

// ── User Profile ──

export function getUserProfile(): UserProfile {
  if (!isBrowser()) return { name: "" };
  const raw = localStorage.getItem("biorevise-profile");
  if (!raw) return { name: "" };
  try { return JSON.parse(raw) as UserProfile; }
  catch { return { name: "" }; }
}

export function saveUserProfile(profile: UserProfile): void {
  if (!isBrowser()) return;
  localStorage.setItem("biorevise-profile", JSON.stringify(profile));
}

// ── Streak ──

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string; // YYYY-MM-DD
}

export function getStreakData(): StreakData {
  if (!isBrowser()) return { currentStreak: 0, longestStreak: 0, lastStudyDate: "" };
  const raw = localStorage.getItem("biorevise-streak");
  if (!raw) return { currentStreak: 0, longestStreak: 0, lastStudyDate: "" };
  try { return JSON.parse(raw) as StreakData; }
  catch { return { currentStreak: 0, longestStreak: 0, lastStudyDate: "" }; }
}

/** Call on any study activity. Idempotent per calendar day. */
export function updateStreak(): { streakIncreased: boolean; milestone: number | null } {
  if (!isBrowser()) return { streakIncreased: false, milestone: null };
  const streak = getStreakData();
  const today = new Date().toISOString().split("T")[0];

  // Already studied today — no-op
  if (streak.lastStudyDate === today) {
    return { streakIncreased: false, milestone: null };
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (streak.lastStudyDate === yesterday) {
    streak.currentStreak += 1;
  } else {
    streak.currentStreak = 1; // gap > 1 day → reset
  }

  streak.lastStudyDate = today;
  streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);

  localStorage.setItem("biorevise-streak", JSON.stringify(streak));

  const milestones = [7, 14, 30, 60, 100];
  const milestone = milestones.includes(streak.currentStreak) ? streak.currentStreak : null;

  return { streakIncreased: true, milestone };
}

// ── Export / Import ──

export function exportAllProgress(): ProgressExport {
  const data: Record<string, string> = {};
  if (!isBrowser()) return { version: 1, exportedAt: new Date().toISOString(), data };

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("biorevise-")) {
      data[key] = localStorage.getItem(key) || "";
    }
  }
  return { version: 1, exportedAt: new Date().toISOString(), data };
}

export function validateProgressExport(obj: unknown): obj is ProgressExport {
  if (!obj || typeof obj !== "object") return false;
  const e = obj as Record<string, unknown>;
  if (e.version !== 1) return false;
  if (typeof e.exportedAt !== "string") return false;
  if (!e.data || typeof e.data !== "object") return false;
  return Object.keys(e.data as object).every((k) => k.startsWith("biorevise-"));
}

export function importProgress(exportData: ProgressExport): void {
  if (!isBrowser()) return;
  // Clear all existing biorevise data
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("biorevise-")) keysToRemove.push(key);
  }
  keysToRemove.forEach((k) => localStorage.removeItem(k));
  // Write imported data
  Object.entries(exportData.data).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
}

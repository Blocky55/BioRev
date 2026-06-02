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
  questionStats: Record<string, QuizQuestionStat>;
}

const EMPTY_PROGRESS: QuizProgress = {
  roundsCompleted: 0,
  totalAnswered: 0,
  totalCorrect: 0,
  bestRoundScore: 0,
  bestRoundTotal: 0,
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

// ── Quiz (legacy — used by homepage stats) ──

export function getQuizResult(topicId: string): QuizResult {
  if (!isBrowser()) return { score: 0, total: 0, bestScore: 0, completedCount: 0 };
  // Try v2 first for backward compat
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
  if (raw) return JSON.parse(raw) as QuizProgress;
  // Migrate from v1
  const oldRaw = localStorage.getItem(`biorevise-quiz-${topicId}`);
  if (oldRaw) {
    const old = JSON.parse(oldRaw) as QuizResult;
    return {
      ...EMPTY_PROGRESS,
      roundsCompleted: old.completedCount,
      bestRoundScore: old.bestScore,
      bestRoundTotal: old.total,
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
  if (roundScore > progress.bestRoundScore || (roundScore === progress.bestRoundScore && roundTotal > progress.bestRoundTotal)) {
    progress.bestRoundScore = roundScore;
    progress.bestRoundTotal = roundTotal;
  }

  questionResults.forEach(({ id, correct }) => {
    const stat = progress.questionStats[id] || { asked: 0, correct: 0 };
    stat.asked += 1;
    if (correct) stat.correct += 1;
    progress.questionStats[id] = stat;
  });

  localStorage.setItem(`biorevise-quiz-v2-${topicId}`, JSON.stringify(progress));
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

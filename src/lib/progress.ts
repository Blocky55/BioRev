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

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

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

export function getQuizResult(topicId: string): QuizResult {
  if (!isBrowser()) return { score: 0, total: 0, bestScore: 0, completedCount: 0 };
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

export function getStickyNotes(topicId: string): string {
  if (!isBrowser()) return "";
  return localStorage.getItem(`biorevise-notes-${topicId}`) ?? "";
}

export function saveStickyNotes(topicId: string, content: string): void {
  if (!isBrowser()) return;
  localStorage.setItem(`biorevise-notes-${topicId}`, content);
}

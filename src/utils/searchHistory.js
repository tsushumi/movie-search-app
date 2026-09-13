const STORAGE_KEY = "reelfind_search_history";
const MAX_ENTRIES = 10;

export function getSearchHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addSearchTerm(term) {
  const clean = term.trim();
  if (!clean) return getSearchHistory();
  const existing = getSearchHistory().filter(
    (t) => t.toLowerCase() !== clean.toLowerCase()
  );
  const updated = [clean, ...existing].slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

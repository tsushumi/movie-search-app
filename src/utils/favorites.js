const STORAGE_KEY = "reelfind_favorites";

/**
 * Reads the favorites array from localStorage.
 * Returns an empty array if nothing has been saved yet,
 * or if the stored value is corrupted.
 */
export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Adds a movie to favorites. Expects an object that at minimum has
 * imdbID, Title, Year, Poster, Type.
 */
export function saveFavorite(movie) {
  const current = getFavorites();
  if (current.some((m) => m.imdbID === movie.imdbID)) {
    return current;
  }
  const updated = [...current, movie];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Removes a movie from favorites by its IMDB ID.
 */
export function removeFavorite(imdbID) {
  const updated = getFavorites().filter((m) => m.imdbID !== imdbID);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Checks whether a movie is currently favorited.
 */
export function isFavorite(imdbID) {
  return getFavorites().some((m) => m.imdbID === imdbID);
}

/**
 * Custom browser event name dispatched whenever favorites change,
 * so components other than the one that made the change (e.g. the
 * header badge) can react without prop drilling.
 */
export const FAVORITES_CHANGED_EVENT = "reelfind:favorites-changed";

export function notifyFavoritesChanged() {
  window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
}

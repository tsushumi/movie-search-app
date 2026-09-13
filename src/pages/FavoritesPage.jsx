import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid.jsx";
import { getFavorites, FAVORITES_CHANGED_EVENT } from "../utils/favorites.js";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(() => getFavorites());

  useEffect(() => {
    function refresh() {
      setFavorites(getFavorites());
    }
    window.addEventListener(FAVORITES_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(FAVORITES_CHANGED_EVENT, refresh);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-paper sm:text-4xl">
        Your Favorites
      </h1>
      <p className="mt-2 mb-8 text-muted">
        {favorites.length > 0
          ? `${favorites.length} saved title${favorites.length === 1 ? "" : "s"}.`
          : null}
      </p>

      {favorites.length === 0 ? (
        <p className="mt-6 text-center text-muted">
          You have not saved any favorites yet. Search for movies and click
          the heart icon to save them.
        </p>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  isFavorite,
  removeFavorite,
  saveFavorite,
  notifyFavoritesChanged,
} from "../utils/favorites.js";

export default function FavoriteButton({ movie, className = "", size = "md" }) {
  const [favorited, setFavorited] = useState(() => isFavorite(movie.imdbID));

  useEffect(() => {
    setFavorited(isFavorite(movie.imdbID));
  }, [movie.imdbID]);

  function toggle(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      removeFavorite(movie.imdbID);
      setFavorited(false);
    } else {
      saveFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        Type: movie.Type || "movie",
      });
      setFavorited(true);
    }
    notifyFavoritesChanged();
  }

  const iconSize = size === "lg" ? "text-2xl" : "text-lg";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={favorited}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className={`transition-colors duration-150 hover:scale-110 active:scale-95 ${className}`}
    >
      <span className={iconSize} aria-hidden="true">
        {favorited ? "❤️" : "🤍"}
      </span>
    </button>
  );
}

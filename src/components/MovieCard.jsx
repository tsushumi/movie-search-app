import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton.jsx";

export default function MovieCard({ movie }) {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-sm bg-surface ring-1 ring-border-soft transition-transform duration-200 hover:-translate-y-1">
      <Link to={`/movie/${movie.imdbID}`} className="block">
        <div className="film-strip">
          <div className="aspect-[2/3] w-full overflow-hidden bg-surface-raised">
            {hasPoster ? (
              <img
                src={movie.Poster}
                alt={`${movie.Title} poster`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center text-muted">
                <span className="font-display text-3xl">🎬</span>
                <span className="text-xs uppercase tracking-wide">
                  No Poster Available
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <Link to={`/movie/${movie.imdbID}`}>
          <h3 className="font-display text-base leading-snug text-paper line-clamp-2">
            {movie.Title}
          </h3>
        </Link>
        <div className="flex items-center justify-between text-xs text-muted">
          <span>{movie.Year}</span>
          <span className="rounded-full border border-border-soft px-2 py-0.5 capitalize">
            {movie.Type}
          </span>
        </div>
      </div>

      <FavoriteButton
        movie={movie}
        className="absolute right-2 top-2 rounded-full bg-ink/70 p-2 backdrop-blur-sm"
      />
    </div>
  );
}

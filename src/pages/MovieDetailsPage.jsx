import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import FavoriteButton from "../components/FavoriteButton.jsx";
import ShareButton from "../components/ShareButton.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { buildDetailsUrl } from "../utils/omdb.js";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const { data: movie, loading, error } = useFetch(buildDetailsUrl(id));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-marquee"
      >
        ← Back to Search
      </Link>

      {loading && <LoadingSpinner label="Fetching movie details…" />}

      {!loading && error && (
        <ErrorMessage
          title="Couldn't load this movie"
          message={
            error === "Incorrect IMDb ID."
              ? "We couldn't find a movie with that ID."
              : error
          }
        />
      )}

      {!loading && !error && movie && (
        <article className="grid grid-cols-1 gap-8 sm:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr]">
          <div className="film-strip">
            <div className="aspect-[2/3] overflow-hidden rounded-sm bg-surface-raised">
              {movie.Poster && movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted">
                  <span className="font-display text-4xl">🎬</span>
                  <span className="text-xs uppercase tracking-wide">
                    No Poster Available
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-display text-3xl font-bold text-paper sm:text-4xl">
                {movie.Title}
              </h1>
              <FavoriteButton
                movie={movie}
                size="lg"
                className="shrink-0 rounded-full border border-border-soft p-2"
              />
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
              <span>{movie.Year}</span>
              <span>·</span>
              <span>{movie.Rated}</span>
              <span>·</span>
              <span>{movie.Runtime}</span>
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <span className="rounded-full bg-marquee/15 px-2 py-0.5 text-marquee">
                  ★ {movie.imdbRating} IMDb
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-muted">{movie.Genre}</p>

            <p className="mt-5 leading-relaxed text-paper/90">{movie.Plot}</p>

            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-muted">Director</dt>
                <dd>{movie.Director}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-muted">Actors</dt>
                <dd>{movie.Actors}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <ShareButton />
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

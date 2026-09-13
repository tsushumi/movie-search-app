import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import SearchFilters from "../components/SearchFilters.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import Pagination from "../components/Pagination.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { buildSearchUrl, hasApiKey } from "../utils/omdb.js";
import { addSearchTerm } from "../utils/searchHistory.js";

export default function HomePage() {
  const [term, setTerm] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);

  const url = useMemo(() => {
    if (!term) return null;
    return buildSearchUrl(term, { page, type, year });
  }, [term, page, type, year]);

  const { data, loading, error } = useFetch(url);

  function handleSearch(value) {
    if (!value) return;
    addSearchTerm(value);
    setPage(1);
    setTerm(value);
  }

  function handleFilterChange(setter) {
    return (value) => {
      setter(value);
      setPage(1);
    };
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl font-bold text-paper sm:text-5xl">
          Find your next watch
        </h1>
        <p className="mt-3 text-muted">
          Search thousands of movies, series, and games from the OMDB catalog.
        </p>
      </div>

      {!hasApiKey() && (
        <div className="mb-6">
          <ErrorMessage
            title="Missing API key"
            message="Add VITE_OMDB_API_KEY to your .env file (see the README) before searching."
          />
        </div>
      )}

      <div className="mx-auto mb-2 max-w-xl">
        <SearchBar onSearch={handleSearch} />
        <SearchFilters
          type={type}
          year={year}
          onTypeChange={handleFilterChange(setType)}
          onYearChange={handleFilterChange(setYear)}
        />
      </div>

      <div className="mt-10">
        {loading && <LoadingSpinner label="Searching the catalog…" />}

        {!loading && error === "Movie not found!" && (
          <ErrorMessage
            title="No results"
            message={`No movies found for '${term}'. Try a different title.`}
          />
        )}

        {!loading && error && error !== "Movie not found!" && (
          <ErrorMessage message={error} />
        )}

        {!loading && !error && data?.Search && (
          <>
            <MovieGrid movies={data.Search} />
            <Pagination
              page={page}
              totalResults={data.totalResults}
              onPageChange={setPage}
            />
          </>
        )}

        {!term && !loading && (
          <p className="text-center text-sm text-muted">
            Try searching for something like "Spirited Away" or "The Wire".
          </p>
        )}
      </div>
    </div>
  );
}

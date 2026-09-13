import { useEffect, useRef, useState } from "react";
import { getSearchHistory } from "../utils/searchHistory.js";

export default function SearchBar({ initialValue = "", onSearch }) {
  const [term, setTerm] = useState(initialValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);
  const history = getSearchHistory();

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function submit(value) {
    const clean = value.trim();
    setShowSuggestions(false);
    onSearch(clean);
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(term);
        }}
        className="flex items-stretch gap-2"
      >
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for a title, e.g. Spirited Away"
          aria-label="Search for a movie"
          className="w-full rounded-sm border border-border-soft bg-surface px-4 py-3 text-base text-paper placeholder:text-muted focus:border-marquee focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-sm bg-marquee px-5 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-marquee-dim"
        >
          Search
        </button>
      </form>

      {showSuggestions && history.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-sm border border-border-soft bg-surface-raised shadow-lg">
          {history.map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => {
                  setTerm(item);
                  submit(item);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-paper/90 hover:bg-surface"
              >
                <span className="text-muted" aria-hidden="true">
                  ⏱
                </span>
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

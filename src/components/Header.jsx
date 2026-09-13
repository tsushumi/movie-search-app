import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getFavorites, FAVORITES_CHANGED_EVENT } from "../utils/favorites.js";
import { applyTheme, getStoredTheme, setStoredTheme } from "../utils/theme.js";

export default function Header() {
  const [count, setCount] = useState(() => getFavorites().length);
  const [theme, setTheme] = useState(() => getStoredTheme());

  useEffect(() => {
    function refresh() {
      setCount(getFavorites().length);
    }
    window.addEventListener(FAVORITES_CHANGED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(FAVORITES_CHANGED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setStoredTheme(next);
  }

  const linkClass = ({ isActive }) =>
    `px-1 pb-0.5 text-sm transition-colors ${
      isActive
        ? "border-b-2 border-marquee text-paper"
        : "text-muted hover:text-paper"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-border-soft bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="marquee-flicker font-display text-xl font-bold text-marquee">
            ★ Reel Find
          </span>
        </NavLink>

        <nav className="flex items-center gap-5">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            <span className="inline-flex items-center gap-1.5">
              Favorites
              <span
                className={`inline-flex min-w-[1.4rem] items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                  count > 0
                    ? "bg-ticket text-paper"
                    : "bg-surface-raised text-muted"
                }`}
              >
                {count}
              </span>
            </span>
          </NavLink>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full border border-border-soft p-2 text-sm text-muted hover:text-paper"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>
      </div>
    </header>
  );
}

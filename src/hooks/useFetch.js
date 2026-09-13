import { useEffect, useState } from "react";

/**
 * Fetches JSON from a URL and tracks loading/error state.
 * Pass `null` as the url to skip fetching (e.g. before a search has run).
 *
 * Guards against setting state after the component has unmounted or
 * after a newer request has started, so a slow, stale response can
 * never overwrite fresher results.
 */
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("network");
        }
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        if (json.Response === "False") {
          setError(json.Error || "Something went wrong. Please try again.");
          setData(null);
        } else {
          setData(json);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setError(
          "Something went wrong. Please check your internet connection and try again."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

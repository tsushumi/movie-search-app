import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="rounded-sm border border-border-soft px-4 py-2 text-sm text-paper hover:border-marquee/60"
    >
      {copied ? "Link copied!" : "Share this movie"}
    </button>
  );
}

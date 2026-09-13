export default function ErrorMessage({ message, title = "Reel trouble" }) {
  return (
    <div className="mx-auto max-w-md rounded-sm border border-ticket/40 bg-ticket/10 px-6 py-8 text-center">
      <p className="font-display text-lg text-ticket">{title}</p>
      <p className="mt-2 text-sm text-paper/80">{message}</p>
    </div>
  );
}

export default function CategoryToast({ message }) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-sidebar px-5 py-3 text-sm font-medium text-surface shadow-lg"
    >
      {message}
    </div>
  );
}

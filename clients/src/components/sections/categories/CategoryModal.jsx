import { useEffect } from "react";

export default function CategoryModal({ title, onClose, children }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-sidebar/45 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-modal-title"
        className="w-full max-w-md rounded-xl bg-surface p-6 shadow-xl"
      >
        <h2
          id="category-modal-title"
          className="mb-4 text-lg font-bold text-ink"
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

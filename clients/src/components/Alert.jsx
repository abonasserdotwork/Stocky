import { AlertCircle } from "lucide-react";

export default function Alert({ children }) {
  // If there is no message, show nothing at all
  if (!children) return null;

  return (
    <div
      role="alert"
      className="mb-4 flex items-start gap-2 rounded-md bg-danger-soft p-3 text-sm text-ink"
    >
      <AlertCircle className="mt-px h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}
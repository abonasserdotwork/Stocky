import { AlertCircle } from "lucide-react";

export default function ErrorState({
  title = "Unable to load this section",
  message = "Please try again.",
  onRetry,
  retryLabel = "Try again",
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-start rounded-lg bg-danger-soft p-4 text-ink ${className}`}
      role="alert"
    >
      <div className="flex items-center gap-2">
        <AlertCircle aria-hidden="true" className="text-danger" size={18} />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm">{message}</p>
      {onRetry && (
        <button
          className="mt-3 rounded-md font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
          onClick={onRetry}
          type="button"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}

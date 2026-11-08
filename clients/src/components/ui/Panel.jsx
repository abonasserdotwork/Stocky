import Card from "./Card";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";

export default function Panel({
  title,
  action,
  children,
  className = "",
  bodyClassName = "",
  empty = false,
  emptyTitle = "Nothing to show yet",
  emptyMessage = "There is no data to display.",
  error,
}) {
  const errorMessage =
    typeof error === "string" ? error : error?.message;

  return (
    <Card as="section" className={`p-5 sm:p-6 ${className}`}>
      {(title || action) && (
        <header className="mb-4 flex items-center justify-between gap-4">
          {title && <h2 className="text-lg font-semibold text-ink">{title}</h2>}
          {action}
        </header>
      )}
      <div className={bodyClassName}>
        {error ? (
          <ErrorState message={errorMessage} />
        ) : empty ? (
          <EmptyState title={emptyTitle} message={emptyMessage} />
        ) : (
          children
        )}
      </div>
    </Card>
  );
}

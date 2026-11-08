import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "Nothing to show yet",
  message = "There is no data to display.",
  icon: Icon = Inbox,
  action,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-lg bg-accent-warm px-6 py-8 text-center ${className}`}
      role="status"
    >
      <Icon aria-hidden="true" className="mb-3 text-muted" size={24} />
      <h3 className="font-semibold text-ink">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-muted">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

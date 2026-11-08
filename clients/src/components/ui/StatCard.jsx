import Card from "./Card";

const toneClasses = {
  primary: { icon: "bg-primary/10 text-primary", value: "text-ink" },
  info: { icon: "bg-info-soft text-info", value: "text-ink" },
  warning: { icon: "bg-warning-soft text-warning", value: "text-warning" },
  danger: { icon: "bg-danger-soft text-danger", value: "text-danger" },
};

export default function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "primary",
  loading = false,
  className = "",
}) {
  const styles = toneClasses[tone] ?? toneClasses.primary;

  if (loading) {
    return (
      <Card
        as="article"
        aria-busy="true"
        aria-label={`Loading ${label ?? "statistic"}`}
        className={`flex items-start justify-between gap-4 p-5 ${className}`}
      >
        <div className="min-w-0 flex-1 space-y-3">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-9 w-1/2" />
          <div className="skeleton h-3 w-3/4" />
        </div>
        {Icon && <div className="skeleton h-11 w-11 shrink-0 rounded-xl" />}
      </Card>
    );
  }

  return (
    <Card
      as="article"
      className={`group flex items-start justify-between gap-4 p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-pop ${className}`}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted">{label}</p>
        <p className={`mt-2 text-3xl font-bold tracking-tight ${styles.value}`}>
          {value}
        </p>
        {detail && <p className="mt-1 text-xs text-muted">{detail}</p>}
      </div>
      {Icon && (
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${styles.icon}`}
        >
          <Icon aria-hidden="true" size={18} />
        </div>
      )}
    </Card>
  );
}

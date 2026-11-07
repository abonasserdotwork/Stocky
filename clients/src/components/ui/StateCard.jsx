
export default function StateCard({ label, value, detail, icon: Icon, tone }) {
  const styles = cardStyles[tone];

  return (
    <article className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-surface p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-pop">
      <div>
        <p className="text-sm font-medium text-muted">{label}</p>
        <p className={`mt-2 text-3xl font-bold tracking-tight ${styles.value}`}>{value}</p>
        <p className="mt-1 text-xs text-muted">{detail}</p>
      </div>
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${styles.icon}`}>
        <Icon size={18} aria-hidden="true" />
      </div>
    </article>
  );
}

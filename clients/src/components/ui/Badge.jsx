const toneClasses = {
  success: "bg-success-soft",
  warning: "bg-warning-soft",
  danger: "bg-danger-soft",
  info: "bg-info-soft",
};

export default function Badge({
  children,
  label,
  icon: Icon,
  tone = "info",
  className = "",
}) {
  const content = label ?? children;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-ink ${toneClasses[tone] ?? toneClasses.info} ${className}`}
    >
      {Icon && <Icon aria-hidden="true" size={14} />}
      {content}
    </span>
  );
}

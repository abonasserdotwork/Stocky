

const variantClasses = {
  primary: "bg-primary text-surface hover:bg-primary-hover",
};

const sizeClasses = {
  sm: "h-[26px] rounded-md px-3 text-[10px]",
  md: "h-11 rounded-lg px-4 text-sm",
};

export default function Button({
  name,
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth,
  onClick,
  className = "",
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1 font-semibold transition-colors ${
        variantClasses[variant] ?? variantClasses.primary
      } ${sizeClasses[size] ?? sizeClasses.md} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      type={type}
      onClick={onClick}
    >
      {children ?? name}
    </button>
  );
}
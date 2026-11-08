export default function Card({ as: Component = "div", className = "", children, ...props }) {
  return (
    <Component
      className={`rounded-xl border border-border bg-surface shadow-card ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

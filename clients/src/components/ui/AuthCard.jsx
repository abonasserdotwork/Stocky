export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-[420px] rounded-xl border-solid border-border bg-surface p-8 shadow-card">
        <h1 className="text-center text-2xl font-bold text-ink">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-center text-sm text-muted">{subtitle}</p>
        )}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
export default function CategoryToolbar({ query, onQueryChange, count, total }) {
  return (
    <div className="flex flex-col items-stretch justify-between gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
      <input
        type="search"
        placeholder="Search categories"
        aria-label="Search categories"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/20 sm:max-w-xs"
      />
      <span className="text-sm text-muted">
        {count} of {total}
      </span>
    </div>
  );
}

export default function CategoryToolbar({ query, onQueryChange, count, total }) {
  return (
    <div className="flex flex-col items-stretch justify-between gap-3 border-b border-[#dde5da] p-4 sm:flex-row sm:items-center">
      <input
        type="search"
        placeholder="Search categories"
        aria-label="Search categories"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="w-full rounded-lg border border-[#dde5da] bg-white px-3 py-2.5 text-sm text-[#1f2a24] outline-none transition placeholder:text-[#5f6f65] focus:border-[#3f7d5c] focus:ring-4 focus:ring-[#3f7d5c]/20 sm:max-w-xs"
      />
      <span className="text-sm text-[#5f6f65]">
        {count} of {total}
      </span>
    </div>
  );
}

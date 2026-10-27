export default function CategoryEmptyState({ isFiltered, query, onAdd }) {
  if (isFiltered) {
    return (
      <p className="px-4 py-10 text-center text-sm text-[#5f6f65]">
        No categories match “{query}”.
      </p>
    );
  }

  return (
    <div className="m-4 rounded-xl bg-[#e9dfc7] px-4 py-10 text-center">
      <h2 className="mb-1 text-lg font-semibold text-[#1f3d2e]">
        No categories yet
      </h2>
      <p className="mb-4 text-sm text-[#1f3d2e]">
        Add your first category to start organizing products.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="rounded-lg bg-[#3f7d5c] px-4 py-2.5 font-semibold text-white transition hover:bg-[#2e5e45]"
      >
        Add category
      </button>
    </div>
  );
}

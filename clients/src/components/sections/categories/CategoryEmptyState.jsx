export default function CategoryEmptyState({ isFiltered, query, onAdd }) {
  if (isFiltered) {
    return (
      <p className="px-4 py-10 text-center text-sm text-muted">
        No categories match “{query}”.
      </p>
    );
  }

  return (
    <div className="m-4 rounded-xl bg-accent-warm px-4 py-10 text-center">
      <h2 className="mb-1 text-lg font-semibold text-sidebar">
        No categories yet
      </h2>
      <p className="mb-4 text-sm text-sidebar">
        Add your first category to start organizing products.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="rounded-lg bg-primary px-4 py-2.5 font-semibold text-surface transition hover:bg-primary-hover"
      >
        Add category
      </button>
    </div>
  );
}

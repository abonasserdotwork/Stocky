export default function CategoryTable({ categories, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="text-sm font-semibold text-muted">
            <th className="px-4 py-3">Name</th>
            <th className="hidden px-4 py-3 sm:table-cell">Description</th>
            <th className="px-4 py-3">Products</th>
            <th className="whitespace-nowrap px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-t border-border transition hover:bg-page"
            >
              <td className="px-4 py-3 font-semibold">
                {category.name}
                <p className="mt-1 max-w-48 truncate text-xs font-normal text-muted sm:hidden">
                  {category.description || "No description"}
                </p>
              </td>
              <td className="hidden px-4 py-3 text-sm text-muted sm:table-cell">
                {category.description || "—"}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-accent px-3 py-1 text-sm font-semibold text-sidebar">
                  {category.products_count}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onEdit(category)}
                  className="mr-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-ink transition hover:bg-page focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(category)}
                  className="rounded-lg border border-danger px-3 py-1.5 text-sm font-semibold text-danger transition hover:bg-danger-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-danger/20"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

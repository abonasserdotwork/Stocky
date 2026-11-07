export default function CategoryTable({ categories, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="text-sm font-semibold text-[#5f6f65]">
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
              className="border-t border-[#dde5da] transition hover:bg-[#f6f8f4]"
            >
              <td className="px-4 py-3 font-semibold">
                {category.name}
                <p className="mt-1 max-w-48 truncate text-xs font-normal text-[#5f6f65] sm:hidden">
                  {category.description || "No description"}
                </p>
              </td>
              <td className="hidden px-4 py-3 text-sm text-[#5f6f65] sm:table-cell">
                {category.description || "—"}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-[#8fb996] px-3 py-1 text-sm font-semibold text-[#1f3d2e]">
                  {category.products_count}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onEdit(category)}
                  className="mr-1 rounded-lg border border-[#dde5da] bg-white px-3 py-1.5 text-sm font-semibold text-[#1f2a24] transition hover:bg-[#f6f8f4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3f7d5c]/30"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(category)}
                  className="rounded-lg border border-[#c65d4e] px-3 py-1.5 text-sm font-semibold text-[#c65d4e] transition hover:bg-[#fbefed] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c65d4e]/20"
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

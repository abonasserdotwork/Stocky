import { Search, TriangleAlert } from "lucide-react";

function StockStatus({ product }) {
  const isLowStock = product.quantity <= product.reorderLevel;
  const styles = product.quantity === 0
    ? { badge: "bg-danger-soft text-danger", label: "Out of stock" }
    : isLowStock
      ? { badge: "bg-warning-soft text-ink", label: "Low stock" }
      : { badge: "bg-success-soft text-success", label: "In stock" };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}>
      {styles.label}
    </span>
  );
}

export default function StockLevels({
  products,
  filteredProducts,
  lowStockProducts,
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  stockFilter,
  onStockFilterChange,
  onAdjustStock,
}) {
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <div className="flex flex-col gap-5 border-b border-border p-5 lg:flex-row lg:items-end lg:justify-between lg:px-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-ink">Stock levels</h2>
          <p className="mt-1 text-sm text-muted">
            {lowStockProducts.length
              ? `${lowStockProducts.length} ${lowStockProducts.length === 1 ? "item needs" : "items need"} replenishment`
              : "All products are above their reorder levels"}
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:flex lg:items-center">
          <label className="relative sm:col-span-2 lg:col-span-1">
            <span className="sr-only">Search products</span>
            <Search
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search name or SKU"
              className="h-11 w-full rounded-lg border border-border bg-page/50 pl-10 pr-3 text-sm text-ink outline-none transition placeholder:text-muted/80 focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/10 lg:w-56"
            />
          </label>
          <label>
            <span className="sr-only">Filter by category</span>
            <select
              value={categoryFilter}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="h-11 w-full rounded-lg border border-border bg-page/50 px-3 text-sm text-ink outline-none transition focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/10 lg:w-40"
            >
              <option>All categories</option>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Filter by stock status</span>
            <select
              value={stockFilter}
              onChange={(event) => onStockFilterChange(event.target.value)}
              className="h-11 w-full rounded-lg border border-border bg-page/50 px-3 text-sm text-ink outline-none transition focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/10 lg:w-40"
            >
              <option>All stock</option>
              <option>Low stock</option>
              <option>In stock</option>
              <option>Out of stock</option>
            </select>
          </label>
        </div>
      </div>

      {lowStockProducts.length > 0 && (
        <div className="flex items-start gap-3 border-b border-warning/20 bg-warning-soft/60 px-5 py-4 lg:px-6">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-warning">
            <TriangleAlert size={16} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink">Reorder attention needed</p>
            <p className="mt-1 text-sm leading-5 text-muted">
              {lowStockProducts.map((product) => `${product.name} (${product.quantity} left)`).join(" · ")}
            </p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-page/70 text-xs uppercase tracking-[0.08em] text-muted">
            <tr>
              <th scope="col" className="px-6 py-3.5 font-semibold">Product</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Category</th>
              <th scope="col" className="px-4 py-3.5 text-right font-semibold">On hand</th>
              <th scope="col" className="px-4 py-3.5 text-right font-semibold">Reorder at</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Status</th>
              <th scope="col" className="px-6 py-3.5 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="transition-colors hover:bg-page/60">
                <td className="px-6 py-4">
                  <p className="font-semibold text-ink">{product.name}</p>
                  <p className="mt-1 text-xs tracking-wide text-muted">{product.sku}</p>
                </td>
                <td className="px-4 py-4 text-muted">{product.category}</td>
                <td className="px-4 py-4 text-right font-semibold text-ink">{product.quantity}</td>
                <td className="px-4 py-4 text-right text-muted">{product.reorderLevel}</td>
                <td className="px-4 py-4"><StockStatus product={product} /></td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onAdjustStock(product)}
                    className="rounded-md px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-primary"
                    aria-label={`Adjust stock for ${product.name}`}
                  >
                    Adjust
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-10 text-center text-sm text-muted">
                  No products match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

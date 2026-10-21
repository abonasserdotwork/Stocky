import { ArrowDownToLine, ArrowUpFromLine, Clock3 } from "lucide-react";

function formatDate(timestamp) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp);
}

export default function StockMovementHistory({ movements, products }) {
  const productNames = new Map(products.map((product) => [product.id, product.name]));

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <div className="flex items-center gap-3 border-b border-border px-5 py-5 lg:px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Clock3 size={18} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-ink">Stock movement history</h2>
          <p className="mt-1 text-sm text-muted">A running log of every recorded stock adjustment.</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-page/70 text-xs uppercase tracking-[0.08em] text-muted">
            <tr>
              <th scope="col" className="px-6 py-3.5 font-semibold">Product</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Reason</th>
              <th scope="col" className="px-4 py-3.5 text-right font-semibold">Change</th>
              <th scope="col" className="px-6 py-3.5 text-right font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {movements.map((movement) => (
              <tr key={movement.id} className="transition-colors hover:bg-page/60">
                <td className="px-6 py-4 font-semibold text-ink">
                  {productNames.get(movement.productId) ?? "Unknown product"}
                </td>
                <td className="px-4 py-4 text-muted">{movement.reason}</td>
                <td className={`px-4 py-4 text-right font-bold ${movement.change > 0 ? "text-success" : "text-danger"}`}>
                  <span className="inline-flex items-center justify-end gap-1">
                    {movement.change > 0
                      ? <ArrowDownToLine size={14} aria-hidden="true" />
                      : <ArrowUpFromLine size={14} aria-hidden="true" />}
                    {movement.change > 0 ? "+" : ""}{movement.change}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-xs text-muted">{formatDate(movement.createdAt)}</td>
              </tr>
            ))}
            {movements.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-10 text-center text-sm text-muted">
                  No stock movements have been recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

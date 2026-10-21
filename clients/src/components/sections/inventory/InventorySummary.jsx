import { Boxes, Package, TriangleAlert } from "lucide-react";

const cardStyles = {
  primary: { icon: "bg-primary/10 text-primary", value: "text-ink" },
  info: { icon: "bg-info-soft text-info", value: "text-ink" },
  warning: { icon: "bg-warning-soft text-warning", value: "text-warning" },
  danger: { icon: "bg-danger-soft text-danger", value: "text-danger" },
};

function SummaryCard({ label, value, detail, icon: Icon, tone }) {
  const styles = cardStyles[tone];

  return (
    <article className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-surface p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-pop">
      <div>
        <p className="text-sm font-medium text-muted">{label}</p>
        <p className={`mt-2 text-3xl font-bold tracking-tight ${styles.value}`}>{value}</p>
        <p className="mt-1 text-xs text-muted">{detail}</p>
      </div>
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${styles.icon}`}>
        <Icon size={18} aria-hidden="true" />
      </div>
    </article>
  );
}

export default function InventorySummary({ products, lowStockCount, totalUnits }) {
  const outOfStockCount = products.filter((product) => product.quantity === 0).length;

  return (
    <section aria-label="Inventory summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        label="Products tracked"
        value={products.length}
        detail="Across all categories"
        icon={Package}
        tone="primary"
      />
      <SummaryCard
        label="Units on hand"
        value={totalUnits.toLocaleString()}
        detail="Total available units"
        icon={Boxes}
        tone="info"
      />
      <SummaryCard
        label="Low-stock items"
        value={lowStockCount}
        detail="At or below reorder level"
        icon={TriangleAlert}
        tone="warning"
      />
      <SummaryCard
        label="Out of stock"
        value={outOfStockCount}
        detail="Needs immediate attention"
        icon={Package}
        tone="danger"
      />
    </section>
  );
}

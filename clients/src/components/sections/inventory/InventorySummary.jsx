import { Boxes, Package, TriangleAlert } from "lucide-react";
import StateCard from "../../ui/StateCard";

const cardStyles = {
  primary: { icon: "bg-primary/10 text-primary", value: "text-ink" },
  info: { icon: "bg-info-soft text-info", value: "text-ink" },
  warning: { icon: "bg-warning-soft text-warning", value: "text-warning" },
  danger: { icon: "bg-danger-soft text-danger", value: "text-danger" },
};

export default function InventorySummary({ products, lowStockCount, totalUnits }) {
  const outOfStockCount = products.filter((product) => product.quantity === 0).length;

  return (
    <section aria-label="Inventory summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StateCard
        label="Products tracked"
        value={products.length}
        detail="Across all categories"
        icon={Package}
        tone="primary"
      />
      <StateCard
        label="Units on hand"
        value={totalUnits.toLocaleString()}
        detail="Total available units"
        icon={Boxes}
        tone="info"
      />
      <StateCard
        label="Low-stock items"
        value={lowStockCount}
        detail="At or below reorder level"
        icon={TriangleAlert}
        tone="warning"
      />
      <StateCard
        label="Out of stock"
        value={outOfStockCount}
        detail="Needs immediate attention"
        icon={Package}
        tone="danger"
      />
    </section>
  );
}

import { Boxes, Package, TriangleAlert } from "lucide-react";
import StatCard from "../../ui/StatCard";

export default function InventorySummary({ products, lowStockCount, totalUnits }) {
  const outOfStockCount = products.filter((product) => product.quantity === 0).length;

  return (
    <section aria-label="Inventory summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Products tracked"
        value={products.length}
        detail="Across all categories"
        icon={Package}
        tone="primary"
      />
      <StatCard
        label="Units on hand"
        value={totalUnits.toLocaleString()}
        detail="Total available units"
        icon={Boxes}
        tone="info"
      />
      <StatCard
        label="Low-stock items"
        value={lowStockCount}
        detail="At or below reorder level"
        icon={TriangleAlert}
        tone="warning"
      />
      <StatCard
        label="Out of stock"
        value={outOfStockCount}
        detail="Needs immediate attention"
        icon={Package}
        tone="danger"
      />
    </section>
  );
}

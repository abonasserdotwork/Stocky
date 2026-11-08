import Badge from "../../components/ui/Badge";
import Panel from "../../components/ui/Panel";
import StatCard from "../../components/ui/StatCard";

const stats = [
  {
    label: "Total products",
    value: "128",
    detail: "Across 6 categories",
    tone: "primary",
  },
  {
    label: "Inventory value",
    value: "$42,380",
    detail: "At cost, all active products",
    tone: "info",
  },
  {
    label: "Low-stock items",
    value: "9",
    detail: "At or below reorder level",
    tone: "warning",
  },
  {
    label: "Sales, last 30 days",
    value: "$18,940",
    detail: "212 completed sales",
    tone: "primary",
  },
];

const categories = [
  { name: "Beverages", quantity: 420, width: "w-full", color: "bg-chart-1" },
  { name: "Snacks", quantity: 310, width: "w-3/4", color: "bg-chart-2" },
  { name: "Dairy", quantity: 240, width: "w-3/5", color: "bg-chart-3" },
  { name: "Accessories", quantity: 96, width: "w-1/4", color: "bg-chart-4" },
];

const lowStockItems = [
  { product: "Dark Chocolate Bar", onHand: 0, reorderAt: 12, status: "Out of stock" },
  { product: "Reusable Cup 12oz", onHand: 7, reorderAt: 10, status: "Low stock" },
  { product: "Arabica Coffee Beans", onHand: 18, reorderAt: 20, status: "Low stock" },
];

const recentSales = [
  { invoice: "INV-1042", total: "$86.50", status: "Completed", date: "Nov 7" },
  { invoice: "INV-1041", total: "$24.00", status: "Completed", date: "Nov 6" },
  { invoice: "INV-1040", total: "$132.00", status: "Cancelled", date: "Nov 6" },
];

const tableHeaderCellClass =
  "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted";
const tableCellClass = "px-4 py-3 text-sm text-ink";

function Overview() {
  return (
    <main className="space-y-6 p-4 sm:p-6">
      <header>
        <h1 className="text-2xl font-semibold text-ink">Overview</h1>
        <p className="mt-2 text-sm text-muted">
          Stock health and sales at a glance. Figures below are sample values.
        </p>
      </header>

      <section
        aria-label="Inventory and sales summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            {...stat}
          />
        ))}
      </section>

      <section aria-label="Sales and stock charts" className="grid gap-6 xl:grid-cols-2">
        <Panel title="Sales over time">
          <svg
            className="mt-4 h-auto w-full"
            viewBox="0 0 600 220"
            role="img"
            aria-label="Sales trend from October 8 to November 7"
          >
            <title>Sales over time</title>
            <g className="stroke-border" strokeWidth="1">
              <line x1="40" y1="20" x2="590" y2="20" />
              <line x1="40" y1="70" x2="590" y2="70" />
              <line x1="40" y1="120" x2="590" y2="120" />
              <line x1="40" y1="170" x2="590" y2="170" />
            </g>
            <polygon
              points="40,170 40,140 120,120 200,130 280,90 360,100 440,60 520,70 590,40 590,170"
              className="fill-primary/10"
            />
            <polyline
              points="40,140 120,120 200,130 280,90 360,100 440,60 520,70 590,40"
              className="fill-none stroke-primary"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <g className="fill-muted text-[11px]">
              <text x="40" y="195">Oct 8</text>
              <text x="280" y="195">Oct 23</text>
              <text x="540" y="195">Nov 7</text>
            </g>
          </svg>
        </Panel>

        <Panel
          title="Stock by category"
          empty={categories.length === 0}
          emptyMessage="Stock levels will appear here when products are added."
        >
          <ul className="mt-5 space-y-5">
            {categories.map((category) => (
              <li key={category.name}>
                <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium text-ink">{category.name}</span>
                  <span className="text-muted">{category.quantity} units</span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-page"
                  role="img"
                  aria-label={`${category.name}: ${category.quantity} units`}
                >
                  <div
                    className={`h-full rounded-full ${category.width} ${category.color}`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      <section aria-label="Inventory and sales details" className="grid gap-6 xl:grid-cols-2">
        <Panel
          title="Low-stock items"
          empty={lowStockItems.length === 0}
          emptyMessage="There are no low-stock products to show."
          action={
            <a className="shrink-0 text-sm font-medium" href="#">
              View inventory
            </a>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead className="border-b border-border">
                <tr>
                  <th className={tableHeaderCellClass} scope="col">Product</th>
                  <th className={tableHeaderCellClass} scope="col">On hand</th>
                  <th className={tableHeaderCellClass} scope="col">Reorder at</th>
                  <th className={tableHeaderCellClass} scope="col">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {lowStockItems.map((item) => (
                  <tr key={item.product}>
                    <td className={tableCellClass}>{item.product}</td>
                    <td className={tableCellClass}>{item.onHand}</td>
                    <td className={tableCellClass}>{item.reorderAt}</td>
                    <td className={tableCellClass}>
                      <Badge tone={item.status === "Out of stock" ? "danger" : "warning"}>
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel
          title="Recent sales"
          empty={recentSales.length === 0}
          emptyMessage="Completed and cancelled sales will appear here."
          action={
            <a className="shrink-0 text-sm font-medium" href="#">
              View all sales
            </a>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left">
              <thead className="border-b border-border">
                <tr>
                  <th className={tableHeaderCellClass} scope="col">Invoice</th>
                  <th className={tableHeaderCellClass} scope="col">Total</th>
                  <th className={tableHeaderCellClass} scope="col">Status</th>
                  <th className={tableHeaderCellClass} scope="col">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentSales.map((sale) => (
                  <tr key={sale.invoice}>
                    <td className={tableCellClass}>{sale.invoice}</td>
                    <td className={tableCellClass}>{sale.total}</td>
                    <td className={tableCellClass}>
                      <Badge tone={sale.status === "Cancelled" ? "danger" : "success"}>
                        {sale.status}
                      </Badge>
                    </td>
                    <td className={tableCellClass}>{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </section>
    </main>
  );
}

export default Overview;

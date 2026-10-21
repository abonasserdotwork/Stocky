
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  ShoppingCart,
  ReceiptText,
  ChartNoAxesCombined,
  Settings2,
  Cloud,
} from "lucide-react";

const navigation = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Products", path: "/dashboard/products", icon: Package },
  { name: "Categories", path: "/dashboard/categories", icon: ClipboardList },
  { name: "Suppliers", path: "/dashboard/suppliers", icon: ShoppingCart },
  { name: "Sales Orders", path: "/dashboard/sales", icon: ReceiptText },
  { name: "Inventory", path: "/dashboard/inventory", icon: Cloud },
  { name: "Reports", path: "/dashboard/reports", icon: ChartNoAxesCombined },
  { name: "Settings", path: "/dashboard/settings", icon: Settings2 },
];

export default function Sidebar() {
  return (
    <aside className="on-dark row-span-2 flex min-h-screen w-16 flex-col border-r border-page/10 bg-sidebar text-page md:w-60">
      <div className="flex h-16 shrink-0 items-center justify-center gap-3 border-b border-page/10 px-3 md:justify-start md:px-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-page text-sidebar">
          <img src="/logo-mark.svg" alt="Stockly Logo" />
        </div>

        <div className="hidden min-w-0 leading-tight md:block">
          <h1 className="text-base font-bold tracking-tight text-white">
            Stockly
          </h1>
          <p className="mt-0.5 text-[9px] font-semibold tracking-[0.14em] text-accent">
            INVENTORY MANAGER
          </p>
        </div>
      </div>

      <nav aria-label="Dashboard navigation" className="flex-1 space-y-1.5 px-2 py-5 md:px-3">
        {navigation.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/dashboard"}
            title={name}
            aria-label={name}
            className={({ isActive }) =>
              `flex h-11 items-center justify-center gap-3 rounded-xl px-2 text-page/85 transition-colors md:justify-start md:px-3 ${isActive
                ? "bg-primary text-surface shadow-sm"
                : "hover:bg-surface/10 hover:text-surface"
              }`
            }
          >
            <Icon size={18} strokeWidth={1.8} className="shrink-0" />
            <span className="hidden whitespace-nowrap text-sm font-medium md:inline">
              {name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

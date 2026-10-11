
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
    <aside className="row-span-2 flex min-h-screen w-[154px] flex-col border-r border-page/10 bg-sidebar text-page">
      {/* Brand */}
      <div className="flex h-[53px] shrink-0 items-center gap-2 px-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-page text-sidebar">
          <img src="/logo-mark.svg" alt="Stockly Logo" />
        </div>

        <div className="min-w-0 leading-tight">
          <h1 className="text-[11px] font-bold tracking-tight text-white">
            Stockly
          </h1>
          <p className="text-[7px] font-medium tracking-[1px] text-accent">
            INVENTORY MANAGER
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-1.5 pt-0.5">
        {navigation.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/dashboard"}
            className={({ isActive }) =>
              `flex h-[23px] items-center gap-1.5 rounded-[5px] px-1.5 transition-colors ${isActive
                ? "bg-primary text-surface"
                : "text-page/90 hover:bg-surface/10 hover:text-surface"
              }`
            }
          >
            <Icon size={12} strokeWidth={1.7} className="shrink-0" />
            <span className="whitespace-nowrap text-[9px] font-medium">
              {name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

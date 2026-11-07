import { useState } from "react";
import { Plus } from "lucide-react";
import { salesOrders } from "../components/SalesOrders/salesOrders.data";
import StatsCards from "../components/SalesOrders/StatsCards";
import SalesToolbar from "../components/SalesOrders/SalesToolbar";
import SalesTable from "../components/SalesOrders/SalesTable";
import SalesPagination from "../components/SalesOrders/SalesPagination";
import "../components/SalesOrders/SalesOrders.css";

const PAGE_SIZE = 6;

export default function SalesOrders() {
  const [orders] = useState(salesOrders);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("all");
  const [payment, setPayment] = useState("all");
  const [page, setPage] = useState(1);

  // قوايم الـ select بتتولد من الداتا نفسها (من غير تكرار)
  const dates = [...new Set(orders.map((o) => o.date))];
  const payments = [...new Set(orders.map((o) => o.payment))];

  // الإحصائيات
  const totalSales = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  const todaySales = orders.filter((o) => o.date === dates[0]).length;

  // الفلترة
  const filtered = orders.filter((o) => {
    const matchesSearch = o.invoice.toLowerCase().includes(search.toLowerCase());
    const matchesDate = date === "all" || o.date === date;
    const matchesPayment = payment === "all" || o.payment === payment;
    return matchesSearch && matchesDate && matchesPayment;
  });

  // الـ Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);
  const showingFrom = filtered.length === 0 ? 0 : start + 1;
  const showingTo = Math.min(start + PAGE_SIZE, filtered.length);

  // أي فلتر يتغير = نرجع لصفحة 1
  const withReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const handleView = (order) => {
    console.log("view", order); // هنربطها بمودال التفاصيل بعدين
  };

  return (
    <div className="sales-page">
      <div className="sales-header">
        <div>
          <h1>Sales Orders</h1>
          <p>Manage and track your sales transactions.</p>
        </div>
        <button className="new-sale-btn">
          <Plus size={18} /> New Sale
        </button>
      </div>

      <StatsCards totalSales={totalSales} totalRevenue={totalRevenue} todaySales={todaySales} />

      <SalesToolbar
        search={search} onSearchChange={withReset(setSearch)}
        date={date} onDateChange={withReset(setDate)} dates={dates}
        payment={payment} onPaymentChange={withReset(setPayment)} payments={payments}
      />

      <div className="sales-card">
        {filtered.length === 0 ? (
          <p className="sales-empty">No orders match your filters.</p>
        ) : (
          <SalesTable orders={paginated} onView={handleView} />
        )}

        <div className="sales-footer">
          <p>
            Showing <strong>{showingFrom}</strong> to <strong>{showingTo}</strong> of{" "}
            <strong>{filtered.length}</strong> orders
          </p>
          <SalesPagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}
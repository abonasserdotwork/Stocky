import { Plus, Sparkles } from "lucide-react";

export default function InventoryHeader({ onAdjustStock }) {
  return (
    <>
      <header className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Stock management
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Inventory</h1>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            Keep your stock in check. Review availability, catch low-stock items, and log every adjustment.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdjustStock}
          className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:self-auto"
        >
          <Plus size={17} aria-hidden="true" />
          Adjust stock
        </button>
      </header>
    </>
  );
}

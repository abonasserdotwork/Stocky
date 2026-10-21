import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, X } from "lucide-react";

export default function StockAdjustmentModal({ products, initialProduct, onClose, onSave }) {
  const [productId, setProductId] = useState(initialProduct.id);
  const [direction, setDirection] = useState("add");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [formError, setFormError] = useState("");
  const selectedProduct = products.find((product) => product.id === productId) ?? initialProduct;

  function submitAdjustment(event) {
    event.preventDefault();
    const parsedAmount = Number(amount);

    if (!Number.isSafeInteger(parsedAmount) || parsedAmount < 1) {
      setFormError("Enter a whole number greater than zero.");
      return;
    }

    if (!reason.trim()) {
      setFormError("Add a reason for this stock movement.");
      return;
    }

    const change = direction === "add" ? parsedAmount : -parsedAmount;
    if (selectedProduct.quantity + change < 0) {
      setFormError(`Only ${selectedProduct.quantity} units are available to remove.`);
      return;
    }
    if (!Number.isSafeInteger(selectedProduct.quantity + change)) {
      setFormError("The resulting stock quantity is too large.");
      return;
    }

    onSave({
      productId: selectedProduct.id,
      change,
      reason: reason.trim(),
    });
  }

  function clearError() {
    setFormError("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="adjust-stock-title"
        className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-pop"
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="adjust-stock-title" className="text-lg font-semibold text-ink">Adjust stock</h2>
            <p className="mt-1 text-sm text-muted">
              {selectedProduct.name} · {selectedProduct.quantity} units on hand
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted transition hover:bg-page hover:text-ink"
            aria-label="Close stock adjustment"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <form className="mt-6 space-y-5" onSubmit={submitAdjustment} noValidate>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-ink">Product</span>
            <select
              value={productId}
              onChange={(event) => {
                setProductId(event.target.value);
                clearError();
              }}
              className="h-11 w-full rounded-lg border border-border bg-page/50 px-3 text-sm text-ink outline-none transition focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/10"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-ink">Adjustment</legend>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "add", label: "Add stock", icon: ArrowDownToLine },
                { value: "remove", label: "Remove stock", icon: ArrowUpFromLine },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setDirection(value);
                    clearError();
                  }}
                  aria-pressed={direction === value}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-semibold transition ${
                    direction === value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-surface text-muted hover:bg-page"
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-ink">Quantity</span>
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              autoFocus
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
                clearError();
              }}
              placeholder="Enter units"
              className="h-11 w-full rounded-lg border border-border bg-page/50 px-3 text-sm text-ink outline-none transition focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/10"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-ink">Reason</span>
            <input
              type="text"
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
                clearError();
              }}
              maxLength="100"
              placeholder="e.g. Supplier delivery or damaged goods"
              className="h-11 w-full rounded-lg border border-border bg-page/50 px-3 text-sm text-ink outline-none transition focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/10"
            />
          </label>

          {formError && <p className="text-sm text-danger" role="alert">{formError}</p>}

          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-lg border border-border px-4 text-sm font-semibold text-muted transition hover:bg-page"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              Save adjustment
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

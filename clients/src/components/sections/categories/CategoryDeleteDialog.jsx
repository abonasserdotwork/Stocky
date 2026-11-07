
import CategoryModal from "./CategoryModal";

export default function CategoryDeleteDialog({
  category,
  onClose,
  onConfirm,
}) {
  if (!category) return null;

  const hasProducts = Number(category.products_count) > 0;

  return (
    <CategoryModal
      title="Delete category"
      onClose={onClose}
    >
      {hasProducts ? (
        <>
          <p className="text-sm leading-6 text-ink">
            "{category.name}" has {category.products_count} products.
            You can't delete this category until those products
            are moved or deleted.
          </p>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 font-semibold hover:bg-page"
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm leading-6 text-ink">
            Delete "{category.name}"? This can't be undone.
          </p>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 font-semibold hover:bg-page"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="rounded-lg border border-danger bg-danger px-4 py-2 font-semibold text-surface transition hover:bg-danger/90"
            >
              Delete category
            </button>
          </div>
        </>
      )}
    </CategoryModal>
  );
}

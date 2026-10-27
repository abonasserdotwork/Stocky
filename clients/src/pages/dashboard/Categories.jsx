
import { useEffect, useMemo, useState } from "react";
import { useCategories } from "../../hooks/useCategories";

import CategoryToolbar from "../../components/sections/categories/CategoryToolbar";
import CategoryTable from "../../components/sections/categories/CategoryTable";
import CategoryForm from "../../components/sections/categories/CategoryForm";
import CategoryModal from "../../components/sections/categories/CategoryModal";
import CategoryEmptyState from "../../components/sections/categories/CategoryEmptyState";
import CategoryDeleteDialog from "../../components/sections/categories/CategoryDeleteDialog";
import CategoryToast from "../../components/sections/categories/CategoryToast";

export default function Categories() {
  const {
    categories,
    isLoading,
    error,
    refresh,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;

    const timer = window.setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [message]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return categories;

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(normalizedQuery) ||
        (category.description || "")
          .toLowerCase()
          .includes(normalizedQuery),
    );
  }, [categories, query]);

  const handleSave = async (data) => {
    try {
      if (editing?.id) {
        await updateCategory(editing.id, data);
        setMessage("Category updated");
      } else {
        await createCategory(data);
        setMessage("Category added");
      }

      setEditing(null);
    } catch (error) {
      console.error("Failed to save category:", error);
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!deleting?.id) return;

    try {
      await deleteCategory(deleting.id);
      setMessage("Category deleted");
    } catch (error) {
      console.error("Failed to delete category:", error);
      setMessage("Couldn't delete category");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <section className="w-full  p-4 text-[#1f2a24] sm:p-6">
      <header className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="mb-1 text-2xl font-bold">
            Categories
          </h1>

          <p className="text-sm text-[#5f6f65]">
            Group your products so they're easier to find and report on.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEditing({})}
          className="rounded-lg border border-[#3f7d5c] bg-[#3f7d5c] px-4 py-2.5 font-semibold text-white transition hover:border-[#2e5e45] hover:bg-[#2e5e45] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3f7d5c]/40"
        >
          Add category
        </button>
      </header>

      <div className="overflow-hidden rounded-xl border border-[#dde5da] bg-white">
        <CategoryToolbar
          query={query}
          onQueryChange={setQuery}
          count={filtered.length}
          total={categories.length}
        />

        {isLoading ? (
          <p className="px-4 py-10 text-center text-sm text-[#5f6f65]">
            Loading categories...
          </p>
        ) : error ? (
          <div className="px-4 py-10 text-center text-sm text-[#5f6f65]">
            <p>{error}</p>

            <button
              type="button"
              onClick={refresh}
              className="mt-3 rounded-lg border border-[#dde5da] px-4 py-2 font-semibold hover:bg-[#f6f8f4]"
            >
              Try again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <CategoryEmptyState
            isFiltered={categories.length > 0}
            query={query}
            onAdd={() => setEditing({})}
          />
        ) : (
          <CategoryTable
            categories={filtered}
            onEdit={setEditing}
            onDelete={setDeleting}
          />
        )}
      </div>

      {editing && (
        <CategoryModal
          title={editing.id ? "Edit category" : "Add category"}
          onClose={() => setEditing(null)}
        >
          <CategoryForm
            category={editing}
            existing={categories}
            onSave={handleSave}
            onClose={() => setEditing(null)}
          />
        </CategoryModal>
      )}

      <CategoryDeleteDialog
        category={deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
      />

      <CategoryToast message={message} />
    </section>
  );
}

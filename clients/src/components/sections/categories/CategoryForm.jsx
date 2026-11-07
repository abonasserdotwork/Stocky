
import { useEffect, useRef, useState } from "react";

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20";

export default function CategoryForm({
  category,
  existing,
  onSave,
  onClose,
}) {
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(
    category?.description ?? "",
  );
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const submit = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Enter a category name.");
      return;
    }

    const duplicate = existing.some(
      (item) =>
        item.id !== category?.id &&
        item.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (duplicate) {
      setError("A category with this name already exists.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      await onSave({
        name: trimmedName,
        description: description.trim(),
      });
    } catch (err) {
      console.error("Category form submit failed:", err);
      setError("Couldn't save the category. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-semibold text-ink">
          Name
        </span>

        <input
          ref={nameRef}
          className={`${inputClass} ${error ? "border-danger" : ""}`}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "category-name-error" : undefined}
        />

        {error && (
          <span
            id="category-name-error"
            className="mt-1.5 block text-xs text-danger"
          >
            {error}
          </span>
        )}
      </label>

      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-semibold text-ink">
          Description (optional)
        </span>

        <textarea
          className={inputClass}
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-border px-4 py-2 font-semibold text-ink transition hover:bg-page"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-lg border border-primary bg-primary px-4 py-2 font-semibold text-surface transition hover:border-primary-hover hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving
            ? "Saving..."
            : category?.id
              ? "Save changes"
              : "Add category"}
        </button>
      </div>
    </form>
  );
}


import { useEffect, useRef, useState } from "react";

const inputClass =
  "w-full rounded-lg border border-[#dde5da] bg-white px-3 py-2.5 text-sm text-[#1f2a24] outline-none transition focus:border-[#3f7d5c] focus:ring-4 focus:ring-[#3f7d5c]/20";

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
        <span className="mb-1.5 block text-sm font-semibold text-[#1f2a24]">
          Name
        </span>

        <input
          ref={nameRef}
          className={`${inputClass} ${error ? "border-[#c65d4e]" : ""}`}
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
            className="mt-1.5 block text-xs text-[#c65d4e]"
          >
            {error}
          </span>
        )}
      </label>

      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-semibold text-[#1f2a24]">
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
          className="rounded-lg border border-[#dde5da] px-4 py-2 font-semibold text-[#1f2a24] transition hover:bg-[#f6f8f4]"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-lg border border-[#3f7d5c] bg-[#3f7d5c] px-4 py-2 font-semibold text-white transition hover:border-[#2e5e45] hover:bg-[#2e5e45] disabled:cursor-not-allowed disabled:opacity-60"
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

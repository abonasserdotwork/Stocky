# Categories.jsx

```jsx
import { useEffect, useMemo, useRef, useState } from "react";
import "./Categories.css";

/* ------------------------------------------------------------------
   API layer (mock)
   Replace the bodies below with real calls once the backend is ready,
   e.g. list: () => fetch("/api/categories").then(r => r.json())
   The rest of the page doesn't need to change.
------------------------------------------------------------------- */
let db = [
  { id: 1, name: "Beverages", description: "Soft drinks, juices and water", products_count: 24 },
  { id: 2, name: "Dairy", description: "Milk, cheese and yogurt", products_count: 17 },
  { id: 3, name: "Snacks", description: "Chips, biscuits and nuts", products_count: 31 },
  { id: 4, name: "Cleaning supplies", description: "", products_count: 0 },
];

const wait = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const categoriesApi = {
  async list() {
    await wait();
    return db.map((c) => ({ ...c }));
  },
  async create(data) {
    await wait(250);
    const item = { id: Date.now(), products_count: 0, ...data };
    db = [item, ...db];
    return item;
  },
  async update(id, data) {
    await wait(250);
    db = db.map((c) => (c.id === id ? { ...c, ...data } : c));
    return db.find((c) => c.id === id);
  },
  async remove(id) {
    await wait(250);
    db = db.filter((c) => c.id !== id);
  },
};

/* ------------------------------------------------------------------
   Page
------------------------------------------------------------------- */
export default function Categories() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null); // null | {} (new) | category
  const [deleting, setDeleting] = useState(null);
  const [message, setMessage] = useState("");

  const load = async () => {
    setStatus("loading");
    try {
      setItems(await categoriesApi.list());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(t);
  }, [message]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.description || "").toLowerCase().includes(q)
    );
  }, [items, query]);

  const handleSave = async (data) => {
    if (editing?.id) {
      const updated = await categoriesApi.update(editing.id, data);
      setItems((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setMessage("Category updated");
    } else {
      const created = await categoriesApi.create(data);
      setItems((prev) => [created, ...prev]);
      setMessage("Category added");
    }
    setEditing(null);
  };

  const handleDelete = async () => {
    try {
      await categoriesApi.remove(deleting.id);
      setItems((prev) => prev.filter((c) => c.id !== deleting.id));
      setMessage("Category deleted");
    } catch {
      setMessage("Couldn't delete the category. Try again.");
    }
    setDeleting(null);
  };

  return (
    <section className="cat-page">
      <header className="cat-header">
        <div>
          <h1>Categories</h1>
          <p className="cat-muted">Group your products so they're easier to find and report on.</p>
        </div>
        <button className="cat-btn cat-btn-primary" onClick={() => setEditing({})}>
          Add category
        </button>
      </header>

      <div className="cat-card">
        <div className="cat-toolbar">
          <input
            type="search"
            className="cat-input"
            placeholder="Search categories"
            aria-label="Search categories"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="cat-muted">
            {status === "ready" ? `${filtered.length} of ${items.length}` : ""}
          </span>
        </div>

        {status === "loading" && <p className="cat-state">Loading categories…</p>}

        {status === "error" && (
          <div className="cat-state">
            <p>Couldn't load categories. Check your connection and try again.</p>
            <button className="cat-btn" onClick={load}>Try again</button>
          </div>
        )}

        {status === "ready" && items.length === 0 && (
          <div className="cat-empty">
            <h2>No categories yet</h2>
            <p>Add your first category to start organizing products.</p>
            <button className="cat-btn cat-btn-primary" onClick={() => setEditing({})}>
              Add category
            </button>
          </div>
        )}

        {status === "ready" && items.length > 0 && filtered.length === 0 && (
          <p className="cat-state">No categories match “{query}”.</p>
        )}

        {status === "ready" && filtered.length > 0 && (
          <div className="cat-table-wrap">
            <table className="cat-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="cat-hide-sm">Description</th>
                  <th>Products</th>
                  <th className="cat-actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td className="cat-name">{c.name}</td>
                    <td className="cat-hide-sm cat-muted">{c.description || "—"}</td>
                    <td>
                      <span className="cat-badge">{c.products_count}</span>
                    </td>
                    <td className="cat-actions-col">
                      <button className="cat-btn cat-btn-sm" onClick={() => setEditing(c)}>
                        Edit
                      </button>
                      <button
                        className="cat-btn cat-btn-sm cat-btn-danger-outline"
                        onClick={() => setDeleting(c)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <Modal title={editing.id ? "Edit category" : "Add category"} onClose={() => setEditing(null)}>
          <CategoryForm
            category={editing}
            existing={items}
            onSave={handleSave}
            onClose={() => setEditing(null)}
          />
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete category" onClose={() => setDeleting(null)}>
          {deleting.products_count > 0 ? (
            <>
              <p>
                “{deleting.name}” has {deleting.products_count} products. Move or delete them
                first, then you can delete this category.
              </p>
              <div className="cat-modal-actions">
                <button className="cat-btn" onClick={() => setDeleting(null)}>Close</button>
              </div>
            </>
          ) : (
            <>
              <p>Delete “{deleting.name}”? This can't be undone.</p>
              <div className="cat-modal-actions">
                <button className="cat-btn" onClick={() => setDeleting(null)}>Cancel</button>
                <button className="cat-btn cat-btn-danger" onClick={handleDelete}>
                  Delete category
                </button>
              </div>
            </>
          )}
        </Modal>
      )}

      <div className="cat-toast" role="status" aria-live="polite">
        {message}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Modal + form
------------------------------------------------------------------- */
function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="cat-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="cat-modal" role="dialog" aria-modal="true" aria-labelledby="cat-modal-title">
        <h2 id="cat-modal-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function CategoryForm({ category, existing, onSave, onClose }) {
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return setError("Enter a category name.");

    const duplicate = existing.some(
      (c) => c.id !== category?.id && c.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (duplicate) return setError("A category with this name already exists.");

    setSaving(true);
    try {
      await onSave({ name: trimmed, description: description.trim() });
    } catch {
      setError("Couldn't save the category. Try again.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      <label className="cat-field">
        <span>Name</span>
        <input
          ref={nameRef}
          className={`cat-input ${error ? "cat-input-error" : ""}`}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "cat-name-error" : undefined}
        />
        {error && (
          <span id="cat-name-error" className="cat-error">
            {error}
          </span>
        )}
      </label>

      <label className="cat-field">
        <span>Description (optional)</span>
        <textarea
          className="cat-input"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <div className="cat-modal-actions">
        <button type="button" className="cat-btn" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="cat-btn cat-btn-primary" disabled={saving}>
          {saving ? "Saving…" : category?.id ? "Save changes" : "Add category"}
        </button>
      </div>
    </form>
  );
}
```

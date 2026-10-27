
import { useCallback, useEffect, useState } from "react";
import { categoriesService } from "../services/categoriesService";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await categoriesService.getAll();

      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load categories:", err);
      setError("Couldn't load categories.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createCategory = useCallback(async (data) => {
    const created = await categoriesService.create(data);

    setCategories((current) => [created, ...current]);

    return created;
  }, []);

  const updateCategory = useCallback(async (id, data) => {
    const updated = await categoriesService.update(id, data);

    if (!updated) {
      throw new Error("Category not found.");
    }

    setCategories((current) =>
      current.map((category) =>
        category.id === id ? updated : category,
      ),
    );

    return updated;
  }, []);

  const deleteCategory = useCallback(async (id) => {
    await categoriesService.remove(id);

    setCategories((current) =>
      current.filter((category) => category.id !== id),
    );
  }, []);

  return {
    categories,
    isLoading,
    error,
    refresh,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}

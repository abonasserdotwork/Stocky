import { initialCategories } from "../data/categoriesData";

let categories = initialCategories.map((category) => ({ ...category }));

const delay = (ms = 0) =>
  new Promise((resolve) => {
    if (ms === 0) resolve();
    else setTimeout(resolve, ms);
  });

export const categoriesService = {
  async getAll() {
    await delay();
    return categories.map((category) => ({ ...category }));
  },

  async create(data) {
    await delay();
    const category = {
      id: Date.now(),
      products_count: 0,
      ...data,
    };
    categories = [category, ...categories];
    return { ...category };
  },

  async update(id, data) {
    await delay();
    categories = categories.map((category) =>
      category.id === id ? { ...category, ...data } : category,
    );
    const updated = categories.find((category) => category.id === id);
    return updated ? { ...updated } : null;
  },

  async remove(id) {
    await delay();
    categories = categories.filter((category) => category.id !== id);
    return true;
  },

  async reset() {
    await delay();
    categories = initialCategories.map((category) => ({ ...category }));
    return categories.map((category) => ({ ...category }));
  },
};

console.log("Categories service loaded:", categories);

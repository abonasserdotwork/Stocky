import axiosClient from "./axiosClient";

export const categoriesService = {
  async getAll() {
    const { data } = await axiosClient.get("/categories");
    return data.data;
  },

  async create(payload) {
    const { data } = await axiosClient.post("/categories", payload);
    return data.data;
  },

  async update(id, payload) {
    const { data } = await axiosClient.put(`/categories/${id}`, payload);
    return data.data;
  },

  async remove(id) {
    await axiosClient.delete(`/categories/${id}`);
    return true;
  },
};
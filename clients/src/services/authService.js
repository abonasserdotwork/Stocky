import axiosClient from "./axiosClient";

// Server returns { success, accessToken, user }
export async function login({ email, password }) {
  const { data } = await axiosClient.post("/auth/login", { email, password });
  return data;
}

export async function register({ name, email, password }) {
  const { data } = await axiosClient.post("/auth/register", { name, email, password });
  return data;
}

export async function getMe() {
  const { data } = await axiosClient.get("/auth/me");
  return data.user;
}

export async function logout() {
  await axiosClient.post("/auth/logout");
}
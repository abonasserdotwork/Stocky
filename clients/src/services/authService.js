import axiosClient from "./axiosClient";

// ASSUMPTION (waiting for M1): login returns { token, user }
export async function login({ email, password }) {
  const response = await axiosClient.post("/auth/login", { email, password });
  return response.data;
}

// ASSUMPTION (waiting for M1): /auth/me returns the user object
export async function getMe() {
  const response = await axiosClient.get("/auth/me");
  return response.data;
}
import axios from "axios";
import { getToken, saveToken, removeToken } from "../utils/tokenStorage";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// withCredentials lets the browser send the httpOnly refresh cookie
const axiosClient = axios.create({ baseURL, withCredentials: true });

axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// One refresh at a time. Without this, two parallel refreshes use the same cookie,
// and the server (which rotates the token) rejects the second one.
let refreshing = null;
export function refreshAccessToken() {
  if (!refreshing) {
    refreshing = axios
      .post(`${baseURL}/auth/refresh`, null, { withCredentials: true })
      .then((res) => {
        saveToken(res.data.accessToken);
        return res.data.accessToken;
      })
      .finally(() => {
        refreshing = null;
      });
  }
  return refreshing;
}

const NO_RETRY = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"];

// If a request fails with 401, refresh the token once and repeat the request
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const skip = NO_RETRY.some((p) => original?.url?.startsWith(p));

    if (error.response?.status === 401 && original && !original._retry && !skip) {
      original._retry = true;
      try {
        const token = await refreshAccessToken();
        original.headers.Authorization = `Bearer ${token}`;
        return axiosClient(original);
      } catch {
        removeToken();
        window.dispatchEvent(new Event("auth:logout")); // AuthContext listens
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
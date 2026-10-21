// import axios from "axios";
// import { getToken } from "../utils/tokenStorage";

// const axiosClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

// // Runs before EVERY request: adds the token if we have one
// axiosClient.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosClient;
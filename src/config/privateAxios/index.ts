import axios from "axios";

export const axiosPrivate = axios.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer Hey`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// axiosPrivate.interceptors.response.use((error) => {
//   // Handle the error
//   return Promise.reject(error);
// });

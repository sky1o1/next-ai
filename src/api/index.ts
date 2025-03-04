import axios from "axios";

const baseURL = "https://dummyjson.com/";
const loginURL = "https://dummyjson.com/auth/";

export const privateAgent = axios.create({
  baseURL,
});

export const axiosClient = axios.create({
  baseURL: loginURL,
});

privateAgent.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

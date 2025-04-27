import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const getPosts = () => api.get("/posts").then((res) => res.data);
export const createPost = (data) =>
  api.post("/posts", data).then((res) => res.data);
export const updatePost = (id, data) =>
  api.put(`/posts/${id}`, data).then((res) => res.data);
export const deletePost = (id) =>
  api.delete(`/posts/${id}`).then((res) => res.data);

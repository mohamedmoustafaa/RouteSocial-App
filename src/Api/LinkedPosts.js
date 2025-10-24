// src/api/linkedPostsAPI.js
import axios from "axios";

 const linkedPostsAPI = axios.create({
  baseURL: "https://linked-posts.routemisr.com",
});
linkedPostsAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default linkedPostsAPI;

import axios from "axios";

// const API = axios.create({ baseURL: "https://xela-social-media-backend.herokuapp.com/" });
const API = axios.create({ baseURL: "http://localhost:9000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getPosts = () => API.get("/posts");

export const createPost = (formData) => API.post("/posts", formData);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const saveMessage = (id) => API.post(`/posts/${id}/saveMessage`);

export const signin = (formData) => API.post("/auth/signin", formData);
export const signup = (formData) => API.post("/auth/signup", formData);

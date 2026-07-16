import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signupUser = (userData) => api.post("api/auth/signup", userData);
export const loginUser = (userData) => api.post("api/auth/login", userData);
export const saveInvoice = (data) => api.post("/api/invoices", data);
export const getInvoicePreview = () => {
  return api.get("/api/invoices/preview-number");
};
export const getAllInvoices = () => api.get("/api/invoices");
export const getInvoice = (id) => api.get(`/api/invoices/${id}`);
export const deleteInvoice = (id) => api.delete(`/api/invoices/${id}`);
export const updateInvoice = (id, data) => api.put(`/api/invoices/${id}`, data);
// user Account
export const getMe = () => api.get("/api/users/me");
export const deleteAccount = () => api.delete("/api/users/delete-account");
// default seller
export const getAllSenders = () => api.get("/api/sender");
export const getDefaultSender = () => api.get("/api/sender/default");
export const createSender = (data) => api.post("/api/sender", data);
export const updateSender = (id, data) => api.put(`/api/sender/${id}`, data);
export const deleteSender = (id) => api.delete(`/api/sender/${id}`);
export const setDefaultSender = (id) => api.put(`/api/sender/${id}/default`);
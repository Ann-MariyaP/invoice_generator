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
export const getNextInvoiceNumber = () => {
  return api.get("/api/invoices/next-number");
};
export const getAllInvoices = () => api.get("/api/invoices");
export const getInvoice = (id) => api.get(`/api/invoices/${id}`);
export const deleteInvoice = (id) => api.delete(`/api/invoices/${id}`);
export const updateInvoice = (id, data) => api.put(`/api/invoices/${id}`, data);
export const getMe = () => api.get("/api/users/me");
// default seller
export const getAllSenders = () => api.get("/api/sender");
export const getDefaultSender = () => api.get("/api/sender/default");
export const createSender = (data) => api.post("/api/sender", data);
export const updateSender = (id, data) => api.put(`/api/sender/${id}`, data);
export const deleteSender = (id) => api.delete(`/api/sender/${id}`);
export const setDefaultSender = (id) => api.put(`/api/sender/${id}/default`);
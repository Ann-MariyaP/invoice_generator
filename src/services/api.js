import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const saveInvoice = (data) => api.post("/invoices", data);
export const getNextInvoiceNumber = () => {
  return axios.get("http://localhost:5000/api/invoices/next-number");
};
export const getAllInvoices = () => api.get("/invoices");
export const getInvoice = (id) => api.get(`/invoices/${id}`);
export const updateInvoice = (id, data) => api.put(`/invoices/${id}`, data);
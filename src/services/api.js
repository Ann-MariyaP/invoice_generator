// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000",
// });

// const api = axios.create({
//   baseURL: "https://invoice-backend-1-p9ic.onrender.com",
// });

// export const saveInvoice = (data) => api.post("/invoices", data);
// export const getNextInvoiceNumber = () => {
//   return axios.get(
//     "http://localhost:5000/api/invoices/next-number",
//   );
// };

// export const getAllInvoices = () => api.get("/invoices");
// export const getInvoice = (id) => api.get(`/invoices/${id}`);
// export const updateInvoice = (id, data) => api.put(`/invoices/${id}`, data);
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const saveInvoice = (data) => api.post("/api/invoices", data);

export const getNextInvoiceNumber = () => {
  return api.get("/api/invoices/next-number");
};

export const getAllInvoices = () => api.get("/api/invoices");

export const getInvoice = (id) => api.get(`/api/invoices/${id}`);

export const updateInvoice = (id, data) => api.put(`/api/invoices/${id}`, data);
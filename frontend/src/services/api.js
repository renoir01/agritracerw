/**
 * API Service for AGRITRACE
 * Handles all HTTP requests to the backend
 */

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  login: (credentials) => api.post('/users/login/', credentials),
  register: (userData) => api.post('/users/register/', userData),
  logout: () => api.post('/users/logout/'),
  refreshToken: (refreshToken) => api.post('/users/token/refresh/', { refresh: refreshToken }),
  getCurrentUser: () => api.get('/users/me/'),
};

// User APIs
export const userAPI = {
  getProfile: () => api.get('/users/profile/'),
  updateProfile: (data) => api.patch('/users/profile/', data),
  getUsers: (params) => api.get('/users/', { params }),
  getUserById: (id) => api.get(`/users/${id}/`),
  verifyUser: (id) => api.post(`/users/${id}/verify/`),
};

// Product APIs
export const productAPI = {
  getProducts: (params) => api.get('/products/', { params }),
  getProductById: (id) => api.get(`/products/${id}/`),
  getProductByQR: (qrCode) => api.get(`/products/qr/${qrCode}/`),
  createProduct: (data) => api.post('/products/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateProduct: (id, data) => api.patch(`/products/${id}/`, data),
  deleteProduct: (id) => api.delete(`/products/${id}/`),
  verifyProduct: (qrCode, data) => api.post(`/products/${qrCode}/verify/`, data),
  generateQR: (productId) => api.get(`/products/${productId}/qr-code/`),
};

// Batch APIs
export const batchAPI = {
  getBatches: (params) => api.get('/products/batches/', { params }),
  getBatchById: (id) => api.get(`/products/batches/${id}/`),
  createBatch: (data) => api.post('/products/batches/', data),
  updateBatch: (id, data) => api.patch(`/products/batches/${id}/`, data),
};

// Transaction APIs
export const transactionAPI = {
  getTransactions: (params) => api.get('/transactions/', { params }),
  getTransactionById: (id) => api.get(`/transactions/${id}/`),
  createTransaction: (data) => api.post('/transactions/', data),
  updateTransaction: (id, data) => api.patch(`/transactions/${id}/`, data),
  getMyTransactions: () => api.get('/transactions/my-transactions/'),
};

// Supply Chain APIs
export const supplyChainAPI = {
  getSupplyChain: (qrCode) => api.get(`/transactions/supply-chain/${qrCode}/`),
  addSupplyChainStep: (data) => api.post('/transactions/supply-chain/', data),
  getSupplyChainHistory: (productId) => api.get(`/transactions/supply-chain/history/${productId}/`),
};

// Blockchain APIs
export const blockchainAPI = {
  registerProduct: (data) => api.post('/blockchain/register-product/', data),
  verifyProduct: (qrCode) => api.get(`/blockchain/verify/${qrCode}/`),
  getBlockchainStatus: () => api.get('/blockchain/status/'),
  syncProduct: (productId) => api.post(`/blockchain/sync/${productId}/`),
};

// Analytics APIs
export const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard/'),
  getProductStats: (params) => api.get('/analytics/products/', { params }),
  getTransactionStats: (params) => api.get('/analytics/transactions/', { params }),
  getUserStats: (params) => api.get('/analytics/users/', { params }),
  getSupplyChainStats: () => api.get('/analytics/supply-chain/'),
  exportData: (type, params) => api.get(`/analytics/export/${type}/`, { 
    params,
    responseType: 'blob'
  }),
};

// Certification APIs
export const certificationAPI = {
  getCertifications: (productId) => api.get(`/products/${productId}/certifications/`),
  createCertification: (data) => api.post('/products/certifications/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  verifyCertification: (id) => api.post(`/products/certifications/${id}/verify/`),
};

// USSD APIs
export const ussdAPI = {
  handleUSSD: (data) => api.post('/ussd/callback/', data),
  sendSMS: (data) => api.post('/ussd/sms/', data),
};

// Location APIs
export const locationAPI = {
  getLocations: (params) => api.get('/users/locations/', { params }),
  createLocation: (data) => api.post('/users/locations/', data),
  searchLocations: (query) => api.get('/users/locations/search/', { params: { q: query } }),
};

export default api;

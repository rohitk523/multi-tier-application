import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ProductsResponse {
  products: Product[];
}

export interface ProductResponse {
  product: Product;
}

export const authAPI = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials),
  
  register: (userData: RegisterData) =>
    api.post<AuthResponse>('/auth/register', userData),
  
  getCurrentUser: () =>
    api.get<{ user: User }>('/auth/me'),
};

export const productsAPI = {
  getProducts: () =>
    api.get<ProductsResponse>('/products'),
  
  getProduct: (id: number) =>
    api.get<ProductResponse>(`/products/${id}`),
  
  createProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) =>
    api.post<ProductResponse>('/products', product),
  
  updateProduct: (id: number, product: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>) =>
    api.put<ProductResponse>(`/products/${id}`, product),
  
  deleteProduct: (id: number) =>
    api.delete<{ message: string }>(`/products/${id}`),
};

export default api; 
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (userData: { username: string; email: string; password: string }) =>
    api.post('/auth/register', userData),
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
};

export const recipes = {
  getAll: () => api.get('/recipes'),
  getOne: (id: string) => api.get(`/recipes/${id}`),
  create: (recipeData: any) => api.post('/recipes', recipeData),
  update: (id: string, recipeData: any) => api.put(`/recipes/${id}`, recipeData),
  delete: (id: string) => api.delete(`/recipes/${id}`),
  like: (id: string) => api.put(`/recipes/${id}/like`),
};

export const users = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData: any) => api.put('/users/profile', userData),
  getSavedRecipes: () => api.get('/users/saved-recipes'),
};

export default api; 
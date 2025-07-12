import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});




API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// ✅ Auth endpoints
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (data) => API.post('/auth/register', data);
export const getCurrentUser = () => API.get('/auth/me');

// ✅ Task endpoints
export const fetchTasks = () => API.get('/tasks');
export const createTask = (taskData) => API.post('/tasks', taskData);
export const updateTaskStatus = (taskId, status) => API.patch(`/tasks/${taskId}`, { status });
export const deleteTask = (taskId) => API.delete(`/tasks/${taskId}`);
export const fetchUserTasks = () => API.get('/tasks/my-tasks');

// ✅ User endpoints
export const fetchUsers = () => API.get('/users');

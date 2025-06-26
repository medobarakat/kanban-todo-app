import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const taskApi = {
  // Get all tasks
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  // Get tasks with pagination
  getTasksPaginated: async (page = 1, limit = 5, search = '') => {
    const params = {
      _page: page,
      _limit: limit,
      ...(search && { q: search })
    };
    const response = await api.get('/tasks', { params });
    return {
      data: response.data,
      totalCount: parseInt(response.headers['x-total-count'] || '0'),
      totalPages: Math.ceil(parseInt(response.headers['x-total-count'] || '0') / limit)
    };
  },

  // Create new task
  createTask: async (task) => {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  // Update task
  updateTask: async (id, task) => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  // Delete task
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
    return id;
  },

  // Update task column (for drag and drop)
  updateTaskColumn: async (id, column) => {
    const response = await api.patch(`/tasks/${id}`, { column });
    return response.data;
  }
};

export default api;
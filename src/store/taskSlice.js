import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filteredTasks: [],
  searchTerm: '',
  pagination: {
    backlog: { page: 1, totalPages: 1 },
    in_progress: { page: 1, totalPages: 1 },
    review: { page: 1, totalPages: 1 },
    done: { page: 1, totalPages: 1 }
  },
  loading: false,
  error: null
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.filteredTasks = action.payload;
    },
    
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.filteredTasks = state.tasks.filter(task =>
        task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
    
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        state.filteredTasks = state.tasks.filter(task =>
          task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }
    },
    
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      state.filteredTasks = state.filteredTasks.filter(task => task.id !== action.payload);
    },
    
    moveTask: (state, action) => {
      const { taskId, newColumn } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.column = newColumn;
      }
      const filteredTask = state.filteredTasks.find(task => task.id === taskId);
      if (filteredTask) {
        filteredTask.column = newColumn;
      }
    },
    
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredTasks = state.tasks.filter(task =>
        task.title.toLowerCase().includes(action.payload.toLowerCase()) ||
        task.description.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    
    setPagination: (state, action) => {
      const { column, page, totalPages } = action.payload;
      state.pagination[column] = { page, totalPages };
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  setSearchTerm,
  setPagination,
  setLoading,
  setError
} = taskSlice.actions;

export default taskSlice.reducer;
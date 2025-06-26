import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskModal: {
    isOpen: false,
    mode: 'create', // 'create' or 'edit'
    task: null
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openTaskModal: (state, action) => {
      state.taskModal.isOpen = true;
      state.taskModal.mode = action.payload.mode;
      state.taskModal.task = action.payload.task || null;
    },
    
    closeTaskModal: (state) => {
      state.taskModal.isOpen = false;
      state.taskModal.mode = 'create';
      state.taskModal.task = null;
    }
  }
});

export const {
  openTaskModal,
  closeTaskModal
} = uiSlice.actions;

export default uiSlice.reducer;
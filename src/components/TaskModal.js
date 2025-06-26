import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeTaskModal } from '../store/uiSlice';
import { useTasks } from '../hooks/useTasks';
import { COLUMNS, COLUMN_TITLES } from '../utils/constants';

const TaskModal = () => {
  const dispatch = useDispatch();
  const { taskModal } = useSelector(state => state.ui);
  const { createTask, updateTask, isCreating, isUpdating } = useTasks();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    column: COLUMNS.BACKLOG
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskModal.isOpen) {
      if (taskModal.mode === 'edit' && taskModal.task) {
        setFormData({
          title: taskModal.task.title,
          description: taskModal.task.description,
          column: taskModal.task.column
        });
      } else {
        setFormData({
          title: '',
          description: '',
          column: taskModal.task?.column || COLUMNS.BACKLOG
        });
      }
      setErrors({});
    }
  }, [taskModal]);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      column: formData.column
    };

    if (taskModal.mode === 'edit') {
      updateTask({ id: taskModal.task.id, task: taskData });
    } else {
      createTask(taskData);
    }

    handleClose();
  };

  const handleClose = () => {
    dispatch(closeTaskModal());
    setFormData({
      title: '',
      description: '',
      column: COLUMNS.BACKLOG
    });
    setErrors({});
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Dialog
      open={taskModal.isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        {taskModal.mode === 'edit' ? 'Edit Task' : 'Create New Task'}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          <TextField
            label="Task Title"
            value={formData.title}
            onChange={handleInputChange('title')}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            variant="outlined"
            autoFocus
          />

          <TextField
            label="Description"
            value={formData.description}
            onChange={handleInputChange('description')}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel>Column</InputLabel>
            <Select
              value={formData.column}
              onChange={handleInputChange('column')}
              label="Column"
            >
              {Object.values(COLUMNS).map(column => (
                <MenuItem key={column} value={column}>
                  {COLUMN_TITLES[column]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          onClick={handleClose}
          disabled={isLoading}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          variant="contained"
          sx={{ ml: 2 }}
        >
          {isLoading ? 'Saving...' : (taskModal.mode === 'edit' ? 'Update' : 'Create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
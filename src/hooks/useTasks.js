import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { taskApi } from '../services/api';
import { setTasks, addTask, updateTask, deleteTask, moveTask, setLoading, setError } from '../store/taskSlice';

export const useTasks = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Fetch all tasks
  const {
    data: tasks = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskApi.getTasks,
    onSuccess: (data) => {
      dispatch(setTasks(data));
    },
    onError: (error) => {
      dispatch(setError(error.message));
    }
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks = []) => [...oldTasks, newTask]);
      dispatch(addTask(newTask));
    },
    onError: (error) => {
      dispatch(setError(error.message));
    }
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, task }) => taskApi.updateTask(id, task),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks = []) =>
        oldTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
      );
      dispatch(updateTask(updatedTask));
    },
    onError: (error) => {
      dispatch(setError(error.message));
    }
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['tasks'], (oldTasks = []) =>
        oldTasks.filter(task => task.id !== deletedId)
      );
      dispatch(deleteTask(deletedId));
    },
    onError: (error) => {
      dispatch(setError(error.message));
    }
  });

  // Move task mutation (for drag and drop)
  const moveTaskMutation = useMutation({
    mutationFn: ({ id, column }) => taskApi.updateTaskColumn(id, column),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks = []) =>
        oldTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
      );
      dispatch(moveTask({ taskId: updatedTask.id, newColumn: updatedTask.column }));
    },
    onError: (error) => {
      dispatch(setError(error.message));
    }
  });

  return {
    tasks,
    isLoading,
    error,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    moveTask: moveTaskMutation.mutate,
    isCreating: createTaskMutation.isLoading,
    isUpdating: updateTaskMutation.isLoading,
    isDeleting: deleteTaskMutation.isLoading,
    isMoving: moveTaskMutation.isLoading
  };
};
import  { useState, useMemo, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import {
  Paper,
  Typography,
  Box,
  Button,
  Pagination
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import TaskCard from './TaskCard';
import { openTaskModal } from '../store/uiSlice';
import { COLUMN_TITLES, COLUMN_COLORS, TASKS_PER_PAGE } from '../utils/constants';

const Column = ({ columnId }) => {
  const dispatch = useDispatch();
  const { filteredTasks, searchTerm } = useSelector(state => state.tasks);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter tasks for this column
  const columnTasks = useMemo(() => {
    return filteredTasks.filter(task => task.column === columnId);
  }, [filteredTasks, columnId]);

  // Reset pagination when search term changes or tasks change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, columnTasks.length]);

  // Pagination
  const totalPages = Math.ceil(columnTasks.length / TASKS_PER_PAGE);
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const endIndex = startIndex + TASKS_PER_PAGE;
  const paginatedTasks = columnTasks.slice(startIndex, endIndex);

  const handleAddTask = () => {
    dispatch(openTaskModal({ 
      mode: 'create', 
      task: { title: '', description: '', column: columnId } 
    }));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        width: 280,
        backgroundColor: COLUMN_COLORS[columnId],
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#333',
              fontSize: '1.1rem'
            }}
          >
            {COLUMN_TITLES[columnId]}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.75rem',
              fontWeight: 500
            }}
          >
            {columnTasks.length}
          </Typography>
        </Box>
        
        <Button
          variant="outlined"
          size="small"
          startIcon={<Add />}
          onClick={handleAddTask}
          sx={{
            width: '100%',
            textTransform: 'none',
            borderColor: '#1976d2',
            color: '#1976d2',
            '&:hover': {
              backgroundColor: '#e3f2fd',
              borderColor: '#1976d2'
            }
          }}
        >
          Add Task
        </Button>
      </Box>

      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              p: 2,
              minHeight: 400,
              maxHeight: 500,
              overflowY: 'auto',
              backgroundColor: snapshot.isDraggingOver ? '#e3f2fd' : 'transparent',
              transition: 'background-color 0.2s ease'
            }}
          >
            {paginatedTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
              />
            ))}
            {provided.placeholder}
            
            {paginatedTasks.length === 0 && columnTasks.length === 0 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 200,
                  color: '#999',
                  textAlign: 'center'
                }}
              >
                <Typography variant="body2">
                  No tasks in this column
                </Typography>
              </Box>
            )}

            {paginatedTasks.length === 0 && columnTasks.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 200,
                  color: '#999',
                  textAlign: 'center'
                }}
              >
                <Typography variant="body2">
                  No tasks found on this page
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Droppable>

      {totalPages > 1 && (
        <Box sx={{ p: 2, backgroundColor: 'white', borderTop: '1px solid #e0e0e0' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            size="small"
            color="primary"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              '& .MuiPagination-ul': {
                justifyContent: 'center'
              }
            }}
          />
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 1,
              color: 'text.secondary'
            }}
          >
            Page {currentPage} of {totalPages} ({columnTasks.length} total tasks)
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default Column;
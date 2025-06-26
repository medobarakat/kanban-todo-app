import { DragDropContext } from 'react-beautiful-dnd';
import {
  Box,
  Container,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { useSelector } from 'react-redux';
import Column from './Column';
import SearchBar from './SearchBar';
import TaskModal from './TaskModal';
import { useTasks } from '../hooks/useTasks';
import { COLUMNS } from '../utils/constants';

const Board = () => {
  const { error, loading } = useSelector(state => state.tasks);
  const { moveTask, isMoving } = useTasks();

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Check if task was dropped outside of droppable area
    if (!destination) return;

    // Check if task was dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move task to new column
    const taskId = parseInt(draggableId);
    const newColumn = destination.droppableId;
    
    // Validate that the destination column exists
    if (!Object.values(COLUMNS).includes(newColumn)) {
      console.error('Invalid destination column:', newColumn);
      return;
    }
    
    moveTask({ id: taskId, column: newColumn });
  };

  const handleDragStart = (start) => {
  };

  const handleDragUpdate = (update) => {
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        py: 4
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              color: '#1976d2',
              mb: 1,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Kanban Task Board
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Organize your tasks efficiently
          </Typography>
        </Box>

        <SearchBar />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Kanban Board */}
        <DragDropContext 
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragUpdate={handleDragUpdate}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              pb: 2,
              justifyContent: { xs: 'flex-start', lg: 'center' },
              minWidth: 'fit-content'
            }}
          >
            {Object.values(COLUMNS).map(columnId => (
              <Column key={columnId} columnId={columnId} />
            ))}
          </Box>
        </DragDropContext>

        {/* Loading overlay for drag operations */}
        {isMoving && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Container>

      <TaskModal />
    </Box>
  );
};

export default Board;
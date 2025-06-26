import { Draggable } from 'react-beautiful-dnd';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { openTaskModal } from '../store/uiSlice';
import { useTasks } from '../hooks/useTasks';

const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();
  const { deleteTask } = useTasks();

  const handleEdit = () => {
    dispatch(openTaskModal({ mode: 'edit', task }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            mb: 2,
            backgroundColor: snapshot.isDragging ? '#f5f5f5' : 'white',
            transform: snapshot.isDragging ? 'rotate(5deg)' : 'none',
            boxShadow: snapshot.isDragging ? 4 : 1,
            cursor: 'grab',
            '&:hover': {
              boxShadow: 3,
            },
            '&:active': {
              cursor: 'grabbing',
            }
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#1976d2',
                  lineHeight: 1.2,
                  flex: 1
                }}
              >
                {task.title}
              </Typography>
              <Box sx={{ display: 'flex', ml: 1 }}>
                <IconButton
                  size="small"
                  onClick={handleEdit}
                  sx={{ color: '#666', p: 0.5 }}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleDelete}
                  sx={{ color: '#f44336', p: 0.5, ml: 0.5 }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.875rem',
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {task.description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
import React from 'react';
import {
  TextField,
  InputAdornment,
  Box
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../store/taskSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.tasks.searchTerm);

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm(''));
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
      <TextField
        placeholder="Search tasks by title or description..."
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        size="medium"
        sx={{
          width: '100%',
          maxWidth: 600,
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            borderRadius: 2,
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <Clear
                sx={{ cursor: 'pointer', color: 'action.active' }}
                onClick={handleClearSearch}
              />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
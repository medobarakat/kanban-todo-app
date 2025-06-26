export const COLUMNS = {
  BACKLOG: 'backlog',
  IN_PROGRESS: 'in_progress',
  REVIEW: 'review',
  DONE: 'done'
};

export const COLUMN_TITLES = {
  [COLUMNS.BACKLOG]: 'Backlog',
  [COLUMNS.IN_PROGRESS]: 'In Progress',
  [COLUMNS.REVIEW]: 'Review',
  [COLUMNS.DONE]: 'Done'
};

export const COLUMN_COLORS = {
  [COLUMNS.BACKLOG]: '#f5f5f5',
  [COLUMNS.IN_PROGRESS]: '#e3f2fd',
  [COLUMNS.REVIEW]: '#fff3e0',
  [COLUMNS.DONE]: '#e8f5e8'
};

export const API_BASE_URL = 'http://localhost:4000';
export const TASKS_PER_PAGE = 3;
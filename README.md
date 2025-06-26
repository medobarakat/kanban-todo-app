# Kanban Todo Dashboard

A modern, responsive Kanban-style todo application built with React, Redux, and Material-UI. This application provides an intuitive drag-and-drop interface for managing tasks across different workflow stages.

## 🚀 Features

- **Four Column Layout**: Backlog, In Progress, Review, Done
- **Drag & Drop**: Seamlessly move tasks between columns
- **CRUD Operations**: Create, read, update, and delete tasks
- **Search Functionality**: Filter tasks by title or description
- **Pagination System**: 3 tasks per page with navigation controls
  - Backlog: 6 tasks (2 pages) 
  - In Progress: 5 tasks (2 pages)
  - Review: 5 tasks (2 pages)
  - Done: 3 tasks (1 page, no pagination)
- **Responsive Design**: Works perfectly on desktop and mobile
- **Real-time Updates**: Data persistence with React Query caching
- **Modern UI**: Clean, professional interface with Material-UI

## 🛠️ Tech Stack

- **Frontend**: React 18
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **UI Framework**: Material-UI (MUI)
- **Drag & Drop**: react-beautiful-dnd
- **API**: JSON Server (mock API)
- **HTTP Client**: Axios

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd kanban-todo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Development Dependencies (Important!)

The project uses `concurrently` to run both servers simultaneously:

```bash
npm install concurrently --save-dev
```

### 4. Install JSON Server Globally

```bash
npm install -g json-server
```

**Note**: If you get permission errors on Mac/Linux, use:
```bash
sudo npm install -g json-server
```

### 5. Verify JSON Server Installation

```bash
json-server --version
```

You should see a version number (e.g., "0.17.4"). If you get "command not found", repeat step 4.

### 6. Start the Application

You have two options to run the application:

#### Option A: Run both servers simultaneously (Recommended)

```bash
npm run dev
```

This will start both the JSON server (port 4000) and React app (port 3000) concurrently.

**Expected output:**
```
[0] JSON Server is running on http://localhost:4000
[1] webpack compiled successfully
[1] Local: http://localhost:3000
```

#### Option B: Run servers separately (If Option A doesn't work)

**Terminal 1 - Start JSON Server:**
```bash
npm run server
# OR directly: json-server --watch db.json --port 4000
```

**Terminal 2 - Start React App:**
```bash
npm start
```

### 7. Access the Application

- **Frontend**: http://localhost:3000
- **API Server**: http://localhost:4000
- **API Endpoints**: http://localhost:4000/tasks

### 8. Verify Everything is Working

1. **Check the API**: Visit http://localhost:4000/tasks - you should see JSON data with 23 tasks
2. **Check the App**: Visit http://localhost:3000 - you should see the Kanban board
3. **Test Pagination**: You should see pagination controls at the bottom of columns with more than 3 tasks

## 🚨 Troubleshooting Common Issues

### Issue 1: "concurrently is not recognized"

**Solution:**
```bash
npm install concurrently --save-dev
npm run dev
```

### Issue 2: "json-server is not recognized"

**Solution:**
```bash
npm install -g json-server
# On Mac/Linux with permission issues:
sudo npm install -g json-server
```

### Issue 3: Port already in use

**Solution:**
```bash
# Kill processes using the ports
npx kill-port 3000
npx kill-port 4000
# Then restart
npm run dev
```

### Issue 4: Pagination not showing

**Expected behavior:**
- **Backlog**: 6 tasks → 2 pages (3 tasks per page)
- **In Progress**: 5 tasks → 2 pages  
- **Review**: 5 tasks → 2 pages
- **Done**: 3 tasks → 1 page (no pagination)

If you don't see pagination, make sure:
1. The JSON server is running and has the updated `db.json` with 23 tasks
2. The frontend is fetching data correctly (check browser developer tools)

### Issue 5: Empty columns

If all columns are empty:
1. Check if JSON server is running: http://localhost:4000/tasks
2. Check browser console for errors
3. Make sure both servers are running

## 🚀 Quick Start Commands (Copy & Paste)

For a fresh setup, run these commands in order:

```bash
# 1. Install all dependencies
npm install
npm install concurrently --save-dev

# 2. Install JSON Server globally  
npm install -g json-server

# 3. Verify JSON Server installation
json-server --version

# 4. Start both servers
npm run dev
```

**Verification Steps:**
1. ✅ JSON Server running → http://localhost:4000/tasks (should show 23 tasks)
2. ✅ React App running → http://localhost:3000 (should show Kanban board)
3. ✅ Pagination visible → Backlog, In Progress, and Review columns should have page controls
4. ✅ Drag & Drop working → Try moving a task between columns
5. ✅ Search working → Type in search bar to filter tasks

## 🔄 Development Workflow

1. **Start development**: `npm run dev`
2. **Stop servers**: `Ctrl+C` in terminal  
3. **Restart after changes**: `npm run dev`
4. **View API data**: http://localhost:4000/tasks
5. **View application**: http://localhost:3000

**Pro Tips:**
- Keep both terminals open for easier debugging
- Check browser console (F12) for any errors
- The app auto-reloads when you make code changes
- JSON server auto-saves changes to `db.json`

## 📁 Project Structure

```
kanban-todo-app/
├── public/
│   └── index.html
├── src/
│   ├── components/          # React components
│   │   ├── Board.js        # Main kanban board
│   │   ├── Column.js       # Individual column
│   │   ├── TaskCard.js     # Task card component
│   │   ├── SearchBar.js    # Search functionality
│   │   ├── TaskModal.js    # Create/edit modal
│   ├── store/              # Redux store
│   │   ├── index.js        # Store configuration
│   │   ├── taskSlice.js    # Task-related state
│   │   └── uiSlice.js      # UI state management
│   ├── services/           # API services
│   │   └── api.js          # HTTP requests
│   ├── hooks/              # Custom hooks
│   │   └── useTasks.js     # Task management hook
│   ├── utils/              # Utilities
│   │   └── constants.js    # App constants
│   ├── App.js              # Main app component
│   ├── App.css             # Global styles
│   └── index.js            # Entry point
├── db.json                 # Mock database
├── package.json            # Dependencies
└── README.md              # Documentation
```

## 🎯 What You Should See When Running

### Kanban Board Layout
- **4 Columns**: Backlog, In Progress, Review, Done
- **Task Distribution**: 
  - Backlog: 6 tasks (2 pages)
  - In Progress: 5 tasks (2 pages) 
  - Review: 5 tasks (2 pages)
  - Done: 3 tasks (1 page)

### Pagination Features
- **3 tasks per page** in each column
- **Pagination controls** at bottom of columns with >3 tasks
- **Page indicators** showing "Page 1 of 2 (6 total tasks)"
- **Navigation arrows** to switch between pages

### Interactive Features Working
✅ **Drag & Drop**: Move tasks between columns  
✅ **Search Bar**: Filter tasks by title/description  
✅ **Add Task**: Click "Add Task" button in any column  
✅ **Edit/Delete**: Click icons on task cards  
✅ **Pagination**: Navigate through pages in each column  

## 🎯 Usage

### Creating Tasks

1. Click the "Add Task" button in any column
2. Fill in the task title and description
3. Select the appropriate column
4. Click "Create" to save

### Managing Tasks

- **Edit**: Click the edit icon on any task card
- **Delete**: Click the delete icon and confirm
- **Move**: Drag and drop tasks between columns
- **Search**: Use the search bar to filter tasks

### Navigation

- Use pagination controls at the bottom of each column
- Search functionality works across all columns
- Drag and drop automatically saves changes

## 🔗 API Endpoints

The JSON server provides the following endpoints:

- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a specific task
- `DELETE /tasks/:id` - Delete a specific task
- `PATCH /tasks/:id` - Partially update a task

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🧪 Testing

To run tests:

```bash
npm test
```

## 🚀 Build for Production

To create a production build:

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 🎨 Customization

### Themes

You can customize the Material-UI theme in `src/App.js`:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change primary color
    },
    // Add more customizations
  },
});
```

### Column Configuration

Modify columns in `src/utils/constants.js`:

```javascript
export const COLUMNS = {
  BACKLOG: 'backlog',
  IN_PROGRESS: 'in_progress',
  REVIEW: 'review',
  DONE: 'done'
};
```

## 🐛 Troubleshooting

### Common Issues

1. **'concurrently' is not recognized**
   ```bash
   # Install the missing dependency
   npm install concurrently --save-dev
   npm run dev
   ```

2. **'json-server' is not recognized**
   ```bash
   # Install globally
   npm install -g json-server
   
   # On Mac/Linux with permission issues:
   sudo npm install -g json-server
   
   # Verify installation
   json-server --version
   ```

3. **Port 3000 or 4000 already in use**
   ```bash
   # Kill processes using the ports
   npx kill-port 3000
   npx kill-port 4000
   
   # Then restart
   npm run dev
   ```

4. **Dependencies installation fails**
   ```bash
   # Clear npm cache and try again
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   npm install concurrently --save-dev
   ```

5. **Pagination not visible**
   
   **Expected behavior:**
   - Backlog: 6 tasks → 2 pages (pagination visible)
   - In Progress: 5 tasks → 2 pages (pagination visible)
   - Review: 5 tasks → 2 pages (pagination visible)  
   - Done: 3 tasks → 1 page (no pagination needed)
   
   **If pagination is missing:**
   - Verify JSON server has 23 tasks: http://localhost:4000/tasks
   - Check browser console for errors
   - Ensure `TASKS_PER_PAGE = 3` in `src/utils/constants.js`

6. **Empty columns or no data**
   - Check if JSON server is running: http://localhost:4000/tasks
   - Verify `db.json` contains 23 tasks
   - Check browser developer tools Network tab for API calls
   - Restart both servers: `Ctrl+C` then `npm run dev`

### API Endpoints Test

Test these URLs while the server is running:
- http://localhost:4000/tasks (should show 23 tasks)
- http://localhost:4000/tasks?column=backlog (should show 6 tasks)
- http://localhost:4000/tasks?column=in_progress (should show 5 tasks)

## 📈 Performance Optimization

The application includes several performance optimizations:

- React Query caching for API requests
- Memoized components to prevent unnecessary re-renders
- Lazy loading for better initial load times
- Optimized bundle size with code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- React Beautiful DND for drag and drop functionality
- JSON Server for quick API prototyping
- React Query for powerful data synchronization

---

**Note**: This is a frontend assessment project demonstrating modern React development practices with Redux, Material-UI, and drag-and-drop functionality.
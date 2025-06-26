# Kanban Todo App

A simple drag-and-drop todo board built with React. Move tasks between columns, add new ones, search through them.

## What it does

- 4 columns: Backlog, In Progress, Review, Done
- Drag tasks between columns
- Add/edit/delete tasks
- Search tasks
- Shows 3 tasks per page (with pagination if more)

## Tech stuff

React, Redux, Material-UI, React Query, JSON Server for fake API

## How to run this thing

### First time setup

```bash
# Clone and install
git clone <your-repo-url>
cd kanban-todo-app
npm install

# Install the extra stuff you need
npm install concurrently --save-dev
npm install -g json-server
```

### Start it up

```bash
npm run dev
```

This starts both the fake API server and React app. 

- App: http://localhost:3000  
- API: http://localhost:4000/tasks

### If that doesn't work

Run these in separate terminals:

```bash
# Terminal 1
npm run server

# Terminal 2  
npm start
```

## Common problems

**"concurrently not found"**
```bash
npm install concurrently --save-dev
```

**"json-server not found"**
```bash
npm install -g json-server
# On Mac/Linux: sudo npm install -g json-server
```

**"Port already in use"**
```bash
npx kill-port 3000
npx kill-port 4000
npm run dev
```

**"No tasks showing up"**
- Check if http://localhost:4000/tasks shows data
- Make sure both servers are running
- Check browser console for errors

## Making changes

- Edit files in `src/`
- App reloads automatically
- API data gets saved to `db.json`

That's it. Pretty straightforward once you get it running.
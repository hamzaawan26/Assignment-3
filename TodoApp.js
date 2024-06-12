import React, { useState, useEffect } from 'react'
import {
  Container,
  TextField,
  Button,
  Checkbox,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/system'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './App.css'

const Header = styled(AppBar)({
  marginBottom: '1em',
})

const Footer = styled(Box)({
  marginTop: '1em',
  padding: '1em',
  backgroundColor: '#f1f1f1',
  textAlign: 'center',
  width: '100%',
})

const Logo = styled('img')({
  width: '50px',
  marginRight: '1em',
})

const TodoApp = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState('medium')
  const [editingIndex, setEditingIndex] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [editingPriority, setEditingPriority] = useState('medium')

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setTasks(savedTasks)
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTasks = [
        ...tasks,
        { text: newTask, completed: false, priority: newTaskPriority },
      ]
      setTasks(newTasks)
      setNewTask('')
      setNewTaskPriority('medium')
    }
  }

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  const handleToggleTask = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    )
    setTasks(newTasks)
  }

  const handleClearCompleted = () => {
    const newTasks = tasks.filter((task) => !task.completed)
    setTasks(newTasks)
  }

  const handleEditTask = (index) => {
    setEditingIndex(index)
    setEditingText(tasks[index].text)
    setEditingPriority(tasks[index].priority)
  }

  const handleSaveEdit = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index
        ? { ...task, text: editingText, priority: editingPriority }
        : task
    )
    setTasks(newTasks)
    setEditingIndex(null)
    setEditingText('')
    setEditingPriority('medium')
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditingText('')
    setEditingPriority('medium')
  }

  const handleDoubleClick = (index) => {
    handleEditTask(index)
  }

  return (
    <>
      <CssBaseline />
      <Header position="static">
        <Toolbar>
          <Logo src="/logoo.png" alt="Logo" />
          <Typography variant="h6">To-Do List Application</Typography>
        </Toolbar>
      </Header>
      <main>
        <Box className="background-section">
          <Container className="todo-container">
            <Typography variant="h4" gutterBottom align="center">
              To-Do List
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              Manage your tasks effectively with our simple to-do list
              application. Add tasks, set priorities, and keep track of your
              progress.
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <TextField
                variant="outlined"
                label="Add a new task"
                fullWidth
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                sx={{ mr: 2 }}
              />
              <FormControl variant="outlined" sx={{ minWidth: 120, mr: 2 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  label="Priority"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddTask}
              >
                Add Task
              </Button>
            </Box>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <List>
                <TransitionGroup>
                  {tasks.map((task, index) => (
                    <CSSTransition key={index} timeout={500} classNames="task">
                      <ListItem
                        dense
                        onDoubleClick={() => handleDoubleClick(index)}
                      >
                        <Checkbox
                          edge="start"
                          checked={task.completed}
                          onChange={() => handleToggleTask(index)}
                        />
                        {editingIndex === index ? (
                          <Box display="flex" alignItems="center" width="100%">
                            <TextField
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              autoFocus
                              fullWidth
                            />
                            <FormControl
                              variant="outlined"
                              sx={{ minWidth: 120, ml: 2 }}
                            >
                              <InputLabel>Priority</InputLabel>
                              <Select
                                value={editingPriority}
                                onChange={(e) =>
                                  setEditingPriority(e.target.value)
                                }
                                label="Priority"
                              >
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="high">High</MenuItem>
                              </Select>
                            </FormControl>
                            <IconButton
                              edge="end"
                              color="primary"
                              onClick={() => handleSaveEdit(index)}
                            >
                              <CheckIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              color="secondary"
                              onClick={handleCancelEdit}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        ) : (
                          <ListItemText
                            primary={task.text}
                            secondary={`Priority: ${task.priority}`}
                            style={{
                              textDecoration: task.completed
                                ? 'line-through'
                                : 'none',
                            }}
                          />
                        )}
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => handleEditTask(index)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => handleDeleteTask(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </List>
            </Paper>
            <Box mt={2} textAlign="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClearCompleted}
              >
                Clear Completed
              </Button>
            </Box>
          </Container>
        </Box>
      </main>
      <Footer>
        <Typography variant="body2" color="textSecondary">
          &copy; 2024 Todo App. All rights reserved.
        </Typography>
      </Footer>
    </>
  )
}

export default TodoApp

import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {AddItemForm} from "./components/AddItemForm";
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolists-api';
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer";

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();
  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todolistId1]: [
      {
        id: v1(), title: '1', status: TaskStatuses.Completed, todoListId: todolistId1,
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
      },
      {
        id: v1(), title: '2', status: TaskStatuses.Completed, todoListId: todolistId1,
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
      },
      {
        id: v1(), title: '3', status: TaskStatuses.New, todoListId: todolistId1,
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
      }
    ],
    [todolistId2]: [
      {
        id: v1(), title: '1', status: TaskStatuses.Completed, todoListId: todolistId2,
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
      },
      {
        id: v1(), title: '2', status: TaskStatuses.New, todoListId: todolistId2,
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
      }
    ],
  })

  function addTask(title: string, todolistId: string) {
    let task = {id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistId,
      startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''};
    let tasks = tasksObj[todolistId];
    tasksObj[todolistId] = [task, ...tasks];
    setTasks({...tasksObj});
  }
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(t => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({...tasksObj});
  }
  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }
  function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.status = status
    }
    setTasks({...tasksObj});
  }
  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.title = newTitle
    }
    setTasks({...tasksObj});
  }


  let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    {id: todolistId1, title: 'Whats to lear', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to do', filter: 'all', addedDate: '', order: 0}
  ]);
  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId]
    setTasks({...tasksObj});
  }
  let changeTodolistTitle = (id: string, newTitle: string) => {
    const todolist = todolists.find(tl => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }

  }
  const addTodolist = (title: string) => {
    let todolist: TodolistDomainType = {
      id: v1(),
      filter: "all",
      title: title,
      addedDate: '',
      order: 0
    };
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    });
  }

  return (

    <div className='App'>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container style={{padding: "10px"}} spacing={3}>
          {
            todolists.map(tl => {
              let tasksForTodolist = tasksObj[tl.id];

              if (tl.filter === 'completed') {
                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
              }

              if (tl.filter === 'active') {
                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
              }

              return <Grid item>
                <Paper style={{padding: "10px"}} elevation={2}>
                  <Todolist key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeTaskStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            changeFilter={changeFilter}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default App;

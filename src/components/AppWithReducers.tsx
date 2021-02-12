import React, {useReducer} from 'react';
import '../App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTittleAC,
  removeTodolistAC,
  todolistsReducer,
  FilterValuesType
} from "../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "../state/tasks-reducer";
import {AddItemForm} from "./AddItemForm";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todolistId1, title: 'Whats to lear', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to do', filter: 'all', addedDate: '', order: 0}
  ]);
  const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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

  const addTask = (title: string, todolistId: string) => {
    dispatchToTasksReducer(addTaskAC(title, todolistId));
  }
  const removeTask = (id: string, todolistId: string) => {
    dispatchToTasksReducer(removeTaskAC(id, todolistId));
  }
  const changeStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
    dispatchToTasksReducer(changeTaskStatusAC(taskId, status, todolistId));
  }
  const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId));
  }

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    dispatchToTodolistsReducer(changeTodolistFilterAC(value, todolistId));
  }
  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }
  const changeTodolistTitle = (id: string, newTitle: string) => {
    dispatchToTodolistsReducer(changeTodolistTittleAC(id, newTitle))
  }
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
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
                <Paper
                  style={{padding: "10px"}}
                  elevation={2}>
                  <Todolist
                    key={tl.id}
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

export default AppWithReducers;

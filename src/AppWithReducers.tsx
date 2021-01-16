import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTittleAC,
  removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
  id: string
  title: string
  filter: 'all' | 'completed' | 'active'
}
export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {

  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);
  const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);

  const addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId));
  }
  const removeTask = (id: string, todolistId: string) => {
    dispatch(removeTaskAC(id, todolistId));
  }
  const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
  }
  const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(taskId, newTitle, todolistId));
  }

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC(value, todolistId));
  }
  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
  }
  const changeTodolistTitle = (id: string, newTitle: string) => {
    dispatch(changeTodolistTittleAC(id, newTitle))
  }
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
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
              let tasksForTodolist = tasks[tl.id];
              if (tl.filter === 'completed') {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
              }
              if (tl.filter === 'active') {
                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
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

export default AppWithReducers;

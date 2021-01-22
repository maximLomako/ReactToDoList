import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
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
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
  id: string
  title: string
  filter: 'all' | 'completed' | 'active'
}
export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {

  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);
  const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);

  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId));
  }, [dispatch]);
  const removeTask = useCallback((id: string, todolistId: string) => {
    dispatch(removeTaskAC(id, todolistId));
  }, [dispatch]);
  const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
  }, [dispatch]);
  const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(taskId, newTitle, todolistId));
  }, [dispatch]);

  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC(value, todolistId));
  }, [dispatch]);
  const removeTodolist = useCallback((todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
  }, [dispatch]);
  const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
    dispatch(changeTodolistTittleAC(id, newTitle))
  }, [dispatch]);
  const addTodolist = useCallback((title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  }, [dispatch]);

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
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container style={{padding: "10px"}} spacing={3}>
          {
            todolists.map(tl => {
              let tasksForTodolist = tasks[tl.id];
              return <Grid key={tl.id} item>
                <Paper style={{padding: "10px"}} elevation={2}>
                  <Todolist
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

export default AppWithRedux;

import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {AddItemForm} from "./AddItemForm";
import {Task} from "./Task";

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}
type TodolistPropsType = {
  id: string
  title: string
  filter: FilterValuesType
  tasks: Array<TaskType>
  addTask: (title: string, todolistId: string) => void
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
  const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id)
    , [props.changeFilter, props.id]);
  const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id)
    , [props.changeFilter, props.id]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id)
    , [props.changeFilter, props.id]);
  const removeTodolist = () => props.removeTodolist(props.id);
  const changeTodolistTitle = useCallback((newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  }, [props.changeTodolistTitle, props.id])
  const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id]);

  let tasksForTodolist = props.tasks;
  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(t => t.isDone)
  }
  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter(t => !t.isDone)
  }

  return (
    <div>
      <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
        <IconButton onClick={removeTodolist} aria-label="delete" color="primary">
          <DeleteIcon/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      <ul>
        {
          tasksForTodolist.map(t => <Task
            key={t.id}
            task={t}
            todolistId={props.id}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}
          />)
        }
      </ul>
      <div>
        <Button variant={props.filter === 'all' ? "contained" : "text"}
                onClick={onAllClickHandler}>All
        </Button>
        <Button variant={props.filter === 'active' ? "contained" : "text"} color={"primary"}
                onClick={onActiveClickHandler}>Active
        </Button>
        <Button variant={props.filter === 'completed' ? "contained" : "text"} color={"secondary"}
                onClick={onCompletedClickHandler}>Completed
        </Button>
      </div>
    </div>
  )
});


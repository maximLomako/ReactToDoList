import React, {useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {AddItemForm} from "./AddItemForm";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import { FilterValuesType } from "../state/todolists-reducer";

type TodolistPropsType = {
  id: string
  title: string
  filter: FilterValuesType
  tasks: Array<TaskType>
  addTask: (title: string, todolistId: string) => void
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
  const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id)
    , [props]);
  const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id)
    , [props]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id)
    , [props]);
  const removeTodolist = () => props.removeTodolist(props.id);
  const changeTodolistTitle = useCallback((newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  }, [props])
  const addTask = useCallback((title: string) => props.addTask(title, props.id), [props]);

  let tasksForTodolist = props.tasks;
  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
  }
  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
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


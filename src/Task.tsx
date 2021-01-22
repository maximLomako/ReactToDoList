import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@material-ui/icons/Delete";
import {TaskType} from "./Todolist";

type TasksPropsType = {
  task: TaskType
  todolistId: string
  removeTask: (id: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}
export const Task = React.memo((props: TasksPropsType) => {
  const onRemoveHandler = () => {
    props.removeTask(props.task.id, props.todolistId)
  }
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
  }
  const onChangeTitleHandler = useCallback((newValue: string) => {
    props.changeTaskTitle(props.task.id, newValue, props.todolistId)
  }, [props.changeTaskTitle, props.task.id, props.todolistId])

  return <div
    key={props.task.id}
    className={props.task.isDone ? 'is-done' : ''}

  >
    <Checkbox
      checked={props.task.isDone}
      onChange={onChangeStatusHandler}
    />
    <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
    <IconButton onClick={onRemoveHandler} aria-label="delete" color="primary">
      <DeleteIcon/>
    </IconButton>
  </div>
});
import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Checkbox} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {Button} from "@material-ui/core";

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

export function Todolist(props: TodolistPropsType) {

  const onAllClickHandler = () => props.changeFilter('all', props.id);
  const onActiveClickHandler = () => props.changeFilter('active', props.id);
  const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
  const removeTodolist = () => props.removeTodolist(props.id);
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  }
  const addTask = (title: string) => props.addTask(title, props.id);

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
          props.tasks.map(t => {

              const onRemoveHandler = () => {
                props.removeTask(t.id, props.id)
              }
              const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
              }
              const onChangeTitleHandler = (newValue: string) => {
                props.changeTaskTitle(t.id, newValue, props.id)
              }

              return <div key={t.id}
                         className={t.isDone ? 'is-done' : ''}

              >
                <Checkbox
                  checked={t.isDone}
                  onChange={onChangeStatusHandler}
                />
                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                <IconButton onClick={onRemoveHandler} aria-label="delete" color="primary">
                  <DeleteIcon/>
                </IconButton>
              </div>
            }
          )
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
}


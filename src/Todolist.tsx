import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
  removeTodolist: (todolistId: string) => void
}

export function Todolist(props: TodolistPropsType) {

  const onAllClickHandler = () => props.changeFilter('all', props.id);
  const onActiveClickHandler = () => props.changeFilter('active', props.id);
  const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
  const removeTodolist = () => props.removeTodolist(props.id);
  const addTask = (title: string) => props.addTask(title, props.id);

  return (
    <div>
      <h3>{props.title}
        <button onClick={removeTodolist}>x</button>
      </h3>
      <AddItemForm addItem={addTask}/>
      <ul>
        {
          props.tasks.map(t => {

              const onRemoveHandler = () => {
                props.removeTask(t.id, props.id)
              }
              const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
              }

              return <li key={t.id}
                         className={t.isDone ? 'is-done' : ''}

              >
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeHandler}
                />
                <EditableSpan title={t.title}/>
                <button onClick={onRemoveHandler}>x</button>
              </li>
            }
          )
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''}
                onClick={onAllClickHandler}>All
        </button>
        <button className={props.filter === 'active' ? 'active-filter' : ''}
                onClick={onActiveClickHandler}>Active
        </button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''}
                onClick={onCompletedClickHandler}>Completed
        </button>
      </div>
    </div>
  )
}


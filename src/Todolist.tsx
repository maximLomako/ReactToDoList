import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}


type TodolistPropsType = {
  title: string
  filter: FilterValuesType
  tasks: Array<TaskType>
  addTask: (title: string) => void
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export function Todolist(props: TodolistPropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.ctrlKey === true && e.key === 'Enter' && newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim())
      setNewTaskTitle('')
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle)
      setNewTaskTitle('')
      setError(null);
    } else {
      setError('Title is required');
    }

  }
  const onAllClickHandler = () => props.changeFilter('all');
  const onActiveClickHandler = () => props.changeFilter('active');
  const onCompletedClickHandler = () => props.changeFilter('completed');
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
               onChange={onChangeHandler}
               onKeyPress={onKeyChangeHandler}
               className={error ? 'error' : ''}
        />

        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(t => {

              const onRemoveHandler = () => {
                props.removeTask(t.id)
              }
              const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked)
              }

              return <li key={t.id}
                         className={t.isDone ? 'is-done' : ''}

              >
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeHandler}
                />
                <span>{t.title}</span>
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
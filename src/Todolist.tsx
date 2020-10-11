import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}


type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  addTask: (title: string) => void
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: TodolistPropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey === true && e.key === 'Enter') {
      props.addTask(newTaskTitle)
      setNewTaskTitle('')
    }
  }
  const addTask = () => {
    props.addTask(newTaskTitle)
    setNewTaskTitle('')
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
        />

        <button onClick={addTask}
        >+
        </button>
      </div>
      <ul>
        {
          props.tasks.map(t => {

            const onRemoveHandler = () => {props.removeTask(t.id)}

              return <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onRemoveHandler}>x</button>
              </li>
            }
          )
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}
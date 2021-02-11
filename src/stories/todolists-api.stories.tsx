import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolists-api";

export default {
  title: 'API'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>({man: 'hey'})
  useEffect(() => {
    todolistAPI.getTodolists()
      .then(res => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const submitTitle = () => {
    todolistAPI.createTodolists(title)
      .then(res => {
        setState(res.data);
      })
  }
  return (
    <>
      <input type="text" value={title} onChange={onChangeHandler}/>
      <button onClick={submitTitle}>go</button>
      <div> {JSON.stringify(state)}</div>
    </>
  )
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<any>('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }
  const deleteTodoList = () => {
    todolistAPI.deleteTodolists(todolistId)
      .then(res => {
        setState(res.data);
      })
  }
  return (
    <>
      <div> {JSON.stringify(state)}</div>
      <input type="text" value={todolistId} onChange={onChangeHandler}/>
      <button onClick={deleteTodoList}>x</button>
    </>
  )
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<any>('')
  const [title, setTitle] = useState<any>('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const updateTodoList = () => {
    todolistAPI.updateTodolists(todolistId, title)
      .then(res => {
        setState(res.data);
      })
  }
  return (
    <>
      <div> {JSON.stringify(state)}</div>
      <input type="text" value={todolistId} onChange={onChangeHandler}/>
      <input type="text" value={title} onChange={onChangeTitleHandler}/>
      <button onClick={updateTodoList}>x</button>
    </>
  )
}

export const GetTasks = () => {
  const [state, setState] = useState<any>({man: 'hey'})
  const [todolistId, setTodolistId] = useState<any>('')
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }
  const showTasks = () => {
    todolistAPI.getTasks(todolistId)
      .then(res => {
        setState(res.data);
      })
  }

  return <>
    <div> {JSON.stringify(state)}</div>
    <input type="text" value={todolistId} onChange={onChangeHandler}/>

    <button onClick={showTasks}>x</button>
  </>
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<any>('')
  const [title, setTitle] = useState<any>('')
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const createTask = () => {
    todolistAPI.createTask(todolistId, title)
      .then(res => {
        setState(res.data);
      })
  }
  return <>
    <div> {JSON.stringify(state)}</div>
    <input type="text" value={todolistId} onChange={onChangeHandler}/>
    <input type="text" value={title} onChange={onChangeTitleHandler}/>
    <button onClick={createTask}>x</button>
  </>
}
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<any>('')
  const [taskId, setTaskId] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDiscription] = useState<string>('')
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>('')
  const [deadline, setDeadline] = useState<string>('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }
  const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskId(e.currentTarget.value)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onChangeDiscrHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscription(e.currentTarget.value)
  }
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(+e.currentTarget.value)
  }
  const onChangePriorityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPriority(+e.currentTarget.value)
  }
  const onChangeDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.currentTarget.value)
  }
  const onChangeDeadlineeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.currentTarget.value)
  }
  const updateTask = () => {
    todolistAPI.updateTask(todolistId, taskId, {title, deadline, description, priority, startDate, status})
      .then(res => {
        setState(res.data);
      })
  }

  return <>
    <div> {JSON.stringify(state)}</div>
    <input type="text" value={todolistId} onChange={onChangeHandler}/>
    <input type="text" value={taskId} onChange={onChangeTaskIdHandler}/>
    <input type="text" value={title} placeholder={title} onChange={onChangeTitleHandler}/>
    <input type="text" value={description} placeholder={description} onChange={onChangeDiscrHandler}/>
    <input type="text" value={status} placeholder={status.toString()} onChange={onChangeStatusHandler}/>
    <input type="text" value={priority} placeholder={priority.toString()} onChange={onChangePriorityHandler}/>
    <input type="text" value={startDate} placeholder={startDate} onChange={onChangeDateHandler}/>
    <input type="text" value={deadline} placeholder={deadline} onChange={onChangeDeadlineeHandler}/>
    <button onClick={updateTask}>x</button>
  </>
}
export const DeleteTask = () => {
  const [state, setState] = useState<any>({man: 'hey'})
  const [todolistId, setTodolistId] = useState<any>('')
  const [taskId, setTaskId] = useState<any>('')
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }
  const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskId(e.currentTarget.value)
  }
  const deleteTask = () => {
    todolistAPI.deleteTasks(todolistId, taskId)
      .then(res => {
        setState(res.data);
      })
  }


  return <>
    <div> {JSON.stringify(state)}</div>
    <input type="text" value={todolistId} onChange={onChangeHandler}/>
    <input type="text" value={taskId} onChange={onChangeTaskIdHandler}/>
    <button onClick={deleteTask}>x</button>
  </>
}


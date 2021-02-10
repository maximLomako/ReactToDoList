import React, {useEffect, useState} from 'react'
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
  useEffect(() => {
    todolistAPI.createTodolists('new title')
      .then(res => {
        setState(res.data);
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "5702973e-9e25-461b-b2b2-6a244b47976f";
    todolistAPI.deleteTodolists(todolistId)
      .then(res => {
        setState(res.data);
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "77f2d612-4161-4aa7-b867-c51586326dae";
    todolistAPI.updateTodolists(todolistId, 'Hello World')
      .then(res => {
        setState(res.data);
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>({man: 'hey'})
  useEffect(() => {
    const todolistId = '6f0a3ad1-e66a-4485-934a-d269ff4c7e1b';
    todolistAPI.getTasks(todolistId)
      .then(res => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
// export const CreateTask = () => {
//   const [state, setState] = useState<any>({man: 'hey'})
//   useEffect(() => {
//     const todolistId = '6f0a3ad1-e66a-4485-934a-d269ff4c7e1b';
//     const taskId = '1';
//     todolistAPI.createTask(todolistId, taskId)
//       .then(res => {
//         setState(res.data);
//       })
//
//   }, [])
//
//   return <div> {JSON.stringify(state)}</div>
// }
export const DeleteTask = () => {
  const [state, setState] = useState<any>({man: 'hey'})
  useEffect(() => {
    const todolistId = '6f0a3ad1-e66a-4485-934a-d269ff4c7e1b';
    const taskId = '';
    todolistAPI.deleteTasks(todolistId, taskId)
      .then(res => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}


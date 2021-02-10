import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../../api/todolists-api";

export default {
  title: 'API'
}


// export const CreateTask = () => {
//   const [state, setState] = useState<any>(null)
//   useEffect(() => {
//     todolistAPI.createTasks('new title')
//       .then(res => {
//         setState(res.data);
//       })
//   }, [])
//
//   return <div> {JSON.stringify(state)}</div>
// }
// export const DeleteTask = () => {
//   const [state, setState] = useState<any>(null)
//   useEffect(() => {
//     const taskId = "5702973e-9e25-461b-b2b2-6a244b47976f";
//     tasksAPI.deleteTasks(taskId)
//       .then(res => {
//         setState(res.data);
//       })
//   }, [])
//
//   return <div> {JSON.stringify(state)}</div>
// }
// export const UpdateTaskTitle = () => {
//   const [state, setState] = useState<any>(null)
//   useEffect(() => {
//     const taskId = "77f2d612-4161-4aa7-b867-c51586326dae";
//     tasksAPI.updateTasks(taskId, 'Hello World')
//       .then(res => {
//         setState(res.data);
//       })
//   }, [])
//
//   return <div> {JSON.stringify(state)}</div>
// }

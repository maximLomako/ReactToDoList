import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "a1f03d59-d60d-46dd-a3cd-3d7ba0716339"
  }
}

export const todolistAPI = {
  getTodolists() {
    return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
  },
  createTodolists(title: string) {
    return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
  },
  deleteTodolists(todolistId: string) {
    return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
  },
  updateTodolists(todolistId: string, title: string) {
    return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
  },
}
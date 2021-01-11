import {TaskStateType} from "../App";
import {AddTodoListActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";

const REMOVE_TASK = 'REMOVE_TASK';
const ADD_TASK = 'ADD_TASK';
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE';

export type RemoveTaskActionType = {
  type: 'REMOVE_TASK'
  taskID: string
  todolistID: string
}
export type AddTaskActionType = {
  type: 'ADD_TASK'
  title: string
  todolistID: string
}
export type ChangeTaskStatusType = {
  type: "CHANGE_TASK_STATUS"
  taskID: string
  isDone: boolean
  todolistID: string
}
export type ChangeTaskTitleType = {
  type: "CHANGE_TASK_TITLE"
  taskID: string
  title: string
  todolistID: string
}
export type ActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusType
  | ChangeTaskTitleType
  | AddTodoListActionType
  | RemoveTodolistActionType;

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
  switch (action.type) {
    case REMOVE_TASK: {
      const stateCopy = {...state}
      const tasks = state[action.todolistID]
      stateCopy[action.todolistID] = tasks.filter(t => t.id !== action.taskID);
      return stateCopy;
    }
    case ADD_TASK: {
      const stateCopy = {...state};
      const newTask = {id: "0", title: action.title, isDone: false}
      stateCopy[action.todolistID] = [newTask, ...stateCopy[action.todolistID]]
      return stateCopy;
    }
    case CHANGE_TASK_STATUS: {
      const stateCopy = {...state};
      const tasks = stateCopy[action.todolistID]
      const task = tasks.find(t => t.id === action.taskID)
      if (task) {
        task.isDone = action.isDone
      }
      return stateCopy
    }
    case CHANGE_TASK_TITLE: {
      const stateCopy = {...state};
      const tasks = stateCopy[action.todolistID]
      const task = tasks.find(t => t.id === action.taskID)
      if (task) {
        task.title = action.title
      }
      return stateCopy
    }
    case 'ADD-TODOLIST': {
      const stateCopy = {...state};
      stateCopy[action.todolistId] = [];
      return stateCopy
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state};
      delete copyState[action.id]
      return copyState
    }
    default:
      throw new Error("I don't understand this type")
  }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
  return {type: REMOVE_TASK, taskID, todolistID}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
  return {type: ADD_TASK, title, todolistID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusType => {
  return {type: CHANGE_TASK_STATUS, taskID, isDone, todolistID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleType => {
  return {type: CHANGE_TASK_TITLE, taskID, title, todolistID}
}


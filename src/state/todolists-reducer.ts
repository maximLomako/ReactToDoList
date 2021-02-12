import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

export type FilterValuesType = 'all' | 'completed' | 'active';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}

export type AddTodoListActionType = {
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
}

export type ChangeTodolistActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValuesType
}

export type ActionsType = RemoveTodolistActionType | AddTodoListActionType |
  ChangeTodolistActionType | ChangeTodolistFilterActionType;

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [{
        id: action.todolistId,
        title: action.title,
        filter: "all",
        addedDate: '',
        order: 0
      }, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];
    }
    case 'CHANGE-TODOLIST-FILTER': {
      let todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }
    default:
      return state;
  }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodoListActionType => {
  return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const changeTodolistTittleAC = (id: string, title: string): ChangeTodolistActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}


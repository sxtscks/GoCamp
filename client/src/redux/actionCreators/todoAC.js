import { ADD_TODO, CHANGE_STATUS, DELETE_TODO, SET_TODO } from '../types/todo'
import { v4 as uuidv4 } from 'uuid';

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    payload: {
      id: uuidv4(),
      text,
      completed: false
    }
  }
}

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id
  }
}

export const setTodo = (todos) => {
  return {
    type: SET_TODO,
    payload: todos,
  }
}

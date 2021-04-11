import { ADD_TODO, CHANGE_STATUS, DELETE_TODO, SET_TODO,CONFIRM_TODO, IMPORTANT_TODO } from '../types/todo'
import { v4 as uuidv4 } from 'uuid';

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    payload: {
      id: uuidv4(),
      text,
      confirmed: false,
      important:false,
    }
  }
}

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id
  }
}
export const confirmTodo = (id) => {
  console.log('here id>>>>>>', id)
  return {
    type: CONFIRM_TODO,
    payload: id
  }
}
export const importantTodo = (id) => {
  console.log('here idВАЖНО>>>>>>', id)
  return {
    type: IMPORTANT_TODO,
    payload: id
  }
}

export const setTodo = (todos) => {
  return {
    type: SET_TODO,
    payload: todos,
  }
}

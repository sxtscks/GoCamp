import CheckListItem from "../CheckListItem/CheckListItem";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setTodo } from '../../redux/actionCreators/todoAC'


function CheckList() {
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos)
  useEffect(() => {

    dispatch(setTodo(todos))
  }, [])

  return (
    <div>
      <ul className="list-group">
        {todos?.length ? todos.map((todo) => <CheckListItem value={todo.value}  todo = { todo } key = { todo.id } id = { todo.id } />) : ''}
      </ul>
    </div>
  )
}

export default CheckList


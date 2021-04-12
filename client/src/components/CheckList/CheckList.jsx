import CheckListItem from "../CheckListItem/CheckListItem";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { setTodo } from '../../redux/actionCreators/todoAC'
import { setRing } from "../../redux/actionCreators/ringAC";
import { findAllTodos } from "../../redux/reducers/tripReducer";
import { doc } from "prettier";


function CheckList({ id }) {
  const [todos, setTodos] = useState([])
  const dispatch = useDispatch()
  //  сюда должна вернуть всех тодошек
  const userFromLS = JSON.parse(window.localStorage.getItem('myApp'))

  let todosArr = []

  useEffect(() => {
    // dispatch(setRing(todos.length*10))
    dispatch(findAllTodos(userFromLS.key, id))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          todosArr.push({ ...doc.data(),...doc.data().todo, id: doc.id})
          setTodos(todosArr)
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
      });
    })
    // .then((doc) => console.log(doc.docs))
  }, [])
  console.log(todos);

return (
  <div>
    <ul className="list-group">
      {todos?.length ? todos.map((todo, indx) => <CheckListItem todo={todo} key={todo.id} id={todo.id} />) : ''}
    </ul>
  </div>
)
}

export default CheckList


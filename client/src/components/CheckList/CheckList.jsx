import CheckListItem from "../CheckListItem/CheckListItem";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { setTodo } from '../../redux/actionCreators/todoAC'
import { setRing } from "../../redux/actionCreators/ringAC";
import { findAllTodos } from "../../redux/reducers/tripReducer";
import { doc } from "prettier";
import { db } from "../../firebase/firebase";


function CheckList({ tripId }) {
  const [todos, setTodos] = useState([])
  const dispatch = useDispatch()
  //  сюда должна вернуть всех тодошек
  const userFromLS = JSON.parse(window.localStorage.getItem('myApp'))


  useEffect(() => {
    const unsubscibeTodos = db.collection('Users').doc(userFromLS.key)
      .collection('futureTrips').doc(tripId)
      .collection('checkList')
      .onSnapshot((querySnapshot) => {
        setTodos(querySnapshot.docs.map(el => ({...el.data(), id: el.id})))
       
      })

    return () => {
      unsubscibeTodos()
    }
  }, [])
return (
  <div>
    <ul className="list-group">
      {todos?.length ? todos.map((todo, indx) => <CheckListItem tripId={tripId} todo={todo} key={todo.id} id={todo.id} />) : ''}
    </ul>
  </div>
)
}

export default CheckList


import CheckListItem from "../CheckListItem/CheckListItem";
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { db } from "../../firebase/firebase";


function CheckList({ tripId }) {
  // mojno v context 
  const [todos, setTodos] = useState([])
  //  сюда должна вернуть всех тодошек
  const user = useSelector(state => state.user)

  useEffect(() => {
    const unsubscibeTodos = db.collection('Users').doc(user.uid)
      .collection('futureTrips').doc(tripId)
      .collection('checkList')
      .onSnapshot((querySnapshot) => {
        setTodos(querySnapshot.docs.map(el => ({ ...el.data(), id: el.id })))

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


import CheckListItem from "../CheckListItem/CheckListItem";
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { db } from "../../firebase/firebase";


function CheckList({ tripId }) {

  const [todos, setTodos] = useState([])

  const user = useSelector(state => state.user)

  useEffect(() => {
    let currentTodos

    if (user.uid) {
      currentTodos = db.collection('Users').doc(user.uid)
        .collection('futureTrips').doc(tripId)
        .collection('checkList')
        .onSnapshot((querySnapshot) => {
          setTodos(querySnapshot.docs.map(el => ({ ...el.data(), id: el.id })))
        })
    }

    return () => {
      currentTodos && currentTodos()
    }
  }, [user])
  return (
    <div>
      <ul className="list-group">
        {todos?.length ? todos.map((todo, indx) => <CheckListItem tripId={tripId} todo={todo} key={todo.id} id={todo.id} />) : ''}
      </ul>
    </div>
  )
}

export default CheckList


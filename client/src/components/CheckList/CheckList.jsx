import CheckListItem from "../CheckListItem/CheckListItem";
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { db } from "../../firebase/firebase";


function CheckList({ tripId }) {

  const [todos, setTodos] = useState([])

  const user = useSelector(state => state.user)

  useEffect(() => {
    let currentTodos
    if (tripId) {
      currentTodos = db.collection('Trips').doc(tripId).onSnapshot((doc) => {
        Promise.all(doc.data().checkList.map(todoId => {
          return db.collection('CheckListItem').doc(todoId).get().then(doc => ({...doc.data(), id: doc.id}))
        })).then(allTodo => setTodos(allTodo))
        })}
      return () => {
        currentTodos && currentTodos()
      }
    }, [tripId])

    console.log({todos});
    
  return (
    <div>
      <ul className="list-group">
        
        {todos?.length ? todos.map((todo, indx) => <CheckListItem tripId={tripId} todo={todo} key={todo?.id} id={todo?.id} />) : ''}
      </ul>
    </div>
  )

}

export default CheckList


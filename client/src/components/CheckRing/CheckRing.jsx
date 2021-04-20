import React from 'react'
import ProgressBar from 'react-customizable-progressbar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { db } from "../../firebase/firebase";

function CheckRing({ tripId }) {
  const [ring, setRing] = useState(0)
  const [todos, setTodos] = useState([])
  
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  
  useEffect(() => {
    console.log('asdfasdfasdf')
    let currentTodos
    
      currentTodos = db.collection('Trips').doc(tripId).onSnapshot((doc) => {
        Promise.all(doc.data().checkList.map(todoId => {
          return db.collection('CheckListItem').doc(todoId).get().then(doc => ({...doc.data(), id: doc.id}))
        })).then(allTodo => setTodos(allTodo))
        })
    
   

    return () => {
      currentTodos && currentTodos()
    }

  }, [])

  useEffect(() => {
    if (todos.length) {
      console.log({todos})
      setRing((todos.length >= 1 ? (Math.floor(
        100 / (todos.length + todos.filter(todo => todo.important).length) * ((todos.filter(todo => todo.confirmed).length) + (todos.filter(todo => todo.confirmed && todo.important).length))
      )) : '100'))
    }
  }, [todos])

  return (
    <div className="item" style={{
      position: 'relative',
      padding: '10px 10px 20px 10px'
    }}>
      <div className="ring d-flex justify-content-center">
      <ProgressBar
        radius={100}
        progress={ring >= 98 ? 100 : ring}
        strokeWidth={18}
        strokeColor="#f46e16"
        strokeLinecap="square"
        trackStrokeWidth={18}
      >
        <div className="indicator" style={{
          position: 'absolute',
          top: '35%',
          left: '29%',
          color: '#f46e16',
          fontSize: '50px',
          fontWeight: 800,
          height: '30px'


        }}>
          <div style={{ textAlign: "'center" }}>{ring >= 98 ? 100 : ring}%</div>
        </div>
      </ProgressBar>
      
            </div>
    </div>
  )
}
export default CheckRing

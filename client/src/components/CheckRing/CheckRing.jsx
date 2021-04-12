import React from 'react'
import ProgressBar from 'react-customizable-progressbar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState} from 'react'
import {setCheckedRing} from '../../redux/actionCreators/ringAC'
import { db } from "../../firebase/firebase";

function CheckRing ({tripId}) {
    const [ring,setRing] = useState(0)
    // const todos = useSelector((state) => state.todos)
    // const dispatch = useDispatch()
    const [todos, setTodos] = useState([])
    const dispatch = useDispatch()
    //  сюда должна вернуть всех тодошек
  const user = useSelector(state => state.user)
  
    useEffect(() => {
      const unsubscibeTodos = db.collection('Users').doc(user.uid)
        .collection('futureTrips').doc(tripId)
        .collection('checkList')
        .onSnapshot((querySnapshot) => {
          setTodos(querySnapshot.docs.map(el => ({...el.data(), id: el.id})))
         
        })
        // setRing((todos.length >= 1 ? ( Math.floor( 
        //   100  /  (todos.length + todos.filter(todo=> todo.important).length) *  ( (todos.filter(todo=> todo.confirmed).length) + (todos.filter(todo=> todo.confirmed && todo.important).length)) 
        //   )) : '100'))
      },[todos])
    //  useEffect(() => {
    //     //  dispatch(setCheckedRing(todos))
    //   }, [todos])
    
    return (
    <div className="item" style={{
        position:'relative',
        margin:'50px 0 0 50px '
        }}>
        <ProgressBar
            radius={100}
            progress={ring >= 98 ? 100 : ring}
            strokeWidth={18}
            strokeColor="#f46e16"
            strokeLinecap="square"
            trackStrokeWidth={18}
        >
            <div className="indicator" style={{
                position:'absolute',
                top:'35%',
                left:'29%',
                color:'#f46e16',
                fontSize:'50px',
                fontWeight:800,
                
        }}>
                <div style={{textAlign:"'center"}}>{ring >= 98 ? 100 : ring}%</div>
            </div>
        </ProgressBar>
    </div>
)
}
export default CheckRing

import React from 'react'
import ProgressBar from 'react-customizable-progressbar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {setCheckedRing} from '../../redux/actionCreators/ringAC'


function CheckRing () {
    const ring = useSelector((state) => state.ring)
    const todos = useSelector((state) => state.todos)
    const dispatch = useDispatch()

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
                <div>{ring >= 98 ? 100 : ring}%</div>
            </div>
        </ProgressBar>
    </div>
)
}
export default CheckRing

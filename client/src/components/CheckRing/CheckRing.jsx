import React from 'react'
import ProgressBar from 'react-customizable-progressbar'
function CheckRing () {

    return (
    <div className="item" style={{
        position:'relative',
        margin:'50px 0 0 50px '
        }}>
        <ProgressBar
            radius={100}
            progress={55}
            strokeWidth={18}
            strokeColor="#f46e16"
            strokeLinecap="square"
            trackStrokeWidth={18}
        >
            <div className="indicator" style={{
                position:'absolute',
                top:'37%',
                left:'37%',
                color:'#f46e16',
                fontSize:'40px'

        }}>
                <div>{55}%</div>
            </div>
        </ProgressBar>
    </div>
)
}
export default CheckRing
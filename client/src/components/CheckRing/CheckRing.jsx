import React from 'react'
import ProgressBar from 'react-customizable-progressbar'
function CheckRing () {

    return (
    <div className="item">
        <ProgressBar
            radius={100}
            progress={55}
            strokeWidth={18}
            strokeColor="#ff8d3f"
            strokeLinecap="square"
            trackStrokeWidth={18}
        >
            <div className="indicator">
                <div>{55}%</div>
            </div>
        </ProgressBar>
    </div>
)
}
export default CheckRing
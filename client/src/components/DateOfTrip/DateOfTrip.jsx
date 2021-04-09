import React,{useState} from 'react'

function DateOfTrip() {
    const [date,setDate] = useState('')

    const handlerDate = (e) => {
        e.preventDefault()
        setDate(e.target.date.value)
        console.log('target value>>>>>>>>>',e.target.date.value)
    
    }



    return (
        <div className='d-flex' style={{fontFamily:'Montserrat', fontWeight:700, color:'white', fontSize:20}}>
            <form action="" onSubmit={handlerDate}>
                {/* <div className="inp"> */}
            <input type="date" name='date'/>
            <button className='btn 'type='submit' style={{fontFamily:'Montserrat', fontWeight:700, color:'white', fontSize:20,marginTop:30,background:'#F46E16'}}> Выбрать дату</button>
                {/* </div> */}
            {/* <div className="date"> */}
            {/* </div> */}
            <div className="but" style={{marginTop:15}}>
                <span>  Дата поездки: {date} </span>
            </div>
            </form>
        </div>
    )
}

export default DateOfTrip

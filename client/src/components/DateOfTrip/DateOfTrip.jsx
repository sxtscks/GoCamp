import React,{useState} from 'react'

function DateOfTrip() {
    const [date,setDate] = useState('')

    const handlerDate = (e) => {
        e.preventDefault()
        setDate(e.target.date.value)
        console.log('target value>>>>>>>>>',e.target.date.value)
    
    }



    return (
        <div className='d-flex'>
            <form action="" onSubmit={handlerDate}>
                {/* <div className="inp"> */}
            <input type="date" name='date'/>
            <button className='btn btn-primary'type='submit'> Выбрать дату</button>
                {/* </div> */}
            {/* <div className="date"> */}
            {/* </div> */}
            <div className="but">
                <span>  Дата поездки: {date} </span>
            </div>
            </form>
        </div>
    )
}

export default DateOfTrip

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from "../../firebase/firebase";


function BenzinForm({ trip, id }) {
  const [cost, setCost] = useState('')
  const [km, setKm] = useState('')
  const handlerKm = (e) => {
    e.preventDefault()
    setKm(e.target.value)
  }
  
  const user = useSelector(state => state.user)
  const handlerCost = (e) => {
    e.preventDefault()
    if (!e.target.km.value.match(/^\d+$/)) {
      alert('В поле "Расстояние" должно стоять числовое значение(только цифры)!');
      return e.target.km.value = ''
    } else {
      return setCost(`${Math.floor((e.target.km.value * e.target.gas.value) / e.target.person.value)} рублей с человека`)
    }
  }


  return (
    <div>
      <form action="" className="d-flex" onSubmit={handlerCost}>
        <div className="km">
          <div className="kmText" style={{ fontFamily: 'Montserrat', margin: 5, fontWeight: 700, color: 'white', fontSize: 15, textAlign: 'end' }}>
            <span>Расстояние:</span>
          </div>
          <input value={trip.distance ? Math.floor(trip.distance.value / 1000) : ''} type="text" style={{ width: 100, margin: 5 }} name='km' className="form-control" id="exampleFormControlInput1" placeholder="km" onChange={handlerKm} />
        </div>
        <div className="gas">
          <div className="gasText" style={{ fontFamily: 'Montserrat', margin: 5, fontWeight: 700, color: 'white', fontSize: 15, textAlign: 'end' }}>
            <span>Топливо:</span>
          </div>
          <select className="form-select" name='gas' style={{ width: 110, margin: 5 }} aria-label="Default select example" >
            <option value="4.6">АИ92</option>
            <option value="4.9">АИ95</option>
            <option value="4.9">ДТ</option>
          </select>
        </div>
        <div className="person">
          <div className="personText" style={{ fontFamily: 'Montserrat', margin: 5, fontWeight: 700, color: 'white', fontSize: 15, textAlign: 'end' }}>
            <span>Люди:</span>
          </div>
          <select className="form-select" name='person' style={{ width: 80, margin: 5 }} aria-label="Default select example">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button type="submit" className="btn mx-3" style={{ height: 38, fontFamily: 'Montserrat', margin: 32, fontWeight: 700, color: 'white', fontSize: 15, background: '#F46E16' }}>Посчитать</button>
      </form>
      <div className="indicator" style={{

        top: '35%',
        left: '29%',
        color: '#f46e16',
        fontSize: '20px',
        fontWeight: 800,
      }}>
        <div>{cost}</div>
      </div>
    </div>
  )
}

export default BenzinForm

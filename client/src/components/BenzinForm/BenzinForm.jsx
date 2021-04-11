import React,{useState} from 'react'

function BenzinForm() {
    const [cost,setCost] = useState('')
    const [km,setKm] = useState('')
    const handlerKm = (e) => {
      e.preventDefault()
      setKm(e.target.value)
    } 

    const handlerCost = (e) => {
      e.preventDefault()
      console.log('HELLO')
      console.log('km here', e.target.km.value)
      console.log('gas here', e.target.gas.value)
      console.log('person here', e.target.person.value)
      setCost(Math.floor((e.target.km.value * e.target.gas.value) / e.target.person.value))
    }

    return (
        <div>
            <form action="" className="d-flex"onSubmit={handlerCost}  >
            <input type="text"style={{width:100, margin:5}} name='km'className="form-control" id="exampleFormControlInput1" placeholder="km" onChange={handlerKm}/>

            <select className="form-select" name='gas' style={{width:110, margin:5}} aria-label="Default select example" >
              <option value="4.6">АИ92</option>
              <option value="4.9">АИ95</option>
              <option value="4.9">ДТ</option>
            </select>
            <select className="form-select"  name='person'style={{width:80, margin:5}} aria-label="Default select example">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button type="submit" className="btn mx-3" style={{height:40,fontFamily:'Montserrat',margin:5, fontWeight:700, color:'white', fontSize:15,background:'#F46E16'}}>Добавить</button>
            </form>
            <div className="indicator" style={{
                
                top:'35%',
                left:'29%',
                color:'#f46e16',
                fontSize:'20px',
                fontWeight:800,
        }}>
                <div> рублей с человека:{cost}</div>
            </div>
        </div>
    )
}

export default BenzinForm

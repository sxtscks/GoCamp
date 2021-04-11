import React, { useState } from 'react'
const fetch = require('node-fetch');
const convert = require('xml-js');
function BenzinForm() {
  const { benzak, setBenzak } = useState('')
  const handlerBenz = (e) => {
    e.preventDefault()
    const apiURL = 'https://www.globalpetrolprices.com/api_gpp_cities.php?cts=1338&ind=gp,dp&prd=latest&uid=2438&uidc=ea8b4b52b2d203692c12743bab6c21c9'
    fetch(apiURL, {
      method: 'GET',
      mode: 'no-cors'
    })
    .then(response=>response.json())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => console.log(data));




    //   .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    //   .then(data => console.log(data))

    // fetch('https://www.globalpetrolprices.com/api_gpp_cities.php?cts=1338&ind=gp&prd=latest&uid=2438&uidc=ea8b4b52b2d203692c12743bab6c21c9')
    // .then(response=> response.json())
    // .then(data => console.log(data))

  }

  return (
    <div>
      <span>{benzak}</span>
      <button className='btn btn-primary' onClick={handlerBenz}>GO</button>
      {/* <iframe scrolling="no" src="https://multigo.ru/informer/avprices3" frameborder="0" width="250px" height="350px" ></iframe> */}
    </div>
  )
}

export default BenzinForm

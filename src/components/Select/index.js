import React from 'react'

import './style.css'

export default function Select(props){
  const {value, setValue, type} = props
  return(
    <select id='select' value={value} onChange={(ev) => setValue(ev.target.value)}>
      <option hidden={true}>Importance of the {type}</option>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
    </select>
  )
}
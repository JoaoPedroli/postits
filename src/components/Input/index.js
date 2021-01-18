import React from 'react'

import '../styles/input.css'

export default function Input(props){
  const {value, setValue, type} = props
  return(
    <input id='input' value={value} onChange={(ev) => setValue(ev.target.value)}
    placeholder={type + ' Name'}/>
  )
}
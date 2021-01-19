import React from 'react'

import '../styles/switch.css'

export default function Switch(){
  return(
    <label class='switch'>
      <input type='checkbox'/>
      <span class='slider round'></span>
    </label>
  )
}
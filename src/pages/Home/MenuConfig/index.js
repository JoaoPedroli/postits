import React from 'react'

import {FaTimes} from 'react-icons/fa'

// components
import Switch from '../../../components/Switch' 

export default function MenuConfig(props){
  const{setValue} = props
  return(
    <div id='menuConfig'>
      <div id='menuConfigSub'>
        <FaTimes id='close' onClick={() => setValue()}/>

        <Switch/>
      </div>
    </div>
  )
}
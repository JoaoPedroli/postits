import React, {useState, useEffect} from 'react'

import {FaTimes, FaPlus, FaCog} from 'react-icons/fa'
import firebase from './firebase'

import './App.css';
import Bugs from './pages/Home/Bugs'
import Tasks from './pages/Home/Tasks'
import MenuConfig from './pages/Home/MenuConfig'

export default function App() {
  const[onMenu, setOnMenu] = useState(false)
  const[lightT, setLightT] = useState(false)
  const[darkT, setDarkT] = useState(true)

  return (
    <div className="containerApp">
      <div className='bugs-tasks'>
        <div>
          <h1>BUGS</h1>
          <Bugs/>
        </div>
        
        <hr/>
    
        <div>
          <h1>TASKS</h1>
          <Tasks/>
        </div>
      </div>

      <FaCog onClick={() => setOnMenu(!onMenu)} id='config'/>
      {onMenu
      ? <MenuConfig setValue={() => setOnMenu(false)}/>
      : null}
    </div>
  )
}
import React, {useState, useEffect} from 'react'

import {FaTimes, FaPlus} from 'react-icons/fa'
import firebase from './firebase'

import './App.css';
import Bugs from './pages/Home/Bugs'
import Tasks from './pages/Home/Tasks'

export default function App() {
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
    </div>
  )
}
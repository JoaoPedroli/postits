import React, {useState} from 'react';
import { FaCog } from 'react-icons/fa';

import './style.css';
import Bugs from '../../components/Bugs_Tasks/Bugs';
import Tasks from '../../components/Bugs_Tasks/Tasks';
import MenuConfig from '../../components/MenuConfig';

export default function Home() {
  const[onMenu, setOnMenu] = useState(false)

  return (
    <div className="containerHome">
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
  );
}
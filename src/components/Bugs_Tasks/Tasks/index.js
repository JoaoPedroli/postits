import React from 'react'
import {FaPlus, FaMinus} from 'react-icons/fa'
import firebase from '../../../firebase'

import '../style.css'

// components
import Input from '../../Input'
import Select from '../../Select'

export default class Tasks extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tasks: [],
      inputTask: '',
      impTask: '',
    }
    this.addTask = this.addTask.bind(this)
    this.remove = this.remove.bind(this)
  }
  
  componentDidMount(){
    firebase.app.ref('tasks').on('value', (snapshot) => {
      let state = this.state
      state.tasks = []
      snapshot.forEach(ev => {
        state.tasks.push({
          key: ev.key,
          name: ev.val().name,
          importance: ev.val().importance,
        })
      })
      this.setState(state)
    })
  }
  
  addTask = async() => {
    const {inputTask, impTask} = this.state

    if(inputTask === '' || impTask === '')return alert('Preencha os campos')
    this.setState({warningTask: ''})

    const tasks = firebase.app.ref('tasks')
    const key = tasks.push().key

    await tasks.child(key).set({
      key: key,
      name: inputTask,
      importance: impTask,
    })
    this.setState({inputTask: ''})
    this.setState({impTask: ''})
  }

  remove = async(id) => {
    await firebase.app.ref('tasks').child(id).remove()
  }

  render(){
    return(
      <div className='containerBugsTasks'>
        <div>
          <Input value={this.state.inputTask} setValue={(ev) => this.setState({inputTask: ev})}
          type='Task'/>

          <Select value={this.state.impTask} setValue={(ev) => this.setState({impTask: ev})}
          type='Task'/>

          <FaPlus id='pointer' size='30' onClick={() => this.addTask()}/>
        </div>

        {!this.state.tasks.length ? <p style={{marginTop:10}}>No have tasks</p>
        : this.state.tasks.sort((a, b) => {
          if(parseInt(a.importance) === parseInt(b.importance))return 0
          if(parseInt(a.importance) < parseInt(b.importance))return 1
          return -1
        }).map(task => {
          return(
            <div>
              {task.importance === '3'
              ? <div key={task.key} className='tasks' style={{background:'#a8872ce8'}}>
                <p>{task.name}</p>
                <FaMinus id='pointer' onClick={() => this.remove(task.key)}/>
              </div>
              : (
                task.importance === '2'
                ? <div key={task.key} className='tasks' style={{background:'#fbc531b9'}}>
                    <p>{task.name}</p>
                    <FaMinus id='pointer' onClick={() => this.remove(task.key)}/>
                  </div>
                : <div key={task.key} className='tasks' style={{background:'#fdd053e8'}}>
                    <p>{task.name}</p>
                    <FaMinus id='pointer' onClick={() => this.remove(task.key)}/>
                  </div>
              )}
            </div>
          )
        })}
        
      </div>
    )
  }
}
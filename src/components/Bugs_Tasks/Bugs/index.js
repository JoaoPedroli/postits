import React from 'react'
import {FaPlus, FaMinus} from 'react-icons/fa'
import firebase from '../../../firebase'

import '../style.css'

// components
import Input from '../../Input'
import Select from '../../Select'

export default class Bugs extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      bugs: [],
      inputBug: '',
      impBug: '',
    }
    this.addBug = this.addBug.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentDidMount(){
    firebase.app.ref('bugs').on('value', (snapshot) => {
      let state = this.state
      state.bugs = []
      snapshot.forEach(ev => {
        state.bugs.push({
          key: ev.key,
          name: ev.val().name,
          importance: ev.val().importance,
        })
      })
      this.setState(state)
    })
  }

  addBug = async() => {
    const {inputBug, impBug} = this.state

    if(inputBug === '' || impBug === '')return alert('Preencha os campos')
    this.setState({warningBug: ''})

    const bugs = firebase.app.ref('bugs')
    const key = bugs.push().key

    await bugs.child(key).set({
      key: key,
      name: inputBug,
      importance: impBug,
    })
    this.setState({inputBug: ''})
    this.setState({impBug: ''})
  }

  remove = async(id) => {
    await firebase.app.ref('bugs').child(id).remove()
  }

  render(){
    return(
      <div className='containerBugsTasks'>
        <div>
          <Input value={this.state.inputBug} setValue={(ev) => this.setState({inputBug: ev})}
          type='Bug'/>

          <Select value={this.state.impBug} setValue={(ev) => this.setState({impBug: ev})}
          type='Bug'/>

          <FaPlus id='pointer' size='30' onClick={() => this.addBug()}/>
        </div>

        {!this.state.bugs.length ? <p style={{marginTop:10}}>No have bugs</p>
        : this.state.bugs.sort((a, b) => {
          if(parseInt(a.importance) === parseInt(b.importance))return 0
          if(parseInt(a.importance) < parseInt(b.importance))return 1
          return -1
        }).map(bug => {
          return(
            <div>
              {bug.importance === '3'
              ? <div key={bug.key} className='bugs' style={{background:'#8d351f'}}>
                  <p>{bug.name}</p>
                  <FaMinus id='pointer' onClick={() => this.remove(bug.key)}/>
                </div>
              : (
                bug.importance === '2'
                ? <div key={bug.key} className='bugs' style={{background:'#e84218'}}>
                    <p>{bug.name}</p>
                    <FaMinus id='pointer' onClick={() => this.remove(bug.key)}/>
                  </div>
                : <div key={bug.key} className='bugs' style={{background:'#f0623e'}}>
                    <p>{bug.name}</p>
                    <FaMinus id='pointer' onClick={() => this.remove(bug.key)}/>
                  </div>
              )}

            </div>
          )
        })}
      </div>
    )
  }
}
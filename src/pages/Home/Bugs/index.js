import React from 'react'

import {FaPlus, FaMinus} from 'react-icons/fa'
import firebase from '../../../firebase'

// components
import Input from '../../../components/Input'
import Select from '../../../components/Select'

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
          nome: ev.val().nome,
          importancia: ev.val().importancia,
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
      nome: inputBug,
      importancia: impBug,
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
          if(parseInt(a.importancia) === parseInt(b.importancia))return 0
          if(parseInt(a.importancia) < parseInt(b.importancia))return 1
          return -1
        }).map(bug => {
          return(
            <div>
              {bug.importancia === '3'
              ? <div key={bug.key} className='bugs' style={{background:'#8d351f'}}>
                  <p>{bug.nome}</p>
                  <FaMinus id='pointer' onClick={() => this.remove(bug.key)}/>
                </div>
              : (
                bug.importancia === '2'
                ? <div key={bug.key} className='bugs' style={{background:'#e84218'}}>
                    <p>{bug.nome}</p>
                    <FaMinus id='pointer' onClick={() => this.remove(bug.key)}/>
                  </div>
                : <div key={bug.key} className='bugs' style={{background:'#f0623e'}}>
                    <p>{bug.nome}</p>
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
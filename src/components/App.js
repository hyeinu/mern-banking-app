'use strict'

import React, { Component } from 'react'
import Table from './Table'

export default class App extends Component {
  constructor(){
    super();
    this.toggleCredit = this.toggleCredit.bind(this);

    this.state = {
      transactions: [],
      balance: 0,
      credit: 0,
      debit: 0,
      view: 'Table'
    }
  }

  toggleCredit(id){
    fetch(`/api/todos/${id}/toggle`,{
      method: 'PUT'
    })
    .then(res => res.json())
    .then(transactions => {
      this.setState({transactions});
    })
    .catch(err =>{
      console.log('err:', err);
    })

  }

  updateTrans(id, transUpdate){
    fetch(`/api/transactions/${id}`,{
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(transUpdate)
    })
    .then(res => res.json())
    .then(transactions => {
      this.setState({transactions});
    })
    .catch(err =>{
      console.log('err:', err);
    })
  }

  newTrans(newTransaction){
    fetch(`/api/transactions`,{
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(newTransaction)
    })
    .then(res => res.json())
    .then(transactions => {
      this.setState({transactions});
    })
    .catch(err =>{
      console.log('err:', err);
    })
  }

  componentDidMount(){
    fetch('/api/transactions')
    .then(res =>{
      return res.json()
    })
    .then(transactions => {
      this.setState({transactions})
    })
    .catch(err =>{
      console.log('err:', err)
    })
  }

  render(){
    return (
      <div className="container">
        <h2>Balance: {this.state.balance} || Debit: {this.state.debit}  || Credit: {this.state.credit} </h2>
        <Submit newTrans={this.newTrans}/>
        <Table transactions={this.state.transactions} toggleCredit={this.toggleCredit}/>
      </div>
    )
  }
}

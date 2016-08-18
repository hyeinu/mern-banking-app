'use strict'

import React, { Component } from 'react'
import Table from './Table'
import Submit from './Submit'

export default class App extends Component {
  constructor(props){

    super(props);

    this.updateTrans = this.updateTrans.bind(this);
    this.deleteTrans = this.deleteTrans.bind(this);
    this.newTrans = this.newTrans.bind(this);

    this.state = {
      transactions: [],
      view: 'Table'
    }
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

  deleteTrans(id){
    fetch(`/api/transactions/${id}`,{
      method: 'DELETE',
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
    let credit = 0;
    let debit = 0;

    this.state.transactions.forEach(transaction =>{
      if(transaction.credit){
        credit += transaction.value;
      } else {
        debit += transaction.value;
      }
    })

    let balance = credit - debit;

    return (
      <div className="container">
        <h2>Balance: {balance.toFixed(2)} || Debit: {debit.toFixed(2)}  || Credit: {credit.toFixed(2)} </h2>
        <Submit newTrans={this.newTrans}/>
        <Table transactions={this.state.transactions} updateTrans={this.updateTrans} deleteTrans={this.deleteTrans}/>
      </div>
    )
  }
}

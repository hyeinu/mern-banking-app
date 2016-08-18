'use strict'

import React, { Component } from 'react'
import Trans from './Trans'

export default class Table extends Component {
  render(){
    let rows = this.props.transactions.map((transaction , index) => {
      return <Trans key={index+1} transaction={transaction} update={this.props.updateTrans}/>
    })
    return(
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Edit</th>
          </tr>
        </thead>
      <tbody>
        {rows}
      </tbody>
      </table>
    )
  }
}

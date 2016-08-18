'use strict'

import React, { Component } from 'react'

export default class App extends Component {
  constructor(){
    super();
  }
  render(){

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

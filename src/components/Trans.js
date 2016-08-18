import React, { Component } from 'react'
import moment from 'moment'

export default class Trans extends Component {
  constructor(props){
    super(props);

    this.startEdit = this.startEdit.bind(this);
    this.stopEdit = this.stopEdit.bind(this);
    this.selectType = this.selectType.bind(this);
    this.changeDesc = this.changeDesc.bind(this);
    this.changeVal = this.changeVal.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);

    this.state = {
      editing: null,
      editDescription: '',
      editVal: 0,
      type: 'Credit'
    }
  }

  stopEdit(trans){
    this.setState({ editing: null })
  }

  startEdit(transaction){
    let typeVal
    if(transaction.credit){
      typeVal = 'Credit';
    } else{
      typeVal = 'Debit';
    }
    this.setState({
      editing: transaction._id,
      editDescription: transaction.description,
      editVal: transaction.value,
      type: typeVal
    });
  }

  deleteTransaction(id){
    console.log('delete:', id)
  }

  saveTransaction(id){
    let description = this.state.editDescription;
    let value = this.state.editVal;
    let credit
    if(this.state.type === 'Credit'){
      credit = true;
    } else {
      credit = false;
    }
    let newTrans = { description, value, id , credit}
    this.props.update(id, newTrans)
    this.setState({editing: null})
  }

  selectType(e){
    this.setState({type: e.target.value})
  }

  changeDesc(e){
    this.setState({editDescription: e.target.value})
  }

  changeVal(e){
    this.setState({editVal: e.target.value})
  }

  render(){
    let {description, value, credit, createdAt, _id} = this.props.transaction
    let date = moment(createdAt).format('lll')

    let creditVal = credit ? value : null;
    let debitVal = !credit ? value : null;
    if(this.state.editing){
      return (
        <tr>
          <td>{date}</td>
          <td><input type="text" value={this.state.editDescription} onChange={this.changeDesc}/></td>
          <td><input type="number" value={this.state.editVal} onChange={this.changeVal}/></td>
          <td><select value={this.state.type} onChange={this.selectType} className="form-control">
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>
          </td>
          <td>
            <button className='btn btn-default btn-xs' onClick={this.saveTransaction.bind(null, _id)}>
            <span className='glyphicon glyphicon-ok'></span>
            </button>
            <button className='btn btn-default btn-xs' onClick={this.stopEdit.bind(null, this.props.transaction)}>
            <span className='glyphicon glyphicon-remove'></span>
            </button>
          </td>
        </tr>
      )
    } else {
      return(
        <tr key={_id}>
          <td>{date}</td>
          <td>{description}</td>
          <td>{creditVal}</td>
          <td>{debitVal}</td>
          <td>
            <button className='btn btn-default btn-xs' onClick={this.startEdit.bind(null, this.props.transaction)}>
            <span className='glyphicon glyphicon-edit'></span>
            </button>
            <button className='btn btn-danger btn-xs' onClick={this.deleteTransaction.bind(null, _id)}>
            <span className='glyphicon glyphicon-remove'></span>
            </button>
          </td>
        </tr>
      )
    }
  }
}

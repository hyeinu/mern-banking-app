import React, { Component } from 'react'


export default class Submit extends Component {
  constructor(props){
    super(props);
    this.editDescription = this.editDescription.bind(this);
    this.editVal = this.editVal.bind(this);
    this.selectType = this.selectType.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);

    this.state = {
      description: '',
      value: '',
      type: 'Credit'
    }
  }
  selectType(e){
    this.setState({type: e.target.value})
  }
  editVal(e){
    this.setState({value: e.target.value})
  }
  editDescription(e){
    this.setState({description: e.target.value})
  }
  saveTransaction(){
    let newTrans = {};
    newTrans.description = this.state.description
    newTrans.value = this.state.value
    if(this.state.type === 'Credit'){
      newTrans.credit  = true;
    } else{
      newTrans.credit = false;
    }
    this.props.newTrans(newTrans)
  }
  render(){
    return(
      <div className="row">
      <form className="form-inline">
        <div className="form-group col-xs-5">
          <input placeholder="Description" className="form-control" type="text" value={this.state.editDescription} onChange={this.editDescription}/>
          <input placeholder="Value" className="form-control" type="number" value={this.state.editVal} onChange={this.editVal}/>
        </div>
        <select value={this.state.type} onChange={this.selectType} className="form-control">
        <option value="Credit">Credit</option>
        <option value="Debit">Debit</option>
        </select>
        <button type="button" className='btn btn-success btn-md form-inline' onClick={this.saveTransaction}>
        <span className='glyphicon glyphicon-plus'></span>
        </button>
      </form>
      </div>
    )
  }
}

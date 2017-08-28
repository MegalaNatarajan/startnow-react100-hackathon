import React, { Component } from 'react';
export default class DogList extends Component {
  
  
    render(){
      var styleList={width:"200px",marginLeft:"45px"};
      var select=this._inputSelect;
        var items = this.props.items;
        return <select className="form-control" style={styleList} ref={(b) => this._inputSelect = b} onChange = {this.props.loadBreed.bind(null, this._inputSelect)}>
             <option value='' disabled selected>Select a breed</option>
            {this.props.items.map((item,i) =>{
                          return <option key={item} >
                            {item}
                </option> 

            })}
         
            </select>;
    };
}
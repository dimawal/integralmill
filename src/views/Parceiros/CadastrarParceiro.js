import React, { Component } from 'react';
import FrmParceiro from  './components/FrmParceiro';

class CadastrarParceiro extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      codParceiro: (this.props.match.params.id === undefined) ? 0 : this.props.match.params.id
    }
    
  }  

  render() {
    return (
      <div>  
        <FrmParceiro idParceiro={this.state.codParceiro} {...this.props}/>
      </div>
    )
  }
}

export default (CadastrarParceiro);
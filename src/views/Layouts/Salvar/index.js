import React, { Component } from 'react';
import CadastrarLayout from './Components/CadastrarLayout';

class InserirLayout extends Component{
    constructor(props){
        super(props)
        this.state = {
          codLayout: (this.props.match.params.id === undefined) ? 0 : this.props.match.params.id
        }
        
      }  

    render(){
        return (
            <CadastrarLayout codLayout={this.state.codLayout}/>
        );
    }

}

export default InserirLayout
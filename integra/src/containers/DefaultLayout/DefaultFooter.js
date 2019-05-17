import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { SSL_OP_NO_QUERY_MTU } from 'constants';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {

  constructor(){
    super();
    this.state = {
        Nome: localStorage.getItem("nome"),
        Email: localStorage.getItem("email"),
        CodUsuario: localStorage.getItem("cod_usuario")
    }
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const states = this.state;

    return (
      <React.Fragment>
        <span><b>Usuário logado:</b>: {states.CodUsuario}-{states.Nome} </span>
        <span className="ml-auto sm-0">Desenvolvido por <a href="http://www.milleniumcomercial.com.br/">Millenium Comercial</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;

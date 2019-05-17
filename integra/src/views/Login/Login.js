import React, { Component } from 'react';
import { Button
  , Card
  , CardBody
  , CardGroup
  , Col
  , Container
  , Form
  , FormFeedback
  , Input
  , InputGroup 
  , InputGroupAddon
  , InputGroupText
  , Alert
  , Row } from 'reactstrap';

import api  from "./../../services/api"; 
import { login } from "./../../services/auth";

class Logar extends Component {
  constructor(){
    super();
    this.state = {
      usuario: "",
      senha: "",
      error: ""
    };
  }

  handleLogar = async e => {
    e.preventDefault();
    const { usuario, senha } = this.state;

    if (!usuario && !senha) {
      this.setState({ error: "Preencha usuário e senha para continuar!" });
    }else if(!usuario){
      this.setState({ error: "Informe o usuário!" });
    }else if(!senha){
      this.setState({ error: "Informe a senha!" });
    } else {
      try {
        //console.log("teste 1");
        const data = { Login:usuario, Senha:senha };
        const response = await api.post("/login", data);
        //console.log({ Login:usuario, Senha:senha });

        if(response.data.autenticado === false){
         this.setState({error:"Dados de acesso inválidos!"}); 
        }else{
          login(response.data);
          this.props.history.push("/home");
        }

     
       
        //
        //
      } catch (err) {
        //console.log("teste 3");
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais."
        });
      }
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                
                <Card className="p-4" >
              
                  <CardBody style={{padding:"0px"}}>
                    
                    <Form className="form-horizontal" 
                          onSubmit = {this.handleLogar}>
                   
                      <h1 align="center">Integra Mill</h1>
                      <p align="center" className="text-muted">Acesso Administrativo</p>
                      {(this.state.error === "") ? "" : <Alert align="center" color="primary" >{this.state.error}</Alert>}
                              
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>

                        <Input type="text"
                               placeholder="Usuário" 
                               autoComplete="usuario" 
                               onChange={e => this.setState({ usuario: e.target.value })}
                               />

                        <FormFeedback>Houston, we have a problem...</FormFeedback>
                      </InputGroup>
                 
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" 
                               placeholder="Senha" 
                               onChange={e => this.setState({ senha: e.target.value })}
                               />
                      </InputGroup>
                      <Row >
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Entrar</Button>
                        </Col>
                        <Col xs="6" className="text-right" hidden>
                          <Button color="link" className="px-0">Esqueceu a senha?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    
                    <div>
                      
                      <img className="d-block w-100" 
                            src="http://www.milleniumcomercial.com.br/millenium/images/logo.png"
                            alt="Distribuidora Millenium Comercial"  />

                      <a href="http://www.milleniumcomercial.com.br" 
                          target="_blank"
                          rel="noopener noreferrer">
                        <Button color="primary" 
                                className="mt-3" 
                                active 
                                tabIndex={-1}>www.milleniumcomercial.com.br</Button>
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Logar;

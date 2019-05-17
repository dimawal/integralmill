import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {Button} from 'primereact/button';
import {obterTodasSecoes} from '../../../../../services/secoes';
import {obterTodasTabelas} from '../../../../../services/dicionarioDeDados';
import {salvarLayoutSecao} from '../../../../../services/layouts';
import * as Yup from 'yup';
import {Col, FormGroup, Label, Input, Row} from 'reactstrap'
import {modeloSecaoLayout} from './../model/modelos'

const validarForm = 
    Yup.object().shape(
        {
            CodigoSecao: Yup.string().required("Informe a seção!"),
            CodigoTabela: Yup.string().required('Informe a tabela!'),
            Constante: Yup.string().required('Informe a constante!')
        }
    )

class FormularioSecao extends Component {
    constructor(props){
        super(props);
        this.state = {
            dtFormSection: props.modelo,
            dtSections: [],
            dtTables: []
        }
        this.onChangeInputs = this.onChangeInputs.bind(this);
    }


    async SaveLayoutSection(fields, {setSubmitting}){
        const props = this.props;

        var dados = {
            Codigo : fields.CodigoLayoutSecao,
            CodigoLayout : fields.CodigoLayout,
            CodigoSecao : fields.CodigoSecao,
            CodigoTabela : fields.CodigoTabela,
            Constante : fields.Constante,
            Ordem : fields.Ordem
        }

        await salvarLayoutSecao(dados);

        setSubmitting(false);
        props.callBack();
    }

    async LoadSections(){
        var response = await obterTodasSecoes();
        this.setState({dtSections: response.data});
    }
    
    async LoadTables(){
        var response = await obterTodasTabelas();
        this.setState({dtTables: response.data});
    }

    componentWillMount(){   
        this.LoadSections();
        this.LoadTables();
    }

    onChangeInputs(event, {setFieldValue}){
        setFieldValue(event.target.name, event.target.value)
    }

    render(){
        const state = this.state;
        //console.log('renderFilho', state)
                
        return (
            <div style={{textAlign: 'left', fontWeight:'normal'}}>
          
                
                    <Formik
                        initialValues={state.dtFormSection}
                        enableReinitialize={true}
            
                        onSubmit={(fields, {setSubmitting, setFieldValue}) => {   
                            this.SaveLayoutSection(fields, {setSubmitting})
                        }}

        
                        validationSchema={validarForm}
                
                        render={props => {
            
                                const {
                                    values,
                                    touched,
                                    errors,
                                    isSubmitting,
                                    setFieldValue
                                } = props;


                                return (
                                    <Form>
                                        <Row>  

                                            <Col lg="8" xs="12">
                                                <FormGroup>
                                                    <Label style={{marginBottom: '4px'}} htmlFor="CodigoSecao">Seção:</Label>
                                                    <Input 
                                                        type="select" 
                                                        name="CodigoSecao" 
                                                        value={(values.CodigoSecao)}
                                                        className={'form-control' + (errors.CodigoSecao && touched.CodigoSecao ? ' is-invalid' : '')}
                                                        id="CodigoSecao" onChange={(e)=>this.onChangeInputs(e,{setFieldValue})}
                                                    >
                                                        <option>-- selecione --</option>
                                                        {state.dtSections.map((e,i)=>{
                                                            return <option key={i} value={parseInt(e.codigo)}>{e.descricao}</option>
                                                        })}
                                                    </Input>
                                                    <ErrorMessage name="CodigoSecao" component="span" className="validacaoErro" />
                                                </FormGroup>
                                            </Col>

                                            <Col lg="4" xs="12">
                                                <FormGroup>
                                                    <Label style={{marginBottom: '4px'}} htmlFor="Constante">Constante:</Label>
                                                    <Field
                                                        name='Constante'
                                                        id='Constante'
                                                        render={({ field }) => (       
                                                            <Input
                                                                className={'form-control' + (errors.Constante && touched.Constante ? ' is-invalid' : '')}
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    <ErrorMessage name="Constante" component="span" className="validacaoErro" />
                                                </FormGroup>
                                            </Col>

                                            <Col lg="12" xs="12" >
                                                <FormGroup>
                                                    <Label style={{marginBottom: '4px'}} htmlFor="CodigoTabela">Tabela destino:</Label>

                                                    <FormGroup row>
                                                        <Col lg="12" xs="12">
                                                            <Input 
                                                                type="select" 
                                                                name="CodigoTabela" 
                                                                className={'form-control' + (errors.CodigoTabela && touched.CodigoTabela ? ' is-invalid' : '')}
                                                                value={values.CodigoTabela}
                                                                id="CodigoTabela" onChange={(e)=>this.onChangeInputs(e,{setFieldValue})}
                                                            >
                                                                <option>-- selecione --</option>
                                                                {state.dtTables.map((e,i)=>{
                                                                    return <option key={i} value={e.codigoTabela}>{e.descricao}</option>
                                                                })}
                                                            </Input>
                                                            <ErrorMessage name="CodigoTabela" component="span" className="validacaoErro" />
                                                        </Col>
                                                    </FormGroup>
                                                </FormGroup>     
                                            </Col>

                                        </Row>

                                        <Row>
                                        
                                            <Col>  
                                            <hr />
                                                <Button 
                                                    style={{float:'right', backgroundColor: "#00ab9c", border: "1px #00ab9c solid"}}
                                                    label="Salvar" 
                                                    icon="fa fa-save" 
                                                    type="submit"
                                                    className="p-button-raised"
                                                    disabled={isSubmitting}
                                                    iconPos="right" /> 
                                            </Col> 
                                        </Row>    
                    
                                        
                                    </Form>
                                );
                            }
                    }
                    />
        
            
          </div>
    
    
        );
    }
}

FormularioSecao.defaultProps = {
    modelo: modeloSecaoLayout
}

export default FormularioSecao;
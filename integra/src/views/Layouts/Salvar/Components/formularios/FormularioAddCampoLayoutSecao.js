import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {Button} from 'primereact/button';
import {InputText } from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import * as Yup from 'yup';
import {Col, FormGroup, Label, Input, Row} from 'reactstrap';
import {modeloCampoLayoutSecao} from '../model/modelos';
import {salvarCampoSecao} from '../../../../../services/layouts';
import {obterCamposDaTabela} from '../../../../../services/dicionarioDeDados';


const validarForm = 
    Yup.object().shape(
        {      
            Posicao: Yup.string().required("Campo Obrigatório!"),
            Tamanho: Yup.string().required("Campo Obrigatório!"),
            Alinhamento: Yup.string().required("Campo Obrigatório!"),
            Mascara: Yup.string().required("Campo Obrigatório!"),
            CodigoTabelaItem: Yup.object().nullable().required("Campo Obrigatório!")
        }
    )

class FormularioAddCampoLayoutSecao extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            modeloForm: modeloCampoLayoutSecao   ,
            objCamposTabela:[]
        }
    }

    async SaveFieldLayoutSection(fields, {setSubmitting}){
        const props = this.props;
        var objDados = fields;
        objDados.CodigoTabela = fields.CodigoTabelaItem.codigoTabela;
        objDados.CodigoTabelaItem = fields.CodigoTabelaItem.item;
        objDados.CodigoLayoutSecao = props.dadosSecao.codLayoutSecao;
        await salvarCampoSecao(objDados);


        setSubmitting(false);
    }

    async LoadTableFields(){    
        var codTabela = this.props.dadosSecao.codigoTabela;
        var valores = await obterCamposDaTabela(codTabela);
        valores = valores.data;
        this.setState({objCamposTabela: valores});
    }


    onChangeInputs(event, {setFieldValue}){
        setFieldValue(event.target.name, event.target.value)
    }

    onChangeDropDown(event, {setFieldValue}){
        setFieldValue(event.target.name, event.target.value)
    }

    componentWillMount(){
        this.LoadTableFields();
    }

    render(){

        return (
            <div style={{textAlign: 'left', fontWeight:'normal'}}>

                <Formik
                    initialValues={this.state.modeloForm}
                    enableReinitialize={true}
                    validationSchema={validarForm}
                    onSubmit={(fields, {setSubmitting}) => {   
                        this.SaveFieldLayoutSection(fields, {setSubmitting})
                    }}

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
                                        <Col lg="12" xs="12">
                                            <Row>
                                                <Col lg="3" xs="12">
                                                    <FormGroup>
                                                        <Label style={{marginBottom: '4px'}} htmlFor="Posicao">Posição:</Label>
                                                        <Field
                                                            name='Posicao'
                                                            id='Posicao'
                                                            render={({ field }) => (       
                                                                <InputText
                                                                    keyfilter="pint"
                                                                    className={'form-control' + (errors.Posicao && touched.Posicao ? ' is-invalid' : '')}
                                                                    {...field}
                                                                />
                                                            )}
                                                        />
                                                        <ErrorMessage name="Posicao" component="span" className="validacaoErro" />
                                                    </FormGroup>
                                                </Col>

                                                <Col lg="3" xs="12">
                                                    <FormGroup>
                                                        <Label style={{marginBottom: '4px'}} htmlFor="Tamanho">Tamanho:</Label>
                                                        <Field
                                                            name='Tamanho'
                                                            id='Tamanho'
                                                            render={({ field }) => (       
                                                                <InputText
                                                                    keyfilter="pint"
                                                                    className={'form-control' + (errors.Tamanho && touched.Tamanho ? ' is-invalid' : '')}
                                                                    {...field}
                                                                />
                                                            )}
                                                        />
                                                        <ErrorMessage name="Tamanho" component="span" className="validacaoErro" />
                                                    </FormGroup>
                                                </Col>

                                                <Col lg="6" xs="12" >
                                                    <FormGroup>
                                                        <Label style={{marginBottom: '4px'}} htmlFor="CodigoTabelaItem">Campos:</Label>

                                                        <FormGroup row>
                                                            <Col lg="12" xs="12">
                                                            {/*
                                                                <Input 
                                                                    type="select" 
                                                                    name="CodigoTabelaItem" 
                                                                    className={'form-control' + (errors.CodigoTabelaItem && touched.CodigoTabelaItem ? ' is-invalid' : '')}
                                                                    value={values.CodigoTabelaItem}
                                                                    id="CodigoTabelaItem" onChange={(e)=>this.onChangeInputs(e,{setFieldValue})}
                                                                >
                                                                    <option>-- selecione --</option>
                                                        
                                                                </Input>
                                                            */}
                                                                <Dropdown 
                                                                    style={{width:'100%', height:'35px'}}
                                                                    value={values.CodigoTabelaItem} 
                                                                    options={this.state.objCamposTabela} 
                                                                    name="CodigoTabelaItem"
                                                                    className={(errors.CodigoTabelaItem && touched.CodigoTabelaItem ? ' is-invalid' : '')}
                                                                    onChange={(e)=>this.onChangeDropDown(e,{setFieldValue})}
                                                                    placeholder="-- selecione --" 
                                                                    filter={true}
                                                                    showClear={true}
                                                                    optionLabel="descricao"/>
                                                                <ErrorMessage name="CodigoTabelaItem" component="span" className="validacaoErro" />
                                                            </Col>
                                                        </FormGroup>
                                                    </FormGroup>     
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col lg="3" xs="12">
                                            <FormGroup>
                                                <Label style={{marginBottom: '4px'}} htmlFor="Posicao">Alinhamento:</Label>
                                                <Input 
                                                    type="select" 
                                                    name="Alinhamento" 
                                                    className={'form-control' + (errors.Alinhamento && touched.Alinhamento ? ' is-invalid' : '')}
                                                    value={values.Alinhamento}
                                                    id="Alinhamento" onChange={(e)=>this.onChangeInputs(e,{setFieldValue})}
                                                >
                                                    <option>-- selecione --</option>
                                                    <option value={1}>Esquerda</option>
                                                    <option value={2}>Direita</option>
                                                </Input>
                                                <ErrorMessage name="Alinhamento" component="span" className="validacaoErro" />
                                            </FormGroup>
                                        </Col>

                                        <Col lg="3" xs="12">
                                            <FormGroup>
                                                <Label style={{marginBottom: '4px'}} htmlFor="PreencherCom">Preencher Com:</Label>
                                                <Field
                                                    name='PreencherCom'
                                                    id='PreencherCom'
                                                    render={({ field }) => (       
                                                        <Input
                                                            className={'form-control' + (errors.PreencherCom && touched.PreencherCom ? ' is-invalid' : '')}
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                                <ErrorMessage name="PreencherCom" component="span" className="validacaoErro" />
                                            </FormGroup>
                                        </Col>

                                        <Col lg="4" xs="12">
                                            <FormGroup>
                                                <Label style={{marginBottom: '4px'}} htmlFor="Mascara">Máscara:</Label>
                                                <Field
                                                    name='Mascara'
                                                    id='Mascara'
                                                    render={({ field }) => (       
                                                        <Input
                                                            className={'form-control' + (errors.Mascara && touched.Mascara ? ' is-invalid' : '')}
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                                <ErrorMessage name="Mascara" component="span" className="validacaoErro" />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    {JSON.stringify(values, null, 4)}
                                    
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



export default FormularioAddCampoLayoutSecao;
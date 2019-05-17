import React, { Component } from 'react';
import {InputText} from 'primereact/inputtext';
import {RadioButton} from 'primereact/radiobutton';
import * as Yup from 'yup';
import {Panel} from 'primereact/panel';
import {obterTodosProcessos} from '../../../../services/processos'
import {salvarLayouts} from '../../../../services/layouts'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {Button} from 'primereact/button';
import {modeloLayout} from './../Components/model/modelos';
import {obterLayoutPorId} from '../../../../services/layouts';

import {
    Col, 
    FormGroup, 
    Label, 
    Input, 
    Row
} from 'reactstrap'
 



const codUsuario = localStorage.getItem("cod_usuario");

const validarForm = 
    Yup.object().shape(
        {
            descricao: Yup.string().required("Informe a descrição!"),
            versao: Yup.string().required('Informe a versão!'),
            processos: Yup.string().required('Informe o processo!')
        }
    )


class InformacoesBasicas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dtFormulario: modeloLayout,
            dtProcessos: [],
            dtProcessosCombo: []
        };    
        this.onChangeTipoProcesso = this.onChangeTipoProcesso.bind(this);
    }

    onChangeTipoProcesso(event, {setFieldValue}){
        let processo = event.target.value;
        this.alterarDtProcessoCompo(processo);
        setFieldValue("tipoDeProcesso", event.target.value)
        setFieldValue("processos", "")
    }

   
    async loadLayoutByID(codLayout){
        
        if(codLayout !== null){
            var layout = await obterLayoutPorId(codLayout);
            layout = layout.data;
            if (this.state.dtProcessos.length <= 0){
                let listProcess = await obterTodosProcessos();
                this.setState({dtProcessos:listProcess.data}, (e)=> {
                    let dtOriginal = this.state.dtProcessos;
                    let dtTotal = dtOriginal.filter((_processo) => parseInt(_processo.tipo) === parseInt(layout.codigoTipoProcesso));
                    this.setState({dtProcessosCombo:dtTotal}, ()=> {
                        this.setState({
                            dtFormulario:{
                                codigo: layout.codigo,
                                tipoDeProcesso: layout.codigoTipoProcesso,
                                processos: layout.codigoProcesso,
                                descricao: layout.descricao,
                                versao: layout.versao,
                                modoSeparacao: layout.modo,
                                caractere: (layout.caractereSeparador) ? layout.caractereSeparador : ""
                            }
                        }, (e)=> {
                            this.props.handleCallBack(this.state.dtFormulario, false);
                        });   
                    });      
                })       
            } 
        }
    }

    async alterarDtProcessoCompo(tipo){
        let dtOriginal = this.state.dtProcessos;
        let dt = dtOriginal.filter((processo) => parseInt(processo.tipo) === parseInt(tipo));
        this.setState({dtProcessosCombo:dt});
    }
    
    async Salvar(fields, {setSubmitting, setFieldValue}){       
        const props = this.props;

        var dados = {
            "Codigo" : fields.codigo,
            "CodigoProcesso" : fields.processos,
            "Descricao" : fields.descricao,
            "Versao" : fields.versao,
            "Modo" : fields.modoSeparacao,
            "CaractereSeparador" : fields.caractere,
            "CodigoUsuarioCriacao" : codUsuario,
            "CodigoUsuarioAlteracao" : codUsuario
        }

        var response = await salvarLayouts(dados);
        var codigo = 0;
        codigo = response.data.codigoGerado;
        setFieldValue('codigo', codigo)
        props.handleCallBack({ ...fields, codigo:codigo}, true);
        setSubmitting(false);
    }

    async preencherCboProcesso(){
        if (this.state.dtProcessos.length <= 0){
            let listProcess = await obterTodosProcessos();
            this.setState({dtProcessos:listProcess.data}, (e)=> this.alterarDtProcessoCompo(1))           
        }
    }
    componentWillMount(){     
        if (this.props.codLayout > 0){
            this.loadLayoutByID(this.props.codLayout);
        }else{
            this.preencherCboProcesso();
            this.alterarDtProcessoCompo(1);
        }
    }

    render(){

        const { dtProcessosCombo, dtFormulario } = this.state;
    
        return (

            <div>  
                
                <Formik
                    initialValues={dtFormulario}
                    enableReinitialize={true}
        
                    onSubmit={(fields, {setSubmitting, setFieldValue}) => {    
                        this.Salvar(fields, {setSubmitting, setFieldValue})
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
                            <Form >
                                <Row > 
                              
                                    <Col lg="7" xs="12">
                                        
                                        <Row>  
                                            <Col lg="2" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="codigo">Código:</Label>
                                                    <Field
                                                        name='codigo'
                                                        id='codigo'
                                                        render={({ field }) => (       
                                                            <Input
                                                                readOnly
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                </FormGroup>
                                            </Col> 
                                            
                                            <Col lg="4" xs="12">
                                                <Label htmlFor="tipoDeProcesso" >Tipo de processo:</Label>
                                                <Input 
                                                    type="select" 
                                                    name="tipoDeProcesso" 
                                                    value={values.tipoDeProcesso}
                                                    id="tipoDeProcesso" onChange={(e)=>this.onChangeTipoProcesso(e,{setFieldValue})}
                                                    >
                                                    <option value="1">Importação</option>
                                                    <option value="2" >Exportação</option>
                                                </Input>
                                                
                                            </Col>
                
                                            <Col lg="5" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="processos">Processos:</Label>
                                                    <Field
                                                        name="processos" 
                                                        id="processos"
                                                        render={({ field }) => (       
                                                            <Input 
                                                                type="select"  
                                                                className={'form-control' + (errors.processos && touched.processos ? ' is-invalid' : '')}
                                                                {...field}>
                                                                <option></option>
                                                                {
                                                                    dtProcessosCombo.map((e, index) => {
                                                                        return <option key={index} value={e.codigo}>{e.descricao}</option>
                                                                    })
                                                                }
                                                            </Input>
                                                            
                                                        )}
                                                    />
                                                    <ErrorMessage name="processos" component="span" className="validacaoErro" />
                                                </FormGroup>
                                            </Col>
                                            
                                        </Row>
                
                                        <FormGroup row>  
                                            <Col lg="8" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="descricao">Descrição:</Label>
                                                    <Field
                                                        name="descricao"
                                                        render={({ field }) => (       
                                                            <Input 
                                                                className={'form-control' + (errors.descricao && touched.descricao ? ' is-invalid' : '')}
                                                                {...field} />
                                                        )}
                                                    />
                                                    <ErrorMessage name="descricao" component="span" className="validacaoErro" />
                                                </FormGroup>
                                            </Col>
                
                                            <Col lg="3" xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="versao">Versão:</Label>
                                                    <Field
                                                        name='versao'
                                                        render={({ field }) => (       
                                                            <Input 
                                                                className={'form-control' + (errors.versao && touched.versao ? ' is-invalid' : '')} 
                                                                {...field} />
                                                        )}
                                                    />
                                                    <ErrorMessage name="versao" component="span" className="validacaoErro" />
                                                </FormGroup>
                                            </Col>
                                        </FormGroup>
                
                                    </Col>
                
                                    <Col lg="4" xs="12" >
                                
                                        <Panel header="Separação dos campos" style={{margin:0}}>
                                            <FormGroup row>
                                                <Col lg="12" xs="12" style={{marginTop:'10px'}}>                                           
                                                    <RadioButton 
                                                        name="modoSeparacao"
                                                        onChange={(e)=> setFieldValue('modoSeparacao', e.target.value)}
                                                        inputId="modoPosicao"
                                                        value={2}
                                                        checked={values.modoSeparacao === 2}
                                                         />
                                                    <label htmlFor="cb3" className="p-checkbox-label">Posição</label>
                                                </Col>
                                            </FormGroup>
                                            
                
                                            <FormGroup row>
                                                <Col lg="12" xs="12">
                                                    <FormGroup >
                                                        <RadioButton 
                                                            name="modoSeparacao"
                                                            onChange={(e)=> setFieldValue('modoSeparacao', e.target.value)}
                                                            inputId="modoPosicao"
                                                            value={1}
                                                            checked={values.modoSeparacao === 1}
                                                            />     

                                                        <label htmlFor="cb3" className="p-checkbox-label">
                                                            Caractere Separador: &nbsp;
                                                            <Field
                                                                name='caractere'
                                                                render={({ field }) => (       
                                                                    <InputText
                                                                        tooltip="Informe o caractere separador dos campos"
                                                                        style={{textAlign:'center'}}
                                                                        size="1"
                                                                        maxLength="1"
                                                                        disabled={(values.modoSeparacao === 2) ? true : false}
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />
                                                        </label>
                                                    </FormGroup>
                                                </Col>
                                            </FormGroup>

                                        </Panel>
                                    </Col>
             
                                </Row>  
                                
                                <Row>
                                    <Col lg="12" xs="12">
                                        <Button 
                                            style={{float:'right', backgroundColor: "#00ab9c", border: "1px #00ab9c solid"}}
                                            label="Salvar Cabeçalho" 
                                            icon="fa fa-save" 
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="p-button-raised"
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

export default InformacoesBasicas;
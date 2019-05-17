import React, {Component} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Dropdown} from 'primereact/dropdown';
import {Messages} from 'primereact/messages';
import {Button} from 'primereact/button';
import {obterParceiroPorId, salvarParceiro, inativarParceiro} from '../../../services/parceiros'
import {InputMask} from 'primereact/inputmask'
 
import{
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Label,
    CardFooter,
    Input
} from 'reactstrap'
 
const camposPadroes = {
    CodParceiro: '0',
    TipoPessoa: "1", //1.Fisica  2.Juridica
    CpfCnpj: '',
    RazaoSocial: '',
    NomeFantasia: '',
    Email: '',
    Telefone: ''
};

const validarForm = 
    Yup.object().shape(
        {
            RazaoSocial: Yup.string().required("Informe a Razão Social!"),
            CpfCnpj: Yup.string().required('Informe o documento!'),
            NomeFantasia: Yup.string().required("Informe o nome fantasia!"),
            Email: Yup.string().email("E-mail inválido!")
        }
    )

const codUsuario = localStorage.getItem("cod_usuario");



class FrmParceiro extends Component {

    
    constructor(props){
        super(props) 
        this.state = ({
            dtParceiro:camposPadroes
        })

        //this.onPessoaChange = this.onPessoaChange.bind(this);
    }

    async loadPartnerById(codParceiro) {
        if(codParceiro !== null){
            var partner = await obterParceiroPorId(codParceiro) 
            this.setState({
                dtParceiro:{
                    CodParceiro: partner.codigo,
                    TipoPessoa: partner.tipoPessoa,
                    CpfCnpj: partner.cpfCnpj,
                    RazaoSocial: partner.razaoSocial,
                    NomeFantasia: partner.nomeFantasia,
                    Email: partner.email,
                    Telefone: partner.telefone
                }
            }) 
        }
    }

    async savePartner(fields, {setSubmitting}){       
        const props = this.props;   

        let cpfCnpj = fields.CpfCnpj;
        cpfCnpj = cpfCnpj.replace(".","").replace(".","").replace(".","");
        cpfCnpj = cpfCnpj.replace("-","");
        cpfCnpj = cpfCnpj.replace("/","");

        if(fields.TipoPessoa === "1"){
            cpfCnpj = cpfCnpj.substring(0,11);
        }

        const data = { 
            Codigo: this.props.idParceiro,
            RazaoSocial: fields.RazaoSocial,
            NomeFantasia: fields.NomeFantasia,
            TipoPessoa: fields.TipoPessoa,
            CpfCnpj: cpfCnpj,
            Email: fields.Email,
            Telefone: fields.Telefone.replace("(","").replace(")","").replace(" ","").replace("-","").replace("_",""),
            CodigoUsuarioAlteracao: parseInt(codUsuario),
            CodigoUsuarioCriacao: parseInt(codUsuario),
            Ativo: true
        };
            
        var response = await salvarParceiro(data);

        var severity = "";
        var summary = "";
        var detail = "";
       
        if(response.status === 200){ //200 ok
            if(response.data.status === "ok"){
                severity = "success";
                summary = "Sucesso!";
                detail = "As informações foram gravadas com êxito.";
            }else{
                severity = "error";
                summary = "Erro interno!";
                detail = response.data.mensagem;
            }
        }else{
            severity = "warn";
            summary = "Erro interno!";
            detail = "Procure o administrador do sistema.";
        }

        setSubmitting(false)
        
        if(props.idParceiro > 0){
            this.messages.show({
                severity: severity, 
                summary: summary, 
                detail: detail,
                //sticky: true
            });
        }else{
            props.history.push('/parceiros'); 
        }     
    }

    async removePartner(){
        const idPartner = this.props.idParceiro;
        if(idPartner !== null){
            if(window.confirm('Deseja remover o parceiro selecionado?')){
                await inativarParceiro(idPartner, codUsuario);
                this.props.history.push('/parceiros'); 
            }
        }  
    }

    async componentWillMount(){    
        if(this.props.idParceiro > 0 ){
            await this.loadPartnerById(this.props.idParceiro)
        }else{
            this.setState({dtParceiro:camposPadroes})
        }      
    }

    
    render (){
     

        return(

        <div>  

          <Formik
            initialValues={this.state.dtParceiro}
            enableReinitialize={true}

            onSubmit={(fields, { setSubmitting }) => {    
                this.savePartner(fields, { setSubmitting });
            }}

            validationSchema={validarForm}
         
            render={props => {

                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting
                    } = props;
                    
                    const tipoPessoa = [
                        {label: 'Física', value: "1"},
                        {label: 'Jurídica', value: "2"}
                    ];

                 
                    return (

                    <Form >
                        <Messages ref={(el) => this.messages = el}></Messages>

                        <Card>
                         
                            <CardHeader>
                                <strong>{(this.props.idParceiro > 0) ? "Editar Parceiro" : "Novo Parceiro"}</strong>

                                
                            </CardHeader>
                            <CardBody>
    
                                <FormGroup row className="my-0">
                        
                                    <Col lg="2" xs="12">
                                        <FormGroup>
                                            <Label htmlFor="CodParceiro">Código:</Label>
                                            <Field
                                                name='CodParceiro'
                                                render={({ field }) => (
                                                    <Input className={'form-control'} disabled {...field} />
                                                )}
                                                />
                                        </FormGroup>
                                    </Col>
    
                                    <Col lg="3" xs="12">
                                        <FormGroup>
                                            <Label htmlFor="TipoPessoa">Tipo de Pessoa:</Label>
                                            <Field 
                                                name="TipoPessoa" 
                                                render={({field}) => (
                                                    <Dropdown 
                                                        className="form-control no-padding-top"
                                                        options={tipoPessoa} 
                                                        {...field} 
                                                        />
                                                )}
                                            />
                                            
                                        </FormGroup>
                                    </Col>
    
                                    <Col lg="3" xs="12">
                                        <FormGroup>
                                            <Label htmlFor="CpfCnpj">{(values.TipoPessoa === "1") ? "CPF" : "CNPJ"}:</Label>         
                                                                                       
                                            <Field
                                                    name='CpfCnpj'
                                                    render={({ field }) => (       
                                                        <InputMask 
                                                            key={values.TipoPessoa}
                                                            mask={(values.TipoPessoa === "1") ? "999.999.999-99" : "99.999.999/9999-99"}
                                                            autoClear={false}
                                                            className={'form-control' + (errors.CpfCnpj && touched.CpfCnpj ? ' is-invalid' : '')}
                                                            {...field} />
                                                    )}
                                                />                                           
                                            <ErrorMessage name="CpfCnpj" component="span" className="validacaoErro" />
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
    
                                <FormGroup row className="my-0">
                                <Col xs="12" lg="12">
                                    <FormGroup>
                                    <Label htmlFor="RazaoSocial">Razão Social:</Label>
                                    <Field 
                                        name="RazaoSocial" 
                                        render={({ field }) => (
                                            <Input className={'form-control' + (errors.RazaoSocial && touched.RazaoSocial ? ' is-invalid' : '')}
                                                     {...field} />
                                        )}/>
                                        
                                    <ErrorMessage name="RazaoSocial" component="span" className="validacaoErro" />
                                    </FormGroup>
                                </Col>
    
                                <Col xs="12" lg="12">
                                    <FormGroup>
                                    <Label htmlFor="NomeFantasia">Nome Fantasia:</Label>
                                    <Field 
                                        name="NomeFantasia" 
                                        render={({ field }) => (
                                            <Input className={'form-control' + (errors.NomeFantasia && touched.NomeFantasia ? ' is-invalid' : '')} {...field} />
                                            //<InputMask mask="99-999999" value={this.state.value} onChange={(e) => this.setState({value: e.value})}></InputMask>
                                        )}/>
                                    <ErrorMessage name="NomeFantasia" component="span" className="validacaoErro" />
                                    </FormGroup>
                                </Col>
                                </FormGroup>
    
                                <FormGroup row className="my-0">
                                <Col xs="12" lg="7">
                                    <FormGroup>
                                    <Label htmlFor="Email">E-mail:</Label>
                                    <Field 
                                        name="Email" 
                                        render={({ field }) => (
                                            <Input {...field}  className={'form-control'} />
                                        )}/>
                                    <ErrorMessage name="Email" component="span" className="validacaoErro" />
                                    </FormGroup>
                                
                                </Col>
    
                                <Col xs="12" lg="3">
                                    <FormGroup>
                                    <Label htmlFor="Telefone">Telefone de contato:</Label>
                                    <Field 
                                        name="Telefone" 
                                        render={({ field }) => (
                                            <InputMask mask="(99) 99999-9999" {...field}  className={'form-control'} />
                                        )}/>
                                    </FormGroup>
                                </Col>
                                </FormGroup>
    
                            </CardBody>
    
                            <CardFooter>     
                                <Button 
                                    style={{float: 'right', marginLeft: '10px'}} 
                                    label="Salvar" 
                                    icon="fa fa-save" 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="p-button-raised p-button-success"
                                    iconPos="right" />
                                
                                <Button 
                                    style={{float: 'right', marginLeft: '10px'}} 
                                    label="Remover" 
                                    icon="fa fa-trash" 
                                    className="p-button-raised p-button-danger"
                                    type="button"
                                    onClick={()=>{this.removePartner()}}
                                    hidden={(this.props.idParceiro > 0) ? false : true}
                                    disabled={isSubmitting}
                                    iconPos="right" />
                            </CardFooter>
                        </Card>

                        
                    </Form>
                    );
                }
            }
          />
      
          
          
        </div>
        );
    }
}





//conectar os dados
/*
const mapStateToProps = store => ({
    parceiro:{
        CodParceiro: store.parceiros.CodParceiro,
        TipoPessoa: store.parceiros.TipoPessoa,
        CpfCnpj: store.parceiros.CpfCnpj,
        RazaoSocial: store.parceiros.RazaoSocial,
        NomeFantasia: store.parceiros.NomeFantasia,
        Email: store.parceiros.Email,
        Telefone: store.parceiros.Telefone
    }
});
*/


//manipular eventos
//const mapDispatchToProps = dispatch => bindActionCreators({onSubmit_SalvarParceiro, onLoad_NovoParceiro}, dispatch);

//export default connect(mapStateToProps, mapDispatchToProps)(FrmParceiro);
export default (FrmParceiro)
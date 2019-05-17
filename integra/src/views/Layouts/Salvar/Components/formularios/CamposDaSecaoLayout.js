import React, { Component } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Col, Row } from 'reactstrap';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

import FormularioAddCampoLayoutSecao from './FormularioAddCampoLayoutSecao';
import {obterCamposLayoutSecao} from '../../../../../services/layouts';

const colDtCamposSecoes = [
    {sortable: false, filter: false, field: 'posicao', header: 'Pos', style:{width:'60px'}},
    {sortable: false, filter: false, field: 'tamanho', header: 'Tamanho', style:{width:'80px'}},
    {sortable: false, filter: false, field: 'campoTabela', header: 'Campo Tabela', style:{width:'150px'}},
    {sortable: false, filter: false, field: 'tipoCampoTabela', header: 'Tipo Campo', style:{width:'100px'}},
    {sortable: false, filter: false, field: 'alinhamento', header: 'Alinh.', style:{width:'60px'}},
    {sortable: false, filter: false, field: 'completarCom', header: 'Completar C/', style:{width:'100px'}},
    {sortable: false, filter: false, field: 'mascara', header: 'Máscara', style:{width:'100px'}},
];

const colunasCamposSecoes = colDtCamposSecoes.map((col,i) => {
    return <Column 
                key={i} 
                sortable={col.sortable}
                field={col.field} 
                filter={col.filter}
                header={col.header} 
                style={col.style}
            />;
});

var frmmAddCampoSecao = null;


class CamposDaSecaoLayout extends Component{

    constructor(props){
        super(props);
        this.state={
            modalVisivel: false
        }

        //this.CarregarInformacoes();
    }

    formularioAddCampoSecao(item){
        return <FormularioAddCampoLayoutSecao 
                    dadosSecao={{codLayoutSecao: this.props.dadosSecao.Valores.codigo, 
                                 item: item,
                                 codigoTabela: this.props.dadosSecao.Valores.codigoTabela
                                }} />
    }

    async componentWillMount(){
        
        await this.CarregarInformacoes()
    }

    async componentWillReceiveProps(){
        await this.CarregarInformacoes()
    }


    modalCampoLayoutSecao(){
        this.setState({modalVisivel: true} , ()=>{
            frmmAddCampoSecao = this.formularioAddCampoSecao(0);
        })
    }

    async CarregarInformacoes(){
        await this.LoadLayoutSectionFields();
        //this.forceUpdate();
    }

    RetornaListaDataTable(){

    }
    async LoadLayoutSectionFields(){
        var codLayoutSecao = this.props.dadosSecao.Valores.codigo;
        var valores = await obterCamposLayoutSecao(codLayoutSecao);
        valores = valores.data;
        console.log(this.props.dadosSecao.Valores.codigo)
        var dados = [];

        if(codLayoutSecao === 55){
            dados = [{
                posicao: "AAA",
                tamanho: "AAA",
                campoTabela: "AAA",
                tipoCampoTabela: "AAA",
                alinhamento: "AAA",
                completarCom:  "AAA",
                mascara: "AAA",
            }]
        }else{
            dados = [{
                posicao: "bbb",
                tamanho: "bbb",
                campoTabela: "bbb",
                tipoCampoTabela: "bbb",
                alinhamento: "bbb",
                completarCom:  "bbb",
                mascara: "bbb",
            }]
        }
        
        this.setState({dtCamposSecoes:dados});
    }

    render(){

        const props = this.props;
        const state = this.state;

        return (
            <>
                <Row style={{marginBottom:"10px"}}>
                    <Col lg="2">
                        <Button
                                label="Adicionar"
                                icon="pi pi-plus" 
                                onClick={e => this.modalCampoLayoutSecao()} 
                                style={{backgroundColor: "#00ab9c", border: "1px #00ab9c solid", float:'left'}}
                                tooltip="Clique para inserir um campo da seção" />

                        <Dialog 
                            closeOnEscape={true}
                            header={`Configurar campos da seção '${props.dadosSecao.DescricaoSecao}' Constante: ${props.dadosSecao.Valores.constante}`}
                            baseZIndex={9999}
                            visible={state.modalVisivel} 
                            style={{width: '50vw'}} 
                            onShow={()=> { this.modalCampoLayoutSecao(); } }
                            onHide={()=> { this.setState({modalVisivel:false}, ()=> {frmmAddCampoSecao=null} ) }}
                        >
                            {frmmAddCampoSecao}
                        </Dialog>
                        
                    </Col>

                    <Col lg="6" style={{paddingTop:'5px'}}>
                        {props.dadosSecao.DescricaoSecao} : Contante: {props.dadosSecao.Valores.constante}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <DataTable style={{fontSize:'10pt'}}
                                    emptyMessage="Nenhum registro encontrado." 
                                    selectionMode="single" 
                                    responsive={true}  
                                    value={state.dtCamposSecoes} 
                                >
                                {colunasCamposSecoes}
                        </DataTable>
                    </Col>
                </Row>
            </>
        )
    }
}

export default CamposDaSecaoLayout


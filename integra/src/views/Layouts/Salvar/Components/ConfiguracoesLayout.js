import React, { Component } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {ContextMenu} from 'primereact/contextmenu';

import {Col, Row } from 'reactstrap'
import FormularioSecao from './formularios/FormularioSecao';
import {modeloSecaoLayout} from './model/modelos'
import {CarregarSecoesLayout} from './functions/functions'
import {excluirLayoutSecao} from '../../../../services/layouts';
import CamposDaSecaoLayout from './formularios/CamposDaSecaoLayout'


var frmAddSecao = null;
var frmCampoSecaoLayout = null;
class ConfiguracoesLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            formLayoutSecaoVisivel: false,
            dtLayoutSecao: null, //model da grid
            modeloFormularioSecao: modeloSecaoLayout, //model do form
            selectedLayoutSecao: null,
            contextMenuLayoutSecao:[
                {label: 'Editar', icon: 'pi pi-fw pi-pencil', command: (event) => this.editLayoutSection(this.state.selectedLayoutSecao)  },
                {label: 'Remover', icon: 'pi pi-fw pi-times', command: (event) => this.removeLayoutSection()  }
            ],

            formCampoLayoutSecaoVisivel: false
        }
    }

    formularioAddSecao(){
        return <FormularioSecao modelo={(this.state.dtFormLayoutSecao!==null) ? this.state.dtFormLayoutSecao : null} callBack={() => this.handleCallBackSalvarSecao()}/>
    }

    campoSecaoLayout(){
        return <CamposDaSecaoLayout dadosSecao={this.state.selectedLayoutSecao} />
    }

    async removeLayoutSection(){
        const codLayoutSecao = this.state.selectedLayoutSecao.Valores.codigo;
        if(codLayoutSecao !== null){
          if(window.confirm('Deseja remover a seção selecionada?')){
            await excluirLayoutSecao(codLayoutSecao);
            this.setState({selectedPartner: null}, ()=>{
              this.LoadLayoutSections();
            })     
          }
        }
    }

    editLayoutSection(objLayout) {
        var layoutEdit = modeloSecaoLayout;
        layoutEdit = {
            CodigoLayoutSecao: objLayout.Valores.codigo,
            CodigoLayout: objLayout.Valores.codigoLayout,
            CodigoSecao: objLayout.Valores.codigoSecao.toString(),
            CodigoTabela: objLayout.Valores.codigoTabela.toString(),
            Ordem: objLayout.Valores.ordem,
            Constante: objLayout.Valores.constante.toString()
        }
        this.modalLayoutSecao(layoutEdit);
    }
      
    async LoadLayoutSections(){
        var dt = {};
        dt = await CarregarSecoesLayout(this.props.codLayout);
        this.setState({dtLayoutSecao: dt})
    }


    modalLayoutSecao(valoresEdicao = null){
        var layoutModelo = this.state.modeloFormularioSecao;
        if(valoresEdicao === null){
            layoutModelo.CodigoLayout = this.props.codLayout; 
        }else{
            layoutModelo = valoresEdicao;
        }       
        this.setState({dtFormLayoutSecao:layoutModelo}, ()=>{
            this.setState({formLayoutSecaoVisivel: true} , ()=>{
                frmAddSecao = this.formularioAddSecao();
            })
        });
    }

    handleCallBackSalvarSecao(){
        this.setState({formLayoutSecaoVisivel:false}, ()=>this.LoadLayoutSections());
    }

    selectionLayoutSecao(e){
        //frmCampoSecaoLayout = null;
        //frmCampoSecaoLayout = this.campoSecaoLayout();
        this.setState({selectedLayoutSecao: e.value});
    }

    componentWillMount(){
        this.LoadLayoutSections()
    }
    
    render(){

        const state = this.state;
        const listaLayoutSecao = state.dtLayoutSecao;
        
        console.log('rendeirizou')
        return (    
            
            <Row style={{paddingBottom:'10px'}} >  
                
                <ContextMenu 
                    model={this.state.contextMenuLayoutSecao} 
                    ref={el => this.cmLaySecao = el} 
                    //onHide={() => this.setState({selectedLayoutSecao: null})}
                />


                <Dialog 
                    closeOnEscape={true}
                    header="Configurar seções do layout" 
                    baseZIndex={9999}
                    visible={state.formLayoutSecaoVisivel} 
                    style={{width: '50vw'}} 
                    onShow={()=> { this.modalLayoutSecao(); } }
                    onHide={()=> { this.setState({formLayoutSecaoVisivel:false}, ()=> {frmAddSecao=null} ) }}
                >
                    {frmAddSecao}
                </Dialog>


                <Col lg="3" xs="12">  
                    <Row style={{marginBottom:"10px"}}>
                        <Col>
                            <Button
                                label="Adicionar"
                                icon="pi pi-plus" 
                                onClick={(e)=>{this.modalLayoutSecao()}} 
                                style={{backgroundColor: "#00ab9c", border: "1px #00ab9c solid", float:'left'}}
                                tooltip="Clique para inserir uma 'seção'" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <DataTable 
                                style={{fontSize:'10pt'}}                   
                                value={listaLayoutSecao}                    //valor do dataset
                                emptyMessage="Nenhum registro encontrado."  //mensagem de vazio
                                responsive={true}                           //habilitar responsividade
                                selectionMode="single"                      //seleção unica
                                contextMenuSelection={state.selectedLayoutSecao} 
                                onContextMenu={e => this.cmLaySecao.show(e.originalEvent)}
                                onContextMenuSelectionChange={e => this.selectionLayoutSecao(e)}   
                                onSelectionChange={e => this.selectionLayoutSecao(e)}   
                            >
                                <Column rowReorder={true} style={{width: '3em'}} />
                                <Column field="DescricaoSecao" header="Seção" />
                        
                            </DataTable>
                            
                        </Col>
                    </Row>
                </Col>



                <Col lg="9" xs="12">
                    
                    { (state.selectedLayoutSecao !== null) ? 
                       <CamposDaSecaoLayout dadosSecao={this.state.selectedLayoutSecao} />
                     :  (
                        <Row style={{marginBottom:"10px"}}>
                            <Col>
                                Por favor, selecione uma seção ao lado
                            </Col>
                        </Row>
                    ) }
                    
                </Col>
                
            </Row>
                
        );
    }
}

export default ConfiguracoesLayout;
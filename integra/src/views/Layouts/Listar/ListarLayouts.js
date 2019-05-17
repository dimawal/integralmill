import React, { Component } from 'react';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Menubar} from 'primereact/menubar';
import {obterTodosLayouts, excluirLayout} from '../../../services/layouts';
import {ContextMenu} from 'primereact/contextmenu';
import {DataTable} from 'primereact/datatable';
import {Messages} from 'primereact/messages';

const codUsuario = localStorage.getItem("cod_usuario");

class ListarLayouts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      globalFilter: null,
      valorPesquisa: null,
      selectedLayout: null,
      listLayouts: null,
      carregandoGrid: false,
      contextMenu: [
          {label: 'Editar', icon: 'pi pi-fw pi-pencil', command: (event) => this.editLayouts()  },
          {label: 'Remover', icon: 'pi pi-fw pi-times', command: (event) => this.removeLayouts()  }
      ],
      menuBar:[
          {
            label:'Novo Layout',
            icon:'pi pi-fw pi-plus',
            command:()=>{ this.props.history.push('/layouts/novo'); }
          },
          {
            label:'Atualizar',
            icon:'pi pi-fw pi-refresh',
            command:()=>{ this.loadLayouts() }
          }
      ]
    };

    this.colunaModo = this.colunaModo.bind(this);
    this.colunaProcesso = this.colunaModo.bind(this);
  }

  colunaModo(rowData) {
      return (
        <div>
           {(rowData.modo === 1) ? "Pelo caractere '" + rowData.caractereSeparador + "'" : "Por posição"} 
        </div>
      );
  }

  //Carrega dados 
  async loadLayouts(){
    this.setState({carregandoGrid:true})
    let list = await obterTodosLayouts();
    this.setState({listLayouts: list.data, carregandoGrid:false})
  }

  //Edição de layouts
  editLayouts(codLayout) {
    const idLayout = (codLayout === undefined) ? this.state.selectedLayout.codigo : codLayout;
    if(idLayout !== null){
        this.props.history.push('/layouts/editar/' + idLayout)
    }
  }

  //Exclusão de layouts
  async removeLayouts()  {
    const idLayout = this.state.selectedLayout.codigo;
    const descricao = this.state.selectedLayout.descricao;

    if(idLayout !== null){
      if(window.confirm('Deseja remover o layout '+ idLayout +'-' + descricao + '?')){
        var dados = {
          Codigo : idLayout,
          Ativo : 0,
          CodigoUsuarioAlteracao : codUsuario
        }
        await excluirLayout(dados);
        this.messages.show({
              closable: true, 
              severity: 'success', 
              summary: '', 
              detail: `Layout ${descricao} removido com sucesso!`
        });
        this.loadLayouts();
      }
    }
  }
  componentWillMount(){ 
    this.loadLayouts();
  }

  render() {

    const {listLayouts} = this.state; 

    const columns = [
        {sortable: true, filter: false, field: 'codigo', header: 'Cód.', style:{width:'90px'}},
        {sortable: true, filter: false, field: 'descricao', header: 'Descrição'},
        {sortable: true, filter: false, field: 'versao', header: 'Versão', style:{width:'120px'}},
        {sortable: true, filter: false, field: 'modo', header: 'Separação', body:this.colunaModo, style:{width:'140px'}}
    ];

    const colunasGrid = columns.map((col,i) => {
        return <Column 
                  key={i} 
                  sortable={col.sortable}
                  field={col.field} 
                  filter={col.filter}
                  header={col.header} 
                  style={col.style}
                  body={col.body}
                  />;
    });

    return (
      <div className="animated fadeIn">
        <Messages ref={(el) => this.messages = el}></Messages>
          <Menubar model={this.state.menuBar}>
              <InputText 
                  size="30" 
                  placeholder="Pesquisar" 
                  type="text" 
                  onInput={(e) => this.setState({valorPesquisa:e.target.value})}  />      
              <Button 
                  label="Pesquisar" 
                  icon="pi pi-search" 
                  style={{backgroundColor: "#00ab9c", marginLeft:4, border: "1px #00ab9c solid"}}
                  tooltip="Clique para pesquisar" tooltipOptions={{position: 'top'}}
                  onClick={(e) => this.setState({globalFilter: this.state.valorPesquisa})}/>
          </Menubar>

          <br /> 

          <div className="content-section implementation p-fluid" >
              
              <ContextMenu 
                    model={this.state.contextMenu} 
                    ref={el => this.cm = el} 
                    //onHide={() => this.setState({selectedLayout: null})}
                    />

              <DataTable 
                        style={{fontSize:'10pt'}}
                        loading={this.state.carregandoGrid}
                        globalFilter={this.state.globalFilter}      //filtro
                        value={listLayouts}                      //valor do dataset
                        emptyMessage="Nenhum registro encontrado."  //mensagem de vazio
                        paginator={true}                            //habilitar paginação
                        responsive={true}                           //habilitar responsividade
                        selectionMode="single"                      //seleção unica
                        rows={20}                                   //linhas disponiveis
                        resizableColumns={true} 
                        columnResizeMode="expand"
                        rowsPerPageOptions={[5,10,20,30]}
                        onRowDoubleClick={(e)=> this.editLayouts(e.data.codigo)}

                        //dados do contexto menu
                        contextMenuSelection={this.state.selectedLayout} 
                        onContextMenuSelectionChange={e => this.setState({selectedLayout: e.value}) }
                        onContextMenu={e => this.cm.show(e.originalEvent)}
                        //fim contexto menu
                        
                        onSelectionChange={e => this.setState({selectedLayout: e.value})}
                        selection={this.state.selectedLayout}
                        
                        //sortField={'codigo'}

                        >
                 {colunasGrid}
        
              </DataTable>
         
          </div>
            
      </div>
    );
  }
}


export default ListarLayouts;


import React, { Component } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Messages} from 'primereact/messages';
import {Menubar} from 'primereact/menubar';
import {ContextMenu} from 'primereact/contextmenu';
import {inativarParceiro, obterParceiros} from '../../services/parceiros'

const codUsuario = localStorage.getItem("cod_usuario");
 
class ListarParceiros extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listaParceiros: null,
      globalFilter: null,
      valorPesquisa: null,
      carregandoGrid: false,
      menuBar:[
          {
            label:'Novo Parceiro',
            icon:'pi pi-fw pi-plus',
            command:()=>{ this.props.history.push('/parceiros/novo'); }
          },
          {
            label:'Atualizar',
            icon:'pi pi-fw pi-refresh',
            command:()=>{ this.loadPartners() }
          }
      ],
      selectedPartner: null,
      contextMenu: [
          {label: 'Editar', icon: 'pi pi-fw pi-pencil', command: (event) => this.editPartner()  },
          {label: 'Remover', icon: 'pi pi-fw pi-times', command: (event) => this.removePartner()  }
      ]
    };

  }

  
  //Edição do parceiro
  editPartner(codParceiro) {
    const idPartner = (codParceiro === undefined) ? this.state.selectedPartner.codigo : codParceiro;
    if(idPartner !== null){
        this.props.history.push('/parceiros/editar/' + idPartner)
    }
  }

  //Exclusão do parceiro
  async removePartner()  {
    const idPartner = this.state.selectedPartner.codigo;
    const razaoSocial = this.state.selectedPartner.razaoSocial;

    if(idPartner !== null){
      if(window.confirm('Deseja remover o parceiro selecionado?')){
        await inativarParceiro(idPartner, codUsuario);
        this.messages.show({
              closable: true, 
              severity: 'success', 
              summary: '', 
              detail: `Parceiro ${razaoSocial} removido com sucesso!`
        });
        this.setState({selectedPartner: null}, ()=>{
          this.loadPartners();
        })
        
      }
    }
  }

  async loadPartners(){
    this.setState({carregandoGrid:true})
    var listPartners = await obterParceiros();
    this.setState({listaParceiros: listPartners, carregandoGrid:false})
  }

  //Carregar lista de parceiros
  componentWillMount(){ 
    this.loadPartners();
  }


  render() {

    const listaParceiros = this.state.listaParceiros; //.filter((parceiro) => parceiro.id < 10);
    const columns = [
        {sortable: true, filter: false, field: 'codigo', header: 'Id', style:{width:'70px'}},
        {sortable: true, filter: false, field: 'razaoSocial', header: 'Razão Social'},
        {sortable: true, filter: false, field: 'cpfCnpj', header: 'Cpf / Cnpj', style:{width:'160px'}},
        {sortable: true, filter: false, field: 'email', header: 'E-mail'},
        {sortable: true, filter: false, field: 'telefone', header: 'Telefone', style:{width:'140px'}}
    ];

    const colunasGrid = columns.map((col,i) => {
          return <Column 
                    key={i} 
                    sortable={col.sortable}
                    field={col.field} 
                    filter={col.filter}
                    header={col.header} 
                    style={col.style}
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
                    //onHide={() => this.setState({selectedPartner: null})}
                    />

              <DataTable 
                        style={{fontSize:'10pt'}}
                        loading={this.state.carregandoGrid}
                        globalFilter={this.state.globalFilter}      //filtro
                        value={listaParceiros}                      //valor do dataset
                        emptyMessage="Nenhum registro encontrado."  //mensagem de vazio
                        paginator={true}                            //habilitar paginação
                        responsive={true}                           //habilitar responsividade
                        selectionMode="single"                      //seleção unica
                        rows={20}                                   //linhas disponiveis
                        resizableColumns={true} 
                        columnResizeMode="expand"
                        rowsPerPageOptions={[5,10,20,30]}
                        onRowDoubleClick={(e)=> this.editPartner(e.data.codigo)}

                        //dados do contexto menu
                        contextMenuSelection={this.state.selectedPartner} 
                        onContextMenuSelectionChange={e => this.setState({selectedPartner: e.value}, ()=>{console.log('d', this.state.selectedPartner)}) }
                        onContextMenu={e => this.cm.show(e.originalEvent)}
                        //fim contexto menu
                        
                        onSelectionChange={e => this.setState({selectedPartner: e.value})}
                        selection={this.state.selectedPartner}
                        
                        //sortField={'codigo'}

                        >
                  {colunasGrid}
        
              </DataTable>
                <br></br>
            </div>

            
      </div>
    );
  }
}


export default ListarParceiros;


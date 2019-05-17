import React, { Component } from 'react';
import {Accordion, AccordionTab} from 'primereact/accordion';
import InformacoesBasicas from './../Components/InformacoesBasicas';
import ConfiguracoesLayout from './../Components/ConfiguracoesLayout';
import {Messages} from 'primereact/messages';
import {modeloLayout} from './../Components/model/modelos';



class CadastrarLayout extends Component{
    constructor(props){
        super(props);
        this.state = {
            accordionIndex: [0,1],
            LayoutCabecalho: modeloLayout
        }
    }

    handleRetornarCabecalho(fields, mensagemSucesso=false){
        this.setState({LayoutCabecalho:fields}, ()=>{
            if (mensagemSucesso){
                this.messages.show({
                        closable: true, 
                        severity: 'success', 
                        summary: 'Salvo com sucesso!', 
                        detail: 'Agora pode dar continuidade à configuração do layout'
                });
            }         
        });     
    }
    


    render(){
    
        return(
      
            <div>        
                <div className="content-section implementation">
                    <Messages ref={(el) => this.messages = el}></Messages>

                    <Accordion 
                            style={{fontSize:'11pt', marginBottom: '20px'}}
                            multiple={true} 
                            activeIndex={this.state.accordionIndex} >

                        <AccordionTab header="Informações básicas do layout" disabled={false}>
                         
                            <InformacoesBasicas 
                                //key={this.state.keyTab1}
                                handleCallBack={(e,mensagemSucesso) => this.handleRetornarCabecalho(e, mensagemSucesso)}
                                //modelo={this.state.LayoutCabecalho}
                                codLayout={this.props.codLayout}
                                />

                        </AccordionTab>

                        <AccordionTab header="Configuração do Layout" disabled={(this.state.LayoutCabecalho.codigo === 0)}> 
                            <ConfiguracoesLayout codLayout={this.props.codLayout}/>
                        </AccordionTab>
                    </Accordion>

                </div>


            </div>
        )
    }
}

export default CadastrarLayout
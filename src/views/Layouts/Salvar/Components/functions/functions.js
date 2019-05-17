import {obterLayoutSecao} from '../../../../../services/layouts';
import {obterTodasSecoes} from '../../../../../services/secoes';

export const CarregarSecoesLayout = async (codLayout) => {

    var layouts = await obterLayoutSecao(codLayout)
    layouts = layouts.data;

    //console.log('layouts', layouts)
    if (layouts.length > 0){
        var allSections = await obterTodasSecoes();
        allSections = allSections.data;
        if(allSections.length > 0){
            var arrayDados = [];   
            layouts.map(function(e){
                let dados = {};
                let dt = allSections.filter((section) => parseInt(section.codigo) === parseInt(e.codigoSecao));
                dt = dt[0];
                dados.DescricaoSecao = dt.descricao; // + ' Const:' + e.constante + ' ' + e.codigo;
                dados.Valores = e;
                arrayDados.push(dados);
                return null
            });
      
            var stateArray = arrayDados.map(item => item);

            return stateArray;
            
        } 
    }  
    
}
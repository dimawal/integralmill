import api from "./api";

/************************************ */
/*****   LAYOUTS                 **** */
/************************************ */
export const obterTodosLayouts = async () => {
    var response = await api.get("/layout/obtertodos");
    return response;
};

export const salvarLayouts = async (dados) => {
    var response = await api.post("/layout/salvar", dados);
    return response;  
};

export const obterLayoutPorId = async (codLayout) => {
    var response = await api.get("layout/obter/" + codLayout);
    return response;  
};

export const excluirLayout = async (dados) => {
    var response = await api.post("layout/ativar/", dados);
    return response;  
};


/************************************ */
/*****   SEÇÃO DO LAYOUT         **** */
/************************************ */
export const salvarLayoutSecao = async (dados) => {
    var response = await api.post("layoutsecao/salvar", dados);
    return response;  
};

export const obterLayoutSecao = async (codLayout) => {
    var response = await api.get("layoutsecao/obterporlayout/" + codLayout);
    return response;  
};

export const excluirLayoutSecao = async (codLayoutSecao) => {
    var response = await api.post("layoutsecao/excluir/" + codLayoutSecao);
    return response;  
};



/************************************ */
/**** CAMPOS DA SEÇÃO DO LAYOUT ***** */
/************************************ */
export const salvarCampoSecao = async (dados) => {
    var response = await api.post("layoutcamposecao/salvar/", dados);
    return response;  
};

export const obterCamposLayoutSecao = async (codLayoutSecao) => {
    var response = await api.get("layoutcamposecao/obtertodosporlayoutsecao/" + codLayoutSecao);
    return response;  
};

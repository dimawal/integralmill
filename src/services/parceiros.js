import api from "./api";

export const obterParceiros = async () => {
    var response = await api.get("/parceiro/obtertodos");
    return response.data;
};

export const obterParceiroPorId = async (codParceiro) => {
    var response = await api.get("/parceiro/obter/" + codParceiro);
    return response.data;  
};

export const inativarParceiro = async (codParceiro, codUsuarioAlteracao) => {
    var response = await api.post("/parceiro/desativar/" + codParceiro + "/" + codUsuarioAlteracao);
    return response.data;  
};

export const ativarParceiro = async (codParceiro, codUsuarioAlteracao) => {
    var response = await api.post("/parceiro/ativar/" + codParceiro + "/" + codUsuarioAlteracao);
    return response.data;  
};

export const salvarParceiro = async (dados) => {
    var response = await api.post("/parceiro/salvar", dados);
    return response;  
};

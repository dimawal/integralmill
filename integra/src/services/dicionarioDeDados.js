import api from "./api";

export const obterTodasTabelas = async () => {
    var response = await api.get("/mapadadostabela/obtertodos");
    return response;
};

export const obterCamposDaTabela = async (codTabela) => {
    var response = await api.get("/mapadadostabelaitem/obter/" + codTabela);
    return response;
};


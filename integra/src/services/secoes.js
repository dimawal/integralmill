import api from "./api";

export const obterTodasSecoes = async () => {
    var response = await api.get("/secao/obtertodos");
    return response;
};


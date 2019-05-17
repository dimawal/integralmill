import api from "./api";

export const obterTodosProcessos = async () => {
    var response = await api.get("/processo/obtertodos");
    return response;
};


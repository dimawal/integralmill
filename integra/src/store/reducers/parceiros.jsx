import { actionTypes } from '../actions/actionTypes';

const initialState = {
  CodParceiro: "0",
  TipoPessoa: "1",
  CpfCnpj: "",
  RazaoSocial: "",
  NomeFantasia: "",
  Email: "",
  Telefone: ""
};


export const parceiros = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SalvarParceiro: 
    
      return {
        ...state,
        CodParceiro: action.CodParceiro,
        TipoPessoa: action.TipoPessoa,
        CpfCnpj: action.CpfCnpj,
        RazaoSocial: action.RazaoSocial,
        NomeFantasia: action.NomeFantasia,
        Email: action.Email,
        Telefone: action.Telefone
      };
    
    case actionTypes.NovoParceiro:
  
      return {
        CodParceiro: initialState.CodParceiro,
        TipoPessoa: initialState.TipoPessoa,
        CpfCnpj: initialState.CpfCnpj,
        RazaoSocial: initialState.RazaoSocial,
        NomeFantasia: initialState.NomeFantasia,
        Email: initialState.Email,
        Telefone: initialState.Telefone
      }
    case actionTypes.CarregarParceiroPorId: 

      // chamar o serviço
      
      return {
        ...state,
        CodParceiro: action.CodParceiro,
        TipoPessoa: action.TipoPessoa,
        CpfCnpj: action.CpfCnpj,
        RazaoSocial: action.RazaoSocial,
        NomeFantasia: action.NomeFantasia,
        Email: action.Email,
        Telefone: action.Telefone
      };
    default:
      return state;
  }
};

// enzyme
// jest
// jasmine
// mocha
// cypress <- tbm faz testes de integração
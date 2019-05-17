import { actionTypes } from './actionTypes';

export const onSubmit_SalvarParceiro = value => (
  {
    type: actionTypes.SalvarParceiro,
    CodParceiro: value.CodParceiro,
    TipoPessoa: value.TipoPessoa,
    CpfCnpj: value.CpfCnpj,
    RazaoSocial: value.RazaoSocial,
    NomeFantasia: value.NomeFantasia,
    Email: value.Email,
    Telefone: value.Telefone
  });

export const onLoad_NovoParceiro = () => (
  {
    type: actionTypes.NovoParceiro
  });
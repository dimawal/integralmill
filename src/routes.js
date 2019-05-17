import React from 'react';


// novas rotas
const ListarParceiros = React.lazy(() => import('./views/Parceiros/ListarParceiros'));
const CadastrarParceiro = React.lazy(() => import('./views/Parceiros/CadastrarParceiro'));
const EditarParceiro = React.lazy(() => import('./views/Parceiros/CadastrarParceiro'));
const ListarLayouts = React.lazy(() => import('./views/Layouts/Listar/ListarLayouts'));
const CadastrarLayout = React.lazy(()=> import('./views/Layouts/Salvar/index'))


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Início' },

  { 
    path: '/parceiros', 
    name:'Parceiros',
    exact: true,
    component: ListarParceiros
  },

  { 
    path: '/parceiros/novo', 
    name:'Novo Parceiro',
    component: CadastrarParceiro
  },

  { 
    path: '/parceiros/editar/:id', 
    exact: true, 
    name: 'Editar Parceiro', 
    component: EditarParceiro 
  },

  { 
    path: '/layouts', 
    name:'Layouts',
    exact: true,
    component: ListarLayouts
  },

  { 
    path: '/layouts/novo', 
    name:'Novo Layout',
    exact: true,
    component: CadastrarLayout
  },

  { 
    path: '/layouts/editar/:id', 
    exact: true, 
    name: 'Editar Layout', 
    component: CadastrarLayout 
  }
];

export default routes;

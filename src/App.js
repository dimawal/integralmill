import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import {isAuthenticated} from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => 
      isAuthenticated() ? (
        <DefaultLayout {...props}/>
      ) : (
        <Redirect to={{ pathname: "/logar", state: { from: props.location } }} />
      )
    }
  />
);

const loading = () => <div className="animated fadeIn pt-3 text-center">Carregando...</div>;
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const Logar = React.lazy(() => import('./views/Login/Login'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/logar" name="Entrar" render={props => <Logar {...props}/>} />  
              <PrivateRoute path="/" name="Principal" render={props => <DefaultLayout {...props}/>} />
              <PrivateRoute path="/asd" name="Principal" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;

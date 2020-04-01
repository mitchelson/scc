import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Main from './pages/Main';
import Militar from './pages/Militar';
import Viaturas from './pages/Viaturas';
import Relatorios from './pages/Relatorios';
import Sair from './pages/Sair';

const Routes = () => (
    <BrowserRouter>
       <Switch>
            <Route exact path="/" component={Login}/>
            <PrivateRoute path="/main" component={Main}/>
            <PrivateRoute path="/militar" component={Militar}/>
            <PrivateRoute path="/viaturas" component={Viaturas}/>
            <PrivateRoute path="/relatorios" component={Relatorios}/>
            <PrivateRoute path="/sair" component={Sair}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;
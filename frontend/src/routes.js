import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import GlobalStyle, { Container } from './styles/index';
import Sidebar from './components/Sidebar';
import Main from './pages/Main';
import Militar from './pages/Militar';
import Viaturas from './pages/Viaturas';
import Relatorios from './pages/Relatorios';
import Sair from './pages/Sair';

const Routes = () => (
    <BrowserRouter>
        <GlobalStyle />
        <Container>
            <Sidebar />
            <Switch>
                <PrivateRoute path="/main" component={Main}/>
                <PrivateRoute path="/militar" component={Militar}/>
                <PrivateRoute path="/viaturas" component={Viaturas}/>
                <PrivateRoute path="/relatorios" component={Relatorios}/>
                <PrivateRoute path="/sair" component={Sair}/>
            </Switch>
        </Container>
    </BrowserRouter>
);

export default Routes;
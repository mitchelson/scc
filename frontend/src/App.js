import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import GlobalStyle, { Container } from './styles/index';

import './global.css';
import Routes from './routes';

const App = () => (
    <BrowserRouter>
    <GlobalStyle />
        <Switch>
            <Route exact path="/" component={Login}/>
            <PrivateRoute path="/" component={Routes}/>
        </Switch>
    </BrowserRouter>
);

export default App;
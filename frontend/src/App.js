import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import Sidebar from './components/Sidebar';
import GlobalStyle, { Container } from './styles/index';
import './global.css';

const App = () => (
    <BrowserRouter>
        <GlobalStyle />
        <Container>
            <Sidebar />
            <Routes />
        </Container>
    </BrowserRouter>
);

export default App;
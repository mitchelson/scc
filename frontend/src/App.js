import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Routes from './routes';
import Login from './routes/login';

import GlobalStyle, { Container } from './styles';

import './App.css';
import './global.css';

function App() {
  const [auth , setAuth] = useState(false);
  return (
        <>
        <div hidden={!auth}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </div>
        <div hidden={auth}>
        <BrowserRouter>
          <GlobalStyle />
          <Container>
            <Sidebar />
            <Routes />
          </Container>
        </BrowserRouter>
        </div>
        </>
  );
}

export default App;
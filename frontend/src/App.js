import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Routes from './routes';
import Login from './routes/login';
import GlobalStyle, { Container } from './styles';

import './App.css';
import './global.css';

function App() {
  return (
        <>
        <div hidden={localStorage.getItem('auth')}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </div>
        <div hidden={!localStorage.getItem('auth')}>
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
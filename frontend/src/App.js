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
        <div hidden={false}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </div>
        <div hidden={true}>
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
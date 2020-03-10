import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Routes from './routes';

import GlobalStyle, { Container } from './styles';

import './App.css';
import './global.css';


function App() {
  return (
    
        <BrowserRouter>
          <GlobalStyle />
          <Container>
            <Sidebar/>
            <Routes />
          </Container>
        </BrowserRouter>
  );
}

export default App;


/*<div id="app">
      <aside id="menu">
        <button id="menuLateral">INÍCIO</button>
        <button id="menuLateral">USUÁRIOS</button>
        <button id="menuLateral">VIATURAS</button>
        <button id="menuLateral">RELATÓRIO</button>
        <button id="menuLateral">SAIR</button>
      </aside>
      <main id="painel">
        <div id="painelPrincipal"></div>
        </div>
      </main>
    </div>*/
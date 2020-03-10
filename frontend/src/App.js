import React from 'react';
import './App.css';
import './global.css';
function App() {
  return (
    <div id="app">
      <aside id="menu">
        <button id="menuLateral">INÍCIO</button>
        <button id="menuLateral">USUÁRIOS</button>
        <button id="menuLateral">VIATURAS</button>
        <button id="menuLateral">RELATÓRIO</button>
        <button id="menuLateral">SAIR</button>
      </aside>
      <main id="painel">
        <div id="painelPrincipal">
          <table id="tbP">
            <tr>
              <th>EB</th>
              <th>Categoria</th>
              <th>Motorista</th>
              <th>Chefe da Viatura</th>
              <th>Destino</th>
              <th>Registro por</th>
              <th>Combustível</th>
              <th>Saída</th>
              <th>Odometro Saída</th>
            </tr>
            <tr>
              <td>Jill</td>
              <td>Smith</td>
              <td>50</td>
            </tr>
            <tr>
              <td>Eve</td>
              <td>Jackson</td>
              <td>94</td>
            </tr>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
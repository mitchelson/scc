import React from 'react';
import './styles.css';

function Militar() {
  let nome = "CADASTRAR";
  return (
    <div id="container">
      <h1>Militar</h1>
      <div id="box">
        <div id="form">
          <strong>FORMULÁRIO</strong>
          <input placeholder="Identidade Militar"></input>
          <input placeholder="Nome"></input>
          <input placeholder="Nome de Guerra"></input>
          <input placeholder="Pelotão"></input>
          <input placeholder="Senha" required type="password"></input>
          <button id="btnPrincipal">{nome}</button>
          <button>LIMPAR</button>
          <button>CANCELAR</button>
        </div>
        <div id="registros">
          <strong>Registros</strong>
          <table>
            <tr>
              <th>id</th>
              <th>Identidade</th>
              <th>Nome de Guerra</th>
              <th>Status</th>
              <th>Editar</th>
            </tr>
            <tr>
              <td>1</td>
              <td>316513216</td>
              <td>S. da Silva</td>
              <td>Disponível</td>
              <td>Editar | Excluir</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Militar;
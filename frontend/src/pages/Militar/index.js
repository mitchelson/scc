import React from 'react';
import './styles';

function Militar() {
  let nome = "Cadastrar";
  return (
    <div id="container">
      <h1>Militar</h1>
      <div id="box">
        <div id="form">
          <strong>Formulário</strong>
          <input placeholder="Identidade Militar"></input>
          <input placeholder="Nome"></input>
          <input placeholder="Nome de Guerra"></input>
          <input placeholder="Pelotão"></input>
          <input placeholder="Senha" required type="password"></input>
          <button>{nome}</button>
          <button>Limpar</button>
          <button>Cancelar</button>
        </div>
        <div id="registros">
          <strong>Registros</strong>
        </div>
      </div>
    </div>
  );
}

export default Militar;
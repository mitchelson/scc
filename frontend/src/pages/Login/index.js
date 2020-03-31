import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import App from '../../App'

function Login() {

  //Armazena a lista de militares na constante militar
  const [militar, setMilitar] = useState([]);
  //Dados do Militar, usados para cadastrar/atualizar o registro de um militar
  const [idMilitar, setidMilitar] = useState('');
  const [senha, setSenha] = useState('');

  //Função  de login
  async function login(){
    
  }

  //Função para limpar campos do formulário de login
  async function limpar(e){
    e.preventDefault();
    setidMilitar('');
    setSenha('');
  }
  //O que mostra na tela do navegador  
  return (
    <div id="login">
      <div id="boxL">
        <form onSubmit={login}>   
        <h1>LOGIN</h1>
            <input 
              id="idMilitar"
              name="idMilitar"
              value={idMilitar}
              onChange={e => setidMilitar(e.target.value)}
              placeholder="Identidade Militar"
            />
            <input 
              id="senha"
              name="senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="Senha" 
              type="password"/>
          <button id="btnPrincipal" type="submit">ENTRAR</button>
        </form>
        <button onClick={limpar}>LIMPAR</button>
      </div>
    </div>
  );
}

export default Login;
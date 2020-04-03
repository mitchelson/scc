import React, { useState } from 'react';
import api from '../../services/api';
import './styles.css';
import { useHistory } from 'react-router-dom';

function Login() {

  //Dados do Militar, usados para cadastrar/atualizar o registro de um militar
  const [idMilitar, setidMilitar] = useState('');
  const [senha, setSenha] = useState('');
  const history = useHistory();
  //Função  de login
  async function handleLogin(e){
    e.preventDefault();

    const login = await api.get('/login', {
      params: {
        idMilitar: idMilitar,
        senha: senha,
      }
    });
    if(!login){
      history.push('/');
    }else {
      localStorage.setItem('auth', true);
      history.push('/main');
    }
    console.log(login);
    //alert("ID ou Senha incorretos");
    
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
        <form onSubmit={handleLogin}>   
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
          <button id="btnEntrar" type="submit">ENTRAR</button>
        </form>
        <button onClick={limpar}>LIMPAR</button>
      </div>
    </div>
  );
}

export default Login;
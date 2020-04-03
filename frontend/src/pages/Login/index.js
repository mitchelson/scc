import React, { useState } from 'react';
import api from '../../services/api';
import { FaEye } from 'react-icons/fa';
import './styles.css';
import { useHistory } from 'react-router-dom';

function Login() {
  
  //Dados do Militar, usados para cadastrar/atualizar o registro de um militar
  const [idMilitar, setidMilitar] = useState('');
  const [senha, setSenha] = useState('');
  const history = useHistory();
  const [erro, setErro] = useState(0);
  const [toglePass, setTogle] = useState('password');
  //Função  de login
  async function handleLogin(e){
    e.preventDefault();
    try {
      await api.get('/login', {
        params: {
          idMilitar: idMilitar,
          senha: senha,
        }
      });
      localStorage.setItem('auth', false);
      history.push('/main');
    } catch (error) {
      history.push('/');
      setErro(100);
    }    
  }
  async function showSenha(e){
    e.preventDefault();
    if(toglePass === 'password'){
      setTogle('text');
    } else {
      setTogle('password');
    }
    
  }
  //Função para limpar campos do formulário de login
  async function limpar(e){
    e.preventDefault();
    setidMilitar('');
    setSenha('');
    setErro(0)
  }
  //O que mostra na tela do navegador  
  return (
    <div id="login">
      <div id="boxL">
        <form className="formLogin" onSubmit={handleLogin}>   
        <strong>LOGIN</strong>
            <input 
              id="idMilitar"
              name="idMilitar"
              value={idMilitar}
              required
              onChange={e => setidMilitar(e.target.value)}
              placeholder="Identidade Militar"
            />
            <div className="passGroup">
              <input className="inputSenha"
                id="senha"
                name="senha"
                value={senha}
                required
                onChange={e => setSenha(e.target.value)}
                placeholder="Senha" 
                type={toglePass} 
              />
              <button className="showSenha" onClick={showSenha}><FaEye/></button>
              </div>
              <i style={{opacity:erro}}>*identidade do militar ou senha incorreta</i>
          <button className="btnEntrar" type="submit">ENTRAR</button>
        </form>
        <button onClick={limpar}>LIMPAR</button>
      </div>
    </div>
  );
}

export default Login;
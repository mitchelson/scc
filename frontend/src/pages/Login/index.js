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
  const [desabilitaCampo, setCampo] = useState(false);
  //Função  de login
  async function handleLogin(e){
    e.preventDefault();
    setCampo(true);
    try {
      const user = await api.get('/login', {
        params: {
          idMilitar: idMilitar,
          senha: senha,
        }
      });
      localStorage.setItem('user', user.data.nome);
      localStorage.setItem('auth', false);
      history.push('/main');
    } catch (error) {
      setTimeout(function(){ 
        setCampo(false);
        history.push('/');
        setErro(100);
        limpar(e);}, 700);
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
              disabled={desabilitaCampo}
              onChange={e => setidMilitar(e.target.value)}
              placeholder="Identidade Militar"
            />
            <div className="passGroup">
              <input className="inputSenha"
                id="senha"
                name="senha"
                value={senha}
                required
                disabled={desabilitaCampo}
                onChange={e => setSenha(e.target.value)}
                placeholder="Senha" 
                type={toglePass} 
              />
              <div className="showSenha" onMouseDown={showSenha} onMouseUp={showSenha}><FaEye/></div>
            </div>
            <i style={{opacity:erro}}>*revise seus dados</i>
          <button className="btnEntrar" type="submit">ENTRAR</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
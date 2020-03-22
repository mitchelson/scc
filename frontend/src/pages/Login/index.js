import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import App from '../../App'

function Login() {

  //Armazena a lista de militares na constante militar
  const [militar, setMilitar] = useState([]);
  //Dados do Militar, usados para cadastrar/atualizar o registro de um militar
  const [inputIdMilitar, setInputId] = useState(true);
  const [idMilitar, setidMilitar] = useState('');
  const [nome, setNome] = useState('');
  const [nomeGuerra, setnomeGuerra] = useState('');
  const [pelotao, setPelotao] = useState('');
  const [dataNascimento, setdataNascimento] = useState('');
  const [eMotorista, seteMotorista] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [cursoMotorista, setcursoMotorista] = useState('');
  const [senha, setSenha] = useState('');

  //Função  de login
  async function login(){
    
  }
  async function showRegistro(){

  }
  //Função para Cadastrar/Atualizar Militar - OK
  async function registro(e){
    e.preventDefault();
    const response = await api.post('/cadastrar-militar', {
      idMilitar,
      nome,
      nomeGuerra,
      pelotao,
      dataNascimento,
      eMotorista,
      admin,
      cursoMotorista,
      senha
    })
    setidMilitar('');
    setNome('');
    setnomeGuerra('');
    setPelotao('');
    setdataNascimento('');
    seteMotorista(false);
    setAdmin(false);
    setcursoMotorista('');
    setSenha('');
    setInputId(true);

    setMilitar(response.data);
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
      <div id="boxL" style={{display:'none'}}>
      <form onSubmit={registro}>   
        <h1>LOGIN</h1>
            <input 
              id="idMilitar"
              name="idMilitar"
              value={idMilitar}
              disabled={!inputIdMilitar}
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
          <button>LIMPAR</button>
          <button>REGISTRAR</button>
        </form>
      </div>
      <div id="boxL" style={{display:'block'}}>
        <form onSubmit={login}>   
        <h1>LOGIN</h1>
            <input 
              id="idMilitar"
              name="idMilitar"
              value={idMilitar}
              disabled={!inputIdMilitar}
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
        <button onClick={showRegistro}>REGISTRAR</button>
      </div>
    </div>
  );
}

export default Login;
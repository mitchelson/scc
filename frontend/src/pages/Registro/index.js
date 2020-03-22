import React, { useState, } from 'react';
import api from '../../services/api';
import './styles.css';

function Registro() {

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

  //Função para Cadastrar/Atualizar Militar - OK
  async function addMilitar(e){
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
  }   

  //O que mostra na tela do navegador  
  return (
    <div id="container">
      <h1>Militar</h1>
      <div id="box">
        <form onSubmit={addMilitar}>   
          <strong>FORMULÁRIO</strong>
          <div className="inputGroup">
            <input 
              id="idMilitar"
              name="idMilitar"
              value={idMilitar}
              disabled={!inputIdMilitar}
              onChange={e => setidMilitar(e.target.value)}
              placeholder="Identidade Militar"
            />
            <input 
              id="nomeGuerra"
              name="nomeGuerra"
              value={nomeGuerra}
              onChange={e => setnomeGuerra(e.target.value)}
              placeholder="Nome de Guerra"
            />
          </div>
          <input 
            id="nome"
            name="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Nome Completo"
          />
          <input 
              id="dataNascimento"
              name="dataNascimento"
              value={dataNascimento}
              onChange={e => setdataNascimento(e.target.value)}
              placeholder="Data de Nascimento"
            />
          <div className="inputGroup2">
            <input 
              id="pelotao"
              name="pelotao"
              value={pelotao}
              onChange={e => setPelotao(e.target.value)}
              placeholder="Pelotão"
            />
            <input 
              id="eMotorista"
              name="eMotorista"
              value={eMotorista}
              onChange={e => seteMotorista(e.target.checked)}
              type="checkbox"/><p>Motorista</p>
          </div>
          <select value={cursoMotorista} onChange={e => setcursoMotorista(e.target.value)} disabled={!eMotorista}>
            <option disabled defaultValue>Selecione um Curso</option>
            <option value="Leve">Leve</option>
            <option value="Médio">Médio</option>
            <option value="Pesado">Pesado</option>
          </select>
          <div className="inputGroup2">
            <input 
              id="senha"
              name="senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="Senha" 
              type="password"/>
            <input 
              id="admin"
              name="admin"
              value={admin}
              onChange={e => setAdmin(e.target.checked)}
              type="checkbox"/><p>Admin</p>
          </div>
          <button id="btnPrincipal" type="submit">SALVAR</button>
          <button>LIMPAR</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
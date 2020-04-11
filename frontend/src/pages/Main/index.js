import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import api from '../../services/api';
import InputMask from 'react-input-mask';
import './main.css';

function Main() {

  //Armazena a lista de militares na constante militar
  const [militar, setMilitar] = useState([]);
  const [showTable, setShowTable] = useState('none');
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

  //Função para Listar Militar              - OK
  useEffect(() => {
    async function listaMilitar(){    
      const response = await api.get('/listar-militar');
      setMilitar(response.data);
    }
    listaMilitar();
  }, []);
  function mostrarTabela(){
    if(showTable === 'none'){
      setShowTable('block');
    }
    if(showTable === 'block'){
      setShowTable('none');
    }
  }
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

    setMilitar(response.data);
  }   

  //Função para Deletar Militar             - OK
  async function rmMilitar(id){
    const deletado = await api.delete(`/deletar-militar?idMilitar=${id}`);
    setMilitar(deletado.data);
  }

  //O que mostra na tela do navegador  
  return (
    <div className="mainContainer">
      <div className="tituloMain">
        <h1>MOVIMENTAÇÃO DE VIATURAS</h1>
      </div>
      <form onSubmit={addMilitar} className="mainForm" style={{display:showTable}}>   
          <strong>NOVA MOVIMENTAÇÃO</strong>
          <div className="inputGroup">
            <input 
              id="idMilitar"
              name="idMilitar"
              value={idMilitar}
              disabled={!inputIdMilitar}
              onChange={e => setidMilitar(e.target.value)}
              placeholder="Identidade"
            />
            <input 
              id="nomeGuerra"
              name="nomeGuerra"
              value={nomeGuerra}
              onChange={e => setnomeGuerra(e.target.value)}
              placeholder="Nome de Guerra"
            />
          </div>
          <InputMask 
              mask="99/99/9999"
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
          <button onClick={mostrarTabela}>CANCELAR</button>
        </form>
      <div className="mainBox">
      <div className="fab">
        <button className="main" onClick={mostrarTabela} title="Nova Movimentação">
        </button>
      </div>
      <div className="mainRegistros">
            <table id="tableMain">
              <thead> 
                <tr>
                  <th>DATA</th>
                  <th>HORARIO</th>
                  <th>ODOMETRO</th>
                  <th>MOTORISTA (CLASSE)</th>
                  <th>CHEFE VIATURA (CLASSE)</th>
                  <th>DESTINO</th>
                  <th>QTD COMBUSTIVEL   (Selecionar: Pleno, Meio tanque ou Cheio)</th>
                  <th>USUÁRIO (CLASSE)</th>
                </tr>
              </thead> 
              <tbody>
                {militar.map(ml => (     //Faz um FOR dentro do array 'militar', e coloca em 'ml'
                  <tr key={ml._id}>
                    <td>{ml.idMilitar}</td>
                    <td>{ml.nome}</td>
                    <td>---</td>
                    <td>
                      <span onClick={() => {  //Botão para editar Militar
                        setidMilitar(ml.idMilitar);
                        setInputId(false);
                        setNome(ml.nome);
                        setnomeGuerra(ml.nomeGuerra);
                        setdataNascimento(ml.dataNascimento);
                        setPelotao(ml.pelotao);
                        seteMotorista(ml.eMotorista);
                        setAdmin(ml.admin);
                        setcursoMotorista(ml.cursoMotorista);
                        setSenha(ml.senha);
                        
                      }} id="iconeEdit"><FaEdit /></span>
                      <span onClick={() => {  //Botão para deletar Formulário
                        if (window.confirm('Deseja apagar esse Militar?')){
                          rmMilitar(ml.idMilitar);
                        }
                      }} id="iconeDelete"><FaTrashAlt /></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}

export default Main;
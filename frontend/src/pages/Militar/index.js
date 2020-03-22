import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import api from '../../services/api';
import InputMask from 'react-input-mask';
import '../Militar/styles.css';

function Militar() {

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

  //Função para Listar Militar              - OK
  useEffect(() => {
    async function listaMilitar(){    
      const response = await api.get('/listar-militar');
      setMilitar(response.data);
    }
    listaMilitar();
  }, []);
  
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
        <div id="registros">
          <strong>REGISTROS</strong>
          <table>
            <thead> 
              <tr>
                <th>IDENTIDADE</th>
                <th>NOME</th>
                <th>STATUS</th>
                <th>AÇÕES</th>
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

export default Militar;
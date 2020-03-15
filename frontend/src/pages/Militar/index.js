import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import api from '../../services/api';
import './styles.css';

function Militar() {
  
  const [militar, setMilitar] = useState([]);
  const [idDeleteMilitar, setIdDelete] = useState('');


  const [idMilitar, setidMilitar] = useState('');
  const [nome, setNome] = useState('');
  const [nomeGuerra, setnomeGuerra] = useState('');
  const [pelotao, setPelotao] = useState('');
  const [dataNascimento, setdataNascimento] = useState('');
  const [eMotorista, seteMotorista] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [cursoMotorista, setcursoMotorista] = useState('');
  const [senha, setSenha] = useState('');

  const [btnNome, setbtnNome] = useState('CADASTRAR');

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

    setMilitar([...militar, response.data]);
  }
  useEffect( () => {
    async function listaMilitar(){
      const response = await api.get('/listar-militar');
      setMilitar(response.data);
    }
    listaMilitar();
  }, []);

  async function deleteMilitar(e){
    if(idDeleteMilitar !== ''){
      console.log(idDeleteMilitar);
      const response = await api.delete(`/deletar-militar?idMilitar=${idDeleteMilitar}`);
    }
  }

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

          <button id="btnPrincipal" type="submit">{btnNome}</button>
          <button>LIMPAR</button>
          <button>CANCELAR</button>
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
              {militar.map(militar => (
                <tr key={militar._id}>
                  <td>{militar.idMilitar}</td>
                  <td>{militar.nome}</td>
                  <td>Disponível</td>
                  <td>
                      <span id="iconeEdit"><FaEdit /></span>
                      <span id="iconeDelete"><FaTrashAlt /></span>
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
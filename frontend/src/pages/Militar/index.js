import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import api from '../../services/api';
import InputMask from 'react-input-mask';
import './styles.css';

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

  //Função para Listar Militar
  useEffect(() => {
    async function listaMilitar(){    
      const response = await api.get('/listar-militar');
      setMilitar(response.data);
    }
    listaMilitar();
  }, []);
  
  //Função para Cadastrar/Atualizar Militar
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
    const response = await api.delete(`/deletar-militar?idMilitar=${id}`);
    setMilitar(response.data);
  }
  
  return (
    <div id="container">
      <h1>MILITAR</h1>
      <div id="box">
        <div id="registros">
          <strong>REGISTROS</strong>
          <table className="table">
            <thead> 
              <tr>
                <th scope="col">IDENTIDADE</th>
                <th scope="col">NOME</th>
                <th scope="col">STATUS</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {militar.map(ml => (
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
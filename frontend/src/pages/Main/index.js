import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import api from '../../services/api';
import InputMask from 'react-input-mask';
import './main.css';

function Main() {

  //Armazena a lista de militares na constante militar
  const [movimentos, setMovimentos] = useState([]);
  const [militar, setMilitar] = useState([]);
  const [showTable, setShowTable] = useState('none');
  
  //Dados da Movimentação, usados para cadastrar/atualizar o registro de uma movimentação
  const [data, setData] = useState('');
  const [odometro, setOdometro] = useState('');
  const [idMotorista, setIdMotorista] = useState('');
  const [chefeViatura, setChefeViatura] = useState('');
  const [idUsario, setIdUsuario] = useState('');
  const [destino, setDestino] = useState('');
  const [qtdCombustivel, setQtdCombustivel] = useState('');
  const [aberto, setAberto] = useState(true);

  //Função para Listar Militar              - OK
  useEffect(() => {
    async function listarMovimentos(){    
      const response = await api.get('/listar-movimento?aberto=true');
      setMovimentos(response.data);
    }
    listarMovimentos();
  }, []);
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
    const response = await api.post('/cadastrar-movimento', {
      data,
      odometro,
      idMotorista,
      chefeViatura,
      idUsario,
      destino,
      qtdCombustivel,
      aberto
    })
    setData('');
    setOdometro('');
    setIdMotorista('');
    setChefeViatura('');
    setIdUsuario('');
    setDestino(false);
    setQtdCombustivel(false);
    setAberto('');

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
        <h2>MOVIMENTAÇÃO DE VIATURAS</h2>
      </div>
      <form onSubmit={addMilitar} className="mainForm" style={{display:showTable}}>   
          <strong>NOVA MOVIMENTAÇÃO</strong>
          <div className="inputGroup3">
            <InputMask 
              mask="99/99/9999"
              id="dataNascimento"
              name="dataNascimento"
              value={data}
              onChange={e => setData(e.target.value)}
              placeholder="Data"
            />
            <InputMask 
              mask="99:99"
              id="hora"
              name="hora"
              value={data}
              onChange={e => setData(e.target.value)}
              placeholder="Hora"
            />
            <input 
              id="odometro"
              name="odometro"
              value={odometro}
              onChange={e => setOdometro(e.target.value)}
              placeholder="Odometro"
            />
          </div>
          <div className="inputGroup4">
            <input 
                id="destino"
                name="destino"
                value={destino}
                onChange={e => setDestino(e.target.value)}
                placeholder="Destino"
              />
              <select>
                <option value={qtdCombustivel} disabled onChange={e => setQtdCombustivel(e.target.value)}>Combustível</option>
                <option>Pleno</option>
                <option>Meio Tanque</option>
                <option>Cheio</option>
              </select>
          </div>
          <div className="inputGroupMotoristas">
            <input 
              id="id"
              name="id"
              value={chefeViatura}
              onChange={e => setChefeViatura(e.target.value)}
              placeholder="Identidade"
            />
            <input 
              id="pelotao"
              name="pelotao"
              value={chefeViatura}
              onChange={e => setChefeViatura(e.target.value)}
              placeholder="Chefe Viatura"
            />
          </div>
          <div className="inputGroupMotoristas">
            <input 
              id="id"
              name="id"
              value={idMotorista}
              onChange={e => setIdMotorista(e.target.value)}
              placeholder="Identidade"
            />
            <input 
              id="motoristaP"
              name="motoristaP"
              value={idMotorista}
              onChange={e => setIdMotorista(e.target.value)}
              placeholder="Motorista Principal"
            />
          </div>
          <div className="inputGroupMotoristas">
            <input 
              id="id"
              name="id"
              value={idUsario}
              onChange={e => setIdUsuario(e.target.value)}
              placeholder="Identidade"
            />
            <input 
              id="id"
              name="id"
              value={idUsario}
              onChange={e => setIdUsuario(e.target.value)}
              placeholder="Usuario"
            />
          </div>
          <div className="btnForm">
            <button id="novaMovimentacao" type="submit">SALVAR</button>
            <button onClick={mostrarTabela}>CANCELAR</button>
          </div>
        </form>
      <div className="mainBox">
      <div className="fab">
        <button className="main" onClick={mostrarTabela} title="Nova Movimentação">
        </button>
      </div>
      <div className="mainRegistros">
            <table>
              <thead> 
                <tr>
                  <th>DATA/HORA</th>
                  <th>ODOMETRO</th>
                  <th>DESTINO</th>
                  <th>COMBUSTIVEL</th>
                  <th>CHEFE</th>
                  <th>MOTORISTA</th>
                  <th>USUÁRIO</th>
                  <th>AÇÔES </th>
                </tr>
              </thead> 
              <tbody>
                {movimentos.map(mv => (     //   (Selecionar: Pleno, Meio tanque ou Cheio)   Faz um FOR dentro do array 'militar', e coloca em 'ml'
                  <tr key={mv._id}>
                    <th>{mv.data}</th>
                    <th>{mv.odometroS}</th>
                    <th>{mv.destino}</th>
                    <th>{mv.qtdCombustivel}</th>
                    <th>{mv.chefeViatura}</th>
                    <th>{mv.idMotorista}</th>
                    <th>{mv.idUsario}</th>
                    <th>
                      <span onClick={() => {  //Botão para editar Militar
                        setIdMotorista(mv.idMilitar);
                        
                      }} id="iconeEdit"><FaEdit /></span>
                      <span onClick={() => {  //Botão para deletar Formulário
                        if (window.confirm('Deseja apagar esse Militar?')){
                          rmMilitar(mv.idMilitar);
                        }
                      }} id="iconeDelete"><FaTrashAlt /></span>
                    </th>
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
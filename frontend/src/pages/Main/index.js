import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import api from '../../services/api';
import InputMask from 'react-input-mask';
import './main.css';

function Main() {

  //Armazena a lista de militares na constante militar
  const [movimentos, setMovimentos] = useState([]);
  const [showTable, setShowTable] = useState('none');
  
  //Dados da Movimentação, usados para cadastrar/atualizar o registro de uma movimentação
  const [dia, setDia] = useState('');
  const [hora, setHora] = useState('');
  const [odometroS, setOdometro] = useState('');
  const [idChefeViatura, setidChefeViatura] = useState('');
  const [nomeChefeViatura, setnomeChefeViatura] = useState('');
  const [idMotoristaP, setIdMotoristaP] = useState('');
  const [nomeMotoristaP, setnomeMotoristaP] = useState('');
  const [idMotoristaA, setIdMotoristaA] = useState('');
  const [nomeMotoristaA, setnomeMotoristaA] = useState('');
  const [destino, setDestino] = useState('');
  const [qtdCombustivelS, setQtdCombustivel] = useState('');

  //Função para Listar Militar - OK
  useEffect(() => {
    async function listarMovimentos(){    
      const response = await api.get('/listar-movimento?aberto=true');
      setMovimentos(response.data);
    }
    listarMovimentos();
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
    alert(`${dia}T${hora}:00.000Z`);
    const response = await api.post('/cadastrar-movimento', {
      data: `${dia}T${hora}:00.000Z`,
      odometroS,
      idChefeViatura,
      idMotoristaP,
      idMotoristaA,
      idUsuario:localStorage.getItem('id'),
      destino,
      qtdCombustivelS,
      aberto:true
    })
    setDia('');
    setHora('');
    setOdometro('');
    setIdMotoristaP('');
    setidChefeViatura('');
    setDestino('');
    setQtdCombustivel('');
    setShowTable(false)
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
              mask="9999-99-99"
              id="dataNascimento"
              name="dataNascimento"
              value={dia}
              onChange={e => setDia(e.target.value)}
              placeholder="Data"
            />
            <InputMask 
              mask="99:99"
              id="hora"
              name="hora"
              value={hora}
              onChange={e => setHora(e.target.value)}
              placeholder="Hora"
            />
            <input 
              id="odometro"
              name="odometro"
              value={odometroS}
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
              <select value={qtdCombustivelS} onChange={e => setQtdCombustivel(e.target.value)}>
                <option disabled value="">Combustível</option>
                <option value="Pleno">Pleno</option>
                <option value="Meio Tanque">Meio Tanque</option>
                <option value="Cheio">Cheio</option>
              </select>
          </div>
          <p>Chefe de Viatura</p>
          <div className="inputGroupMotoristas">
            <input 
              id="id"
              name="id"
              value={idChefeViatura}
              onChange={async e => {
                setidChefeViatura(e.target.value);
                try {
                  const response = await api.get(`/pesquisar-militar?idMilitar=${e.target.value}`);
                  setnomeChefeViatura(response.data.nome);
                } catch (error) {
                  setnomeChefeViatura('Militar Incorreto');
                }
                }
              }
              placeholder="Identidade"
            />
            <input 
              id="pelotao"
              name="pelotao"
              value={nomeChefeViatura}
              disabled
              placeholder="Nome"
            />
          </div>
          <p>Motorista Principal</p>
          <div className="inputGroupMotoristas">
            <input 
              id="id"
              name="id"
              value={idMotoristaP}
              onChange={async e => {
                setIdMotoristaP(e.target.value);
                try {
                  const response = await api.get(`/pesquisar-militar?idMilitar=${e.target.value}`);
                  setnomeMotoristaP(response.data.nome);
                } catch (error) {
                  setnomeMotoristaP('Militar Incorreto');
                }
                }
              }
              placeholder="Identidade"
            />
            <input 
              id="motoristaP"
              name="motoristaP"
              value={nomeMotoristaP}
              disabled
              placeholder="Nome"
            />
          </div>
          <p>Motorista Auxiliar</p>
          <div className="inputGroupMotoristas">
            <input 
              id="id"
              name="id"
              value={idMotoristaA}
              onChange={async e => {
                setIdMotoristaA(e.target.value);
                try {
                  const response = await api.get(`/pesquisar-militar?idMilitar=${e.target.value}`);
                  setnomeMotoristaA(response.data.nome);
                } catch (error) {
                  setnomeMotoristaA('Militar Incorreto');
                }
                }
              }
              placeholder="Identidade"
            />
            <input 
              id="id"
              name="id"
              value={nomeMotoristaA}
              disabled
              placeholder="Nome"
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
                  <th>AUXILIAR</th>
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
                    <th>{mv.qtdCombustivelS}</th> 
                    <th>{mv.idChefeViatura}</th>
                    <th>{mv.idMotoristaP}</th>
                    <th>{mv.idMotoristaA}</th>
                    <th>{mv.idUsuario}</th>
                    <th>
                      <span onClick={() => {  //Botão para editar Militar
                        //setIdMotorista(mv.idMilitar);
                        
                      }} id="iconeEdit"><FaEdit /></span>
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
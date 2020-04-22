import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaArrowRight, FaMousePointer, FaAccessibleIcon, FaAngry, FaArrowDown, FaEye } from 'react-icons/fa';
import api from '../../services/api';
import InputMask from 'react-input-mask';
import './main.css';

function Main() {

  //Armazena a lista de militares na constante militar
  const [refresh, setRefresh] = useState(0);
  const [movimentos, setMovimentos] = useState([]);
  const [showForm, setShowForm] = useState('none');
  const [showDetail, setShowDetail] = useState('none');
  
  //Dados da Movimentação, usados para cadastrar/atualizar o registro de uma movimentação
  const [dia, setDia] = useState('');
  const [dataS, setData] = useState('');
  const [hora, setHora] = useState('');
  const [odometroS, setOdometro] = useState('');
  const [idChefeViatura, setidChefeViatura] = useState('');
  const [nomeChefeViatura, setnomeChefeViatura] = useState('');
  const [idMotoristaP, setIdMotoristaP] = useState('');
  const [nomeMotoristaP, setnomeMotoristaP] = useState('');
  const [idMotoristaA, setIdMotoristaA] = useState('');
  const [nomeMotoristaA, setnomeMotoristaA] = useState('');
  const [idViatura, setIdViatura] = useState('');
  const [nomeViatura, setnomeViatura] = useState('');
  const [destino, setDestino] = useState('');
  const [qtdCombustivelS, setQtdCombustivel] = useState('');

  //Função para Listar Militar - OK
  useEffect(() => {
    async function listarMovimentos(){    
      const response = await api.get('/listar-movimento?aberto=true');
      setMovimentos(response.data);
    }
    listarMovimentos();
  }, [refresh]);
  function mostrarForm(){
    if(showForm === 'none'){
      setShowForm('block');
      var today = new Date();
      var date = today.getFullYear()+'-'+("0"+(today.getMonth()+1)).slice(-2)+'-'+("0"+(today.getDate())).slice(-2);
      var time = today.getHours() + ":" + ("0"+today.getMinutes()).slice(-2) + ":" + ("0"+today.getSeconds()).slice(-2);
      setDia(date);
      setHora(time);
      setData(date+"T"+time+".000Z");
    }
    if(showForm === 'block'){
      setShowForm('none');
      setDia('');
      setHora('');
    }
    setRefresh(0);
  }

  function mostrarDetail(){
    if(showDetail === 'none'){
      setShowDetail('block');
    }
    if(showDetail === 'block'){
      setShowDetail('none');

    }
  }
  //Função para Cadastrar/Atualizar Militar - OK
  async function addMilitar(e){
    e.preventDefault();
    const response = await api.post('/cadastrar-movimento', {
      dataS: dataS,
      odometroS,
      idChefeViatura,
      idMotoristaP,
      idMotoristaA,
      idUsuario:localStorage.getItem('id'),
      idViatura,
      destino,
      qtdCombustivelS,
      aberto:true
    })
    setDia('');
    setData('');
    setHora('');
    setOdometro('');
    setIdMotoristaP('');
    setIdMotoristaA('');
    setidChefeViatura('');
    setDestino('');
    setQtdCombustivel('');
    setShowForm('block')
    setIdViatura('');
    alert("Movimentação Cadastrada com Sucesso!");
    setShowForm('none')
    setRefresh(1);
  }   

  //O que mostra na tela do navegador  
  return (
    <div className="mainContainer">
      <div className="tituloMain">
        <h2>MOVIMENTAÇÃO DE VIATURAS</h2>
      </div>
      <div className="mainDetail" style={{display:showDetail}}>
      <button className="btnFechar" id="detail" onClick={mostrarDetail}></button>
      <form onSubmit={addMilitar}>   
          <h3>DETALHES</h3>
          <div className="inputGroup3">
            <InputMask 
              mask="99/99/9999"
              id="dataNascimento"
              name="dataNascimento"
              value={dia}
              onChange={e => {
                setDia(e.target.value);
                let res = e.target.value.split("/");
                setData(res[2]+"-"+res[1]+"-"+res[0]);
                }
              }
              placeholder="Data"
            />
            <InputMask 
              mask="99:99:99"
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
          <p>Viatura</p>
          <div className="inputGroupMotoristas">
            <input 
              id="id"
              name="id"
              value={idViatura}
              onChange={async e => {
                setIdViatura(e.target.value);
                try {
                  const response = await api.get(`/pesquisar-viatura?idViatura=${e.target.value}`);
                  setnomeViatura(response.data.nome);
                } catch (error) {
                  setnomeViatura('Viatura Incorreta');
                }
                }
              }
              placeholder="Placa"
            />
            <input 
              id="pelotao"
              name="pelotao"
              value={nomeViatura}
              disabled
              placeholder="Viatura"
            />
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
          </div>
        </form>
      </div>
      <div className="mainForm" style={{display:showForm}}>
      <button className="btnFechar" onClick={mostrarForm}></button>
      <form onSubmit={addMilitar}>   
          <h3>NOVA MOVIMENTAÇÃO</h3>
          <div className="inputGroup3">
            <InputMask 
              mask="9999/99/99"
              id="dataNascimento"
              disabled
              name="dataNascimento"
              value={dia}
              onChange={e => {
                setDia(e.target.value);
                let res = e.target.value.split("/");
                setData(res[2]+"-"+res[1]+"-"+res[0]);
                }
              }
              placeholder="Data"
            />
            <InputMask 
              mask="99:99:99"
              id="hora"
              name="hora"
              disabled
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
          <p>Viatura</p>
          <div className="inputGroupMotoristas">
            <input 
              id="id"
              name="id"
              value={idViatura}
              onChange={async e => {
                setIdViatura(e.target.value);
                try {
                  const response = await api.get(`/pesquisar-viatura?idViatura=${e.target.value}`);
                  setnomeViatura(response.data.nome);
                } catch (error) {
                  setnomeViatura('Viatura Incorreta');
                }
                }
              }
              placeholder="Placa"
            />
            <input 
              id="pelotao"
              name="pelotao"
              value={nomeViatura}
              disabled
              placeholder="Viatura"
            />
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
          </div>
        </form>
        </div>
      <div className="mainBox">
      <div className="fab">
        <button className="main" onClick={mostrarForm} title="Nova Movimentação">
        </button>
      </div>
      <div className="mainRegistros">
            <table>
              <thead> 
                <tr>
                  <th>VIATURA</th>
                  <th>DATA</th>
                  <th>HORA</th>
                  <th>DESTINO</th>
                  <th>COMBUSTIVEL</th>
                  <th>DETALHES</th>
                </tr>
              </thead> 
              <tbody>
                {movimentos.map(mv => (     //   (Selecionar: Pleno, Meio tanque ou Cheio)   Faz um FOR dentro do array 'militar', e coloca em 'ml'
                  <tr key={mv._id}>
                    <th>{mv.idViatura}</th>
                    <th>{mv.dataS.match(/\d\d\d\d-\d\d-\d\d/)}</th>
                    <th>{mv.dataS.match(/\d\d:\d\d:\d\d/)}</th>
                    <th>{mv.destino}</th>
                    <th>{mv.qtdCombustivelS}</th> 
                    <th onClick={mostrarDetail} className="iconeDetalhe"><FaEye/></th>
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
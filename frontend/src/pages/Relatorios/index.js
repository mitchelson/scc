import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import api from '../../services/api';
import Detail from './../../components/Detail';
import Form from './../../components/Form';
import './relatorio.css';

function Relatorio() {

  //Armazena a lista de militares na constante militar
  const [refresh, setRefresh] = useState(0);
  const [movimentos, setMovimentos] = useState([]);
  const [detail, setDetail] = useState([]);
  const [showForm, setShowForm] = useState('none');
  const [showDetail, setShowDetail] = useState('none');
  
  //Função para Listar Militar - OK
  useEffect(() => {
    async function listarMovimentos(){    
      const response = await api.get('/listar-movimento?aberto=false');
      setMovimentos(response.data);
    }
    listarMovimentos();
  }, [showForm]);
  
  function mostrarForm(){
    if(showForm === 'none'){
      setShowForm('block');
    }
    setRefresh(0);
  }
  function ocultarForm(){
    if(showForm === 'block'){
      setShowForm('none');
    }
    setRefresh(0);
  }

  async function mostrarDetail(dataS){
    if(showDetail === 'none'){
      const response = await api.get(`/pesquisar-movimento?dataS=${dataS}`);
      setDetail(response.data);
      setShowDetail('block');
    }
  }
  function ocultarDetail(){
    setShowDetail('none');
    setDetail([]);
  }
  
  //O que mostra na tela do navegador  
  return (
    <div className="mainContainer">
      <div className="tituloMain">
        <h2>RELATÓRIOS DE MOVIMENTAÇÕES</h2>
      </div>
      <div className="formDetail" style={{display:showDetail}}>
        <button className="close" onClick={ocultarDetail} title="Nova Movimentação" />
        <Detail detail={detail} showDetail={showDetail} />
      </div>
      <div className="formNovaMovimentacao" style={{display:showForm}}>
        <button className="close" onClick={ocultarForm} title="Nova Movimentação" />
        <Form showForm={showForm} className="form"/>
      </div>
      <div className="mainBox">
      <div className="fab"> 
        <button className="main" onClick={mostrarForm} title="Nova Movimentação" />
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
                    <th onClick={() => {mostrarDetail(mv.dataS)}} className="iconeDetalhe"><FaEye/></th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}

export default Relatorio;
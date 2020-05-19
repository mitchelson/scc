import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendar } from 'react-icons/fa';
import api from '../../services/api';
import Detail from './../../components/Detail';
import './relatorio.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Relatorio() {

  //Armazena a lista de militares na constante militar
  const [movimentos, setMovimentos] = useState([]);
  const [detail, setDetail] = useState([]);
  const [showDetail, setShowDetail] = useState('none');
  const [startDate, setStartDate] = useState(new Date());
  
  //Função para Listar Militar - OK
  useEffect(() => {
    async function listarMovimentos(){    
      const response = await api.get('/listar-movimento?aberto=false');
      setMovimentos(response.data);
    }
    listarMovimentos();
  }, []);
  
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
  function gerarPDF(){
    var doc = new jsPDF({
      orientation: 'landscape',
      format: 'a4'
    });
    doc.text('Relatório de Movimentações', 115, 10);
    doc.autoTable({ html: '#movRelatorio' });
    doc.text('________________________________', 150, 190);
    doc.text('Assinatura do Responsável', 165, 200);
    doc.save('Relatorio.pdf');
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
      <div className="mainBox">
        <div className="expRegistros">
          <h2>Gerar Relatório PDF</h2>
          <div className="inputDate">
          Data de Início
          <input />
          </div>
          <div className="inputDate">
          Data de Final
          <input /><FaCalendar/>
          </div>
          <button id="gerarDocumento" onClick={gerarPDF}>Gerar</button>
        </div>
        <div className="mainRegistros">
          <table id="movRelatorio">
            <thead> 
              <tr>
                <th>VIATURA</th>
                <th>ODOMETRO Saída/Chegada</th>
                <th>DISTÂNCIA</th>
                <th>DATA</th>
                <th>HORA</th>
                <th>DESTINO</th>
                <th>CHEFE DE VIATURA</th>
                <th>MOTORISTA PRINCIPAL</th>
                <th>MOTORISTA AUXILIAR</th>
              </tr>
            </thead> 
            <tbody>
              {movimentos.map(mv => (     //   (Selecionar: Pleno, Meio tanque ou Cheio)   Faz um FOR dentro do array 'militar', e coloca em 'ml'
                <tr key={mv._id} className="linkDetalhe">
                  <th>{mv.idViatura}</th>
                  <th>{mv.odometroS} KM / {mv.odometroC} KM</th>
                  <th>{mv.odometroC - mv.odometroS} KM</th>
                  <th>{mv.dataS.match(/\d\d\d\d-\d\d-\d\d/)}</th>
                  <th>{mv.dataS.match(/\d\d:\d\d:\d\d/)}</th>
                  <th>{mv.destino}</th>
                  <th>{mv.idChefeViatura}</th>
                  <th>{mv.idMotoristaP}</th>
                  <th>{mv.idMotoristaA}</th>
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
import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import api from "../../services/api";
import Detail from "./../../components/Detail";
import "./relatorio.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Relatorio() {
  //Armazena a lista de militares na constante militar
  const [movimentos, setMovimentos] = useState([]);
  const [movFiltro, setmovFiltro] = useState([]);
  const [detail, setDetail] = useState([]);
  const [showDetail, setShowDetail] = useState("none");
  const [dataInicio, setdataInicio] = useState("");
  const [dataFinal, setdataFinal] = useState("");

  //Função para Listar Militar - OK
  useEffect(() => {
    async function listarMovimentos() {
      const response = await api.get("/listar-movimento-data");
      setMovimentos(response.data);
    }
    listarMovimentos();
  }, []);
  async function relatorioDia() {}

  function ocultarDetail() {
    setShowDetail("none");
    setDetail([]);
  }
  function gerarPDF() {
    var doc = new jsPDF({
      orientation: "landscape",
      format: "a4",
    });
    doc.text("Relatório de Movimentações", 115, 10);
    doc.autoTable({
      html: "#movRelatorioData",
    });
    doc.text("________________________________", 150, 190);
    doc.text("Assinatura do Responsável", 165, 200);
    doc.save("Relatorio.pdf");
  }
  function gerarPDFDia() {
    var doc = new jsPDF({
      orientation: "landscape",
      format: "a4",
    });
    doc.text("Relatório de Movimentações", 115, 10);
    doc.autoTable({
      html: "#rlRelatorio",
    });
    doc.text("________________________________", 150, 190);
    doc.text("Assinatura do Responsável", 165, 200);
    doc.save("Relatorio.pdf");
  }

  //O que mostra na tela do navegador
  return (
    <div className="mainContainer">
      <div className="tituloMain">
        <h2>RELATÓRIOS DE MOVIMENTAÇÕES</h2>
      </div>
      <div className="formDetail" style={{ display: showDetail }}>
        <button
          className="close"
          onClick={ocultarDetail}
          title="Nova Movimentação"
        />
        <Detail detail={detail} showDetail={showDetail} />
      </div>
      <div className="mainBox">
        <div className="expRegistros">
          <div className="caixa">
            <form onSubmit={gerarPDF}>
              <h2>Relatório por data</h2>
              <div className="inputDate">
                <h3>Data de Início</h3>
                <InputMask
                  mask="99/99/9999"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={dataInicio}
                  required
                  onChange={(e) => setdataInicio(e.target.value)}
                />
              </div>
              <div className="inputDate">
                <h3>Data Final</h3>
                <InputMask
                  mask="99/99/9999"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={dataFinal}
                  required
                  onChange={(e) => setdataFinal(e.target.value)}
                />
              </div>
              <button id="gerarDocumento" type="submit">
                Gerar
              </button>
            </form>
          </div>
          <h2>Relatório Diário</h2>
          <button id="gerarDocumento" onClick={gerarPDFDia}>
            Gerar
          </button>
        </div>
        <div className="relaRegistros">
          <h1>Movimentações do Dia</h1>
          <table id="rlRelatorio">
            <thead>
              <tr>
                <th>VIATURA</th>
                <th>ODOMETRO Saída/Chegada</th>
                <th>DISTÂNCIA</th>
                <th>DATA/HORA SAÍDA</th>
                <th>DATA/HORA CHEGADA</th>
                <th>DESTINO</th>
                <th>CHEFE DE VIATURA</th>
                <th>MOTORISTA PRINCIPAL</th>
                <th>MOTORISTA AUXILIAR</th>
              </tr>
            </thead>
            <tbody>
              {movFiltro.map((mv) => (
                <tr key={mv._id} className="linkDetalhe">
                  <th>{mv.idViatura}</th>
                  <th>
                    {mv.odometroS} KM / {mv.odometroC} KM
                  </th>
                  <th>{mv.odometroC - mv.odometroS} KM</th>
                  <th>
                    {mv.dataS.match(/\d\d\d\d-\d\d-\d\d/)}
                    {mv.dataS.match(/\d\d:\d\d:\d\d/)}
                  </th>
                  <th>
                    {mv.dataC.match(/\d\d\d\d-\d\d-\d\d/)}
                    {mv.dataC.match(/\d\d:\d\d:\d\d/)}
                  </th>
                  <th>{mv.destino}</th>
                  <th>{mv.nomeChefeViatura}</th>
                  <th>{mv.nomeMotoristaP}</th>
                  <th>{mv.nomeMotoristaA}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <table id="movRelatorioData" style={{ display: "none" }}>
            <thead>
              <tr>
                <th>VIATURA</th>
                <th>ODOMETRO Saída/Chegada</th>
                <th>DISTÂNCIA</th>
                <th>DATA/HORA SAÍDA</th>
                <th>DATA/HORA CHEGADA</th>
                <th>HORA</th>
                <th>DESTINO</th>
                <th>CHEFE DE VIATURA</th>
                <th>MOTORISTA PRINCIPAL</th>
                <th>MOTORISTA AUXILIAR</th>
              </tr>
            </thead>
            <tbody>
              {movimentos.map((mv) => (
                <tr key={mv._id} className="linkDetalhe">
                  <th>{mv.idViatura}</th>
                  <th>
                    {mv.odometroS} KM / {mv.odometroC} KM
                  </th>
                  <th>{mv.odometroC - mv.odometroS} KM</th>
                  <th>{mv.dataS.match(/\d\d\d\d-\d\d-\d\d/)}</th>
                  <th>{mv.dataS.match(/\d\d:\d\d:\d\d/)}</th>
                  <th>{mv.destino}</th>
                  <th>{mv.nomeChefeViatura}</th>
                  <th>{mv.nomeMotoristaP}</th>
                  <th>{mv.nomeMotoristaA}</th>
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

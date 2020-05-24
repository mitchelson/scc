import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import api from "../../services/api";
import "./relatorio.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

function Relatorio() {
  //Armazena a lista de militares na constante militar
  const [movimentos, setMovimentos] = useState([]);
  const [dataInicio, setdataInicio] = useState("");
  const [dataFinal, setdataFinal] = useState("");
  const [inicio, setInicio] = useState("");
  const [final, setFinal] = useState("");

  //Função para Listar Militar - OK
  useEffect(() => {
    async function listarMovimentos() {
      //Lista os movimentos do dia atual
      if (dataInicio !== "" && dataFinal > dataInicio) {
        const response = await api.post("/listar-movimento", {
          aberto: false,
          dataC: {
            $gte:
              dataInicio.split("/")[2] +
              "-" +
              dataInicio.split("/")[1] +
              "-" +
              dataInicio.split("/")[0],
            $lte:
              dataFinal.split("/")[2] +
              "-" +
              dataFinal.split("/")[1] +
              "-" +
              dataFinal.split("/")[0],
          },
        });
        setMovimentos(response.data);
      } else {
        const response = await api.post("/listar-movimento", {
          aberto: false,
          dataC: {
            $gte: moment().format("YYYY-MM-DD"),
          },
        });
        setMovimentos(response.data);
      }
    }
    listarMovimentos();
  }, [dataInicio, dataFinal]);

  function gerarPDF() {
    if (movimentos.length > 0) {
      var doc = new jsPDF({
        orientation: "landscape",
        format: "a4",
      });
      doc.text(
        `Relatório de Movimentações ${moment().format("DD-MM-YYYY")}`,
        110,
        10
      );
      doc.autoTable({
        html: "#rlRelatorio",
      });
      doc.text("________________________________", 150, 190);
      doc.text("Assinatura do Responsável", 165, 200);
      doc.save(`Relatorio#${moment().format("DD-MM-YYYY")}.pdf`);
    } else {
      alert("Não existe movimento fechado de hoje!");
    }
  }
  return (
    <div className="mainContainer">
      <section className="tituloMain">
        <h2>RELATÓRIOS DE MOVIMENTAÇÕES</h2>
      </section>
      <div className="mainBox">
        <div className="expRegistros">
          <div className="caixa">
            <form onSubmit={gerarPDF}>
              <h2>Gerar Relatório</h2>
              <div className="inputDate">
                <h3>Data de Início</h3>
                <InputMask
                  mask="99/99/9999"
                  value={dataInicio}
                  onChange={(e) => setdataInicio(e.target.value)}
                />
              </div>
              <div className="inputDate">
                <h3>Data Final</h3>
                <InputMask
                  mask="99/99/9999"
                  value={dataFinal}
                  onChange={(e) => setdataFinal(e.target.value)}
                />
              </div>
              <button id="gerarDocumento" type="submit">
                Gerar
              </button>
            </form>
            <i>
              O Relatório será gerado de acordo com a tabela ao lado. Para
              mostrar o relatorio diário deixe os campos Data de Início e Data
              Final vazios.
            </i>
          </div>
        </div>
        <div className="relaRegistros">
          <h1>Movimentações</h1>
          <table id="rlRelatorio">
            <thead>
              <tr>
                <th>VIATURA</th>
                <th>ODOMETRO</th>
                <th>DISTÂNCIA</th>
                <th>HORA SAÍDA</th>
                <th>HORA CHEGADA</th>
                <th>DESTINO</th>
                <th>CHEFE VIATURA</th>
                <th>1º MOTORISTA</th>
                <th>2º MOTORISTA</th>
              </tr>
            </thead>
            <tbody>
              {movimentos.map((mv) => (
                <tr key={mv._id} className="linkDetalhe">
                  <th>{mv.idViatura}</th>
                  <th>
                    {mv.odometroS}/{mv.odometroC} KM
                  </th>
                  <th>{mv.odometroC - mv.odometroS} KM</th>
                  <th>
                    {mv.dataS.match(/\d\d\d\d-\d\d-\d\d/)} -
                    {mv.dataS.match(/\d\d:\d\d:\d\d/)}
                  </th>
                  <th>
                    {mv.dataC.match(/\d\d\d\d-\d\d-\d\d/)} -
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
        </div>
      </div>
    </div>
  );
}

export default Relatorio;

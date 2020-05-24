import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import api from "../../services/api";
import Detail from "./../../components/Detail";
import Form from "./../../components/Form";
import "./main.css";

function Main() {
  //Armazena a lista de militares na constante militar
  const [existe, setExiste] = useState("");
  const [movimentos, setMovimentos] = useState([]);
  const [detail, setDetail] = useState([]);
  const [showForm, setShowForm] = useState("none");
  const [showDetail, setShowDetail] = useState("none");

  //Função para Listar Movimentos abertos
  useEffect(() => {
    async function listarMovimentos() {
      const response = await api.post("/listar-movimento", {
        aberto: true,
      });
      setMovimentos(response.data);
      //Caso não haja movimentos ele mostra o aviso de Vazio
      if (response.data.length === 0) {
        setExiste("block");
      } else {
        setExiste("none");
      }
    }
    listarMovimentos();
  }, [showForm]);

  function mostrarForm() {
    if (showForm === "none") {
      setShowForm("block");
    }
  }
  function ocultarForm() {
    if (showForm === "block") {
      setShowForm("none");
    }
  }

  async function mostrarDetail(dataS) {
    if (showDetail === "none") {
      const response = await api.get(`/pesquisar-movimento?dataS=${dataS}`);
      setDetail(response.data);
      setShowDetail("block");
    }
  }
  function ocultarDetail() {
    setShowDetail("none");
    setDetail([]);
  }

  //O que mostra na tela do navegador
  return (
    <div className="mainContainer">
      <div className="tituloMain">
        <h2>MOVIMENTAÇÃO DE VIATURAS</h2>
      </div>
      <div className="formDetail" style={{ display: showDetail }}>
        <button
          className="close"
          onClick={ocultarDetail}
          title="Nova Movimentação"
        />
        <Detail detail={detail} showDetail={showDetail} />
      </div>
      <div className="formNovaMovimentacao" style={{ display: showForm }}>
        <button
          className="close"
          onClick={ocultarForm}
          title="Nova Movimentação"
        />
        <Form showForm={showForm} className="form" />
      </div>
      <div className="mainBoxMovimentacao">
        <div className="fab">
          <button
            className="main"
            onClick={mostrarForm}
            title="Nova Movimentação"
          />
        </div>
        <div className="mainMovimentacao">
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
              {movimentos.map((mv) => (
                <tr key={mv._id}>
                  <th>{mv.idViatura}</th>
                  <th>{mv.dataS.toLocaleString("pt-BR")}</th>
                  <th>{mv.dataS.match(/\d\d:\d\d:\d\d/)}</th>
                  <th>{mv.destino}</th>
                  <th>{mv.qtdCombustivelS}</th>
                  <th
                    onClick={() => {
                      mostrarDetail(mv.dataS);
                    }}
                    className="iconeDetalhe"
                  >
                    <FaEye />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="vazio" style={{ display: existe }}>
            Não existem movimentações abertas!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

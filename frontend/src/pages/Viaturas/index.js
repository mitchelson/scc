import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import api from '../../services/api';
import InputMask from 'react-input-mask';
import './viatura.css';

function Viatura() {

  //Armazena a lista de viaturas na constante viatura
  const [viatura, setViatura] = useState([]);
  const [militar, setMilitar] = useState([]);

  //Dados do viatura, usados para cadastrar/atualizar o registro de um viatura
  const [inputIdviatura, setInputId] = useState(true);
  const [idViatura, setidviatura] = useState('');
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [chefeViatura, setChefeViatura] = useState('');
  const [motoristaPrincipal, setMotoristaP] = useState('');
  const [motoristaAuxiliar, setMotoristaA] = useState('');
  const [dataChegada, setdataChegada] = useState('');
  const [disponivel, setDisponivel] = useState(true);
  const [categoria, setCategoria] = useState('');
  const [militarReset, setReset] = useState(false);

  //Função para Listar viatura
  useEffect(() => {
    async function listaViatura(){    
      const response = await api.get('/listar-viatura');
      setViatura(response.data);
    }
    listaViatura();
  }, []);
  useEffect(() => {
    async function militaresSelect(){    
      const response = await api.get('/listar-militar');
      setMilitar(response.data);
    }
    militaresSelect();
  }, [militarReset]);
  function clean(){
    setReset(true);
    setReset(false)
  }
  //Função para Cadastrar/Atualizar viatura
  async function addViatura(e){
    e.preventDefault();
    const response = await api.post('/cadastrar-viatura', {
      idViatura,
      nome,
      tipo,
      dataChegada,
      chefeViatura,
      motoristaPrincipal,
      motoristaAuxiliar,
      disponivel,
      categoria,
    })
    setidviatura('');
    setNome('');
    setTipo('');
    setChefeViatura('');
    setMotoristaP('');
    setMotoristaA('');
    setdataChegada(false);
    setCategoria('');
    setInputId(true);

    setViatura(response.data);
  }   

  //Função para Deletar viatura             - OK
  async function rmViatura(id){
    const response = await api.delete(`/deletar-viatura?idViatura=${id}`);
    setViatura(response.data);
  }

  return (
    <div className="containerViatura">
      <div className="tituloViatura">
        <h2>VIATURA</h2>
      </div>
      <div className="boxViatura">
        <form onSubmit={addViatura}>   
          <strong>FORMULÁRIO VIATURA</strong>
          <div className="inputGroup">
            <input 
              id="idViatura"
              name="idViatura"
              value={idViatura}
              required
              disabled={!inputIdviatura}
              onChange={e => setidviatura(e.target.value)}
              placeholder="ID Viatura"
            />
            <input 
            id="nome"
            name="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Nome"
          />
          </div>
          <div className="inputGroup">
            <InputMask 
                mask="99/99/9999"
                id="dataChegada"
                name="dataChegada"
                value={dataChegada}
                onChange={e => setdataChegada(e.target.value)}
                placeholder="Data de Chegada"
              />
            <input 
              id="tipo"
              name="tipo"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              placeholder="Tipo"/>
          </div>
          <select value={categoria} onChange={e => setCategoria(e.target.value)}>
            <option selected="true" disabled="disabled" value="">Selecione uma Categoria</option>
            <option value="Leve">Leve</option>
            <option value="Medio">Médio</option>
            <option value="Pesado">Pesado</option>
          </select>

          <select 
            id="chefeViatura"
            name="chefeViatura"
            value={chefeViatura}
            onChange={e => setChefeViatura(e.target.value)}
          >
            <option selected="true" disabled="disabled" value="">Chefe de Viatura</option>
            {militar.map(ml => (
              <option value={ml.idMilitar}>{ml.nome}</option>
            ))}
          </select>
          <select 
            id="motoristaPrincipal"
            name="motoristaPrincipal"
            value={motoristaPrincipal}
            onChange={e => setMotoristaP(e.target.value)}
          >
            <option selected="true" disabled="disabled" value="">Motorista Principal</option>
            {militar.map(ml => (
              <option value={ml.idMilitar}>{ml.nome}</option>
            ))}
          </select>
          <select 
            id="motoristaAuxiliar"
            name="motoristaAuxiliar"
            value={motoristaAuxiliar}
            onChange={e => setMotoristaA(e.target.value)}
          >
            <option selected="true" disabled="disabled" value="">Motorista Auxiliar</option>
            {militar.map(ml => (
              <option value={ml.idMilitar}>{ml.nome}</option>
            ))}
          </select>
          <button id="btnViatura" type="submit">SALVAR</button>
          <button type="reset">LIMPAR</button>
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
              {viatura.map(vt => (     //Faz um FOR dentro do array 'viatura', e coloca em 'ml'
                <tr key={vt._id}>
                  <td>{vt.idViatura}</td>
                  <td>{vt.nome}</td>
                  <td>---</td>
                  <td>
                    <span onClick={() => {  //Botão para editar viatura
                      setidviatura(vt.idViatura);
                      setInputId(false);
                      setNome(vt.nome);
                      setMotoristaP(vt.motoristaPrincipal);
                      setMotoristaA(vt.motoristaAuxiliar);
                      setdataChegada(vt.dataChegada);
                      setDisponivel(vt.disponivel);
                      setTipo(vt.tipo);
                      setCategoria(vt.categoria);
                      
                    }} id="iconeEdit"><FaEdit /></span>
                    <span onClick={() => {  //Botão para deletar Formulário
                      if (window.confirm('Deseja apagar essa viatura?')){
                        rmViatura(vt.idViatura);
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

export default Viatura;
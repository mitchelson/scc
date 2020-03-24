import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import api from '../../services/api';
import InputMask from 'react-input-mask';
import './styles.css';

function Viatura() {

  //Armazena a lista de viaturas na constante viatura
  const [viatura, setViatura] = useState([]);

  //Dados do viatura, usados para cadastrar/atualizar o registro de um viatura
  const [inputIdviatura, setInputId] = useState(true);
  const [idViatura, setidviatura] = useState('');
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [motoristaPrincipal, setMotoristaP] = useState('');
  const [motoristaAuxiliar, setMotoristaA] = useState('');
  const [dataChegada, setdataChegada] = useState('');
  const [disponivel, setDisponivel] = useState(true);
  const [categoria, setCategoria] = useState('');

  //Função para Listar viatura              - OK
  useEffect(() => {
    async function listaViatura(){    
      const response = await api.get('/listar-viatura');
      setViatura(response.data);
    }
    listaViatura();
  }, []);
  
  //Função para Cadastrar/Atualizar viatura - OK
  async function addViatura(e){
    alert()
    e.preventDefault();
    const response = await api.post('/cadastrar-viatura', {
      idViatura,
      nome,
      tipo,
      dataChegada,
      motoristaPrincipal,
      motoristaAuxiliar,
      disponivel,
      categoria,
    })
    setidviatura('');
    setNome('');
    setTipo('');
    setMotoristaP('');
    setMotoristaA('');
    setdataChegada(false);
    setCategoria('');
    setInputId(true);

    setViatura(response.data);
  }   

  //Função para Deletar viatura             - OK
  async function rmViatura(id){
    const deletado = await api.delete(`/deletar-viatura?idViatura=${id}`);
    setViatura(deletado.data);
  }

  //O que mostra na tela do navegador  
  return (
    <div id="container">
      <h1>Viatura</h1>
      <div id="box">
        <form onSubmit={addViatura}>   
          <strong>FORMULÁRIO</strong>
          <div className="inputGroup">
            <input 
              id="idViatura"
              name="idViatura"
              value={idViatura}
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
          <InputMask 
              mask="99/99/9999"
              id="dataChegada"
              name="dataChegada"
              value={dataChegada}
              onChange={e => setdataChegada(e.target.value)}
              placeholder="Data de Chegada"
            />
            <select value={categoria} onChange={e => setCategoria(e.target.value)}>
            <option disabled defaultValue>Selecione uma Categoria</option>
            <option value="Leve">Leve</option>
            <option value="Medio">Médio</option>
            <option value="Pesado">Pesado</option>
          </select>
          <input 
              id="tipo"
              name="tipo"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              placeholder="Tipo"/>
            <span>Motoristas</span>
          <div className="inputGroup">
            <input 
              id="motoristaPrincipal"
              name="motoristaPrincipal"
              value={motoristaPrincipal}
              onChange={e => setMotoristaP(e.target.value)}
              placeholder="Principal"
            />
            <input 
              id="motoristaAuxiliar"
              name="motoristaAuxiliar"
              value={motoristaAuxiliar}
              onChange={e => setMotoristaA(e.target.value)}
              placeholder="Auxiliar"
            />
          </div>
          <button id="btnPrincipal" type="submit">SALVAR</button>
          <button>LIMPAR</button>
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
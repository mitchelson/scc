import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import InputMask from 'react-input-mask';
import './main.css';

function Detail(props){
    const {detail, showDetail } = props;
    

    const [dia, setDia] = useState('');
    const [hora, setHora] = useState('');
    const [dataS, setData] = useState('');

    const [odometroS, setOdometroS] = useState('');
    const [odometroC, setOdometroC] = useState('');

    const [idChefeViatura, setidChefeViatura] = useState('');
    const [nomeChefeViatura, setnomeChefeViatura] = useState('');

    const [idMotoristaP, setIdMotoristaP] = useState('');
    const [nomeMotoristaP, setnomeMotoristaP] = useState('');

    const [idMotoristaA, setIdMotoristaA] = useState('');
    const [nomeMotoristaA, setnomeMotoristaA] = useState('');

    const [idViatura, setIdViatura] = useState('');
    const [nomeViatura, setnomeViatura] = useState('');

    const [destino, setDestino] = useState('');

    const [qtdCombustivelS, setQtdCombustivelS] = useState('');
    const [qtdCombustivelC, setQtdCombustivelC] = useState('');

    const [observacoes, setObservacoes] = useState('');
    
    async function finalizarMovimentacao(){

    }
return (
    
    <div className="mainDetail" style={{display:showDetail}}>
      <button className="btnFechar" id="detail"></button>
      <form onSubmit={finalizarMovimentacao}>   
          <h3>DETALHES</h3>
          <div className="inputGroup3">
            <InputMask 
              mask="9999/99/99"
              id="dataNascimento"
              name="dataNascimento"
              value={detail.dataS}
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
              value={detail.dataS}
              onChange={e => setHora(e.target.value)}
              placeholder="Hora"
            />
            <input 
              id="odometro"
              name="odometro"
              value={detail.odometroS}
              onChange={e => setOdometroS(e.target.value)}
              placeholder="Odometro"
            />
          </div>
          <div className="inputGroup4">
            <input 
              id="destino"
              name="destino"
              value={detail.destino}
              onChange={e => setDestino(e.target.value)}
              placeholder="Destino"
            />
            <select value={detail.qtdCombustivelS} onChange={e => setQtdCombustivelS(e.target.value)}>
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
              value={detail.idViatura}
              placeholder="Placa"
            />
            <input 
              id="pelotao"
              name="pelotao"
              value={async () => {
                try {
                  const response = await api.get(`/pesquisar-viatura?idViatura=${detail.idViatura}`);
                  setnomeViatura(response.data.nome);
                } catch (error) {
                  setnomeViatura('Viatura Incorreta');
                }
                }}
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
)
}
export default Detail;
import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import InputMask from 'react-input-mask';
import '../Detail/detail.css';

function Detail(props){
    const {detail, showDetail} = props;
    
    const [movimento, setMovimento] = useState([]);
    const [carregaNomes, setCarregaNomes] = useState(0);

    const [dia, setDia] = useState('');
    const [hora, setHora] = useState('');
    const [dataS, setDataS] = useState('');
    const [dataC, setDataC] = useState('');

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
    
    useEffect(() => {
      async function listarMovimentos(){    
        setMovimento(detail);
      }
      listarMovimentos();
    }, [showDetail]);

    async function finalizarMovimentacao(e){
      alert("Finalizar Movimentação?");
      e.preventDefault();
      await api.post('/cadastrar-movimento', {
        dataS,
        dataC,
        odometroC,
        qtdCombustivelC,
        aberto:false
      });
      alert("cadastrar mov")
      await api.post('/atualizar-militar',{
        idMilitar: idChefeViatura,
        disponivel:"green"
      });
      alert("chefe")
      await api.post('/atualizar-militar',{
        idMilitar: idMotoristaP,
        disponivel:"green"
      });
      alert("motoristaP")
      await api.post('/atualizar-militar',{
        idMilitar: idMotoristaA,
        disponivel:"green"
      });
      alert("motoristaA")
      await api.post('/atualizar-viatura',{
        idViatura,
        disponivel:"green"
      });
      alert("viatura")
      setDia('');
      setDataS('');
      setHora('');
      setOdometroS('');
      setIdMotoristaP('');
      setnomeMotoristaP('Nome');
      setIdMotoristaA('');
      setnomeMotoristaA('Nome');
      setidChefeViatura('');
      setnomeChefeViatura('Nome');
      setDestino('');
      setQtdCombustivelS('');
      setIdViatura('');
      alert("Movimentação Cadastrada com Sucesso!");
    } 
    useEffect(() => {
      async function carregaData(){   
        var today = new Date(); 
        var date = today.getFullYear()+'-'+("0"+(today.getMonth()+1)).slice(-2)+'-'+("0"+(today.getDate())).slice(-2);
        var time = ("0" + today.getHours()).slice(-2) + ":" + ("0"+today.getMinutes()).slice(-2) + ":" + ("0"+today.getSeconds()).slice(-2);
        setDia(date);
        setHora(time);
        setDataC(date+"T"+time+".000Z");
      }
      carregaData();
    }, [detail]);

    useEffect(() => {
      async function nomes(){
        const nomeViatura = await api.get(`/pesquisar-viatura?idViatura=${movimento.idViatura}`);
        setnomeViatura(nomeViatura.data.nome);
        const nomeChefe = await api.get(`/pesquisar-militar?idMilitar=${movimento.idChefeViatura}`);
        setnomeChefeViatura(nomeChefe.data.nome);
        const nomeMotoristaP = await api.get(`/pesquisar-militar?idMilitar=${movimento.idMotoristaP}`);
        setnomeMotoristaP(nomeMotoristaP.data.nome);
        const nomeMotoristaA = await api.get(`/pesquisar-militar?idMilitar=${movimento.idMotoristaA}`);
        setnomeMotoristaA(nomeMotoristaA.data.nome);
      }
      
    }, []);
  return (
    <div className="mainDetail" style={{display:showDetail}}>
      <form onSubmit={finalizarMovimentacao}>   
          <h3>DETALHES</h3>
          <div className="boxDados">
            <div className="nomesMovimentacao">
              <div className="nomes">
                <p>Viatura</p>
                <div className="inputNomes">
                  <input 
                    id="id"
                    name="id"
                    value={movimento.idViatura}
                    placeholder="Placa"
                  />
                  <input 
                    id="pelotao"
                    name="pelotao"
                    value={nomeViatura}
                    disabled
                    placeholder={nomeViatura}
                  />
                </div>
                <p>Chefe de Viatura</p>
                <div className="inputNomes">
                  <input 
                    id="id"
                    name="id"
                    value={movimento.idChefeViatura}
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
              </div>
              <div className="nomes">
                <p>Motorista Principal</p>
                <div className="inputNomes">
                  <input 
                    id="id"
                    name="id"
                    value={movimento.idMotoristaP}
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
                <div className="inputNomes">
                  <input 
                    id="id"
                    name="id"
                    value={movimento.idMotoristaA}
                    placeholder="Identidade"
                  />
                  <input 
                    id="id"
                    name="id"
                    value={nomeMotoristaA}
                    placeholder="Nome"
                  />
                </div>
              </div>
            </div>
            <div className="tituloDados">
              <p>Dados de Saída</p>
              <p>Dados de Chegada</p>
            </div>
            <div className="dados">
              <div className="dadosSaida">
                <div className="dadosS">
                  <InputMask 
                    disabled
                    mask="9999/99/99"
                    id="dataSaida"
                    name="dataSaida"
                    value={movimento.dataS}
                    onChange={e => {
                      setDia(e.target.value);
                      let res = e.target.value.split("/");
                      setDataS(res[2]+"-"+res[1]+"-"+res[0]);
                      }
                    }
                    placeholder="Data"
                  />
                  <InputMask 
                    disabled
                    mask="99:99:99"
                    id="hora"
                    name="hora"
                    value={movimento.dataS}
                    onChange={e => setHora(e.target.value)}
                    placeholder="Hora"
                  />
                </div>
                <div className="dadosS">
                  <input 
                    disabled
                    id="odometro"
                    name="odometro"
                    value={movimento.odometroS}
                    onChange={e => setOdometroS(e.target.value)}
                    placeholder="Odometro"
                    />
                    <select 
                      value={movimento.qtdCombustivelS} 
                      onChange={e => 
                                setQtdCombustivelS(e.target.value)}
                      disabled
                    >
                      <option disabled value="">Combustível</option>
                      <option value="Pleno">Pleno</option>
                      <option value="Meio Tanque">Meio Tanque</option>
                      <option value="Cheio">Cheio</option>
                    </select>
                  </div>
                <div className="destino">
                  <input 
                    disabled
                    id="destino"
                    name="destino"
                    value={movimento.destino}
                    onChange={e => setDestino(e.target.value)}
                    placeholder="Destino"
                  />
                </div>
              </div>
              <div className="dadosChegada">
                <div className="dadosC">
                  <InputMask 
                    mask="9999/99/99"
                    id="dataChegada"
                    name="dataChegada"
                    value={dia}
                    disabled
                    placeholder="Data"
                  />
                  <InputMask 
                    mask="99:99:99"
                    id="hora"
                    name="hora"
                    value={hora}
                    disabled
                    placeholder="Hora"
                  />
                </div>
                <div className="dadosC">
                  <input 
                      id="odometro"
                      name="odometro"
                      value={odometroC}
                      onChange={e => setOdometroC(e.target.value)}
                      placeholder="Odometro"
                    />
                    <select value={qtdCombustivelC} onChange={e => setQtdCombustivelC(e.target.value)}>
                      <option disabled value="">Combustível</option>
                      <option value="Pleno">Pleno</option>
                      <option value="Meio Tanque">Meio Tanque</option>
                      <option value="Cheio">Cheio</option>
                    </select>
                  </div>              
              </div>
          </div>
          </div>
        <div className="btnDetail">
          <button className="finalizarMovimentacao" type="submit">Finalizar Movimento</button>
          <button className="limparMovimentacao"><span>Editar</span></button>
        </div>
      </form>
    </div>
  )
}
export default Detail;
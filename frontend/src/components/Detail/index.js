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
      e.preventDefault();
      await api.post('/cadastrar-movimento', {
        dataS:detail.dataS,
        dataC,
        odometroC,
        qtdCombustivelC,
        aberto:false
      });
      await api.post('/atualizar-militar',{
        idMilitar: detail.idChefeViatura,
        disponivel:"green"
      });
      await api.post('/atualizar-militar',{
        idMilitar: detail.idMotoristaP,
        disponivel:"green"
      });
      await api.post('/atualizar-militar',{
        idMilitar: detail.idMotoristaA,
        disponivel:"green"
      });
      await api.post('/atualizar-viatura',{
        idViatura: detail.idViatura,
        disponivel:"green"
      });
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
      alert("Movimentação Finalizada com Sucesso!");
      document.location.reload(true);
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
    async function exluirMovimento(){
      if(window.confirm("Tem certeza que deseja excluir essa movimentação? Essa operação não poderá ser desfeita!")){
        await api.delete(`/deletar-movimento?_id=${movimento._id}`);
        alert("Movimento excluído!");
        await api.post('/atualizar-militar',{
          idMilitar: detail.idChefeViatura,
          disponivel:"green"
        });
        await api.post('/atualizar-militar',{
          idMilitar: detail.idMotoristaP,
          disponivel:"green"
        });
        await api.post('/atualizar-militar',{
          idMilitar: detail.idMotoristaA,
          disponivel:"green"
        });
        await api.post('/atualizar-viatura',{
          idViatura: detail.idViatura,
          disponivel:"green"
        });
        window.location.reload();
      }else{
        alert("Operação cancelada!");
      }
    }
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
                    disabled
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
                <div className="destino">
                  <textarea 
                    id="obs"
                    name="obs"
                    value={movimento.obs}
                    onChange={e => setDestino(e.target.value)}
                    placeholder="Observações"
                  />
                </div>         
              </div>
          </div>
          </div>
        <div className="btnDetail">
          <button className="finalizarMovimentacao" type="submit">Finalizar Movimento</button>
          <button className="limparMovimentacao" type="button" onClick={exluirMovimento}><span>Excluir</span></button>
        </div>
      </form>
    </div>
  )
}
export default Detail;
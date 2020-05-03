import React, {useState, useEffect} from 'react';
import { FaSave} from 'react-icons/fa';
import api from '../../services/api';
import InputMask from 'react-input-mask';
import './form.css';

function Form({showForm}){

    const [detail, setDetail] = useState([]);

    const [dia, setDia] = useState(''); 
    const [hora, setHora] = useState('');
    const [dataS, setDataS] = useState('');
    
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
      async function carregaData(){   
        var today = new Date(); 
        var date = today.getFullYear()+'-'+("0"+(today.getMonth()+1)).slice(-2)+'-'+("0"+(today.getDate())).slice(-2);
        var time = ("0" + today.getHours()).slice(-2) + ":" + ("0"+today.getMinutes()).slice(-2) + ":" + ("0"+today.getSeconds()).slice(-2);
        setDia(date);
        setHora(time);
        setDataS(date+"T"+time+".000Z");
      }
      carregaData();
    }, [showForm]);
    
    useEffect(() => {
      async function limparForm(){   ''
        setOdometroS('');
        setnomeViatura('Viatura');
        setIdMotoristaP('');
        setnomeMotoristaP('Militar');
        setIdMotoristaA('');
        setnomeMotoristaA('Militar');
        setidChefeViatura('');
        setnomeChefeViatura('Militar');
        setDestino('');
        setQtdCombustivelS('');
        setIdViatura('');
      }
      limparForm();
    }, [showForm]);

    //Função para Cadastrar/Atualizar Movimento - OK
    async function addMovimento(e){
      e.preventDefault();
      await api.post('/cadastrar-movimento', {
        dataS,
        odometroS,
        idChefeViatura,
        idMotoristaP,
        idMotoristaA,
        idUsuario:localStorage.getItem('id'),
        idViatura,
        destino,
        qtdCombustivelS,
        aberto:true
      });
      alert("cadastrar mov")
      await api.post('/atualizar-militar',{
        idMilitar: 3420906,
        disponivel:"red"
      });
      alert("chefe")
      await api.post('/atualizar-militar',{
        idMilitar: 55555,
        disponivel:"red"
      });
      alert("motoristaP")
      await api.post('/atualizar-militar',{
        idMilitar: 3420906,
        disponivel:"red"
      });
      alert("motoristaA")
      await api.post('/atualizar-viatura',{
        idViatura,
        disponivel:"red"
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

return (
    
  <div className="mainForm">
  <form onSubmit={addMovimento}>   
      <h3>NOVA MOVIMENTAÇÃO</h3>
      <div className="inputGroup3">
        <InputMask 
          mask="9999/99/99"
          id="dataNascimento"
          disabled
          name="dataNascimento"
          value={dia}
          onChange={e => {
            setDia(e.target.value);
            let res = e.target.value.split("/");
            setDataS(res[2]+"-"+res[1]+"-"+res[0]);
            }
          }
          placeholder="Data"
        />
        <InputMask 
          mask="99:99:99"
          id="hora"
          name="hora"
          disabled
          value={hora}
          onChange={e => setHora(e.target.value)}
          placeholder="Hora"
        />
        <input 
          id="odometro"
          name="odometro"
          value={odometroS}
          onChange={e => setOdometroS(e.target.value)}
          placeholder="Odometro"
        />
      </div>
      <div className="inputGroup4">
        <input 
          id="destino"
          name="destino"
          value={destino}
          onChange={e => setDestino(e.target.value)}
          placeholder="Destino"
        />
        <select value={qtdCombustivelS} onChange={e => setQtdCombustivelS(e.target.value)}>
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
          value={idViatura}
          onChange={async e => {
            setIdViatura(e.target.value);
            try {
              const response = await api.get(`/pesquisar-viatura?idViatura=${e.target.value}`);
              setnomeViatura(response.data.nome);
            } catch (error) {
              setnomeViatura('Viatura Incorreta');
            }
            }
          }
          placeholder="Placa"
        />
        <input 
          id="pelotao"
          name="pelotao"
          value={nomeViatura}
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
        <button id="novaMovimentacao" type="submit">Salvar</button>
      </div>
    </form>
    </div>
)
}
export default Form;
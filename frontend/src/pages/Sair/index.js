import React from 'react';
import './sair.css';
import { useHistory } from 'react-router-dom';

function Sair() {
  
  const history = useHistory();

  async function sair(){
    localStorage.clear();
    window.location.href = '/login'
  }   
  async function cancelar(){
    history.push('/main');
  }  

  //O que mostra na tela do navegador  
  return (
    <div id="mainContainer">
          <button id="btnPrincipal" type="submit" onClick={sair}>SAIR</button>
          <button id="btnCancelar" onClick={cancelar}>CANCELAR</button>
    </div>
  );
}

export default Sair;
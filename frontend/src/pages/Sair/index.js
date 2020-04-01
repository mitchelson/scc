import React from 'react';
import './sair.css';
import { useHistory } from 'react-router-dom';

function Sair() {
  
  const history = useHistory();

  async function sair(){
    localStorage.setItem('auth', false);
    history.push('/');
  }   
  async function cancelar(){
    history.push('/');
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
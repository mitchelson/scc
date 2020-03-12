import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & h1{
    color:#000;
  }
`;
export const Box = styled.div`
  display: grid;
  width: 95%;
  height:400px;
  background:#ddd; 
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  padding:30px;
  gap:30px;
`;
export const Formulario = styled.div` /* Tela de Cadastro/Edição de Registro de Militar */
  width:100%;
  height:100%;
  color: #ff0;
  background:#aaa;
`;
export const Registros = styled.div` /* Tela de Listagem de Registro de Militar */
  width:100%;
  height:100%;
  color: #f00;
  background:#aaa;
`;
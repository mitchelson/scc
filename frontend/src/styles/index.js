import styled, { createGlobalStyle } from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 1100px;
  height: 550px;
  margin: auto;
  margin-top:30px;
  background:#fff;
  border-radius:8px;
  box-shadow:6px 6px 6px 3px rgba(0, 0, 0, 0.4);
`;

export default createGlobalStyle`
  * {
      margin:10px;
      padding: 0;
      box-sizing: border-box;
      outline: 0;
    }
    html, body,
    #root {
      
    }
    body {
      text-rendering: optimizeLegibility !important;
      font-family: sans-serif;
      -webkit-font-smoothing: antialiased;
    }
`;
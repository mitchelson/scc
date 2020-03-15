import styled, { createGlobalStyle } from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 600px;
  align-content:center;
  align-items:center;
  background:#fff;
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
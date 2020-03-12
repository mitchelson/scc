import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  color: #fff;
  float:right;
`;
export const Table = styled.table`
  float:right;
  color:red;
  width:100%;
  height:400px;
  background:white;
  & tr{
    color:black;
    background:blue;
    position:absolute;
    min-height:20px;
    max-height:40px;
  }
  & td{
    color:black;
    background:yellow;
    min-height:20px;
    max-height:40px;
  }
`;

export const Box = styled.div`
  display: flex;
  width: 95%;
  height:400px;
  background:#111; 
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
import React from 'react';

import { Container, Title, Box, Painel, Formulario, Registros } from './styles';

function Militar() {
  return (
    <Container>
      <h1>Militar</h1>
      <Box>
        <Formulario>Formulario</Formulario>
        <Registros>Registros</Registros>
      </Box>
    </Container>
  );
}

export default Militar;
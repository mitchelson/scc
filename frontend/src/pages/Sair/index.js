import React from 'react';

import { Container, Title, Box } from './styles';

function Sair() {
  return (
    <Container>
      <Title>Sair</Title>
      <Box>
        <Text>Você tem certeza que deseja sair?</Text>
        <button>Sair</button><button>Cancelar</button>
      </Box>
    </Container>
  );
}

export default Sair;
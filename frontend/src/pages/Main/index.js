import React from 'react';

import { Container, Title, Table, Box } from './styles';

function Main() {
  return (
    <Container>
      <Title>Tela Principal</Title>
      <Box>
        <Table>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
        </Table>
      </Box>
    </Container>
  );
}

export default Main;
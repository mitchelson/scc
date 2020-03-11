import React from 'react';

import { Container, SidebarLink, Logout } from './styles';

function Sidebar() {
  return (
    <Container>
      <SidebarLink to="/inicio">Início</SidebarLink>
      <SidebarLink to="/militar">Militar</SidebarLink>
      <SidebarLink to="/viaturas">Viaturas</SidebarLink>
      <SidebarLink to="/relatorios">Relatórios</SidebarLink>
      <Logout to="/sair">Sair</Logout>
    </Container>
  );
}
//<SidebarLink to="/sair">Sair</SidebarLink>
export default Sidebar;
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.aside`
  display: flex;
  align-items: center;
  width: 200px;
  height: 500px;
  flex-direction: column;
  display:flex;
  justify-content: space-around;
  vertical-align: middle;
  margin:20px;
`;

export const SidebarLink = styled(NavLink)`
  width: 200px;
  height:70px;
  text-align: center;
  text-decoration: none;
  color: #000;
  font-size:20px;
  font-weight:bold;
  background:#fff;
  border-radius:6px;
  padding:25px;
  &:hover {
    color: #dcdcdc;
    transition-duration:300ms;
    border:2px solid;
    border-color:green;
  }
`;
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
  margin-left:20px;
`;

export const SidebarLink = styled(NavLink)`
  width: 150px;
  height:70px;
  text-align: center;
  text-decoration: none;
  color: #383838;
  font-size:20px;
  font-weight:bold;
  background:#dbdbdb;
  
  padding:25px;
  transition-duration:300ms;
  &:hover {
    color: #fff;
    transition-duration:300ms;
    background:#2b2b2b;
  };
  &:focus{
    background:#000;
    color:#fff;
  }
`;
export const Logout = styled(NavLink)`
  width: 150px;
  height:70px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  font-size:20px;
  font-weight:bold;
  background:#ff7373;
  
  padding:25px;
  transition-duration:300ms;
  &:hover {
    color: #fff;
    transition-duration:300ms;
    background:#2b2b2b;
  }
`;
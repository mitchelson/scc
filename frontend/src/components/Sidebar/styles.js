import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.aside`
  display: flex;
  align-items: center;
  width: 200px;
  height: 500px;
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
  vertical-align: middle;
  margin-left: 0px;
  margin-top: 30px;
`;

export const SidebarLink = styled(NavLink)`
  width: 150px;
  height: 70px;
  text-align: center;
  text-decoration: none;
  color: #383838;
  font-size: 20px;
  margin-left: -10px;
  border-radius: 0 8px 8px 0;
  font-weight: bold;
  background-image: linear-gradient(to bottom right, #dcdcdc, #cccc);
  border-bottom: 2px solid #a6a6a6;
  border-top: 2px solid #a6a6a6;
  border-right: 2px solid #a6a6a6;
  padding: 25px;
  transition: 0.5s;
  &:hover {
    color: #fff;
    background: #00ad10;
  }
  &:focus {
    background: green;
    color: #fff;
  }
`;
export const Logout = styled(NavLink)`
  width: 150px;
  height: 70px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  margin-left: -10px;
  border-radius: 0 8px 8px 0;
  font-size: 20px;
  font-weight: bold;
  background: #ff7373;

  padding: 25px;
  transition-duration: 300ms;
  &:hover {
    color: #fff;
    transition-duration: 300ms;
    background: #2b2b2b;
  }
`;

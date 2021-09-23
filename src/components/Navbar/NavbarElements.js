import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #11569c;
    height: 85px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
    @media screen and (max-width: 768px) {
      justify-content: center;
      
    }

`;
export const NavLogo = styled(Link)`
  cursor: pointer;
  color: #fff;
  font-size: 2rem;
  text-decoration: none;

`;

export const NavLink = styled(Link)`
color: #ffffff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
  color:#ffffff;
}
&:hover {
  color: white;
}
@media screen and (max-width: 768px) {
  color: #ffffff;
  padding-top: 10px;
  padding-bottom:16px;
  padding-right:22px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    margin-top:0px;
    position:absolute;
    margin-left:4%;
    right:11px;
    z-index: 12;
    background:#11569c;
    overflow: hidden;
    position: relative;
    display: none; 
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: block;
    margin-bottom: 2px;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
  @media screen and (max-width: 768px) {
    color: white;
    padding: 10px 16px;
    text-decoration: none;
    font-size: 17px;
    display: block;
  }
`;
import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";
import { useHistory } from "react-router-dom";
import Breadcrumbs from './Breadcrumbs';


const Navbar = () => {
    let history = useHistory();
    function logout(){

      localStorage.clear();
      localStorage.setItem('page','logout');
      history.push('/signin');
      window.location.reload();
    } 
    function myFunction() {
        var x = document.getElementsByClassName("myLinks")[0];
        var y = document.getElementsByClassName("breadcrumb-div")[0];
        if (x.style.display === "block") {
          x.style.display = "none";
          y.style.display = "block";
        } else {
          x.style.display = "block";
          y.style.display = "none";
        }
      }
    return (
        <React.Fragment>
           <Nav className="navmenu" style={{'padding':'0px','height':'auto'}} >
            
{ localStorage.getItem('user-info') ? <React.Fragment>{
  <Breadcrumbs className="bread" style={{'justifyContent':'flex-start'}}/>
  } </React.Fragment> : <React.Fragment></React.Fragment>}
            <Bars onClick={myFunction} />
            
            <NavMenu className="myLinks">
                {
                    localStorage.getItem('user-info') ?
                    <React.Fragment >
                    <NavLink to="/dashboard" >
                        Dashboard
                    </NavLink>
                    </React.Fragment> :
                    <React.Fragment>
                    </React.Fragment>
                }
                {/* <NavLink to="/about" activeStyle>
                    About
                </NavLink> */}
                {
                    localStorage.getItem('user-info') ?
                    <React.Fragment >
                    <NavLink to="" onClick={logout} style={{'paddingRight':'30px'}} >
                    Log Out
                </NavLink>
                    </React.Fragment>
                    :
                    <React.Fragment >
                <NavLink to="/signin" activeStyle >
                    Sign In
                </NavLink>
                <NavBtn>
                    <NavBtnLink to="/sign-up" style={{'paddingRight':'30px'}}>Sign Up</NavBtnLink>                
                </NavBtn></React.Fragment>}
            </NavMenu> 
           </Nav> 
        </React.Fragment>
    );
};
export default Navbar;
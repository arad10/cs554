import React, { useContext }from 'react'
import { NavLink } from "react-router-dom";
import logo from "../images/janch_logo.png"
import { AuthContext } from '../firebase/Auth'; 
import SignOutButton from './SignOut'; 
import '../App.scss'; 


const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>{currentUser ? <NavbarAuth /> : <NavbarNonAuth />}</div>;
};

const NavbarAuth = ()  => {
  return (
    <nav className="navigation">
      <div className="nav-logo">
        <NavLink to = "/">
          <img src={logo} alt="logo" className="logo"></img>
        </NavLink>
      </div>

      <ul className="nav-links">
          <li>
          <NavLink exact to="/" activeClassName="active">
            Landing
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/home" activeClassName="active">
            Home
          </NavLink>
        </li>
        {/* commented out dashboard since it will be accessed through clicking on projects */}
        {/* <li>
          <NavLink exact to="/dashboard" activeClassName="active">
            Dashboard
          </NavLink>
        </li> */}
        <li>
          <NavLink exact to="/videochat" activeClassName="active">
            Video Chat
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/account" activeClassName="active">
            Account
          </NavLink>
        </li>
        <li>
          <SignOutButton />
        </li>


      </ul>
    </nav>
  ); 
}

const NavbarNonAuth = () => {
  return (
    <nav className="navigation">
      <div className="nav-logo">
        <NavLink to = "/">
          <img src={logo} alt="logo" className="logo"></img>
        </NavLink>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink exact to="/" activeClassName="active">
            Landing
          </NavLink>
        </li>

        <li>
          <NavLink exact to="/signup" activeClassName="active">
            Sign up
          </NavLink>
        </li>

        <li>
          <NavLink exact to="/signin" activeClassName="active">
            Sign In
          </NavLink>
        </li>


      </ul>
    </nav>

  ); 
}; 

export default Navbar; 
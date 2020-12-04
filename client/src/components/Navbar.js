import React from 'react'
import { Link } from "react-router-dom";
import logo from "../images/janch_logo.png"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-center">
      <Link to = "/"> <img src={logo} alt="logo" className="logo" /></Link>
        <ul className="nav-links">   
          {/* <li> <Link to = "/">Home</Link></li> */}
          <li> <Link to = "/login">Logout</Link></li>
        </ul>
      </div>
    </nav>
  )
}

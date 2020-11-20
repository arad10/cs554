import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Navbar from "./Navbar"
import Chat from "./Chat"
export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>hi from homepage</h1>
      <ul>
        <Link to = "/dashboard"><li>dashboard</li></Link>
        <li><Link to = "/chat"><li>Chat</li></Link></li>
      </ul>
    </div>
  )
}

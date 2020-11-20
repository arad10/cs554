import React from 'react'
import Navbar from "./Navbar"
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <h1>hi from dashboard</h1>
      <Link to = "/chat">Chat</Link>
    </div>
  )
}

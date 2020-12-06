import React from 'react'; 
import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
      <div>
        <h1>hi from dashboard</h1>
        <Link to = "/chat">Chat</Link>
      </div>
    )
  }
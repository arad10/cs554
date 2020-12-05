import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Navbar from "../Navbar"
import MyProfile from "./MyProfile"

export default function Home() {
  return (
    <div>
      <Navbar />
      <MyProfile />
      <ul>
        <Link to = "/dashboard"><li>dashboard</li></Link>
        <li><Link to = "/chat"><li>Chat</li></Link></li>
      </ul>
    </div>
  )
}

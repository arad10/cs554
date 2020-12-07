<<<<<<< HEAD:client/src/components/Home/Home.js
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
        <li><Link to = "/videochat"><li>Video Chat</li></Link></li>
      </ul>
    </div>
  )
}
=======
import React from 'react';

import '../App.scss';

function Home() {
  return (
    <div>
      <h2>This is the Home page</h2>
    </div>
  );
}

export default Home;
>>>>>>> main:client/src/components/Home.js

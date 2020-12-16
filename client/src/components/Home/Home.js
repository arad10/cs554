import React, { useState, useEffect } from 'react'
import MyProfile from "./MyProfile"
import AllProjects from "./AllProjects"
import './Home.scss';
import NewDashboard from "./NewDashboard"
import firebase from "firebase/app"

export default function Home() {
  const currentUser = firebase.auth().currentUser
  const [showMyProject, setMyProject] = useState(true)
  const [showAllProject, setAllProject] = useState(false)

  const handleAllProjects = () =>{
    setMyProject(false);
    setAllProject(true);
  }
  const handleMyProjects = () =>{
    setAllProject(false);
    setMyProject(true);
  }
  if(showMyProject===true){
    return (
      <div>
        <ul className = "project-links">
          <li><button className = "projects" onClick={() => {handleMyProjects()
          }}>My Projects</button></li>
          <li><button className = "projects" onClick={() => {handleAllProjects()
          }}>All Projects</button></li>
          <li><NewDashboard/></li>
        </ul>
        <MyProfile />
      </div>
  )
} else{
  return (
      <div>
        <ul className = "project-links">
          <li><button className = "projects" onClick={() => {handleMyProjects()
          }}>My Projects</button></li>
          <li><button  className = "projects" onClick={() => {handleAllProjects()
          }}>All Projects</button></li>
          <li><NewDashboard/></li>

        </ul>
        <AllProjects />
      </div>
  )
}
}
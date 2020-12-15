import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import firebase from "firebase/app"
import axios from "axios";

//dummy data for now

const profileInfo = {
    id: 1,
    username: "jessvalenzuela",
    dashboards: [1, 2, 3]
  }
const dashboards = [
  {
    id:1,
    dashboardName: "Dashboard 1",
  },
  {
    id:2,
    dashboardName: "Dashboard 2"
  },
  {
    id:3,
    dashboardName: "Dashboard 3"
  },
    {
    id:4,
    dashboardName: "Dashboard 4"
  }
]

const MyProfile = () => {
  const currentUser = firebase.auth().currentUser
  const [myProject, setMyProject] = useState([])
  const [userData, setUserData] = useState({})
  const allProject = []
  //set user data
  useEffect(()=>{
    axios(`/user/${currentUser.uid}`).then(res=>{
        const data=res.data;
        console.log(data)
        setUserData(data)
      })
  },[])

  //for each dashboard in userData.dashboards make and push to  all Project
  useEffect(()=>{
    if(userData.dashboards){
    const dashboardIDs= Object.values(userData.dashboards)
    dashboardIDs.forEach(dashboard =>{
    axios(`/dashboard/${dashboard}`).then(res=>{
      const data = res.data;
      setMyProject(oldArray=>[...oldArray, data])

    })
    })
    }
  }, [userData])
  console.log(myProject)

  const projects = myProject.map(project=>{
    return(
            <li>
              <h2 className= "pname">{project.name}</h2>
              <p>{project.description}</p>
              <Link to = {`dashboard/${project._id}`} className="link">
                <button className="join">View</button>
              </Link>
              <button className="join">Join</button>
              </li>
          )})
  

  return (
    <Wrapper>
      <div className="profile">
      <div className = "info">
        <h1 className = "myProject">My Projects</h1>
        <h2 className = "username">{currentUser.email}</h2>  
        </div>
        <ul>
          {projects}
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
 .profile {
    background: rgb(216, 238, 235);
    width: 60%;
    border-radius: 10px;
    margin: auto;
    padding-bottom: 2%;
    margin-bottom: 2%;


  }
  .info{
    margin: 3%
  }
  .myProject{
    padding-top: 2.5%;
    font-size: 32px;
    color: black;
    font-weight: bolder;

  }
  .username{
    font-size:20px;
    font-weight: lighter;
    text-align: left;

  }
  ul{
    width:95%;
    margin:2%;
    border-radius: 5px;

  }

  li{
    list-style: none;
    border-radius: 25px;
    border: 2px solid black;
    background: lightgray;
    padding: 20px;
    width: 90%;
    height: 100px;  
    margin: 2%;

      }
  .link{
    text-decoration: none;
    color: black;
    }
    .pname{
      font-size: 14px;
      text-align: left;
      font-weight: bold;
      margin:0px;
    }
    .join{
      height:25px;
      font-size:12px;
      margin-right: 2px;
    }
    p{
      font-size: 12px;
      margin:0px;
    }
`;
export default MyProfile;

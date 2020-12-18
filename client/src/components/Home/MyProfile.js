import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import firebase from "firebase/app"
import axios from "axios";

const MyProfile = () => {
  const currentUser = firebase.auth().currentUser
  const [myProject, setMyProject] = useState([])
  const [userData, setUserData] = useState({})
  //set user data
  useEffect(()=>{
    async function fetchData(){
      try{
          const { data } = await axios.get(`/user/${currentUser.uid}`).catch(error => console.log(error));
          setUserData(data)
      } catch(e){
        alert("Oops something went wrong. Couldn't find that user...")
        console.log(e)
      }
    }
    fetchData();
  },[])

  //for each dashboard in userData.dashboards 
  useEffect(()=>{
    async function dashboardData(){
      console.log(Array.isArray(userData.dashboards))
        try{
            if(userData !== {}){
              const dashboardIDs= userData.dashboards
              if(dashboardIDs !== undefined){
                for(const dashboard of dashboardIDs){
                  const { data } = await axios(`/dashboard/${dashboard}`).catch(error => console.log(error));
                  setMyProject(oldArray=>[...oldArray, data])
                }
              } else{
                console.log("Loading Projects...")
              }
            } else{
                alert("Looking for user")
            }
        }catch(e){
          console.log(e)
        }
    }
    dashboardData();

  }, [userData])

  const projects = myProject.map(project=>{
    return(
            <li>
              <div className = "proj-name">
              <h2 className= "pname">{project.name}</h2>
              <p>{project.description}</p>
              </div>
              <div className = "proj-button">
              <Link to = {`/dashboard/${project._id}`} className="link">
                <button className="join">View</button>
              </Link>
              </div>
              </li>
          )})
  

  return (
    <Wrapper>
      <div className="profile">
      <div className = "info">
        <h1 className = "myProject">My Projects</h1>
        <p className="username">{currentUser.email}</p>
        </div>
        <ul>
          {projects}
        </ul>
      </div>
    </Wrapper>
  )
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
    text-align: center;

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
    height: 90px;  
    margin: 2%;
    color: black;
    margin-left:5%;

      }
  .link{
    text-decoration: none;
    color: black;
    }
    .pname{
      font-size: 16px;
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
      font-size: 13px;
      margin:0px;
    }
    .proj-button{
      float: right;
    }
    .proj-name{
      float: left;
    }
`;
export default MyProfile;

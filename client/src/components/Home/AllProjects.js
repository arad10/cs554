import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios"
import firebase from "firebase/app"


const AllProjects = () => {
  const currentUser = firebase.auth().currentUser
  const [proj, setProj] = useState([]);
  useEffect(() => {
    async function dashboardData(){ 
      try{
          axios('/dashboard')
          .then(res => {
          const data = res.data;
          setProj(data);
          })
          .catch(error => {
            console.log(error)
            alert("Oops something went wrong. Could not load all projects...")
          })
      } catch(e){
        console.log(e)
        alert("Oops something went wrong. Could not load all projects...")
      }
    }
  dashboardData();
  }, [])

function handleOnClick(projID){
        alert("Joining project...")
  try{
    const addDashboard = {
          dashboards: projID.toString()
        };
      axios.patch(`/user/${currentUser.uid}`, addDashboard)
            .then(res => console.log(res))
            .catch(error=>{
              console.log(error)
              alert("Oops! Something went wrong with joining this project...Are you a part of this project already?")
            })
    } catch(e){
      console.log(e)
    }
}



  const projects = proj.map(project=>{
    console.log(project.users)
    if(project.users.includes(currentUser.uid)){
          return(
            <li>
              <div className = "proj-name">
              <h2 className= "pname">{project.name}</h2>
              <p>{project.description}</p>
              </div>
              <div className = "proj-button">

              <Link to = {`dashboards/${project._id}`} className="link">
                <button className="join">View</button>
              </Link>
              </div>
              </li>
          )
    } else{
      return(
        <li>
              <div className = "proj-name">
              <h2 className= "pname">{project.name}</h2>
              <p>{project.description}</p>
              </div>
              <div className = "proj-button">
              <button className="join" onClick={() => {handleOnClick(project._id)
              }}>Join</button>
              </div>
              </li>
      )
    }
})
  return (
    <Wrapper>
      <div className="profile">
      <div className = "info">
        <h1 className = "allProject">All Projects</h1> 
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
  .allProject{
    padding-top: 2.5%;
    font-size: 32px;
    color: black;
    font-weight: bolder;

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
    margin-left:5%;
    color: black;


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
export default AllProjects;

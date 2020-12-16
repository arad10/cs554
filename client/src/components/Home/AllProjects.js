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
        // console.log(res)
        setProj(data);
        })
        .catch(error => console.log(error));
      } catch(e){
        console.log(e)
      }
    }
  dashboardData();
  }, [])

function handleOnClick(projID){
  const addDashboard = {
        dashboards: projID.toString()
      };
      console.log(currentUser.uid)
      console.log(addDashboard)
    axios.patch(`http://localhost:4000/user/${currentUser.uid}`, addDashboard)
          .then(res => console.log(res))
          .catch(error=>console.log(error))
}



  const projects = proj.map(project=>{
            return(
            <li>
              <h2 className= "pname">{project.name}</h2>
              <p>{project.description}</p>
              <Link to = {`dashboard/${project._id}`} className="link">
                <button className="join">View</button>
              </Link>
              <button className="join" onClick={() => {handleOnClick(project._id)
              }}>Join</button>
              </li>
          )})
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
export default AllProjects;

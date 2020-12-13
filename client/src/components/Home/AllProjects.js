import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios"


const AllProjects = () => {
  const [proj, setProj] = useState([]);
  useEffect(() => {
    axios('/dashboard').then(res => {
    const data = res.data;
    console.log(res)
    setProj(data);
  });
  }, [])


  const projects = proj.map(project=>{
            return(
          <Link to = {`dashboard/${project.id}`} className="link"><li>{project.name}</li></Link>
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
    height: 60px;  
    margin: 2%;

      }
  .link{
    text-decoration: none;
    color: black;

    }
`;
export default AllProjects;

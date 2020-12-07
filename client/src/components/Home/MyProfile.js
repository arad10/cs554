import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  // for each project id in id array, should get the projects by id and display name. when click on name brings to dashboard (when backend is built).
  const projects = dashboards.map(project=>{
            return(
          <Link to = {`dashboard/${project.id}`} className="link"><li>{project.dashboardName}</li></Link>
          )})
  return (
    <Wrapper>
      <div className="profile">
      <div className = "info">
        <h1 className = "myProject">My Projects</h1>
        <h2 className = "username">@{profileInfo.username}</h2>  
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
    width: 50%;
    border-radius: 10px;
    margin: auto;
    padding-bottom: 2%;


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
    font-weight: lighter;
    text-align: left;
    color: black;
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
export default MyProfile;

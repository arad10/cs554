import React from 'react'; 
import { Link } from "react-router-dom";
import Chat from "./Chat";

export default function Dashboard() {
    return (
      <div>
        <h1>hi from dashboard</h1>
        <Chat dashID={"5e4c7fd9bd5d563d547848aa"} chatHistory={[{username: "Conner", msg: "Hi"}, {username: "John", msg: "Good Morning"}]} username={"Conner"}></Chat> {/*Pass in dash id and chatHist and username*/}
      </div>
      // props is the answer!!!!!!!!
    )
  }
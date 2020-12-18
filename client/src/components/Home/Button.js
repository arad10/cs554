import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Link } from "react-router-dom";
import firebase from "firebase/app"


export default function Button(props) { 
  const currentUser = firebase.auth().currentUser
  const [dUsers, setdUsers] = useState([])
  const [showView, setShowView] = useState(false)

function handleOnClick(projID){
        alert("Joining project...")
  try{
    const addDashboard = {
          dashboards: projID.toString()
        };
      setShowView(true)
      localStorage.setItem('setShow', showView )
      console.log(showView)
      axios.patch(`/user/${currentUser.uid}`, addDashboard)
            .then(res => console.log(res))
            .catch(error=>{
              console.log(error)
              alert("Oops! Something went wrong with joining this project...Are you a part of this project already?")
            })
      //get dashboard to check user array includes current users id
      // axios(`/dashboard/${projID}`)
      //     .then(res => {
      //       const data = res.data;
      //       setdUsers(data.users));
      //     })
      //     .catch(error => {
      //       console.log(error)
      //       alert("Oops something went wrong.")
      //     })
    } catch(e){
      console.log(e)
    }
  
}
// console.log(dUsers)
// console.log(dUsers.includes(currentUser.uid))
if(localStorage.getItem('setShow')===true){
  return (
    <div>
        <Link to = {`dashboard/${props.project._id}`} className="link">
              <button className="join">View</button>
        </Link> 
    </div>
  )
} else{
  return(
    <div>
      <button className="join" onClick={() => {handleOnClick(props.project._id)}}>
        Join
        </button>
    </div>
  )
  }
}

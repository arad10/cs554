import SignOutButton from './SignOut';
import React, { useState } from 'react'
import firebase from "firebase/app"
import '../App.scss';
import ChangePassword from './ChangePassword';
import styled from "styled-components";

function Account() {
  const [showChangePassword, setChangePassword] = useState(false)
  const currentUser = firebase.auth().currentUser
  console.log(currentUser)
  const handleShowChangePassword = () =>{
    setChangePassword(true);
  }
  const handleShowAccountPage = () => {
    setChangePassword(false);
  }
  if(showChangePassword===true){
      return (
    <Wrapper>
    <div className = "account">
      <ChangePassword />
      <button onClick = {()=>{handleShowAccountPage()}}>Back to account info</button>
    </div>
    </Wrapper>

  );
  }
  else{
    return(
      <Wrapper>
      <div className = "account">
        <h1>Account Info</h1>
        <ul>
          <li>Name: {currentUser.displayName}</li>
          <li>Username: {currentUser.email}</li>
        </ul>
        <button onClick = {()=>{handleShowChangePassword()}}>Change Password</button>
      </div>
      </Wrapper>
    )
  }
}
const Wrapper = styled.article`
  .account{
    text-align:center;
    }
`;

export default Account;
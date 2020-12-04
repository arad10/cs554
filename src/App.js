import './App.scss';
import firebase from "firebase"; 
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"; 
import Home from "./components/Home"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Chat from "./components/Chat"
import React, { Component } from 'react';


import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";


// function App() {
//   return (
//     <Router>
//       <Switch >
//       <Route exact path = "/" component = {Home}></Route>
//       <Route exact path = "/login" component = {Login}></Route>
//       <Route exact path = "/dashboard" component = {Dashboard}></Route>
//           <Route exact path = "/chat" component = {Chat}></Route>
//       </Switch>
//       </Router>
//   );
// }
firebase.initializeApp({
  apiKey: "AIzaSyAhARuwzHzD4Unv-r1-Y5zsUV6jeKYGNEM",
  authDomain: "janch-130d6.firebaseapp.com"
})

class App extends Component {
  state = {isSignedIn: false}
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => { 
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn:!!user})
    })
  }

  render() {
    return (
        <div className="App">
          {this.state.isSignedIn ? (
            <Router>
            <span>  
            <button onClick={() => firebase.auth().signOut()}>Logout</button>
            <p>Hello there</p>
            </span>
            </Router>
          ) : ( 
            <StyledFirebaseAuth
              uiConfig = {this.uiConfig}
              firebaseAuth = {firebase.auth()}
              />
          )}
        </div>
    )
  }
}


export default App;

import React from 'react'; 
import './App.scss';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import Account from './components/Account'; 
import Home from './components/Home/Home'; 
import Landing from './components/Landing'; 
import Navbar from './components/Navbar'; 
import Dashboard from './components/Dashboard'; 
import Chat from './components/Chat'; 
import SignIn from './components/SignIn'; 
import SignUp from './components/SignUp'; 
import VideoChat from './components/VideoChat'; 
import NewUserStoryFrom from './components/NewUserStoryForm';
import { AuthProvider } from './firebase/Auth'; 
import PrivateRoute from './components/PrivateRoute'; 
import Axios from "axios";

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
      </div>
      <Route exact path="/" component={Landing} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute exact path="/dashboard/:id" component={Dashboard} />
      <PrivateRoute path="/account" component={Account} />     
      <PrivateRoute path="/chat" component={Chat} />
      <PrivateRoute path="/videochat/:id" component={VideoChat} />
      <PrivateRoute exact path="/dashboard/:id/newuserstory" component={NewUserStoryFrom} />

      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </Router>    
    </AuthProvider>
  ); 
}

export default App; 
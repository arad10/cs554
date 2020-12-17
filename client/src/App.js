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
import { AuthProvider } from './firebase/Auth'; 
import PrivateRoute from './components/PrivateRoute'; 
import Axios from "axios";
import NotFound from "./components/NotFound"
function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
      </div>
      <Switch >
      <Route exact path="/" component={Landing} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/account" component={Account} />     
      <PrivateRoute exact path="/chat" component={Chat} />
      <PrivateRoute exact path="/videochat" component={VideoChat} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <PrivateRoute path="*" component={NotFound} />
    </Switch>
    </Router>    
    </AuthProvider>
  ); 
}

export default App; 
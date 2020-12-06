import React from 'react'; 
import './App.scss'; 
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

import Account from './components/Account'; 
import Home from './components/Home'; 
import Landing from './components/Landing'; 
import Navbar from './components/Navbar'; 
import Dashboard from './components/Dashboard'; 
import Chat from './components/Chat'; 
import SignIn from './components/SignIn'; 
import SignUp from './components/SignUp'; 
import VideoChat from './components/VideoChat'; 
import { AuthProvider } from './firebase/Auth'; 
import PrivateRoute from './components/PrivateRoute'; 

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
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/account" component={Account} />     
      <PrivateRoute path="/chat" component={Chat} />
      <PrivateRoute path="/videochat" component={VideoChat} />

      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />

    </Router>
      
    </AuthProvider>
  ); 
}

export default App; 
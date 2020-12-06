import React from 'react'; 
import './App.scss'; 
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

import Account from './components/Account'; 
import Home from './components/Home'; 
import Landing from './components/Landing'; 
import Navbar from './components/Navbar'; 
import SignIn from './components/SignIn'; 
import SignUp from './components/SignUp'; 

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
      <PrivateRoute path="/account" component={Account} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />

    </Router>
      
    </AuthProvider>
  ); 
}

export default App; 
import './App.scss';
import Home from "./components/Home/Home"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Chat from "./components/Chat"
import VideoChat from './components/VideoChat';

import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";


function App() {
  return (
    <div className="app">
      <Router>
        <Switch >
          <Route exact path = "/" component = {Home}></Route>
          <Route exact path = "/login" component = {Login}></Route>
          <Route exact path = "/dashboard" component = {Dashboard}></Route>
          <Route exact path = "/chat" component = {Chat}></Route>
          <Route exact path = "/videochat" component = {VideoChat}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

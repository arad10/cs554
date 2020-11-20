import './App.scss';
import Home from "./components/Home"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Chat from "./components/Chat"

import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch >
      <Route exact path = "/" component = {Home}></Route>
      <Route exact path = "/login" component = {Login}></Route>
      <Route exact path = "/dashboard" component = {Dashboard}></Route>
          <Route exact path = "/chat" component = {Chat}></Route>
      </Switch>
      </Router>
  );
}

export default App;

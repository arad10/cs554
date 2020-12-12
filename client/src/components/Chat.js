import React, {useState, useEffect} from 'react'
import ReactModal from 'react-modal';
import Navbar from "./Navbar"
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000"; //IN DISPUTE

//on start up get history of chat and add it to state
//need username to be passed through app
//pass chatroom in props
function Chat(props) {
  const {msgHist, setMsgHist} = useState([]); //array of obj of form {username: "name", msg: "message"}

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <form>
        <input type="text" autoComplete="off" autoFocus/>
        <button>Send Message</button>
      </form>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
    </div>
  )
}

export default Chat
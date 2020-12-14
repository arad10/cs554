import React, {useState, useEffect} from 'react'
import axios from "axios";
import ReactModal from 'react-modal';
import Navbar from "./Navbar"
import socketIOClient from "socket.io-client";
import { text } from 'body-parser';
const ENDPOINT = "http://localhost:4000";

//on start up get history of chat and add it to state
//need username to be passed through app
//pass chatroom in props
//record chat when sending to server
function Chat(props) {
  const [msgHist, setMsgHist] = useState([]); //array of obj of form {username: "name", msg: "message"}
  const [loading, setLoading] = useState(true);
  const socket = socketIOClient(ENDPOINT);
  const [newMsg, setNewMsg] = useState("");//incoming message in state. useeffect will see and add to history. will then rerender
  // const [loading1, setLoading1] = useState(true);

  socket.on("get_message", (msg) => {
    console.log(msg);
    setNewMsg(msg);
  });

  useEffect(() => {
    // setLoading1(true);
    async function addMessageToHist(){
      setMsgHist(msgHist.concat([newMsg]));
      let url = "http://localhost:4000/dashboard/" + props.dashID + "/addMessage";
      await axios.post(url, {username: props.username, msg: newMsg});
      // setLoading1(false);
    }
    addMessageToHist();
  }, [newMsg]);

  useEffect(() => {
    setLoading(true);
    async function getHist(){
      setMsgHist(props.chatHistory);
      console.log("client joined")
      let url = "http://localhost:4000/dashboard/" + props.dashID + "/addMessage";
      let msg = props.username + " had joined the chat";
      await axios.post(url, {username: props.username, msg: msg});
      socket.emit("user_join", {username: props.username, roomID: props.dashID});
      setLoading(false);
    }
    getHist();
  }, []);

  if(loading){
    return(
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  else{
    console.log(msgHist);
    let text;
    let inputForm = (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          let message = text.value;
          console.log("client sent msg " + message);
          let sending = {roomID: props.roomID, username: props.username, text: message};
          socket.emit("chat_message", sending);
          text.value = "";
        }}>
          <input ref={(node) => {
            text = node;
          }} autoFocus required/>
          <br/>
          <button>Send Message</button>
        </form>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
      </div>
    );
    return(
      <div>
        <ul>
          {msgHist.map((msg) => {
            return(
              <li key={msg.username}>
                {msg.username + ": " + msg.msg}
              </li>
            )
          })}
        </ul>
        <br/>
        {inputForm}
      </div>
    );
  }
};

export default Chat
import React, { useState, useEffect } from 'react'
import useChatRoom from "./useChatRoom";
import ReactModal from 'react-modal';
import Navbar from "./Navbar"
import socketIOClient from "socket.io-client";
import { text } from 'body-parser';

function Chat(props) {
  const roomID = props.dashID;
  const {allMsgs, sendMsg} = useChatRoom({roomID: roomID, chatHist: props.chatHistory});
  const [sentMessage, setSentMessage] = useState("");

  let transmitMsg = () => {
    sendMsg({msg: sentMessage, username: props.username});
    setSentMessage("");
  };

  let updateMsg = (e) => {
    let msg = e.target.value;
    setSentMessage(msg);
  };

  return (
    <div className="Chat">
      <h3>Chat:</h3>
      <ul>
        {allMsgs.map((msg) => {
          return (
            <li key={msg.username + msg.msg}>
              {msg.username + ": " + msg.msg}
            </li>
          )
        })}
      </ul>
      <br />
      <textarea value={sentMessage} onChange={updateMsg}></textarea>
      <br/>
      <button onClick={transmitMsg}>Send Message</button>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
    </div>
  );
};

export default Chat
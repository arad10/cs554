import {useEffect, useRef, useState} from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const ENDPOINT = "/";

const useChatRoom = (data) => {
    const [allMsgs, setAllMsgs] = useState(data.chatHist);
    const socket = useRef() //Want socket to persiste throughout whole component lifespan

    const addToHistory = async (message) => {
        await axios.post("/dashboard/" + data.roomID + "/addMessage", message)
    };

    useEffect(async () => { //made this async
        socket.current = socketIOClient(ENDPOINT, {
            query: {roomID: data.roomID}
        });

        socket.current.on("chat_message", (newMsg) => {
            setAllMsgs((messages) => messages.concat([newMsg]));
            if(newMsg.senderSocket === socket.current.id){
                addToHistory(newMsg);
            }            
        });

        return () => {
            socket.current.disconnect(); //disconnect when done
        }
    }, [data.roomID]); //new web socket for new room
    
    const sendMsg = (msg) => {
        socket.current.emit("chat_message", {
            username: msg.username,
            msg: msg.msg,
            senderSocket: socket.current.id
        });
    };

    return {allMsgs, sendMsg};
};

export default useChatRoom
import {useEffect, useRef, useState} from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const ENDPOINT = "/";

const useChatRoom = (roomID) => {
    const [allMsgs, setAllMsgs] = useState([]);
    const socket = useRef() //Want socket to persiste throughout whole component lifespan

    const addToHistory = async (message) => {
        // await axios.post("/dashboard/" + roomID + "/addMessage", message) //use room id to post
    };

    useEffect(async () => { //made this async
        socket.current = socketIOClient(ENDPOINT, {
            query: {roomID: roomID}
        })
        // setAllMsgs((await axios.get("/" + roomID)).chatHistory); //Need to set sample dashboard

        socket.current.on("chat_message", (newMsg) => {
            setAllMsgs((messages) => messages.concat([newMsg]));
            //addToHistory(newMsg); //dont have dashboard yet
        })

        return () => {
            socket.current.disconnect(); //disconnect when done
        }
    }, [roomID]); //new web socket for new room
    
    const sendMsg = (msg) => {
        socket.current.emit("chat_message", {
            username: msg.username,
            msg: msg.msg
            // sender: socket.current.id used for owned by curr user
        });
    };

    return {allMsgs, sendMsg};
};

export default useChatRoom
import React, {useState, useCallback, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import firebase from "firebase/app"
// import Lobby from './Lobby';
import Room from './Room';

const VideoChat = (props) => {
    // const [username, setUsername] = useState('');
    // const [roomName, setRoomName] = useState('');
    const [token, setToken] = useState(null);
    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
        async function generateToken(){
            const data = await fetch('/videochat/video/token', {
                method: 'POST',
                body: JSON.stringify({
                  identity: firebase.auth().currentUser.displayName,
                  room: props.match.params.id
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json());
              
            setToken(data.token);
        }
        generateToken();
    }, []);

    // const handleUsernameChange = useCallback( (event) => {
    //     setUsername(event.target.value);
    // }, []);
    
    // const handleRoomNameChange = useCallback( (event) => {
    //     setRoomName(event.target.value);
    // }, []);

    // const handleSubmit = useCallback(async event => {
    //     event.preventDefault();
    //     const data = await fetch('/videochat/video/token', {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         identity: username,
    //         room: roomName
    //       }),
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     }).then(res => res.json());
    //     setToken(data.token);
    // }, [username, roomName]);

    const handleLogout = useCallback(event => {
        setToken(null);
        setRedirect(`/dashboard/${props.match.params.id}`)
    }, []);

    let render;
    if (token) {
        render = (
            <Room roomName={props.match.params.id} token={token} handleLogout={handleLogout} />
        );
    }
    else if (redirect) {
        render = <Redirect to={redirect} />
    }
    else {
        render = <h2>Loading...</h2>
    }

    return render;
};

export default VideoChat;
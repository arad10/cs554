import React, {useState, useCallback, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import firebase from "firebase/app"
import Room from './Room';

const VideoChat = (props) => {
    const [token, setToken] = useState(null);
    const [redirect, setRedirect] = useState(null);

    let name;
    if (firebase.auth().currentUser.displayName){
        name = firebase.auth().currentUser.displayName;
    }
    else{
        name = firebase.auth().currentUser.email;
    }

    useEffect(() => {
        async function generateToken(){
            const data = await fetch('/videochat/video/token', {
                method: 'POST',
                body: JSON.stringify({
                  identity: name,
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

    const handleLogout = useCallback(event => {
        setToken(null);
        setRedirect(`/dashboards/${props.match.params.id}`)
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
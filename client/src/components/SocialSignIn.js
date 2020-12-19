import React from 'react';
import { Redirect } from 'react-router-dom'; 
import { doSocialSignIn } from '../firebase/FirebaseFunctions'; 
import google from '../images/google_sign_in.png'; 
import facebook from '../images/facebook_sign_in.png'; 
import twitter from '../images/twitter_sign_in.png'; 
import github from '../images/github_sign_in.png'; 
import styled from "styled-components";
import firebase from "firebase/app"
import axios from "axios"

const SocialSignIn = () => {
    
    const socialSignOn = async (provider) => {
        try {
            await doSocialSignIn(provider); 
            const currentUser = firebase.auth().currentUser
            const mongoUser = {
            id: currentUser.uid,
            name: currentUser.email
            }
            axios.post('/user', mongoUser).then(res => console.log(res)).catch(error=>console.log(error)) 
        } catch (error) {
            alert(error);
        }
    }; 

    return (
        <Wrapper>
        <div className = "social">
            <img 
            onClick={() => socialSignOn('google')}
            alt="google" 
            src={google} className="media-img"/>

{/* //             onClick={() => socialSignOn('facebook')}
//             alt="facebook" 
//             src={facebook} className="media-img" /> */}
 
            <img
            onClick={() => socialSignOn('twitter')}
            alt="twitter" 
            src={twitter}  className="media-img"/>

            <img 
            onClick={() => socialSignOn('github')}
            alt="github" 
            src={github}  className="media-img"/>



        </div>
        </Wrapper>
    ); 
}; 
const Wrapper = styled.article`
    .social{
        text-align: center;
    }
    .media-img{
        width: 250px;
        height:40px;
    }
`;

export default SocialSignIn; 

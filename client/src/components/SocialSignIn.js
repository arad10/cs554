import React from 'react';
import { Redirect } from 'react-router-dom'; 
import { doSocialSignIn } from '../firebase/FirebaseFunctions'; 
import google from '../images/google_sign_in.png'; 
import facebook from '../images/facebook_sign_in.png'; 
import twitter from '../images/twitter_sign_in.png'; 

const SocialSignIn = () => {

    const socialSignOn = async (provider) => {
        try {
            await doSocialSignIn(provider);
            
          } catch (error) {
            alert(error);
          }
    }; 

    return (
        <div>
            <img 
            onClick={() => socialSignOn('google')}
            alt="google" 
            src={google} />

            <img 
            onClick={() => socialSignOn('facebook')}
            alt="facebook" 
            src={facebook} />

            <img 
            onClick={() => socialSignOn('twitter')}
            alt="twitter" 
            src={twitter} />


        </div>
    ); 
}; 

export default SocialSignIn; 
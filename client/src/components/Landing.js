import React from 'react';
import '../App.scss';
import react from '../images/react_logo.png'; 
import socket from '../images/socket_io_logo.png'; 
import firebase from '../images/firebase_logo.png'; 
import heroku from '../images/heroku_logo.png'; 
import twilio from '../images/twilio_logo.png'; 


function Landing() {
  return (
    <div className="about">
      <h1>Welcome to JANCH</h1>
      <h2>Jess Alden Nick Conner Himanshu</h2>
        <section className="main-text">
        <p>
        JANCH is an agile management website built with React and deployed with Heroku. 
        This website will consist of three main pages: A login page, a home page, and an 
        agile board page. The login page will be where users can sign up and login for our
        website.We will utilize Firebase Auth for this functionality. The home page will
        display a list of different projects a user is a part of are a part of.
        A user can also create new projects/join an existing project on this page.
        The agile board page will be where stories are submitted for each individual project. 
        Stories will also be assigned different stages (backlog, to do, in progress, and finished).
      </p>
      <p>
        On each agile board page there will be a chat and video chat feature. 
        We will utilize Socket.io for the chat feature and Twilio for the video chat feature. 
        We thought this feature would be especially useful in today’s world for agile teams
        while working from home. It would make this application an “all-in-one” site for agile teams, 
        without them needing to rely on external chat or meeting technologies. 
        </p>

        </section>
        <section className="main-text">
          <h3>Technologies That We Used</h3>
          <p className="tech">React:  </p>Front-end framework for creating our single-page app. We will utilize function components for our pages and also nested components for features such as user stories.
          <br />
          <br />
          <p className="tech">Socket.io:  </p>Enables real-time communication between clients and web servers that we will use for our chat feature amongst agile team members.
          <br />
          <br />
          <p className="tech">Firebase:  </p> Authentication for users of our application. We will allow traditional email/password logins, as well as the most popular social media login choices (Google, Twitter, Github, etc.)
          <br />
          <br />
          <p className="tech">Heroku: </p> Cloud platform service that we will use to deploy and run our web application. Heroku has simple and effective ways to host MERN apps and it was the best solution for us (instead of Netlify). Since we’re hosting our app, we’re also utilizing MongoDB Atlas (cloud hosted Mongo database) in order for the app to connect to our data.
          <br />
          <br />
          <p className="tech">Twilio: </p> Platform that offers software developers to embed communication services into their web applications, such as video chatting. For our application, we will utilize Twilio’s video chat service for agile team members to communicate, which can be built using React hooks.
          <br />
        </section>
        <section className="main-text">
          <img alt="react-logo" src={react} className="tech-logos"/>
          <img alt="socket-logo" src={socket} className="tech-logos"/>
          <img alt="firebase-logo" src={firebase} className="tech-logos"/>
          <img alt="heroku-logo" src={heroku} className="tech-logos"/>
          <img alt="twilio-logo" src={twilio} className="tech-logos"/>
        </section>
    </div>
  );
}

export default Landing;
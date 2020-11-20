# cs554

# JANCH Agile Management Website

## Overview

CS554 Final Project

Our final project will be an agile management website built with React and deployed with Netlify. This website will consist of three main pages: A login page, a home page, and an agile board page. The login page will be where users can sign up and login for our website. We will utilize Firebase Auth for this functionality. The home page will display the user’s details such as username, teams, position and will also list different projects they are a part of. A user can also create new projects/join an existing project on this page. The agile board page will be where stories are submitted for each individual project. Stories will also be assigned different stages (to do, in progress, and finished).

On both the home and agile board page, a message/video chat icon will be displayed on the bottom right-hand corner of the screen. This icon will be a button that will enable a chat feature between you and your teammates. In addition, the chat will enable a video call option (in case you and your teammate want to talk out loud vs in chat). We will utilize Socket.io for the chat feature and Twilio for the video chat feature. We thought this feature would be especially useful in today’s world for agile teams while working from home. It would make this application an “all-in-one” site for agile teams, without them needing to rely on external chat or meeting technologies. Some stretch goals we had were having a team meeting scheduler page and an open video room for any member to join.

## Three Course Technologies:

1. React - Front-end framework for creating our single-page app. We will utilize function components for our pages and also nested components for features such as user stories.

2. Socket.io - Enables real-time communication between clients and web servers that we will use for our chat feature amongst agile team members.

3. Firebase - Authentication for users of our application. We will allow traditional email/password logins, as well as the most popular social media login choices (Google, Facebook, Apple, etc.)

# Two Independent Technolgies:

1. Netlify - Cloud service that we will use to deploy and host our web application. A great feature of Netlify is that it connects to Git repositories - it detects new git pushes and automatically deploys the new changes.

2. Twilio - Platform that offers software developers to embed communication services into their web applications, such as video chatting. For our application, we will utilize Twilio’s video chat service for agile team members to communicate, which can be built using React hooks.

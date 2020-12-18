# cs554

# JANCH Agile Management Website

## Overview

CS554 Final Project

Our final project will be an agile management website built with React and deployed with Heroku. This website will consist of three main pages: A login page, a home page, and an agile board page. The login page will be where users can sign up and login for our website. We will utilize Firebase Auth for this functionality. The home page will list different projects they are a part of. A user can also create new projects/join an existing project on this page. The agile board page will be where stories are submitted for each individual project. Stories will also be assigned different stages (to do, in progress, and finished).

On each agile board page there will be a chat and video chat feature. We will utilize Socket.io for the chat feature and Twilio for the video chat feature. We thought this feature would be especially useful in today’s world for agile teams while working from home. It would make this application an “all-in-one” site for agile teams, without them needing to rely on external chat or meeting technologies.

## Access JANCH on Heroku

https://janch.herokuapp.com (Note: it may take a few seconds for Heroku to load the app for the first time)

## Run JANCH Locally

```bash
npm install
cd client
npm install
cd ..
npm run prod
```

## Run Seed Database

```bash
npm run seed
```

This will load data into our MongoDB Atlas cloud database, for use on Heroku. If the app is ran locally, the server url in /server/config/settings.json can be
changed to a local MongoDb host.

## Three Course Technologies:

1. React - Front-end framework for creating our single-page app. We will utilize function components for our pages and also nested components for features such as user stories.

2. Socket.io - Enables real-time communication between clients and web servers that we will use for our chat feature amongst agile team members.

3. Firebase - Authentication for users of our application. We will allow traditional email/password logins, as well as the most popular social media login choices (Google, Twitter, Github, etc.)

## Two Independent Technologies:

1. Heroku - Cloud platform service that we will use to deploy and run our web application. Heroku has simple and effective ways to host MERN apps and it was the best solution for us (instead of Netlify). Since we’re hosting our app, we’re also utilizing MongoDB Atlas (cloud hosted Mongo database) in order for the app to connect to our data.

2. Twilio - Platform that offers software developers to embed communication services into their web applications, such as video chatting. For our application, we will utilize Twilio’s video chat service for agile team members to communicate, which can be built using React hooks.

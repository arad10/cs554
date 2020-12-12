const express = require('express');
const http = require("http").Server(app);
const io = require("socket.io")(http);
const userRoutes = require('./user');
const userStoryRoutes = require('./userStory');
const videochatRoutes = require('./videochat');
const dashboardRoutes = require('./dashboard');

const constructorMethod = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/user', userRoutes);
    app.use('/userstory', userStoryRoutes);
    app.use('/videochat', videochatRoutes);
    app.use('/dashboard', dashboardRoutes);

    // io.on("connection", (socket) => {
    //     socket.on("user_join", (data) => {
    //         this.username = data;
    //         socket.broadcast.emit("user_join", data);
    //     });

    //     socket.on("chat_message", (data) => {
    //         data.username = this.username;
    //         socket.broadcast.emit("chat_message", data);
    //     });
    
    //     socket.on("disconnect", (data) => {
    //         socket.broadcast.emit("user_leave", this.username);
    //     });
    // });

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;
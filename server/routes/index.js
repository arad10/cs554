const express = require('express');
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
};

module.exports = constructorMethod;
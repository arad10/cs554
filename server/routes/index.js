const express = require('express');
const userRoutes = require('./users');
const videochatRoutes = require('./videochat');

const constructorMethod = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/users', userRoutes);
    app.use('/videochat', videochatRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;
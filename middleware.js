const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

module.exports = (app, db) => {
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.json());
    app.set('trust proxy', 1);

    app.use(session({
        secret: Math.random().toString(36),
        saveUninitialized: true,
        cookie: {
            maxAge: Number.MAX_SAFE_INTEGER,
            httpOnly: true,
        },
        secure: true,
        resave: false
    }));

    app.use((req, res, next) => {
        res.header('X-Frame-Options', 'DENY');
        next();
    });

    app.use(express.static('static'));

    fs.readdirSync('./api').forEach(file => require('./api/' + file)(app, db));

    // noauth pages
    app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/pages/home.html')));
    const loginPages = (page, req, res) => {
        if (req.session.user) res.redirect('/stats');
        else res.sendFile(path.join(__dirname + `/pages/${page}.html`));
    };
    app.get('/login', (req, res) => loginPages('login', req, res));
    app.get('/signup', (req, res) => loginPages('signup', req, res));

    // auth pages
    const authPages = (page, req, res) => {
        if (!req.session.user) res.redirect('/login');
        else res.sendFile(path.join(__dirname + `/pages/${page}.html`));
    };
    app.get('/stats', (req, res) => authPages('stats', req, res));
    app.get('/settings', (req, res) => authPages('settings', req, res));
    app.get('/shop', (req, res) => authPages('shop', req, res));
    app.get('/leaderboard', (req, res) => authPages('leaderboard', req, res));
    app.get('/news', (req, res) => authPages('news', req, res));

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/login');
    });

    // 404 page error
    app.get('*', (req, res) => res.sendFile(path.join(__dirname + '/pages/404.html')));
}
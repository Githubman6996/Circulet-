/*const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const https = require('https')
const rateLimit = require('express-rate-limit');

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    message: 'Too many requests, please try again later.'
});

app.use(limiter);

let db = new sqlite3.Database('./db.sql', sqlite3.OPEN_READWRITE, (err) => {
    require('./middleware.js')(app, db);
});

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/circulet.dev/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/circulet.dev/fullchain.pem')
};

const server = https.createServer(options, app);

server.listen(443, () => console.log(`Hello!\n${`http://localhost:1234\n`}:D`));*/
const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();

let db = new sqlite3.Database('./db.sql', sqlite3.OPEN_READWRITE, (err) => {
    require('./middleware.js')(app, db);
});

app.listen(1234, () => console.log(`Hello!\n${`http://localhost:1234\n`}:D`));
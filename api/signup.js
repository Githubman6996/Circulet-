const bcrypt = require('bcrypt');

module.exports = (app, db) => {
    app.post('/api/signup', (req, res) => {
        if (req.session.user) return res.send({
            error: true,
            reason: `You are already logged in.`
        });

        try {
            if (!(req.body.username && req.body.password)) return res.send({
                error: true,
                reason: `You must enter a username and password.`
            });
            if (req.body.username.toLowerCase() == 'circulet') res.send({
                error: true,
                reason: `This account is reserved for the system account.`
            });
            if (req.body.username.length > 16) return res.send({
                error: true,
                reason: `Your username must be less than or 16 characters long.`
            });
            if (req.body.username.match(/[^a-zA-Z0-9_]/g)) return res.send({
                error: true,
                reason: `Your username can not contain invalid characters.`
            });

            db.all(`SELECT id FROM users WHERE username = "${req.body.username}"`, (err, result) => {
                if (!result.length <= 0) return res.send({
                    error: true,
                    reason: `That username is already taken.`
                });
                let id = Math.floor(1000000 + Math.random() * 9000000);
                let hashedPass = bcrypt.hash(req.body.password,10);
                db.run(`INSERT INTO users (id, username, password, avatar, blooks, perms, friends, ip, mute, ban, settings, discord) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                    id,
                    req.body.username.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
                    hashedPass,
                    '/media/favicon.png',
                    "{}",
                    "[]",
                    "[]",
                    "${req.ip}",
                    '{"muted": false, "reason": "", "time": 0, "staff": ""}',
                    '{"banned": false, "reason": "", "time": 0, "staff": ""}',
                    JSON.stringify({
                        friends: {
                            accepting: true
                        },
                        blocked: [],
                        chat: {
                            allowDMs: true
                        }
                    }),
                    '{"id": 0, "username": ""}'
                ], (err, result) => {
                    if (err) {
                        res.send({
                            error: true,
                            reason: `Something went wrong.`
                        });
                        console.error(err);
                        return;
                    }

                    req.session.user = req.body.username.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
                    req.session.pass = hashedPass;
                    
                    console.log(`User ${req.session.user} signed up from ${req.ip}.`)
                    res.send({
                        error: false
                    });
                });
            });
        } catch (e) {
            console.log(e);
            res.send({
                error: true,
                reason: `Internal server error.`
            })
        }
    });
}
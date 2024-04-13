const bcrypt = require('bcrypt');

module.exports = (app, db) => {
    app.post('/api/login', (req, res) => {
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

            db.all(`SELECT * FROM users WHERE username = "${req.body.username}"`, async (err, result) => {
                if (result.length < 1) return res.send({
                    error: true,
                    reason: `That account doesn't exist.`
                }); 

                let ban = JSON.parse(result?.[0].ban);
                if (bcrypt.compare(req.body.password, result[0].password)) {
                    if (ban.banned) {
                        if (Date.now() >= ban.time * 1000) db.run(`UPDATE users SET ban = '{"banned": false, "reason": "", "time": 0, "staff": ""}' WHERE id = ${result[0].id}`, (err, result) => {});
                        else return res.send({
                            error: true,
                            reason: `You are currently banned from Circulet for ${ban.reason}. Your ban will expire on ${new Date(ban.time * 1000).toLocaleDateString()} ${new Date(ban.time * 1000).toLocaleTimeString()}. If you believe this is a mistake, please contact an owner or developer of Circulet.`
                        });
                    } 
                    db.run(`UPDATE users SET ip = "${req.ip}" WHERE id = ${result[0].id}`, () => {});
                    req.session.user = result[0].username;
                    req.session.pass = result[0].password;
                    res.send({
                        error: false
                    });
                } else {
                    res.send({
                        error: true,
                        reason: `Username and password don't match.`
                    });
                }
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

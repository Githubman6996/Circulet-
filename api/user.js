module.exports = (app, db) => {
    app.get('/api/user/', (req, res) => {
        if (!req.session.user) {
            res.send({
                error: true,
                reason: `Unauthorized.`
            });
            return;
        }

        if (req.query.name && req.query.name.match(/[^a-zA-Z0-9_]/g)) {
            res.send({
                error: true,
                reason: `Username can not contain invalid characters.`
            });
            return;
        }

        db.all(`SELECT * FROM users ${req.query.name ? `WHERE username = "${req.query.name}"` : `WHERE username = "${req.session.user}"`}`, (err, result) => {
            if (err) {
                res.send({
                    error: true,
                    reason: `Something went wrong.`
                });
                console.error(err);
                return;
            }
            if (result.length < 1) {
                res.send({
                    error: true,
                    reason: `User does not exist.`
                });
                return;
            }
            res.send({
                error: false,
                user: req.query.name ? {
                    id: result[0].id,
                    username: result[0].username,
                    avatar: result[0].avatar || '',
                    blooks: JSON.parse(result[0].blooks),
                    tokens: result[0].tokens,
                    role: result[0].role,
                    color: result[0].color,
                    exp: result[0].exp
                } : {
                    id: result[0].id,
                    username: result[0].username,
                    avatar: result[0].avatar || '',
                    blooks: JSON.parse(result[0].blooks),
                    tokens: result[0].tokens,
                    perms: JSON.parse(result[0].perms),
                    role: result[0].role,
                    color: result[0].color,
                    exp: result[0].exp,
                    friends: JSON.parse(result[0].friends),
                    claimed: result[0].claimed,
                    settings: JSON.parse(result[0].settings)
                }
            });
        });
    });
}
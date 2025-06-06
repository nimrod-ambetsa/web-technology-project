const jwt = require('jsonwebtoken');

const JWT_SECRET = `your_jwt_secret_key`;

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.redirect("/")
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.redirect("/");
        }
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

function createToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: '3h' })
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey)
    } catch (error) {
        return null;
    }
}

module.exports = { createToken, verifyToken }
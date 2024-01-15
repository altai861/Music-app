const { verifyToken } = require("./jwt-middleware.js");

function authenticateUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: Token not provided" })
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid credentials" });
    }

    req.user = { userId: decoded.userId };

    next();
}

module.exports = { authenticateUser }
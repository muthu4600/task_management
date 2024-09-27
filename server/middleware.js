const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {

    const token = req?.cookies?.token;
    if (!token) return res.send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.send('Invalid Token');
    }
};

module.exports = { authenticateToken };

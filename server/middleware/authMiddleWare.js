const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] //Bearer
        if (!token) {
            res.status(401).json({message: 'Not authorized'});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();

    } catch (e) {
        res.status(401).json({message: 'Not authorized'})
    }
}
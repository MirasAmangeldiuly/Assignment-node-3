const response = require('../util/response');
const jwt = require("jsonwebtoken");
const secretKey = require("../config/env");

const adminMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(200).json(response.error('Unauthorized - No token provided'));
    }
    jwt.verify(token, secretKey.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(200).json(response.error(err.message));
        }
        if(!user.isAdmin){
            return res.status(200).json(response.error('Unauthorized - Not an admin'));
        }
        next();
    });
}

module.exports = adminMiddleware;
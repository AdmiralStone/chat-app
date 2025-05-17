// src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Expecting header format: Autorization: Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(403).json({message:'No token provided. Access forbidden.'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: decoded.id};
        next();
    }catch(err){
        console.error('JWT verification failed:',err);
        return res.status(403).json({message:'Invalid or expired token'});
    }
};

module.exports = verifyToken;
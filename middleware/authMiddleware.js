// authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token manquant. Authentifiez-vous pour accéder à cette ressource.' });
    }

    try {
        // Replace 'YOUR_SECRET_KEY' with your actual secret key used for signing the token
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
        req.user = decoded; // Attach the user information to the request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide. Authentifiez-vous pour accéder à cette ressource.' });
    }
};

module.exports = authenticateToken;

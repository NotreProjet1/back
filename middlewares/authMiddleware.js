// authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'votreclésecrete';

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Aucun token fourni' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token non valide' });
    } else {
      req.user = decoded.username;
      next();
    }
  });
};

module.exports = authenticateJWT;

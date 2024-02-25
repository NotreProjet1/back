// authController.js

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'votreclésecrete'; 

exports.login = (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation des champs requis
    if (!username || !password) {
      throw new Error('Les champs "username" et "password" sont requis.');
    }

    // Vérification des informations d'identification (remplacez cela par votre logique d'authentification réelle)
    if (username === 'ahlem' && password === '0000') {
      // Si l'authentification réussit, vous pouvez générer un JWT
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      res.json({ token, message: 'L\'authentification a réussi' });
    } else {
      res.status(401).json({ message: 'L\'authentification a échoué' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

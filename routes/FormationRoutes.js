const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const formationController = require('../controllers/FormationController');

// Créer la table des formations (vous pouvez le faire au niveau de l'initialisation de l'application)

// Routes CRUD pour les formations
router.post('/create', formationController.createFormation);
router.get('/', formationController.getAllFormations);
router.put('/:id', formationController.updateFormation);
router.delete('/:id', formationController.deleteFormation);
router.get('/search', formationController.searchFormationsByTitre);

module.exports = router;

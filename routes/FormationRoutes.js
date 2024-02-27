const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const formationController = require('../controllers/FormationController');

// Créer la table des formations (vous pouvez le faire au niveau de l'initialisation de l'application)

// Routes CRUD pour les formations
router.post('/create', formationController.createFormation);
router.get('/', authMiddleware, formationController.getAllFormations);
router.put('/:id', authMiddleware, formationController.updateFormation);
router.delete('/:id', authMiddleware, formationController.deleteFormation);
router.get('/search', authMiddleware, formationController.searchFormationsByTitre);

module.exports = router;

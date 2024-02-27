const express = require('express');
const router = express.Router();
const gratuisCoursController = require('../controllers/GCroursController');

router.post('/gratuis-cours', gratuisCoursController.createGratuisCours);
router.get('/gratuis-cours', gratuisCoursController.getAllGratuisCours);
router.put('/gratuis-cours/:id', gratuisCoursController.updateGratuisCours);
router.delete('/gratuis-cours/:id', gratuisCoursController.deleteGratuisCours);
router.get('/search-gratuis-cours', gratuisCoursController.searchGratuisCoursByTitre);

module.exports = router;

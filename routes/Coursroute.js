const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CoursController');

const authController = require('../controllers/authController');



router.get('/courses', courseController.getAllCourses);
router.post('/courses', courseController.createCourse);
router.put('/courses/:id', courseController.updateCourse); // Nouvelle route pour la mise à jour
router.delete('/courses/:id', courseController.deleteCourse); // Nouvelle route pour la suppression
router.get('/search-courses', courseController.searchCoursesByTitre);  

router.post('/login', authController.login);
module.exports = router;

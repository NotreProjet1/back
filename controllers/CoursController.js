const Course = require('../models/CoursModel');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'votreclésecrete';
const ERROR_MESSAGE = 'L\'authentification a échoué';
const SUCCESS_MESSAGE = 'L\'authentification a réussi';
const courseController = {
   
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.getAllCourses((error, results) => {
        if (error) {
          console.error('Error in getAllCourses callback:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
      });
    } catch (error) {
      console.error('Error in getAllCourses (try-catch):', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createCourse: async (req, res) => {
    const { titre, contenu, description, planning, prix } = req.body;

    try {
      Course.createCourse(titre, contenu, description, planning, prix, (error, courseId) => {
        if (error) {
          console.error('Error in createCourse callback:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(201).json({ id: courseId, titre, contenu, description, planning, prix });
        }
      });
    } catch (error) {
      console.error('Error in createCourse (try-catch):', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateCourse: async (req, res) => {
    const courseId = req.params.id;
    const { titre, contenu, description, planning, prix } = req.body;

    try {
      Course.updateCourse(courseId, titre, contenu, description, planning, prix, (error, results) => {
        if (error) {
          console.error('Error in updateCourse callback:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ id: courseId, titre, contenu, description, planning, prix });
        }
      });
    } catch (error) {
      console.error('Error in updateCourse (try-catch):', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteCourse: async (req, res) => {
    const courseId = req.params.id;

    try {
      Course.deleteCourse(courseId, (error, results) => {
        if (error) {
          console.error('Error in deleteCourse callback:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ message: 'Course deleted successfully', id: courseId });
        }
      });
    } catch (error) {
      console.error('Error in deleteCourse (try-catch):', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  searchCoursesByTitre: async (req, res) => {
    const { titre } = req.query;  // Utilisation de req.query avec "titre"
  
    try {
      Course.searchCoursesByTitre(titre, (error, courses) => {
        if (error) {
          console.error('Error in searchCoursesByTitre:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(courses);
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
};

module.exports = courseController;

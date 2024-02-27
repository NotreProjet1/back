const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'votreclésecrete'; // Assurez-vous de définir votre clé secrète correctement
const ERROR_MESSAGE = 'L\'authentification a échoué';
const SUCCESS_MESSAGE = 'L\'authentification a réussi';

const GratuisCoursModel = require('../models/GCoursModel');

const gratuisCoursController = {
  

  createGratuisCours: async (req, res) => {
    const { titre, contenu, description } = req.body;

    try {
      GratuisCoursModel.createGratuisCours(titre, contenu, description, (error, courseId) => {
        if (error) {
          console.error('Error in createGratuisCours callback:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(201).json({ id: courseId, titre, contenu, description });
        }
      });
    } catch (error) {
      console.error('Error in createGratuisCours (try-catch):', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllGratuisCours: async (req, res) => {
    try {
      const courses = await GratuisCoursModel.getAllGratuisCours((error, results) => {
        if (error) {
          console.error('Error in getAllGratuisCours callback:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
      });
    } catch (error) {
      console.error('Error in getAllGratuisCours (try-catch):', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateGratuisCours: async (req, res) => {
    const courseId = req.params.id;
    const { titre, contenu, description } = req.body;

    try {
      GratuisCoursModel.updateGratuisCours(courseId, titre, contenu, description, (error, results) => {
        if (error) {
          console.error('Error in updateGratuisCours callback:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ id: courseId, titre, contenu, description });
        }
      });
    } catch (error) {
      console.error('Error in updateGratuisCours (try-catch):', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteGratuisCours: async (req, res) => {
    const courseId = req.params.id;

    try {
      GratuisCoursModel.deleteGratuisCours(courseId, (error, results) => {
        if (error) {
          console.error('Error in deleteGratuisCours callback:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ message: 'GratuisCours deleted successfully', id: courseId });
        }
      });
    } catch (error) {
      console.error('Error in deleteGratuisCours (try-catch):', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  searchGratuisCoursByTitre: async (req, res) => {
    try {
      const { titre } = req.query;
      if (!titre) {
        return res.status(400).json({ error: 'Le paramètre "titre" est requis.' });
      }

      GratuisCoursModel.searchGratuisCoursByTitre(titre, (error, courses) => {
        if (error) {
          console.error('Error in searchGratuisCoursByTitre:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json(courses);
      });
    } catch (error) {
      console.error('Error in searchGratuisCoursByTitre (try-catch):', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = gratuisCoursController;

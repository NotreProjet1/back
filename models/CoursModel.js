// coursController.js
const CoursModel = require('../models/CoursModel');
const authenticateToken = require('../middleware/authMiddleware');


const createCourse = async (req, res) => {
    try {
        // Check for the presence of the authorization header
        authenticateToken(req, res, async () => {
            const { titre, contenu, description, planning, prix } = req.body;

            await CoursModel.createCourse(titre, contenu, description, planning, prix, (error, result) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
                }
                return res.status(201).json({
                    success: true,
                    message: 'Cours créé avec succès.',
                    courseId: result
                });
            });
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const getAllCourses = async (req, res) => {
    try {
        // Check for the presence of the authorization header
        authenticateToken(req, res, async () => {
            await CoursModel.getAllCourses((error, results) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
                }
                return res.status(200).json({ success: true, courses: results });
            });
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const updateCourse = async (req, res) => {
    try {
        // Check for the presence of the authorization header
        authenticateToken(req, res, async () => {
            const { id } = req.params;
            const { titre, contenu, description, planning, prix } = req.body;

            await CoursModel.updateCourse(id, titre, contenu, description, planning, prix, (error, result) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
                }
                return res.status(200).json({ success: true, message: 'Cours modifié avec succès.', result });
            });
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const deleteCourse = async (req, res) => {
    try {
        // Check for the presence of the authorization header
        authenticateToken(req, res, async () => {
            const { id } = req.params;

            await CoursModel.deleteCourse(id, (error, result) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
                }
                return res.status(200).json({ success: true, message: 'Cours supprimé avec succès.', result });
            });
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const searchCoursesByTitre = async (req, res) => {
    try {
        // Check for the presence of the authorization header
        authenticateToken(req, res, async () => {
            const { titre } = req.query;

            await CoursModel.searchCoursesByTitre(titre, (error, results) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
                }
                return res.status(200).json({ success: true, courses: results });
            });
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

module.exports = {
  
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    searchCoursesByTitre
};

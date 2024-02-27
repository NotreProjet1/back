// formationController.js
const FormationModel = require('./models/formationModel');
const authenticateToken = require('../middlewares/authMiddleware');

const createFormationTable = (callback) => {
    FormationModel.createFormationTable(callback);
};

const createFormation = async (req, res) => {
    try {
        // Check for the presence of the authorization header
        authenticateToken(req, res, async () => {
            const { titre, description, planning, prix } = req.body;

            await FormationModel.createFormation(titre, description, planning, prix, (error, result) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
                }
                return res.status(201).json({
                    success: true,
                    message: 'Formation créée avec succès.',
                    formationId: result
                });
            });
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const getAllFormations = async (req, res) => {
    try {
        // Check for the presence of the authorization header
        authenticateToken(req, res, async () => {
            await FormationModel.getAllFormations((error, results) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
                }
                return res.status(200).json({ success: true, formations: results });
            });
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const updateFormation = async (req, res) => {
    try {
        // Check for the presence of the authorization header
        authenticateToken(req, res, async () => {
            const { id } = req.params;
            const { titre, description, planning, prix } = req.body;

            await FormationModel.updateFormation(id, titre, description, planning, prix, (error, result) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
                }
                return res.status(200).json({ success: true, message: 'Formation modifiée avec succès.', result });
            });
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const deleteFormation = async (req, res) => {
    try {
        // Check for the presence of the authorization header
        authenticateToken(req, res, async () => {
            const { id } = req.params;

            await FormationModel.deleteFormation(id, (error, result) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
                }
                return res.status(200).json({ success: true, message: 'Formation supprimée avec succès.', result });
            });
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const searchFormationsByTitre = async (req, res) => {
    try {
        // Check for the presence of the authorization header
        authenticateToken(req, res, async () => {
            const { titre } = req.query;

            await FormationModel.searchFormationsByTitre(titre, (error, results) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
                }
                return res.status(200).json({ success: true, formations: results });
            });
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

module.exports = {
    createFormationTable,
    createFormation,
    getAllFormations,
    updateFormation,
    deleteFormation,
    searchFormationsByTitre
};

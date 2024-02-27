const db = require('../config/db');

const GratuisCoursModel = {
  createGratuisCoursTable: (callback) => {
    db.query(`
      CREATE TABLE IF NOT EXISTS gratuitscours (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titre VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        contenu TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `, (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  createGratuisCours: (titre, contenu, description, callback) => {
    db.query(
      'INSERT INTO gratuitscours (titre, contenu, description) VALUES (?, ?, ?)',
      [titre, contenu, description],
      (error, results) => {
        if (error) {
          console.error('Error in createGratuisCours:', error);
          return callback(error);
        }
        return callback(null, results.insertId);
      }
    );
  },

  getAllGratuisCours: (callback) => {
    db.query('SELECT * FROM gratuitscours', (error, results) => {
      if (error) {
        console.error('Error in getAllGratuisCours:', error);
        return callback(error);
      }
      return callback(null, results);
    });
  },

  updateGratuisCours: (id, titre, contenu, description, callback) => {
    db.query(
      'UPDATE gratuitscours SET titre = ?, contenu = ?, description = ? WHERE id = ?',
      [titre, contenu, description, id],
      (error, results) => {
        if (error) {
          console.error('Error in updateGratuisCours:', error);
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteGratuisCours: (id, callback) => {
    db.query('DELETE FROM gratuitscours WHERE id = ?', [id], (error, results) => {
      if (error) {
        console.error('Error in deleteGratuisCours:', error);
        return callback(error);
      }
      return callback(null, results);
    });
  },
  searchGratuisCoursByTitre: (titre, callback) => {
    const searchTerm = '%' + titre + '%'; // Ajout de % au début et à la fin
    const query = 'SELECT * FROM gratuitscours WHERE titre LIKE ?';

    db.query(query, [searchTerm], (error, results) => {
      if (error) {
        console.error('Error in searchGratuisCoursByTitre:', error);
        return callback(error);
      }

      return callback(null, results);
    });
  },
};

module.exports = GratuisCoursModel;

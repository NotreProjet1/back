const db = require('../config/db');

const CoursModel = {
  createCoursTable: (callback) => {
    db.query(`
      CREATE TABLE IF NOT EXISTS coursp (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titre VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        contenu TEXT NOT NULL,
        planning TEXT NOT NULL,
        prix DECIMAL(10, 2) NOT NULL,
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

  createCourse: (titre, contenu, description, planning, prix, callback) => {
    db.query(
      'INSERT INTO coursp (titre, contenu, description, planning, prix) VALUES (?, ?, ?, ?, ?)',
      [titre, contenu, description, planning, prix],
      (error, results) => {
        if (error) {
          console.error('Error in createCourse:', error);
          return callback(error);
        }
        return callback(null, results.insertId);
      }
    );
  },

  getAllCourses: (callback) => {
    db.query('SELECT * FROM coursp', (error, results) => {
      if (error) {


        console.error('Error in getAllCourses:', error);
        return callback(error);
      }
      return callback(null, results);
    });
  },

  updateCourse: (id, titre, contenu, description, planning, prix, callback) => {
    db.query(
      'UPDATE coursp SET titre = ?, contenu = ?, description = ?, planning = ?, prix = ? WHERE id = ?',
      [titre, contenu, description, planning, prix, id],
      (error, results) => {
        if (error) {
          console.error('Error in updateCourse:', error);
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteCourse: (id, callback) => {
    db.query('DELETE FROM coursp WHERE id = ?', [id], (error, results) => {
      if (error) {
        console.error('Error in deleteCourse:', error);
        return callback(error);
      }
      return callback(null, results);
    });
  },
  searchCoursesByTitre: (titre, callback) => {
    db.query('SELECT * FROM coursp WHERE titre = ?', [titre], (error, results) => {
      if (error) {
        console.error('Error in searchCoursesByTitre:', error);
        return callback(error);
      }
      return callback(null, results);
    });
  },

};

module.exports = CoursModel;

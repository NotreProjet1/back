// app.js
const express = require('express');
const bodyParser = require('body-parser');
const participantRoutes = require('./routes/participantRoutes');
const courseRoutes = require('./routes/Coursroute');
const CoursModel = require('./models/CoursModel'); 
const authController = require('../controllers/authController');
const app = express();
const port = process.env.PORT || 3020;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/participants', participantRoutes);
app.use('/cours', courseRoutes);
app.use('/securit', authController);


CoursModel.createCoursTable((error, result) => {
  if (error) {
    console.error('Error creating coursp table:', error);
  } else {
    console.log('Coursp table created or already exists.');
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);      
});
 
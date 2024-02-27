// app.js
const express = require('express');
const bodyParser = require('body-parser');
const participantRoutes = require('./routes/participantRoutes');
const courseRoutes = require('./routes/Coursroute');
const GCoursRoutes = require('./routes/GCoursroutes');  // Ajout des routes GCoursRoutes
const CoursModel = require('./models/CoursModel'); 
const GCoursModel = require('./models/GCoursModel');
const instructeurRoutes = require('./routes/instructeurRoutes') 
const authMiddleware = require('./middleware/authMiddleware');
const app = express();
const port = process.env.PORT || 3000;
const FormationModel = require('./models/FormationModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const incorrectMiddlewareObject = (req, res, next) => {
  console.log('Middleware function called');
  next(); 
}; 
app.use(authMiddleware);
app.use(incorrectMiddlewareObject);
app.use('/instructeur', instructeurRoutes);
app.use('/participants', participantRoutes);
app.use('/cours', courseRoutes);
app.use('/gratuis', GCoursRoutes);  // Utilisez les routes définies pour GCoursModel ici
app.use('/api', authMiddleware); 
GCoursModel.createGratuisCoursTable((error, result) => {
  if (error) {
    console.error('Error creating gratuitscours table:', error);
  } else {
    console.log('Gratuitscours table created or already exists.');
  }
});
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

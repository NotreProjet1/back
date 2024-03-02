// app.js
const express = require('express');
const bodyParser = require('body-parser');
const participantRoutes = require('./routes/participantRoutes');
const courseRoutes = require('./routes/Coursroute');
const formationModel = require('./models/FormationModel'); 
const formationController = require('./controllers/FormationController'); 


const instructeurRoutes = require('./routes/instructeurRoutes') 
const authMiddleware = require('./middleware/authMiddleware');
const app = express();
const port = process.env.PORT || 3001;
const FormationModel = require('./models/FormationModel');
const formationRout = require('./routes/FormationRoutes')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/instructeur', instructeurRoutes);
app.use('/participants', participantRoutes);
app.use('/cours', courseRoutes);
app.use('/formation', formationRout);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);      
});

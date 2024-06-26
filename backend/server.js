const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { initDataFile } = require('./utils/fileUtils');
const { loginUser, addGoogleUser } = require('./controllers/userController');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.post('/login', loginUser);
app.post('/addGoogleUser', addGoogleUser); 

app.listen(port, () => {
  initDataFile();
  console.log(`Server running at http://localhost:${port}`);
});

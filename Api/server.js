const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const TodoService = require('./services/todo-service');

require('dotenv').config();

 

const app = express();
const port = process.env.PORT || 3334; 

//init routers
const authRoutes = require('./routs/auth-routes');
const todoRoutes = require('./routs/todo-routes');
const sensorRoutes = require('./routs/sensor-routes');
const potRoutes = require('./routs/pot-routes');
const logRoutes = require('./routs/log-routes');
const customValService = require('./routs/custom-val-routes');



// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());



// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//Importing Router
app.use(authRoutes, logRoutes, todoRoutes, sensorRoutes, potRoutes, customValService)

//init check for auto tasks
TodoService.createAutoTask();
setInterval(() => {
  TodoService.createAutoTask();
}, 60000);




// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = {
  app,

};

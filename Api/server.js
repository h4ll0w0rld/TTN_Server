const express = require('express');
const axios = require('axios');

const app = express();
const port = 3333; // Change the port number if needed

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle POST requests
app.post('/webhook', async (req, res) => {
  console.log(req)
  
});


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
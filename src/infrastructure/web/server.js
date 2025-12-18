const express = require('express');
const healthRoute = require('./routes/healthRoute');

const app = express();
const PORT = 3000;

// Middleware to parse JSON in requests
app.use(express.json());

// Attach routes
app.use('/health', healthRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
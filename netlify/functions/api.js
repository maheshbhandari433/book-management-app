const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Import your Express server setup
const indexREST = require('../indexREST');

// Use the same route handlers as your Express server
app.use('/api', indexREST);

// Convert Express app to serverless function
exports.handler = serverless(app);

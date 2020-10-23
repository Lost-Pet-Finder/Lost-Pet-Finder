// Imports
const express = require('express');
const awsController = require('../controllers/awsController');

// Objects
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('This is the pets endpoint');
});
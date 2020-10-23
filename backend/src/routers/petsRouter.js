// Imports
const express = require('express');
const petsController = require('../controllers/petController');

// Objects
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('This is the pets endpoint');
});
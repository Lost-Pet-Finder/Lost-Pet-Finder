// Imports
const express = require('express');
const petsController = require('../controllers/userController');

// Objects
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('This is the user endpoint');
});

module.exports = router;
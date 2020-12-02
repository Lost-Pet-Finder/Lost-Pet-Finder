// Imports
const express = require('express');
const userController = require('../controllers/userController');

// Objects
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send('This is the user endpoint');
});

router.get('/getUserContactInfo/:userid', userController.getUserContactInfo);
router.post('/createNewUser', userController.createNewUser);
router.get('/getUserIdNumber/:uid', userController.getUserIdNumber);

module.exports = router;

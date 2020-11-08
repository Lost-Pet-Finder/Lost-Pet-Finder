// Imports
const express = require('express');
const notificationController = require('../controllers/notificationController');

// Objects
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send('This is the notification endpoint');
});

router.post('/uploadDeviceToken', notificationController.uploadDeviceToken);
router.get('/getUserDeviceToken', notificationController.getUserDeviceToken);
router.post(
	'/sendNotificationToUser',
	notificationController.sendNotificationToUser
);

module.exports = router;

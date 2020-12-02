// Imports
const express = require('express');
const notificationController = require('../controllers/notificationController');

// Objects
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send('This is the notification endpoint');
});

router.post('/uploadDeviceToken', notificationController.uploadDeviceToken);
router.get('/getUserDeviceToken/:userid', notificationController.getUserDeviceToken);

router.post('/sendContactRequest', notificationController.sendContactRequest);
router.post('/respondToContactRequest', notificationController.respondToContactRequest);
router.get('/pendingRequests/:userid', notificationController.getMyPendingRequests);
router.get('/sentRequests/:userid', notificationController.getMySentRequests);

module.exports = router;

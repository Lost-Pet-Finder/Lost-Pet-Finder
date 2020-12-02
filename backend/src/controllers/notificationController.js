const sqlPool = require('../sql/connection');
const fadmin = require('../util/firebaseAdmin');

async function uploadDeviceToken(req, res) {
	const userid = req.body.userid;
	const token = req.body.deviceToken;

	try {
		const rows = await sqlPool.query('CALL upload_device_token(?,?)', [
			userid,
			token,
		]);
		const dataPackets = rows[0];

		res.status(200).send(dataPackets);
	} catch (err) {
		console.error(err);
		res.status(500).send('Request failed');
	}
}

async function getUserDeviceToken(req, res) {
	const userid = req.body.userid;

	try {
		const rows = await sqlPool.query('CALL get_user_device_token(?)', [userid]);
		const dataPackets = rows[0];

		res.status(200).send(dataPackets);
	} catch (err) {
		console.error(err);
		res.status(500).send('Request failed');
	}
}

async function sendContactRequest(req, res) {
	const userid = req.body.userid;
	const targetid = req.body.targetid;

	try {
		await sqlPool.query('CALL send_contact_request(?,?)', [targetid, userid]); // inserts into the contact request table

		const fcmRows = await sqlPool.query('CALL get_user_device_token(?)', [
			targetid,
		]);
		const deviceToken = fcmRows[0][0].device_token;

		const contactDataRows = await sqlPool.query(
			'CALL get_user_contact_info(?)',
			[userid]
		);
		const contactData = contactDataRows[0][0];

		console.log('Contact Data');
		console.log(contactData);

		const payload = {
			notification: {
				title: `Contact Request`,
				body: `${contactData.first_name} ${contactData.last_name} wants to contact you!`,
			},
			data: {
				type: `contactRequest`,
				payload: `${userid}`,
			},
		};

		await fadmin.messaging().sendToDevice(deviceToken, payload);

		res.status(200).send(payload);
	} catch (err) {
		console.error(err);
		res.status(500).send('Request failed');
	}
}

async function respondToContactRequest(req, res) {
	const userid = req.body.userid;
	const requesterid = req.body.requesterid;
	const accepted = req.body.accepted;

	try {
		if (accepted == true) {
			await sqlPool.query('CALL accept_contact_request(?,?)', [
				userid,
				requesterid,
			]);

			// send other user a notification saying you accepted
			const fcmRows = await sqlPool.query('CALL get_user_device_token(?)', [
				requesterid,
			]);
			const dataPackets = fcmRows[0];
			if (dataPackets == null || dataPackets.length == 0) {
				res.status(200).send('Other user does not have an FCM token');
				return;
			}

			const deviceToken = fcmRows[0][0].device_token;

			const contactDataRows = await sqlPool.query(
				'CALL get_user_contact_info(?)',
				[userid]
			);
			const contactData = contactDataRows[0][0];

			const payload = {
				notification: {
					title: `Contact Accepted`,
					body: `${contactData.first_name} ${contactData.last_name} has accepted your contact request!`,
				},
				data: {
					type: `contactAccept`,
					payload: `${userid}`,
				},
			};

			await fadmin.messaging().sendToDevice(deviceToken, payload);
			res.status(200).send(payload);
		} else {
			await sqlPool.query('CALL delete_contact_request(?,?)', [
				userid,
				requesterid,
			]);
			res.status(200).send('Contact Request Declined');
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('Request failed');
	}
}

async function getMyPendingRequests(req, res) {
	const userid = req.body.userid;

	try {
		const rows = await sqlPool.query('CALL get_my_pending_requests(?)', [
			userid,
		]);
		const dataPackets = rows[0];

		res.status(200).send(dataPackets);
	} catch (err) {
		console.error(err);
		res.status(500).send('Request failed');
	}
}

async function getMySentRequests(req, res) {
	const userid = req.body.userid;

	try {
		const rows = await sqlPool.query('CALL get_my_sent_requests(?)', [userid]);
		const dataPackets = rows[0];

		res.status(200).send(dataPackets);
	} catch (err) {
		console.error(err);
		res.status(500).send('Request failed');
	}
}

module.exports = {
	uploadDeviceToken: uploadDeviceToken,
	getUserDeviceToken: getUserDeviceToken,

	sendContactRequest: sendContactRequest,
	respondToContactRequest: respondToContactRequest,
	getMyPendingRequests: getMyPendingRequests,
	getMySentRequests: getMySentRequests,
};

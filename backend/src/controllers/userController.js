const sqlPool = require('../sql/connection');

async function getUserContactInfo(req, res) {
	var userid = req.params.userid;

	try {
		const rows = await sqlPool.query('CALL get_user_contact_info(?)', [userid]);
		const data = rows[0];
		res.status(200).send(data);
	} catch (err) {
		console.error(err);
		res.status(500).send('Request failed');
	}
}


async function createNewUser(req, res) {
	var firebase_uid = req.body.firebase_uid;
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var isFinder = req.body.isFinder;

	try {
		const response = await sqlPool.query('CALL create_new_app_user(?, ?, ?, ?)', [
			firebase_uid,
			first_name,
			last_name,
			isFinder
		]);

		res.status(200).send(response[0]);
	} catch (err) {
		console.log(err);
		res.status(500).send('Request failed');
	}
}

// async function createNewUser(req, res) {
// 	var user_name = req.body.user_name;
// 	var uid = req.body.uid;
// 	var user_id = req.body.user_id;
// 	var phone_num = req.body.phone_num;

// 	try {
// 		const response = await sqlPool.query('CALL create_user_info(?, ?, ?, ?)', [
// 			user_name,
// 			uid,
// 			user_id,
// 			phone_num,
// 		]);
// 		res.status(200).send(response[0]);
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).send('failed');
// 	}
// }

async function getUserIdNumber(req, res) {
	var uid = req.params.uid;

	try {
		const response = await sqlPool.query('CALL get_user_id_number(?)', [uid]);
		//get user_id
		const userIdNumber = response[0][0].user_id;
		res.status(200).json(userIdNumber);
	} catch (error) {
		console.log(error);
		res.status(500).send('getUserIdNumber failed');
	}
}

module.exports = {
	getUserContactInfo: getUserContactInfo,
	createNewUser: createNewUser,
	getUserIdNumber: getUserIdNumber,
};

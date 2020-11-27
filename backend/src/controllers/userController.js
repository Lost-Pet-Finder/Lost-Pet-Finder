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

module.exports = {
	getUserContactInfo: getUserContactInfo,
};

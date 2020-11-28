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

async function postUser(req, res){
	var uid = req.body.uid;
	var user_id = req.body.user_id;
	
	try{
		const response = await sqlPool.query(
			'CALL create_user_info(?, ?)',
			[uid, user_id]
		);
		res.status(200).send(response[0]);
	}catch(err){
		console.log(err);
		res.status(500).send("failed");
	}
	

}

module.exports = {
	getUserContactInfo: getUserContactInfo,
	postUser: postUser,
};

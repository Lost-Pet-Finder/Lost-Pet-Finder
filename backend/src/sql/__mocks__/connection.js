const {
	allReportsRowsFound,
	allReportsRowsLost,
	expectedPostLostPets,
	expectedPostFoundPets,
	myReportRowsLost,
	myReportRowsFound,
} = require('../../tests/testVariables');
// travis run for demo
// this is mocking for the sql database
const query = (string, userid) => {
	if (string === 'CALL get_all_lost_pets()') {
		return allReportsRowsLost;
	} else if (string === 'CALL get_all_found_pets()') {
		return allReportsRowsFound;
	} else if (
		string === 'CALL create_lost_pet_report(?, ?, POINT(?,?), ?, ?, ?)' &&
		// invalid month
		userid[4] !== '202099 0303'
	) {
		return expectedPostLostPets;
	} else if (
		string === 'CALL create_lost_pet_report(?, ?, POINT(?,?), ?, ?, ?)' &&
		// invalid month
		userid[4] === '202099 0303'
	) {
		return null;
	} else if (
		string === 'CALL create_found_pet_report(?, ?, POINT(?,?), ?, ?, ?)' &&
		// invalid month
		userid[4] !== '202099 0303'
	) {
		return expectedPostFoundPets;
	} else if (
		string === 'CALL create_found_pet_report(?, ?, POINT(?,?), ?, ?, ?)' &&
		// invalid month
		userid[4] === '202099 0303'
	) {
		return null;
	} else if (
		string === 'CALL get_users_found_reports(?)' &&
		userid != '99999'
	) {
		return myReportRowsLost;
	} else if (
		string === 'CALL get_users_found_reports(?)' &&
		userid == '99999'
	) {
		return [1];
	} else if (string === 'CALL get_users_lost_reports(?)' && userid != '99999') {
		return myReportRowsFound;
	} else if (string === 'CALL get_users_lost_reports(?)' && userid == '99999') {
		return [1];
	} else if (string === 'CALL get_user_contact_info(?)' && userid != '99999') {
		const data = [[0], [1]];
		return data;
	} else if (
		string === 'CALL create_new_app_user(?, ?, ?, ?)' &&
		userid[0] != '99999'
	) {
		const data = [[0], [1]];
		return data;
	} else if (
		string === 'CALL create_new_app_user(?, ?, ?, ?)' &&
		userid[0] == '99999'
	) {
		return null;
	} else if (string === 'CALL get_user_id_number(?)' && userid != '99999') {
		const data = [
			[{ user_id: 321 }],
			{
				fieldCount: 0,
				affectedRows: 0,
				insertId: 0,
				serverStatus: 2,
				warningCount: 0,
				message: '',
				protocol41: true,
				changedRows: 0,
			},
		];
		return data;
	} else if (
		string === 'CALL get_my_pending_requests(?)' &&
		userid != '99999'
	) {
		const data = [[0], [1]];
		return data;
	} else if (string === 'CALL get_my_sent_requests(?)' && userid != '99999') {
		const data = [[0], [1]];
		return data;
	} else if (string === 'CALL get_user_device_token(?)' && userid != '99999') {
		const data = [[0], [1]];
		return data;
	} else if (
		string === 'CALL upload_device_token(?,?)' &&
		userid[0] != '99999'
	) {
		const data = [[0], [1]];
		return data;
	} else if (
		string === 'CALL upload_device_token(?,?)' &&
		userid[0] == '99999'
	) {
		return null;
	} else if (string === 'CALL send_contact_request(?,?)') {
		return 1;
	} else if (string === 'CALL get_user_contact_info(?)' && userid != '99999') {
		return [
			[
				{
					user_id: 1,
					firebase_uid: null,
					first_name: 'Wren',
					last_name: 'Liang',
					isFinder: 1,
					fk_user_id: 1,
					email: 'wren@email.com',
					phone_number: null,
				},
			],
			{
				fieldCount: 0,
				affectedRows: 0,
				insertId: 0,
				serverStatus: 2,
				warningCount: 0,
				message: '',
				protocol41: true,
				changedRows: 0,
			},
		];
	} else if (
		string === 'CALL get_user_device_token(?)' &&
		userid[0] != '99999'
	) {
		return [[0], [1]];
	}
};

exports.query = query;

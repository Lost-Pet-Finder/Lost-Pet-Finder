const {
	allReportsRowsFound,
	allReportsRowsLost,
	expectedPostLostPets,
	expectedPostFoundPets,
	myReportRowsLost,
	myReportRowsFound,
} = require('../../tests/testVariables');

const query = (string, userid) => {
	if (string == 'CALL get_all_lost_pets()') {
		return allReportsRowsLost;
	} else if (string == 'CALL get_all_found_pets()') {
		return allReportsRowsFound;
	} else if (
		string == 'CALL create_lost_pet_report(?, ?, POINT(?,?), ?, ?, ?)' &&
		// invalid month
		userid[4] != '202099 0303'
	) {
		return expectedPostLostPets;
	} else if (
		string == 'CALL create_found_pet_report(?, ?, POINT(?,?), ?, ?, ?)' &&
		// invalid month
		userid[4] != '202099 0303'
	) {
		return expectedPostFoundPets;
	} else if (string == 'CALL get_users_found_reports(?)' && userid != 99999) {
		return myReportRowsLost;
	} else if (string == 'CALL get_users_lost_reports(?)' && userid != 99999) {
		return myReportRowsFound;
	} else if (string == 'CALL get_user_contact_info(?)' && userid != 99999) {
		const data = [[0], [1]];
		return data;
	}
};

exports.query = query;

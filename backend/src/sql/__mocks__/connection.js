const { allFoundPets, allLostPets } = require('../../tests/testVariables');
const field2 = {
	fieldCount: 0,
	affectedRows: 0,
	insertId: 0,
	serverStatus: 34,
	warningCount: 0,
	message: '',
	protocol41: true,
	changedRows: 0,
};
const query = string => {
	if (string == 'CALL get_all_lost_pets()') {
		return [allLostPets, field2];
	} else if (string == 'CALL get_all_found_pets()') {
		return [allFoundPets, field2];
	}
};

exports.query = query;

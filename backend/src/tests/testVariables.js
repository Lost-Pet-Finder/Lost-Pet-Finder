const allLostPets = [
	{
		report_id: 6,
		fk_user_id: 4,
		file_name:
			'hamster_recognises_as_rat_brown_and_white_on_white_background.jpg',
		location_x: 100,
		location_y: -100,
		report_date: '2020-10-24T05:45:00.000Z',
		tags: '["Animal","Rodent","Mammal","Rat","Hamster","Pet"]',
	},
	{
		report_id: 7,
		fk_user_id: 8,
		file_name: 'Labrador_Retriever_puppy_black_on_white_background.jpg',
		location_x: 100,
		location_y: -100,
		report_date: '2020-10-24T05:45:00.000Z',
		tags:
			'["Dog","Animal","Pet","Canine","Mammal","Labrador Retriever","Plant","Puppy"]',
	},
	{
		report_id: 8,
		fk_user_id: 9,
		file_name: 'golden_retriever_1.jpg',
		location_x: 100,
		location_y: -100,
		report_date: '2020-10-24T05:45:00.000Z',
		tags:
			'["Golden Retriever","Dog","Mammal","Pet","Animal","Canine","Plant","Grass","Puppy","Petal"]',
	},
	{
		report_id: 9,
		fk_user_id: 2,
		file_name:
			'Golden_Retriever_or_Labrador Retriever_gold_on_black_background.jpg',
		location_x: 100,
		location_y: -100,
		report_date: '2020-10-24T05:45:00.000Z',
		tags:
			'["Canine","Pet","Animal","Mammal","Dog","Puppy","Golden Retriever","Labrador Retriever"]',
	},
];

const allFoundPets = [
	{
		report_id: 25,
		fk_user_id: 3,
		file_name: 'Egyptian_Cat_dark_green_background.jpg',
		location_x: 123,
		location_y: -34,
		report_date: '2020-10-25T18:30:00.000Z',
		tags:
			'["Pet","Animal","Mammal","Cat","Jaguar","Panther","Wildlife","Leopard","Egyptian Cat"]',
	},
	{
		report_id: 30,
		fk_user_id: 5,
		file_name: 'pug_light_coat_white_background.jpg',
		location_x: 13,
		location_y: -55,
		report_date: '2020-10-23T17:30:00.000Z',
		tags: '["Canine","Pet","Mammal","Animal","Dog","Pug"]',
	},
	{
		report_id: 31,
		fk_user_id: 6,
		file_name: 'Labrador_Retriever_black_on_green_background.jpg',
		location_x: 55,
		location_y: -67,
		report_date: '2020-10-24T05:30:00.000Z',
		tags:
			'["Mammal","Pet","Labrador Retriever","Canine","Dog","Animal","Plant","Grass"]',
	},
	{
		report_id: 32,
		fk_user_id: 7,
		file_name: 'Hare_brown_on_green_and_brown_background.jpg',
		location_x: 100,
		location_y: -100,
		report_date: '2020-10-24T05:45:00.000Z',
		tags:
			'["Rodent","Hare","Animal","Mammal","Kangaroo","Rat","Plant","Tree","Rabbit","Vegetation"]',
	},
	{
		report_id: 36,
		fk_user_id: 1,
		file_name: 'image-5754bcc1-5919-4dee-85f6-8d74f6907345.jpg',
		location_x: 123,
		location_y: 123,
		report_date: '2020-10-10T17:13:00.000Z',
		tags: '["Green","First Aid","Plant","Art","Graphics"]',
	},
];

const expectedAllLostPets = [
	{
		information: {
			report_id: 6,
			fk_user_id: 4,
			file_name:
				'hamster_recognises_as_rat_brown_and_white_on_white_background.jpg',
			location_x: 100,
			location_y: -100,
			report_date: '2020-10-24T05:45:00.000Z',
			tags: '["Animal","Rodent","Mammal","Rat","Hamster","Pet"]',
		},
		colours: { totalColor: 1, croppedColor: 2, finalColor: 3 },
	},
	{
		information: {
			report_id: 7,
			fk_user_id: 8,
			file_name: 'Labrador_Retriever_puppy_black_on_white_background.jpg',
			location_x: 100,
			location_y: -100,
			report_date: '2020-10-24T05:45:00.000Z',
			tags:
				'["Dog","Animal","Pet","Canine","Mammal","Labrador Retriever","Plant","Puppy"]',
		},
		colours: { totalColor: 1, croppedColor: 2, finalColor: 3 },
	},
	{
		information: {
			report_id: 8,
			fk_user_id: 9,
			file_name: 'golden_retriever_1.jpg',
			location_x: 100,
			location_y: -100,
			report_date: '2020-10-24T05:45:00.000Z',
			tags:
				'["Golden Retriever","Dog","Mammal","Pet","Animal","Canine","Plant","Grass","Puppy","Petal"]',
		},
		colours: { totalColor: 1, croppedColor: 2, finalColor: 3 },
	},
	{
		information: {
			report_id: 9,
			fk_user_id: 2,
			file_name:
				'Golden_Retriever_or_Labrador Retriever_gold_on_black_background.jpg',
			location_x: 100,
			location_y: -100,
			report_date: '2020-10-24T05:45:00.000Z',
			tags:
				'["Canine","Pet","Animal","Mammal","Dog","Puppy","Golden Retriever","Labrador Retriever"]',
		},
		colours: { totalColor: 1, croppedColor: 2, finalColor: 3 },
	},
];

const expectedAllFoundPets = [
	{
		information: {
			report_id: 25,
			fk_user_id: 3,
			file_name: 'Egyptian_Cat_dark_green_background.jpg',
			location_x: 123,
			location_y: -34,
			report_date: '2020-10-25T18:30:00.000Z',
			tags:
				'["Pet","Animal","Mammal","Cat","Jaguar","Panther","Wildlife","Leopard","Egyptian Cat"]',
		},
		colours: { totalColor: 1, croppedColor: 2, finalColor: 3 },
	},
	{
		information: {
			report_id: 30,
			fk_user_id: 5,
			file_name: 'pug_light_coat_white_background.jpg',
			location_x: 13,
			location_y: -55,
			report_date: '2020-10-23T17:30:00.000Z',
			tags: '["Canine","Pet","Mammal","Animal","Dog","Pug"]',
		},
		colours: { totalColor: 1, croppedColor: 2, finalColor: 3 },
	},
	{
		information: {
			report_id: 31,
			fk_user_id: 6,
			file_name: 'Labrador_Retriever_black_on_green_background.jpg',
			location_x: 55,
			location_y: -67,
			report_date: '2020-10-24T05:30:00.000Z',
			tags:
				'["Mammal","Pet","Labrador Retriever","Canine","Dog","Animal","Plant","Grass"]',
		},
		colours: { totalColor: 1, croppedColor: 2, finalColor: 3 },
	},
	{
		information: {
			report_id: 32,
			fk_user_id: 7,
			file_name: 'Hare_brown_on_green_and_brown_background.jpg',
			location_x: 100,
			location_y: -100,
			report_date: '2020-10-24T05:45:00.000Z',
			tags:
				'["Rodent","Hare","Animal","Mammal","Kangaroo","Rat","Plant","Tree","Rabbit","Vegetation"]',
		},
		colours: { totalColor: 1, croppedColor: 2, finalColor: 3 },
	},
	{
		information: {
			report_id: 36,
			fk_user_id: 1,
			file_name: 'image-5754bcc1-5919-4dee-85f6-8d74f6907345.jpg',
			location_x: 123,
			location_y: 123,
			report_date: '2020-10-10T17:13:00.000Z',
			tags: '["Green","First Aid","Plant","Art","Graphics"]',
		},
		colours: { totalColor: 1, croppedColor: 2, finalColor: 3 },
	},
];

const expectedPostLostPets = [
	{
		report_id: 6,
		fk_user_id: 4,
		file_name: 'Hare_brown_on_green_and_brown_background.jpg',
		location_x: 100,
		location_y: 100,
		report_date: '2020-03-03T11:00:00.000Z',
		tags:
			'["Mammal","Rodent","Hare","Animal","Kangaroo","Rat","Tree","Plant","Rabbit","Vegetation"]',
	},
];

const expectedPostFoundPets = [
	{
		report_id: 104,
		fk_user_id: 4,
		file_name: 'beagle_brown_on_green_background.jpg',
		location_x: 100,
		location_y: 100,
		report_date: '2020-03-03T11:00:00.000Z',
		tags:
			'["Dog","Mammal","Canine","Animal","Pet","Hound","Strap","Beagle","Plant","Grass"]',
	},
];

exports.allFoundPets = allFoundPets;
exports.allLostPets = allLostPets;
exports.expectedAllFoundPets = expectedAllFoundPets;
exports.expectedAllLostPets = expectedAllLostPets;
exports.expectedPostLostPets = expectedPostLostPets;
exports.expectedPostFoundPets = expectedPostFoundPets;

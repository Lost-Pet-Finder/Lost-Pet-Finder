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
		'intersection score': 1,
		'colour score': 0,
		'date score': 1.125,
		'distance score': 0.4768832709379163,
		'total score': 2.6018832709379165,
		report: {
			report_id: 6,
			fk_user_id: 4,
			file_name: 'golden_retriever_puppy_white_background.jpg',
			location_x: -5,
			location_y: 5,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Dog","Confidence":99.93119812011719,"Instances":[{"BoundingBox":{"Width":0.6806460022926331,"Height":0.9031879305839539,"Left":0.14635495841503143,"Top":0.08928287774324417},"Confidence":99.66552734375}],"Parents":[{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Golden Retriever","Confidence":99.93119812011719,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Mammal","Confidence":99.93119812011719,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Pet","Confidence":99.93119812011719,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Canine","Confidence":99.93119812011719,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Puppy","Confidence":88.90184020996094,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]}]',
			colour: '[102.87407335659529,0,0]',
		},
	},
	{
		'intersection score': 0.5040370648848483,
		'colour score': 0.14735778010786882,
		'date score': 1.125,
		'distance score': 0.5230171759949982,
		'total score': 2.2994120209877154,
		report: {
			report_id: 9,
			fk_user_id: 2,
			file_name:
				'Golden_Retriever_or_Labrador Retriever_gold_on_black_background.jpg',
			location_x: 5,
			location_y: -5,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Pet","Confidence":97.96702575683594,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Canine","Confidence":97.96702575683594,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Dog","Confidence":97.96702575683594,"Instances":[{"BoundingBox":{"Width":0.3514426648616791,"Height":0.862496554851532,"Left":0.3017416000366211,"Top":0.1239473968744278},"Confidence":97.96702575683594}],"Parents":[{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Mammal","Confidence":97.96702575683594,"Instances":[],"Parents":[{"Name":"Animal"}]}]',
			colour: '[199.0583161637345,182.71780415364,154.7132645020712]',
		},
	},
	{
		'intersection score': 0.06871068272662594,
		'colour score': 0.44460074958525775,
		'date score': 1.125,
		'distance score': 0,
		'total score': 1.6383114323118837,
		report: {
			report_id: 72,
			fk_user_id: 6,
			file_name:
				'hamster_recognises_as_rat_brown_and_white_on_white_background.jpg',
			location_x: -100,
			location_y: 100,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Rodent","Confidence":99.64495849609375,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Rat","Confidence":99.64495849609375,"Instances":[{"BoundingBox":{"Width":0.8926114439964294,"Height":0.8437602519989014,"Left":0.046223968267440796,"Top":0.07350796461105347},"Confidence":99.64495849609375}],"Parents":[{"Name":"Rodent"},{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Mammal","Confidence":99.64495849609375,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Pet","Confidence":96.07550048828125,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Hamster","Confidence":96.07550048828125,"Instances":[],"Parents":[{"Name":"Pet"},{"Name":"Rodent"},{"Name":"Animal"},{"Name":"Mammal"}]}]',
			colour: '[194,144,110]',
		},
	},
	{
		'intersection score': 0.06871068272662594,
		'colour score': 0.44460074958525775,
		'date score': 0,
		'distance score': 0,
		'total score': 0.5133114323118837,
		report: {
			report_id: 79,
			fk_user_id: 8,
			file_name:
				'hamster_recognises_as_rat_brown_and_white_on_white_background.jpg',
			location_x: -100,
			location_y: 100,
			report_date: '2020-10-24T05:00:00.000Z',
			tags:
				'[{"Name":"Rat","Confidence":99.64495849609375,"Instances":[{"BoundingBox":{"Width":0.8926114439964294,"Height":0.8437602519989014,"Left":0.046223968267440796,"Top":0.07350796461105347},"Confidence":99.64495849609375}],"Parents":[{"Name":"Rodent"},{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Mammal","Confidence":99.64495849609375,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Rodent","Confidence":99.64495849609375,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Hamster","Confidence":96.07549285888672,"Instances":[],"Parents":[{"Name":"Pet"},{"Name":"Rodent"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Pet","Confidence":96.07549285888672,"Instances":[],"Parents":[{"Name":"Animal"}]}]',
			colour: '[194,144,110]',
		},
	},
];

const expectedAllFoundPets = [
	{
		'intersection score': 1,
		'colour score': 0.2023188956441851,
		'date score': 1,
		'distance score': 0.5919278607974855,
		'total score': 2.7942467564416704,
		report: {
			report_id: 136,
			fk_user_id: 9,
			file_name: 'beagle_brown_on_green_background.jpg',
			location_x: 30,
			location_y: -30,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Mammal","Confidence":99.278076171875,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Dog","Confidence":99.278076171875,"Instances":[{"BoundingBox":{"Width":0.5215181112289429,"Height":0.9092578887939453,"Left":0.3343014717102051,"Top":0.08954165130853653},"Confidence":99.278076171875}],"Parents":[{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Canine","Confidence":99.278076171875,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Pet","Confidence":99.278076171875,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Hound","Confidence":96.73748779296875,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Beagle","Confidence":85.5204086303711,"Instances":[],"Parents":[{"Name":"Hound"},{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]}]',
			colour: '[139.9319531379669,128.15998464862733,89.72076431019188]',
		},
	},
	{
		'intersection score': 1,
		'colour score': 0.44205205376989676,
		'date score': 1,
		'distance score': 0.3029494557604161,
		'total score': 2.745001509530313,
		report: {
			report_id: 25,
			fk_user_id: 3,
			file_name: 'golden_retriever_1.jpg',
			location_x: 50,
			location_y: -50,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Golden Retriever","Confidence":97.96170043945312,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Pet","Confidence":97.96170043945312,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Dog","Confidence":97.96170043945312,"Instances":[{"BoundingBox":{"Width":0.4124910533428192,"Height":0.8911957144737244,"Left":0.37933990359306335,"Top":0.06452146172523499},"Confidence":96.86699676513672}],"Parents":[{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Canine","Confidence":97.96170043945312,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Mammal","Confidence":97.96170043945312,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Puppy","Confidence":91.53665924072266,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]}]',
			colour: '[159.23315999495415,147.89379812006837,105.37274528534468]',
		},
	},
	{
		'intersection score': 0.13632069447575942,
		'colour score': 0.7943971987699116,
		'date score': 1,
		'distance score': 0.12856414373172198,
		'total score': 2.059282036977393,
		report: {
			report_id: 32,
			fk_user_id: 7,
			file_name: 'Angora_cat_white_on_black_background.jpg',
			location_x: 120,
			location_y: -120,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Angora","Confidence":99.82673645019531,"Instances":[],"Parents":[{"Name":"Cat"},{"Name":"Pet"},{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Pet","Confidence":99.82673645019531,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Cat","Confidence":99.82673645019531,"Instances":[{"BoundingBox":{"Width":0.5458534955978394,"Height":0.8973807096481323,"Left":0.4498128890991211,"Top":0.0913671925663948},"Confidence":98.32957458496094}],"Parents":[{"Name":"Pet"},{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Mammal","Confidence":99.82673645019531,"Instances":[],"Parents":[{"Name":"Animal"}]}]',
			colour: '[183.7505545192625,181.50454438779036,176.50379030579967]',
		},
	},
	{
		'intersection score': 0.13632069447575942,
		'colour score': 0.329141599951805,
		'date score': 1,
		'distance score': 0.12856414373172198,
		'total score': 1.5940264381592864,
		report: {
			report_id: 30,
			fk_user_id: 5,
			file_name: 'Angora_cat_white_on_black_background_1.jpg',
			location_x: 120,
			location_y: -120,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Angora","Confidence":98.75231170654297,"Instances":[],"Parents":[{"Name":"Cat"},{"Name":"Pet"},{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Pet","Confidence":98.75231170654297,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Mammal","Confidence":98.75231170654297,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Cat","Confidence":98.75231170654297,"Instances":[{"BoundingBox":{"Width":0.6037029027938843,"Height":0.7648425698280334,"Left":0.23442380130290985,"Top":0.1497994214296341},"Confidence":97.71615600585938}],"Parents":[{"Name":"Pet"},{"Name":"Mammal"},{"Name":"Animal"}]}]',
			colour: '[228,225,225]',
		},
	},
	{
		'intersection score': 1,
		'colour score': 0,
		'date score': 0,
		'distance score': 0,
		'total score': 1,
		report: {
			report_id: 36,
			fk_user_id: 1,
			file_name: 'golden_retriever_0.jpg',
			location_x: 100,
			location_y: -100,
			report_date: '2020-10-24T05:45:00.000Z',
			tags:
				'[{"Name":"Golden Retriever","Confidence":99.92089080810547,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Dog","Confidence":99.92089080810547,"Instances":[{"BoundingBox":{"Width":0.795416533946991,"Height":0.9852829575538635,"Left":0.2038021981716156,"Top":0.013343391939997673},"Confidence":99.48686218261719}],"Parents":[{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Mammal","Confidence":99.92089080810547,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Canine","Confidence":99.92089080810547,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Pet","Confidence":99.92089080810547,"Instances":[],"Parents":[{"Name":"Animal"}]}]',
			colour: '[133.0025103981049,139.7805982738323,51.739317331813595]',
		},
	},
];

const expectedPostLostPets = [
	[
		{
			report_id: 79,
			fk_user_id: 8,
			file_name: 'Hare_brown_on_green_and_brown_background.jpg',
			location_x: 100,
			location_y: 100,
			report_date: '2020-03-03T11:00:00.000Z',
			tags:
				'[{"Name":"Mammal","Confidence":96.85425567626953,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Hare","Confidence":96.85425567626953,"Instances":[],"Parents":[{"Name":"Rodent"},{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Rodent","Confidence":96.85425567626953,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]}]',
			colour: '[97,93,70]',
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
const expectedPostFoundPets = [
	[
		{
			report_id: 79,
			fk_user_id: 8,
			file_name: 'Hare_brown_on_green_and_brown_background.jpg',
			location_x: 100,
			location_y: 100,
			report_date: '2020-03-03T11:00:00.000Z',
			tags:
				'[{"Name":"Mammal","Confidence":96.85425567626953,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Hare","Confidence":96.85425567626953,"Instances":[],"Parents":[{"Name":"Rodent"},{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Rodent","Confidence":96.85425567626953,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]}]',
			colour: '[97,93,70]',
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

const myReportRowsLost = [
	[
		{
			report_id: 36,
			fk_user_id: 1,
			file_name: 'golden_retriever_0.jpg',
			location_x: 100,
			location_y: -100,
			report_date: '2020-10-24T05:45:00.000Z',
			tags:
				'[{"Name":"Golden Retriever","Confidence":99.92089080810547,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Dog","Confidence":99.92089080810547,"Instances":[{"BoundingBox":{"Width":0.795416533946991,"Height":0.9852829575538635,"Left":0.2038021981716156,"Top":0.013343391939997673},"Confidence":99.48686218261719}],"Parents":[{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Mammal","Confidence":99.92089080810547,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Canine","Confidence":99.92089080810547,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Pet","Confidence":99.92089080810547,"Instances":[],"Parents":[{"Name":"Animal"}]}]',
			colour: '[133.0025103981049,139.7805982738323,51.739317331813595]',
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

const myReportRowsFound = [
	[
		{
			report_id: 9,
			fk_user_id: 2,
			file_name:
				'Golden_Retriever_or_Labrador Retriever_gold_on_black_background.jpg',
			location_x: 5,
			location_y: -5,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Pet","Confidence":97.96702575683594,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Canine","Confidence":97.96702575683594,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Dog","Confidence":97.96702575683594,"Instances":[{"BoundingBox":{"Width":0.3514426648616791,"Height":0.862496554851532,"Left":0.3017416000366211,"Top":0.1239473968744278},"Confidence":97.96702575683594}],"Parents":[{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Mammal","Confidence":97.96702575683594,"Instances":[],"Parents":[{"Name":"Animal"}]}]',
			colour: '[199.0583161637345,182.71780415364,154.7132645020712]',
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

const allReportsRowsLost = [
	[
		{
			report_id: 6,
			fk_user_id: 4,
			file_name: 'golden_retriever_puppy_white_background.jpg',
			location_x: -5,
			location_y: 5,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Dog","Confidence":99.93119812011719,"Instances":[{"BoundingBox":{"Width":0.6806460022926331,"Height":0.9031879305839539,"Left":0.14635495841503143,"Top":0.08928287774324417},"Confidence":99.66552734375}],"Parents":[{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Golden Retriever","Confidence":99.93119812011719,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Mammal","Confidence":99.93119812011719,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Pet","Confidence":99.93119812011719,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Canine","Confidence":99.93119812011719,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Puppy","Confidence":88.90184020996094,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]}]',
			colour: '[102.87407335659529,0,0]',
		},
		{
			report_id: 9,
			fk_user_id: 2,
			file_name:
				'Golden_Retriever_or_Labrador Retriever_gold_on_black_background.jpg',
			location_x: 5,
			location_y: -5,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Pet","Confidence":97.96702575683594,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Canine","Confidence":97.96702575683594,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Dog","Confidence":97.96702575683594,"Instances":[{"BoundingBox":{"Width":0.3514426648616791,"Height":0.862496554851532,"Left":0.3017416000366211,"Top":0.1239473968744278},"Confidence":97.96702575683594}],"Parents":[{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Mammal","Confidence":97.96702575683594,"Instances":[],"Parents":[{"Name":"Animal"}]}]',
			colour: '[199.0583161637345,182.71780415364,154.7132645020712]',
		},
		{
			report_id: 72,
			fk_user_id: 6,
			file_name:
				'hamster_recognises_as_rat_brown_and_white_on_white_background.jpg',
			location_x: -100,
			location_y: 100,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Rodent","Confidence":99.64495849609375,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Rat","Confidence":99.64495849609375,"Instances":[{"BoundingBox":{"Width":0.8926114439964294,"Height":0.8437602519989014,"Left":0.046223968267440796,"Top":0.07350796461105347},"Confidence":99.64495849609375}],"Parents":[{"Name":"Rodent"},{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Mammal","Confidence":99.64495849609375,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Pet","Confidence":96.07550048828125,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Hamster","Confidence":96.07550048828125,"Instances":[],"Parents":[{"Name":"Pet"},{"Name":"Rodent"},{"Name":"Animal"},{"Name":"Mammal"}]}]',
			colour: '[194,144,110]',
		},
		{
			report_id: 79,
			fk_user_id: 8,
			file_name:
				'hamster_recognises_as_rat_brown_and_white_on_white_background.jpg',
			location_x: -100,
			location_y: 100,
			report_date: '2020-10-24T05:00:00.000Z',
			tags:
				'[{"Name":"Rat","Confidence":99.64495849609375,"Instances":[{"BoundingBox":{"Width":0.8926114439964294,"Height":0.8437602519989014,"Left":0.046223968267440796,"Top":0.07350796461105347},"Confidence":99.64495849609375}],"Parents":[{"Name":"Rodent"},{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Mammal","Confidence":99.64495849609375,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Rodent","Confidence":99.64495849609375,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Hamster","Confidence":96.07549285888672,"Instances":[],"Parents":[{"Name":"Pet"},{"Name":"Rodent"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Pet","Confidence":96.07549285888672,"Instances":[],"Parents":[{"Name":"Animal"}]}]',
			colour: '[194,144,110]',
		},
	],
	{
		fieldCount: 0,
		affectedRows: 0,
		insertId: 0,
		serverStatus: 34,
		warningCount: 0,
		message: '',
		protocol41: true,
		changedRows: 0,
	},
];

const allReportsRowsFound = [
	[
		{
			report_id: 25,
			fk_user_id: 3,
			file_name: 'golden_retriever_1.jpg',
			location_x: 50,
			location_y: -50,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Golden Retriever","Confidence":97.96170043945312,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Pet","Confidence":97.96170043945312,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Dog","Confidence":97.96170043945312,"Instances":[{"BoundingBox":{"Width":0.4124910533428192,"Height":0.8911957144737244,"Left":0.37933990359306335,"Top":0.06452146172523499},"Confidence":96.86699676513672}],"Parents":[{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Canine","Confidence":97.96170043945312,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Mammal","Confidence":97.96170043945312,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Puppy","Confidence":91.53665924072266,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]}]',
			colour: '[159.23315999495415,147.89379812006837,105.37274528534468]',
		},
		{
			report_id: 30,
			fk_user_id: 5,
			file_name: 'Angora_cat_white_on_black_background_1.jpg',
			location_x: 120,
			location_y: -120,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Angora","Confidence":98.75231170654297,"Instances":[],"Parents":[{"Name":"Cat"},{"Name":"Pet"},{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Pet","Confidence":98.75231170654297,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Mammal","Confidence":98.75231170654297,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Cat","Confidence":98.75231170654297,"Instances":[{"BoundingBox":{"Width":0.6037029027938843,"Height":0.7648425698280334,"Left":0.23442380130290985,"Top":0.1497994214296341},"Confidence":97.71615600585938}],"Parents":[{"Name":"Pet"},{"Name":"Mammal"},{"Name":"Animal"}]}]',
			colour: '[228,225,225]',
		},
		{
			report_id: 32,
			fk_user_id: 7,
			file_name: 'Angora_cat_white_on_black_background.jpg',
			location_x: 120,
			location_y: -120,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Angora","Confidence":99.82673645019531,"Instances":[],"Parents":[{"Name":"Cat"},{"Name":"Pet"},{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Pet","Confidence":99.82673645019531,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Cat","Confidence":99.82673645019531,"Instances":[{"BoundingBox":{"Width":0.5458534955978394,"Height":0.8973807096481323,"Left":0.4498128890991211,"Top":0.0913671925663948},"Confidence":98.32957458496094}],"Parents":[{"Name":"Pet"},{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Mammal","Confidence":99.82673645019531,"Instances":[],"Parents":[{"Name":"Animal"}]}]',
			colour: '[183.7505545192625,181.50454438779036,176.50379030579967]',
		},
		{
			report_id: 36,
			fk_user_id: 1,
			file_name: 'golden_retriever_0.jpg',
			location_x: 100,
			location_y: -100,
			report_date: '2020-10-24T05:45:00.000Z',
			tags:
				'[{"Name":"Golden Retriever","Confidence":99.92089080810547,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Dog","Confidence":99.92089080810547,"Instances":[{"BoundingBox":{"Width":0.795416533946991,"Height":0.9852829575538635,"Left":0.2038021981716156,"Top":0.013343391939997673},"Confidence":99.48686218261719}],"Parents":[{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Mammal","Confidence":99.92089080810547,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Canine","Confidence":99.92089080810547,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Pet","Confidence":99.92089080810547,"Instances":[],"Parents":[{"Name":"Animal"}]}]',
			colour: '[133.0025103981049,139.7805982738323,51.739317331813595]',
		},
		{
			report_id: 136,
			fk_user_id: 9,
			file_name: 'beagle_brown_on_green_background.jpg',
			location_x: 30,
			location_y: -30,
			report_date: '2020-10-24T05:50:00.000Z',
			tags:
				'[{"Name":"Mammal","Confidence":99.278076171875,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Dog","Confidence":99.278076171875,"Instances":[{"BoundingBox":{"Width":0.5215181112289429,"Height":0.9092578887939453,"Left":0.3343014717102051,"Top":0.08954165130853653},"Confidence":99.278076171875}],"Parents":[{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Canine","Confidence":99.278076171875,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Pet","Confidence":99.278076171875,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Hound","Confidence":96.73748779296875,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Beagle","Confidence":85.5204086303711,"Instances":[],"Parents":[{"Name":"Hound"},{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]}]',
			colour: '[139.9319531379669,128.15998464862733,89.72076431019188]',
		},
	],
	{
		fieldCount: 0,
		affectedRows: 0,
		insertId: 0,
		serverStatus: 34,
		warningCount: 0,
		message: '',
		protocol41: true,
		changedRows: 0,
	},
];

exports.allFoundPets = allFoundPets;
exports.allLostPets = allLostPets;
exports.expectedAllFoundPets = expectedAllFoundPets;
exports.expectedAllLostPets = expectedAllLostPets;
exports.expectedPostLostPets = expectedPostLostPets;
exports.expectedPostFoundPets = expectedPostFoundPets;
exports.myReportRowsLost = myReportRowsLost;
exports.myReportRowsFound = myReportRowsFound;
exports.allReportsRowsLost = allReportsRowsLost;
exports.allReportsRowsFound = allReportsRowsFound;

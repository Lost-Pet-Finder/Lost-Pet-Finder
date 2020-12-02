const request = require('supertest');
const server = require('../app');
const pool = require('../sql/connection');
const {
	filterForConfidence,
	getIntersection,
	getDateScore,
	filterForPets,
	getColour,
	validBoxes,
	getAWSTags,
	noBox,
	errorBox,
	getColourScore,
	getIntersectionScore,
	getDistanceScore,
} = require('../util/awsFunctions');
const { getAWStagsConst } = require('./awsFunctionsTestVariable');
jest.setTimeout(100000);

function tagsSame(a, b) {
	var y = a.toString().split('').sort().join(''),
		z = b.toString().split('').sort().join('');
	return z === y ? true : false;
}

// // something
afterAll(done => {
	server.close(done);
	pool.end(done);
});

test('errorBox', async done => {
	tagData = {
		Labels: [
			{
				Name: 'Pet',
				Confidence: 99.63221740722656,
				Instances: [],
				Parents: [
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Animal',
				Confidence: 99.63221740722656,
				Instances: [],
				Parents: [],
			},
			{
				Name: 'Mammal',
				Confidence: 99.63221740722656,
				Instances: [],
				Parents: [
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Dog',
				Confidence: 99.63221740722656,
				Instances: [
					{
						BoundingBox: {
							Width: 0.26995769143104553,
							Height: 0.6557824611663818,
							Left: 0.32899677753448486,
							Top: 0.3263208568096161,
						},
						Confidence: 98.18276977539062,
					},
					{
						BoundingBox: {
							Width: 0.23880265653133392,
							Height: 0.5983842611312866,
							Left: 0.17956575751304626,
							Top: 0.38279131054878235,
						},
						Confidence: 97.55904388427734,
					},
					{
						BoundingBox: {
							Width: 0.24894067645072937,
							Height: 0.5886661410331726,
							Left: 0.5302332043647766,
							Top: 0.38870927691459656,
						},
						Confidence: 97.37198638916016,
					},
					{
						BoundingBox: {
							Width: 0.30485081672668457,
							Height: 0.6180295944213867,
							Left: 0.6901296377182007,
							Top: 0.3703455328941345,
						},
						Confidence: 95.59954833984375,
					},
					{
						BoundingBox: {
							Width: 0.2402619570493698,
							Height: 0.6258224248886108,
							Left: 0.01645381934940815,
							Top: 0.3548857569694519,
						},
						Confidence: 95.38980865478516,
					},
				],
				Parents: [
					{
						Name: 'Pet',
					},
					{
						Name: 'Canine',
					},
					{
						Name: 'Animal',
					},
					{
						Name: 'Mammal',
					},
				],
			},
			{
				Name: 'Canine',
				Confidence: 99.63221740722656,
				Instances: [],
				Parents: [
					{
						Name: 'Mammal',
					},
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Puppy',
				Confidence: 99.63221740722656,
				Instances: [],
				Parents: [
					{
						Name: 'Dog',
					},
					{
						Name: 'Pet',
					},
					{
						Name: 'Canine',
					},
					{
						Name: 'Animal',
					},
					{
						Name: 'Mammal',
					},
				],
			},
			{
				Name: 'Golden Retriever',
				Confidence: 93.58879852294922,
				Instances: [],
				Parents: [
					{
						Name: 'Dog',
					},
					{
						Name: 'Pet',
					},
					{
						Name: 'Canine',
					},
					{
						Name: 'Animal',
					},
					{
						Name: 'Mammal',
					},
				],
			},
		],
		LabelModelVersion: '2.0',
	};
	var boxes = [];

	tagData.Labels.forEach(label => {
		boxes.push(label);
	});

	box = await validBoxes(boxes);
	expect(box).toBe(errorBox);
	done();
});

test('noBox', async done => {
	tagData = {
		Labels: [
			{
				Name: 'Mammal',
				Confidence: 88.10366821289062,
				Instances: [],
				Parents: [
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Animal',
				Confidence: 88.10366821289062,
				Instances: [],
				Parents: [],
			},
			{
				Name: 'Rabbit',
				Confidence: 81.39126586914062,
				Instances: [],
				Parents: [
					{
						Name: 'Rodent',
					},
					{
						Name: 'Mammal',
					},
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Rodent',
				Confidence: 81.39126586914062,
				Instances: [],
				Parents: [
					{
						Name: 'Mammal',
					},
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Bunny',
				Confidence: 81.39126586914062,
				Instances: [],
				Parents: [
					{
						Name: 'Rodent',
					},
					{
						Name: 'Mammal',
					},
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Pet',
				Confidence: 68.93390655517578,
				Instances: [],
				Parents: [
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Sleeping',
				Confidence: 56.7302360534668,
				Instances: [],
				Parents: [],
			},
			{
				Name: 'Asleep',
				Confidence: 56.7302360534668,
				Instances: [],
				Parents: [],
			},
		],
		LabelModelVersion: '2.0',
	};
	var boxes = [];

	tagData.Labels.forEach(label => {
		boxes.push(label);
	});

	box = await validBoxes(boxes);
	expect(box).toBe(noBox);
	done();
});

test('normal box', async done => {
	tagData = {
		Labels: [
			{
				Name: 'Pet',
				Confidence: 98.75236511230469,
				Instances: [],
				Parents: [
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Angora',
				Confidence: 98.75236511230469,
				Instances: [],
				Parents: [
					{
						Name: 'Cat',
					},
					{
						Name: 'Pet',
					},
					{
						Name: 'Mammal',
					},
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Mammal',
				Confidence: 98.75236511230469,
				Instances: [],
				Parents: [
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Animal',
				Confidence: 98.75236511230469,
				Instances: [],
				Parents: [],
			},
			{
				Name: 'Cat',
				Confidence: 98.75236511230469,
				Instances: [
					{
						BoundingBox: {
							Width: 0.6037029027938843,
							Height: 0.7648425698280334,
							Left: 0.23442380130290985,
							Top: 0.1497994214296341,
						},
						Confidence: 97.71615600585938,
					},
				],
				Parents: [
					{
						Name: 'Pet',
					},
					{
						Name: 'Mammal',
					},
					{
						Name: 'Animal',
					},
				],
			},
		],
		LabelModelVersion: '2.0',
	};
	var boxes = [];

	tagData.Labels.forEach(label => {
		boxes.push(label);
	});

	box = await validBoxes(boxes);
	expectedColour = {
		Width: 0.6037029027938843,
		Height: 0.7648425698280334,
		Left: 0.23442380130290985,
		Top: 0.1497994214296341,
	};
	expect(box).toStrictEqual(expectedColour);
	done();
});

test('two boxes', async done => {
	tagData = {
		Labels: [
			{
				Name: 'Cat',
				Confidence: 92.57097625732422,
				Instances: [
					{
						BoundingBox: {
							Width: 0.6108936667442322,
							Height: 0.9516386389732361,
							Left: 0.14043430984020233,
							Top: 0.04057978838682175,
						},
						Confidence: 67.11946105957031,
					},
				],
				Parents: [
					{
						Name: 'Pet',
					},
					{
						Name: 'Mammal',
					},
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Animal',
				Confidence: 92.57097625732422,
				Instances: [],
				Parents: [],
			},
			{
				Name: 'Pet',
				Confidence: 92.57097625732422,
				Instances: [],
				Parents: [
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Mammal',
				Confidence: 92.57097625732422,
				Instances: [],
				Parents: [
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Kitten',
				Confidence: 86.38482666015625,
				Instances: [],
				Parents: [
					{
						Name: 'Cat',
					},
					{
						Name: 'Pet',
					},
					{
						Name: 'Mammal',
					},
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Abyssinian',
				Confidence: 84.37126922607422,
				Instances: [],
				Parents: [
					{
						Name: 'Cat',
					},
					{
						Name: 'Pet',
					},
					{
						Name: 'Mammal',
					},
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Leopard',
				Confidence: 77.34283447265625,
				Instances: [],
				Parents: [
					{
						Name: 'Wildlife',
					},
					{
						Name: 'Mammal',
					},
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Wildlife',
				Confidence: 77.34283447265625,
				Instances: [],
				Parents: [
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Jaguar',
				Confidence: 77.34283447265625,
				Instances: [],
				Parents: [
					{
						Name: 'Wildlife',
					},
					{
						Name: 'Mammal',
					},
					{
						Name: 'Animal',
					},
				],
			},
			{
				Name: 'Panther',
				Confidence: 77.34283447265625,
				Instances: [
					{
						BoundingBox: {
							Width: 0.6285470724105835,
							Height: 0.9082770347595215,
							Left: 0.13671883940696716,
							Top: 0.061898574233055115,
						},
						Confidence: 77.34283447265625,
					},
				],
				Parents: [
					{
						Name: 'Wildlife',
					},
					{
						Name: 'Mammal',
					},
					{
						Name: 'Animal',
					},
				],
			},
		],
		LabelModelVersion: '2.0',
	};
	var boxes = [];

	tagData.Labels.forEach(label => {
		boxes.push(label);
	});

	box = await validBoxes(boxes);
	expectedColour = {
		Width: 0.6285470724105835,
		Height: 0.9082770347595215,
		Left: 0.13671883940696716,
		Top: 0.061898574233055115,
	};
	expect(box).toStrictEqual(expectedColour);
	done();
});

test('getAwsTags error', async done => {
	var data = {
		bucketName: 'lostpetpictures',
		fileName: 'nothing',
	};
	var result = await getAWSTags(data);
	expect(result).toBe(null);
	done();
});

test('getAwsTags', async done => {
	var data = {
		bucketName: 'lostpetpictures',
		fileName:
			'Golden_Retriever_or_Labrador Retriever_gold_on_black_background.jpg',
	};
	var result = await getAWSTags(data);
	same = tagsSame(result, getAWStagsConst);
	expect(same).toStrictEqual(true);
	done();
});

// when catch an error
test('gobbletestAWS', async done => {
	colour = await getColour('invalid', 'invalid');
	expect(colour).toBe(null);
	done();
});

// pass an empty data array
test('filterForPets err', async done => {
	data = [];
	result = await filterForPets(data);
	expect(result).toStrictEqual(data);
	done();
});

// pass an empty data array
test('filterForConfidence err', async done => {
	data = [];
	result = await filterForConfidence(data);
	expect(result).toStrictEqual(data);
	done();
});

test('filterforconfidence', async done => {
	var data = [
		{
			Confidence: 97.96702575683594,
			Instances: [],
			Name: 'Canine',
			Parents: [{ Name: 'Mammal' }, { Name: 'Animal' }],
		},
		{
			Confidence: 97.96702575683594,
			Instances: [
				{
					BoundingBox: {
						Height: 0.862496554851532,
						Left: 0.3017416000366211,
						Top: 0.1239473968744278,
						Width: 0.3514426648616791,
					},
					Confidence: 97.96702575683594,
				},
			],
			Name: 'Dog',
			Parents: [
				{ Name: 'Pet' },
				{ Name: 'Canine' },
				{ Name: 'Animal' },
				{ Name: 'Mammal' },
			],
		},
		{
			Confidence: 97.96702575683594,
			Instances: [],
			Name: 'Mammal',
			Parents: [{ Name: 'Animal' }],
		},
		{
			Confidence: 97.96702575683594,
			Instances: [],
			Name: 'Pet',
			Parents: [{ Name: 'Animal' }],
		},
		{
			Confidence: 97.96702575683594,
			Instances: [],
			Name: 'Animal',
			Parents: [],
		},
	];
	var result = await filterForConfidence(getAWStagsConst);
	same = tagsSame(result, data);
	expect(same).toStrictEqual(true);
	done();
});

function withinTolerance(actual, expected) {
	return Math.abs(actual - expected) < 0.1;
}

function withinToleranceDate(actual, expected) {
	return Math.abs(actual - expected) <= 2;
}

test('getColourScore', async done => {
	colour0 = [255, 255, 255];
	colour1 = [0, 0, 0];
	result = await getColourScore(colour0, colour1);
	ans = withinToleranceColor(result, 441.67);
	expect(ans).toStrictEqual(true);
	done();
});

function withinToleranceColor(expectedColour, actualColour) {
	dist = Math.sqrt(
		Math.pow(expectedColour[0] - actualColour[0], 2) +
			Math.pow(expectedColour[1] - actualColour[1], 2) +
			Math.pow(expectedColour[2] - actualColour[2], 2)
	);
	if (dist > 30) {
		return false;
	}

	return true;
}
// get color functions
test('brown on white negative', async done => {
	validBox = {
		BoundingBox: {
			Width: 0.68,
			Height: 0.903,
			Left: 0.146,
			Top: 0.089,
		},
	};
	colour = await getColour(
		'lostpetpictures',
		'golden_retriever_puppy_white_background.jpg',
		validBox
	);
	expectedColour = [0, 0, 0];
	result = withinTolerance(expectedColour, colour.finalColor);
	expect(result).toBe(false);
	done();
});

test('getDataScore', async done => {
	date0 = '2020-10-23 22:50:00';
	date1 = '2020-03-03 03:00:00';
	result = await getDateScore(date0, date1);
	console.log('-----------------------------');
	console.log(result);
	ans = withinToleranceDate(result, 5634.8);
	expect(ans).toBe(true);
	done();
});

test('getIntersectionScore', async done => {
	colour0 = [
		{
			Confidence: 97.96702575683594,
			Instances: [],
			Name: 'Canine',
			Parents: [{ Name: 'Mammal' }, { Name: 'Animal' }],
		},
		{
			Confidence: 97.96702575683594,
			Instances: [
				{
					BoundingBox: {
						Height: 0.862496554851532,
						Left: 0.3017416000366211,
						Top: 0.1239473968744278,
						Width: 0.3514426648616791,
					},
					Confidence: 97.96702575683594,
				},
			],
			Name: 'Dog',
			Parents: [
				{ Name: 'Pet' },
				{ Name: 'Canine' },
				{ Name: 'Animal' },
				{ Name: 'Mammal' },
			],
		},
		{
			Confidence: 97.96702575683594,
			Instances: [],
			Name: 'Mammal',
			Parents: [{ Name: 'Animal' }],
		},
		{
			Confidence: 97.96702575683594,
			Instances: [],
			Name: 'Pet',
			Parents: [{ Name: 'Animal' }],
		},
		{
			Confidence: 97.96702575683594,
			Instances: [],
			Name: 'Animal',
			Parents: [],
		},
	];
	colour1 = [
		{
			Confidence: 97.96702575683594,
			Instances: [],
			Name: 'Canine',
			Parents: [{ Name: 'Mammal' }, { Name: 'Animal' }],
		},
		{
			Confidence: 97.96702575683594,
			Instances: [
				{
					BoundingBox: {
						Height: 0.862496554851532,
						Left: 0.3017416000366211,
						Top: 0.1239473968744278,
						Width: 0.3514426648616791,
					},
					Confidence: 97.96702575683594,
				},
			],
			Name: 'Dog',
			Parents: [
				{ Name: 'Pet' },
				{ Name: 'Canine' },
				{ Name: 'Animal' },
				{ Name: 'Mammal' },
			],
		},
		{
			Confidence: 97.96702575683594,
			Instances: [],
			Name: 'Mammal',
			Parents: [{ Name: 'Animal' }],
		},
		{
			Confidence: 97.96702575683594,
			Instances: [],
			Name: 'Pet',
			Parents: [{ Name: 'Animal' }],
		},
		{
			Confidence: 97.96702575683594,
			Instances: [],
			Name: 'Animal',
			Parents: [],
		},
	];
	result = await getIntersectionScore(colour0, colour1);
	ans = withinTolerance(result, 16.9);
	expect(ans).toStrictEqual(true);
	done();
});

test('filterforpets', async done => {
	tagData = [
		{
			Name: 'Mammal',
			Confidence: 88.10366821289062,
			Instances: [],
			Parents: [
				{
					Name: 'Animal',
				},
			],
		},
		{
			Name: 'Animal',
			Confidence: 88.10366821289062,
			Instances: [],
			Parents: [],
		},
		{
			Name: 'Rabbit',
			Confidence: 81.39126586914062,
			Instances: [],
			Parents: [
				{
					Name: 'Rodent',
				},
				{
					Name: 'Mammal',
				},
				{
					Name: 'Animal',
				},
			],
		},
		{
			Name: 'Rodent',
			Confidence: 81.39126586914062,
			Instances: [],
			Parents: [
				{
					Name: 'Mammal',
				},
				{
					Name: 'Animal',
				},
			],
		},
		{
			Name: 'Bunny',
			Confidence: 81.39126586914062,
			Instances: [],
			Parents: [
				{
					Name: 'Rodent',
				},
				{
					Name: 'Mammal',
				},
				{
					Name: 'Animal',
				},
			],
		},
		{
			Name: 'Pet',
			Confidence: 68.93390655517578,
			Instances: [],
			Parents: [
				{
					Name: 'Animal',
				},
			],
		},
		{
			Name: 'Sleeping',
			Confidence: 56.7302360534668,
			Instances: [],
			Parents: [],
		},
		{
			Name: 'Asleep',
			Confidence: 56.7302360534668,
			Instances: [],
			Parents: [],
		},
	];
	expetedTags = [
		{
			Name: 'Mammal',
			Confidence: 88.10366821289062,
			Instances: [],
			Parents: [
				{
					Name: 'Animal',
				},
			],
		},
		{
			Name: 'Rabbit',
			Confidence: 81.39126586914062,
			Instances: [],
			Parents: [
				{
					Name: 'Rodent',
				},
				{
					Name: 'Mammal',
				},
				{
					Name: 'Animal',
				},
			],
		},
		{
			Name: 'Rodent',
			Confidence: 81.39126586914062,
			Instances: [],
			Parents: [
				{
					Name: 'Mammal',
				},
				{
					Name: 'Animal',
				},
			],
		},
		{
			Name: 'Bunny',
			Confidence: 81.39126586914062,
			Instances: [],
			Parents: [
				{
					Name: 'Rodent',
				},
				{
					Name: 'Mammal',
				},
				{
					Name: 'Animal',
				},
			],
		},
		{
			Name: 'Pet',
			Confidence: 68.93390655517578,
			Instances: [],
			Parents: [
				{
					Name: 'Animal',
				},
			],
		},
	];
	box = await filterForPets(tagData);
	expect(box).toStrictEqual(expetedTags);
	console.log(
		'PETS-------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
	);
	console.log(box);
	done();
});

test('getIntersection', async done => {
	date0 = ['a', 'b', 'c'];
	date1 = ['b', 'd', 'e'];
	result = await getIntersection(date0, date1);
	expect(result).toStrictEqual(['b', 'd', 'e']);
	console.log(
		'Intersection-------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
	);
	console.log(result);
	done();
});

test('revenge of the sith', async done => {
	tagData = {
		Labels: [],
	};
	var boxes = [];

	tagData.Labels.forEach(label => {
		boxes.push(label);
	});

	box = await validBoxes([]);
	expect(box).toBe(noBox);
	done();
});

test('get distance score', async done => {
	score = await getDistanceScore(0, 0, 0, 0);
	expect(score).toBe(0);
	done();
});

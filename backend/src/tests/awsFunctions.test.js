const request = require('supertest');
const server = require('../app');
const pool = require('../sql/connection');
const { getColour, validBoxes, noBox, errorBox } = require('../util/awsFunctions');
//const express = require('express');
//const express = require('express');
//const express = require('express');
jest.setTimeout(100000);

// // something
afterAll(done => {
	server.close(done);
	pool.end(done);
});

test('errorBox', async done => {
	tagData = {
		"Labels": [
			{
				"Name": "Pet",
				"Confidence": 99.63221740722656,
				"Instances": [],
				"Parents": [
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Animal",
				"Confidence": 99.63221740722656,
				"Instances": [],
				"Parents": []
			},
			{
				"Name": "Mammal",
				"Confidence": 99.63221740722656,
				"Instances": [],
				"Parents": [
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Dog",
				"Confidence": 99.63221740722656,
				"Instances": [
					{
						"BoundingBox": {
							"Width": 0.26995769143104553,
							"Height": 0.6557824611663818,
							"Left": 0.32899677753448486,
							"Top": 0.3263208568096161
						},
						"Confidence": 98.18276977539062
					},
					{
						"BoundingBox": {
							"Width": 0.23880265653133392,
							"Height": 0.5983842611312866,
							"Left": 0.17956575751304626,
							"Top": 0.38279131054878235
						},
						"Confidence": 97.55904388427734
					},
					{
						"BoundingBox": {
							"Width": 0.24894067645072937,
							"Height": 0.5886661410331726,
							"Left": 0.5302332043647766,
							"Top": 0.38870927691459656
						},
						"Confidence": 97.37198638916016
					},
					{
						"BoundingBox": {
							"Width": 0.30485081672668457,
							"Height": 0.6180295944213867,
							"Left": 0.6901296377182007,
							"Top": 0.3703455328941345
						},
						"Confidence": 95.59954833984375
					},
					{
						"BoundingBox": {
							"Width": 0.2402619570493698,
							"Height": 0.6258224248886108,
							"Left": 0.01645381934940815,
							"Top": 0.3548857569694519
						},
						"Confidence": 95.38980865478516
					}
				],
				"Parents": [
					{
						"Name": "Pet"
					},
					{
						"Name": "Canine"
					},
					{
						"Name": "Animal"
					},
					{
						"Name": "Mammal"
					}
				]
			},
			{
				"Name": "Canine",
				"Confidence": 99.63221740722656,
				"Instances": [],
				"Parents": [
					{
						"Name": "Mammal"
					},
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Puppy",
				"Confidence": 99.63221740722656,
				"Instances": [],
				"Parents": [
					{
						"Name": "Dog"
					},
					{
						"Name": "Pet"
					},
					{
						"Name": "Canine"
					},
					{
						"Name": "Animal"
					},
					{
						"Name": "Mammal"
					}
				]
			},
			{
				"Name": "Golden Retriever",
				"Confidence": 93.58879852294922,
				"Instances": [],
				"Parents": [
					{
						"Name": "Dog"
					},
					{
						"Name": "Pet"
					},
					{
						"Name": "Canine"
					},
					{
						"Name": "Animal"
					},
					{
						"Name": "Mammal"
					}
				]
			}
		],
		"LabelModelVersion": "2.0"
	};
	var boxes = [];

	tagData.Labels.forEach(label => {
		boxes.push(label);
	});

	box = await validBoxes(
		boxes
	);
	expect(box).toBe(errorBox);
	done();
});


test('noBox', async done => {
	tagData = {
		"Labels": [
			{
				"Name": "Mammal",
				"Confidence": 88.10366821289062,
				"Instances": [],
				"Parents": [
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Animal",
				"Confidence": 88.10366821289062,
				"Instances": [],
				"Parents": []
			},
			{
				"Name": "Rabbit",
				"Confidence": 81.39126586914062,
				"Instances": [],
				"Parents": [
					{
						"Name": "Rodent"
					},
					{
						"Name": "Mammal"
					},
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Rodent",
				"Confidence": 81.39126586914062,
				"Instances": [],
				"Parents": [
					{
						"Name": "Mammal"
					},
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Bunny",
				"Confidence": 81.39126586914062,
				"Instances": [],
				"Parents": [
					{
						"Name": "Rodent"
					},
					{
						"Name": "Mammal"
					},
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Pet",
				"Confidence": 68.93390655517578,
				"Instances": [],
				"Parents": [
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Sleeping",
				"Confidence": 56.7302360534668,
				"Instances": [],
				"Parents": []
			},
			{
				"Name": "Asleep",
				"Confidence": 56.7302360534668,
				"Instances": [],
				"Parents": []
			}
		],
		"LabelModelVersion": "2.0"
	};
	var boxes = [];

	tagData.Labels.forEach(label => {
		boxes.push(label);
	});

	box = await validBoxes(
		boxes
	);
	expect(box).toBe(noBox);
	done();
});


test('normal box', async done => {
	tagData = {
		"Labels": [
			{
				"Name": "Pet",
				"Confidence": 98.75236511230469,
				"Instances": [],
				"Parents": [
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Angora",
				"Confidence": 98.75236511230469,
				"Instances": [],
				"Parents": [
					{
						"Name": "Cat"
					},
					{
						"Name": "Pet"
					},
					{
						"Name": "Mammal"
					},
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Mammal",
				"Confidence": 98.75236511230469,
				"Instances": [],
				"Parents": [
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Animal",
				"Confidence": 98.75236511230469,
				"Instances": [],
				"Parents": []
			},
			{
				"Name": "Cat",
				"Confidence": 98.75236511230469,
				"Instances": [
					{
						"BoundingBox": {
							"Width": 0.6037029027938843,
							"Height": 0.7648425698280334,
							"Left": 0.23442380130290985,
							"Top": 0.1497994214296341
						},
						"Confidence": 97.71615600585938
					}
				],
				"Parents": [
					{
						"Name": "Pet"
					},
					{
						"Name": "Mammal"
					},
					{
						"Name": "Animal"
					}
				]
			}
		],
		"LabelModelVersion": "2.0"
	};
	var boxes = [];

	tagData.Labels.forEach(label => {
		boxes.push(label);
	});

	box = await validBoxes(
		boxes
	);
	expectedColour = {
			"Width": 0.6037029027938843,
			"Height": 0.7648425698280334,
			"Left": 0.23442380130290985,
			"Top": 0.1497994214296341
	};
	expect(box).toBe(expectedColour);
	done();
});



test('two boxes', async done => {
	tagData = {
		"Labels": [
			{
				"Name": "Cat",
				"Confidence": 92.57097625732422,
				"Instances": [
					{
						"BoundingBox": {
							"Width": 0.6108936667442322,
							"Height": 0.9516386389732361,
							"Left": 0.14043430984020233,
							"Top": 0.04057978838682175
						},
						"Confidence": 67.11946105957031
					}
				],
				"Parents": [
					{
						"Name": "Pet"
					},
					{
						"Name": "Mammal"
					},
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Animal",
				"Confidence": 92.57097625732422,
				"Instances": [],
				"Parents": []
			},
			{
				"Name": "Pet",
				"Confidence": 92.57097625732422,
				"Instances": [],
				"Parents": [
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Mammal",
				"Confidence": 92.57097625732422,
				"Instances": [],
				"Parents": [
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Kitten",
				"Confidence": 86.38482666015625,
				"Instances": [],
				"Parents": [
					{
						"Name": "Cat"
					},
					{
						"Name": "Pet"
					},
					{
						"Name": "Mammal"
					},
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Abyssinian",
				"Confidence": 84.37126922607422,
				"Instances": [],
				"Parents": [
					{
						"Name": "Cat"
					},
					{
						"Name": "Pet"
					},
					{
						"Name": "Mammal"
					},
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Leopard",
				"Confidence": 77.34283447265625,
				"Instances": [],
				"Parents": [
					{
						"Name": "Wildlife"
					},
					{
						"Name": "Mammal"
					},
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Wildlife",
				"Confidence": 77.34283447265625,
				"Instances": [],
				"Parents": [
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Jaguar",
				"Confidence": 77.34283447265625,
				"Instances": [],
				"Parents": [
					{
						"Name": "Wildlife"
					},
					{
						"Name": "Mammal"
					},
					{
						"Name": "Animal"
					}
				]
			},
			{
				"Name": "Panther",
				"Confidence": 77.34283447265625,
				"Instances": [
					{
						"BoundingBox": {
							"Width": 0.6285470724105835,
							"Height": 0.9082770347595215,
							"Left": 0.13671883940696716,
							"Top": 0.061898574233055115
						},
						"Confidence": 77.34283447265625
					}
				],
				"Parents": [
					{
						"Name": "Wildlife"
					},
					{
						"Name": "Mammal"
					},
					{
						"Name": "Animal"
					}
				]
			}
		],
		"LabelModelVersion": "2.0"
	};
	var boxes = [];

	tagData.Labels.forEach(label => {
		boxes.push(label);
	});

	box = await validBoxes(
		boxes
	);
	expectedColour = {
		"Width": 0.6285470724105835,
		"Height": 0.9082770347595215,
		"Left": 0.13671883940696716,
		"Top": 0.061898574233055115
	};
	expect(box).toBe(expectedColour);
	done();
});
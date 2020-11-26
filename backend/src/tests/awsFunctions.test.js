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
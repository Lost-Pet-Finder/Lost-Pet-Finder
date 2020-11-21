const request = require('supertest');
const server = require('../app');
const pool = require('../sql/connection');
const {
	allFoundPets,
	allLostPets,
	expectedPostLostPets,
	expectedPostFoundPets,
} = require('./integrationTestVariables');
//const express = require('express');
jest.setTimeout(100000);
// something
afterAll(done => {
	server.close(done);
	pool.end();
});

function tagsSame(a, b) {
	var y = a.toString().split('').sort().join(''),
		z = b.toString().split('').sort().join('');
	return z === y ? true : false;
}
// // searchLostPets
test('search Lost Pets', async done => {
	const { status, body } = await request(server).get('/pets/searchLostPets');
	// expect(status).toBe(200);
	// same = tagsSame(body, allLostPets);
	// expect(same).toStrictEqual(true);
	done();
});

// // searchFoundPets
// test('search Found Pets', async done => {
// 	const { status, body } = await request(server).get('/pets/searchFoundPets');
// 	expect(status).toBe(200);
// 	same = tagsSame(body, allFoundPets);
// 	expect(same).toStrictEqual(true);
// 	done();
// });

// // postLostPets
// test('post Lost Pets', async done => {
// 	const pet_post = {
// 		userid: '4',
// 		filename: 'Hare_brown_on_green_and_brown_background.jpg',
// 		location_x: '100',
// 		location_y: '100',
// 		date: '202003 0303',
// 		bucketName: 'lostpetpictures',
// 	};
// 	const expected = expectedPostLostPets;

// 	// create a post request
// 	const { status, body } = await request(server)
// 		.post('/pets/postLostPets')
// 		.send(pet_post);
// 	expect(status).toBe(200);
// 	same = tagsSame(body, expected);
// 	expect(same).toStrictEqual(true);
// 	done();
// });

// // // // postFoundPets
// test('post Found Pets', async done => {
// 	const pet_post = {
// 		userid: '4',
// 		filename: 'beagle_brown_on_green_background.jpg',
// 		location_x: '100',
// 		location_y: '100',
// 		date: '202003 0303',
// 		bucketName: 'lostpetpictures',
// 	};
// 	const expected = expectedPostFoundPets;

// 	// create a post request
// 	const { status, body } = await request(server)
// 		.post('/pets/postFoundPets')
// 		.send(pet_post);
// 	same = tagsSame(body, expected);
// 	expect(status).toBe(200);
// 	expect(same).toStrictEqual(true);
// 	done();
// });

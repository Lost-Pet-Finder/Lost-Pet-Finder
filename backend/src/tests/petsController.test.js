jest.mock('../util/colourFunctions.js');
jest.mock('../sql/connection');
const request = require('supertest');
const server = require('../app');
const {
	expectedAllFoundPets,
	expectedAllLostPets,
	expectedPostLostPets,
	expectedPostFoundPets,
} = require('./testVariables');
//const express = require('express');

// something
afterAll(done => {
	server.close(done);
});
// // searchLostPets
test('search Lost Pets', async done => {
	const { status, body } = await request(server).get('/pets/searchLostPets');
	expect(status).toBe(200);
	expect(body).toStrictEqual(expectedAllLostPets);
	done();
});

// searchFoundPets
test('search Found Pets', async done => {
	const { status, body } = await request(server).get('/pets/searchFoundPets');
	expect(status).toBe(200);
	expect(body).toStrictEqual(expectedAllFoundPets);
	done();
});

// postLostPets
test('post Lost Pets', async done => {
	const pet_post = {
		userid: '4',
		filename: 'Hare_brown_on_green_and_brown_background.jpg',
		location_x: '100',
		location_y: '100',
		date: '202003 0303',
		bucketName: 'lostpetpictures',
	};
	const expected = expectedPostLostPets[0];

	// create a post request
	const { status, body } = await request(server)
		.post('/pets/postLostPets')
		.send(pet_post);
	expect(status).toBe(200);
	expect(body).toStrictEqual(expected);
	done();
});

// // postFoundPets
test('post Found Pets', async done => {
	const pet_post = {
		userid: '4',
		filename: 'beagle_brown_on_green_background.jpg',
		location_x: '100',
		location_y: '100',
		date: '202003 0303',
		bucketName: 'lostpetpictures',
	};
	const expected = expectedPostFoundPets[0];

	// create a post request
	const { status, body } = await request(server)
		.post('/pets/postFoundPets')
		.send(pet_post);
	expect(status).toBe(200);
	expect(body).toStrictEqual(expected);
	done();
});

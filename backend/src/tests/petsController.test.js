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
jest.setTimeout(100000);

// something
afterAll(done => {
	server.close(done);
});

// test the pets endpoint
test('search Lost Pets error', async done => {
	const { body, status } = await request(server).get('/pets');
	expect(status).toBe(200);
	// this is just the pets endpoint, to get Json info, add /searchLostPets, / postLostPets, etc.
	expect(body).toStrictEqual({});
	done();
});

// when search a nonexisting post
test('search Lost Pets error', async done => {
	const { body, status } = await request(server).get(
		'/pets/searchLostPets/99999'
	);
	expect(status).toBe(500);
	done();
});
test('search Lost Pets error', async done => {
	const { status } = await request(server).get('/pets/searchFoundPets/99999');
	expect(status).toBe(500);
	done();
});

// // searchLostPets
test('search Lost Pets', async done => {
	const { status, body } = await request(server).get('/pets/searchLostPets/1');
	expect(status).toBe(200);
	expect(body).toStrictEqual(expectedAllLostPets);
	done();
});

// searchFoundPets
test('search Found Pets', async done => {
	const { status, body } = await request(server).get('/pets/searchFoundPets/2');
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

// postFoundPets
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

// posting invalid posts
test('post Lost Pets error', async done => {
	const pet_post = {
		userid: '99999',
		filename: 'Hare_brown_on_green_and_brown_background.jpg',
		location_x: '100',
		location_y: '100',
		// month 99 doesn't exist
		date: '202099 0303',
		bucketName: 'lostpetpictures',
	};

	// create a post request
	const { status } = await request(server)
		.post('/pets/postLostPets')
		.send(pet_post);
	expect(status).toBe(500);
	done();
});

// post Found Pets error
test('post Found Pets error', async done => {
	const pet_post = {
		userid: '99999',
		filename: 'beagle_brown_on_green_background.jpg',
		location_x: '100',
		location_y: '100',
		// month 99 doesn't exist
		date: '202099 0303',
		bucketName: 'lostpetpictures',
	};

	// create a post request
	const { status } = await request(server)
		.post('/pets/postFoundPets')
		.send(pet_post);
	expect(status).toBe(500);
	done();
});

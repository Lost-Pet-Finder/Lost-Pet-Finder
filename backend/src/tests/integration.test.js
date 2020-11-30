const request = require('supertest');
const server = require('../app');
const pool = require('../sql/connection');
const {
	intergrationLostPost,
	intergrationFoundPost,
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
	const expected = intergrationLostPost;

	// create a post request
	const { status, body } = await request(server)
		.post('/pets/postLostPets')
		.send(pet_post);
	expect(status).toBe(200);
	same = tagsSame(body, expected);
	expect(same).toStrictEqual(true);
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
	const expected = intergrationFoundPost;

	// create a post request
	const { status, body } = await request(server)
		.post('/pets/postFoundPets')
		.send(pet_post);
	expect(status).toBe(200);
	same = tagsSame(body, expected);
	expect(same).toStrictEqual(true);
	done();
});

// // searchLostPets
test('search Lost Pets', async done => {
	// user 1 posts golden_retriever_0.jpg
	const req = { userid: '77777' };
	const { status, body } = await request(server)
		.get('/pets/searchLostPets')
		.send(req);
	expect(status).toBe(200);
	// the best result must be at first index and it should be the same file
	expect(body[0].report.file_name).toBe('golden_retriever_0.jpg');
	// id of the user that contains the testing data
	expect(body[0].report.fk_user_id).toBe(66666);
	done();
});

// searchFoundPets
test('search Found Pets', async done => {
	const req = { userid: '66666' };
	const { status, body } = await request(server)
		.get('/pets/searchFoundPets')
		.send(req);
	expect(status).toBe(200);
	// the best result must be at first index and it should be the same file
	expect(body[0].report.file_name).toBe('golden_retriever_0.jpg');
	// id of the user that contains the testing data
	expect(body[0].report.fk_user_id).toBe(77777);
	done();
});

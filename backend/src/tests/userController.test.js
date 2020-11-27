jest.mock('../util/colourFunctions.js');
jest.mock('../sql/connection');
const request = require('supertest');
const server = require('../app');
jest.setTimeout(100000);

// something
afterAll(done => {
	server.close(done);
});

// test the user router endpoint
test('get user contact info', async done => {
	const { body, status } = await request(server).get('/user');
	expect(status).toBe(200);
	// this is just the usercontact endpoint, to get Json info, add /getUserContactInfo/:userid
	expect(body).toStrictEqual({});
	done();
});

// when search a nonexisting user
test('get user contact info', async done => {
	const { status } = await request(server).get(
		'/user/getUserContactInfo/99999'
	);
	expect(status).toBe(500);
	done();
});

// at a normal userid endpoint
test('get user contact info', async done => {
	const { body, status } = await request(server).get(
		'/user/getUserContactInfo/1'
	);
	expect(status).toBe(200);
	expect(body).toStrictEqual([0]);
	done();
});

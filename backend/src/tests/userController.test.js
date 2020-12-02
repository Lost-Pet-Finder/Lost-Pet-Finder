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

// new user
test('create a new user', async done => {
	const req = {
		first_name: 'hung',
		last_name: 'nguyen',
		firebase_uid: '1',
		isFinder: '1',
	};
	const { body, status } = await request(server)
		.post('/user/createNewUser')
		.send(req);
	expect(status).toBe(200);
	expect(body).toStrictEqual([0]);
	done();
});

// fail to create a new user
test('create a new user error', async done => {
	const req = {
		first_name: 'hung',
		last_name: 'nguyen',
		firebase_uid: '99999',
		isFinder: '1',
	};
	const { status } = await request(server)
		.post('/user/createNewUser')
		.send(req);
	expect(status).toBe(500);
	done();
});

test('get user id number', async done => {
	const { body, status } = await request(server).get('/user/getUserIdNumber/1');
	expect(status).toBe(200);
	expect(body).toStrictEqual(321);
	done();
});

// fail to get user id number
test('get user id number error', async done => {
	const { status } = await request(server).get('/user/getUserIdNumber/99999');
	expect(status).toBe(500);
	done();
});

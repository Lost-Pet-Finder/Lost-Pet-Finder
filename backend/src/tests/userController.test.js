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
		user_name: 'hung',
		uid: '1',
		user_id: '1',
		phone_num: '123456',
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
		user_name: 'hung',
		uid: '99999',
		user_id: '1',
		phone_num: '123456',
	};
	const { status } = await request(server)
		.post('/user/createNewUser')
		.send(req);
	expect(status).toBe(500);
	done();
});

test('get user id number', async done => {
	const req = { uid: '1' };
	const { body, status } = await request(server)
		.get('/user/getUserIdNumber')
		.send(req);
	expect(status).toBe(200);
	expect(body).toStrictEqual(321);
	done();
});

// fail to get user id number
test('get user id number error', async done => {
	const req = { uid: '99999' };
	const { status } = await request(server)
		.get('/user/getUserIdNumber')
		.send(req);
	expect(status).toBe(500);
	done();
});

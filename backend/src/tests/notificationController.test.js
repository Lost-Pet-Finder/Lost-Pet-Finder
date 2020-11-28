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
	const { body, status } = await request(server).get('/notif');
	expect(status).toBe(200);
	// this is just the notification endpoint, to get Json info, add /uploadDeviceToken, /getUserDeviceToken, etc.
	expect(body).toStrictEqual({});
	done();
});

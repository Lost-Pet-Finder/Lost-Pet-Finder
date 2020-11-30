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

// upload device token test and error test
test('upload device token test', async done => {
	const req = { userid: '6', token: 'something' };
	const { body, status } = await request(server)
		.post('/notif/uploadDeviceToken')
		.send(req);
	expect(status).toBe(200);
	expect(body).toStrictEqual([0]);
	done();
});

test('upload device token error test', async done => {
	const req = { userid: '99999', token: 'something' };
	const { status } = await request(server)
		.post('/notif/uploadDeviceToken')
		.send(req);
	expect(status).toBe(500);
	done();
});

// get user devide token test and error test
test('get user device token test', async done => {
	const req = { userid: '5' };
	const { body, status } = await request(server)
		.get('/notif/getUserDeviceToken')
		.send(req);
	expect(status).toBe(200);
	expect(body).toStrictEqual([0]);
	done();
});

test('get user device token error test', async done => {
	const req = { userid: '99999' };
	const { status } = await request(server)
		.get('/notif/getUserDeviceToken')
		.send(req);
	expect(status).toBe(500);
	done();
});

// pending request test and error test
test('pending requests test', async done => {
	const req = { userid: '1' };
	const { body, status } = await request(server)
		.get('/notif/pendingRequests')
		.send(req);
	expect(status).toBe(200);
	expect(body).toStrictEqual([0]);
	done();
});

test('pending requests error test', async done => {
	const req = { userid: '99999' };
	const { status } = await request(server)
		.get('/notif/pendingRequests')
		.send(req);
	expect(status).toBe(500);
	done();
});

// sent requests test and error test
test('sent requests test', async done => {
	const req = { userid: '3' };
	const { body, status } = await request(server)
		.get('/notif/sentRequests')
		.send(req);
	expect(status).toBe(200);
	expect(body).toStrictEqual([0]);
	done();
});

test('sent requests error test', async done => {
	const req = { userid: '99999' };
	const { status } = await request(server).get('/notif/sentRequests').send(req);
	expect(status).toBe(500);
	done();
});

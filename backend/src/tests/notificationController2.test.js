const request = require('supertest');
const server = require('../app');
const pool = require('../sql/connection');
jest.setTimeout(100000);

// something
afterAll(done => {
	server.close(done);
	pool.end(done);
});

// send contact requests
test('send contact requests test', async done => {
	const req = { userid: '1', targetid: '1' };
	const { body, status } = await request(server)
		.post('/notif/sendContactRequest')
		.send(req);
	expect(status).toBe(200);
	expect(body.notification.body).toBe('Wren Liang wants to contact you!');
	done();
});

test('send contact requests test', async done => {
	const req = { userid: '1', targetid: '2' };
	const { body, status } = await request(server)
		.post('/notif/sendContactRequest')
		.send(req);
	expect(status).toBe(200);
	expect(body.notification.body).toBe('Wren Liang wants to contact you!');
	done();
});

// send contact requests error
test('send contact requests test error', async done => {
	const req = { userid: '1', targetid: '999999' };
	const { body, status } = await request(server)
		.post('/notif/sendContactRequest')
		.send(req);
	expect(status).toBe(500);
	// expect(body.notification.body).toBe('Wren Liang wants to contact you!');
	done();
});

// accept the contact request
test('accept the contact', async done => {
	const req = { userid: '1', requesterid: '1', accepted: true };
	const { body, status } = await request(server)
		.post('/notif/respondToContactRequest')
		.send(req);
	expect(status).toBe(200);
	// console.log(body);
	expect(body.notification.title).toBe('Contact Accepted');
	done();
});

// decline contact request
test('decline the contact', async done => {
	const req = { userid: '1', requesterid: '1', accepted: false };
	const { body, status } = await request(server)
		.post('/notif/respondToContactRequest')
		.send(req);
	expect(status).toBe(200);
	// return empty because the request is declined
	expect(body).toStrictEqual({});
	done();
});

// invalid id
test('invalid id for accept contact', async done => {
	const req = {
		userid: null,
		requesterid: null,
		accepted: true,
	};
	const { body, status } = await request(server)
		.post('/notif/respondToContactRequest')
		.send(req);
	expect(status).toBe(200);
	// empty body because invalid
	expect(body).toStrictEqual({});
	done();
});

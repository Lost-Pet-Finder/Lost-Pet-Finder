jest.mock('../util/colourFunctions.js');
jest.mock('../sql/connection');
const request = require('supertest');
const server = require('../app');
const { allFoundPets, allLostPets } = require('./testVariables');
//const express = require('express');
// travis
// something
afterAll(done => {
	server.close(done);
});
// test for M7
test('search Lost Pets', async done => {
	const { status, body } = await request(server).get('/pets/searchLostPets');
	expect(status).toBe(200);
	expect(body).toStrictEqual(allLostPets);
	done();
});

// this is second test
test('search Found Pets', async done => {
	const { status, body } = await request(server).get('/pets/searchFoundPets');
	expect(status).toBe(200);
	expect(body).toStrictEqual(allFoundPets);
	done();
});

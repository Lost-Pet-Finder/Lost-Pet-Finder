const request = require('supertest');
const server = require('../app');
const {getColour} = require('../util/colourFunctions')
//const express = require('express');

function withinTolerance(expectedColour, actualColour)
{
    dist = Math.sqrt( Math.pow((expectedColour[0] - actualColour[0]), 2) + Math.pow((expectedColour[1] - actualColour[1]), 2) + Math.pow((expectedColour[2] - actualColour[2]), 2));
    console.log(actualColour)
    if (dist > 30)
    {
        return false;
    }

    return true;
}

// something
afterAll(done => {
	server.close(done);
});
// searchLostPets
test('Golden_Retriever_or_Labrador Retriever_gold_on_black_background.jpg', async done => {
    colour = await getColour('lostpetpictures', "Golden_Retriever_or_Labrador Retriever_gold_on_black_background.jpg");
    expectedColour = [210, 200, 150];
	result = withinTolerance(expectedColour, colour.finalColor);
	expect(result).toBe(true);
	done();
});

test('golden_retriever_puppy_white_background', async done => {
    colour = await getColour('lostpetpictures', "golden_retriever_puppy_white_background.jpg");
    expectedColour = [110, 60, 20];
	result = withinTolerance(expectedColour, colour.finalColor);
	expect(result).toBe(true);
	done();
});

test('golden_retriever_puppy_white_background', async done => {
    colour = await getColour('lostpetpictures', "golden_retriever_puppy_white_background.jpg");
    expectedColour = [0, 0, 0];
	result = withinTolerance(expectedColour, colour.finalColor);
	expect(result).toBe(false);
	done();
});

const request = require('supertest');
const server = require('../app');
const {getColour} = require('../util/colourFunctions')
//const express = require('express');
//const express = require('express');
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

// // something
afterAll(done => {
	server.close(done);
});


test('gold on black positive', async done => {
    colour = await getColour('lostpetpictures', "Golden_Retriever_or_Labrador Retriever_gold_on_black_background.jpg");
    expectedColour = [210, 200, 150];
	result = withinTolerance(expectedColour, colour.finalColor);
	expect(result).toBe(true);
	done();
});

test('brown on white positive', async done => {
    colour = await getColour('lostpetpictures', "golden_retriever_puppy_white_background.jpg");
    expectedColour = [110, 60, 20];
	result = withinTolerance(expectedColour, colour.finalColor);
	expect(result).toBe(true);
	done();
});

test('brown on white negative', async done => {
    colour = await getColour('lostpetpictures', "golden_retriever_puppy_white_background.jpg");
    expectedColour = [0, 0, 0];
	result = withinTolerance(expectedColour, colour.finalColor);
	expect(result).toBe(false);
	done();
});

test('light on white positive', async done => {
    colour = await getColour('lostpetpictures', "pug_light_coat_white_background.jpg");
    expectedColour = [240, 210, 200];
	result = withinTolerance(expectedColour, colour.finalColor);
	expect(result).toBe(true);
	done();
});

test('black on black negative', async done => {
    colour = await getColour('lostpetpictures', "Labrador_Retriever_thinks_is_pig_black_on_black_background.jpg");
    expectedColour = [240, 210, 200];
	result = withinTolerance(expectedColour, colour.finalColor);
	expect(result).toBe(false);
	done();
});

test('black on black positive', async done => {
    colour = await getColour('lostpetpictures', "Labrador_Retriever_thinks_is_pig_black_on_black_background.jpg");
    expectedColour = [0, 0, 0];
	result = withinTolerance(expectedColour, colour.finalColor);
	expect(result).toBe(false);
	done();
});

test('grey on green positive', async done => {
    colour = await getColour('lostpetpictures', "Egyptian_Cat_dark_green_background.jpg");
    expectedColour = [70, 70, 60];
	result = withinTolerance(expectedColour, colour.finalColor);
	expect(result).toBe(true);
	done();
}); 

test('brown on green positive', async done => {
    colour = await getColour('lostpetpictures', "beagle_brown_on_green_background.jpg");
    expectedColour = [140, 130, 90];
	result = withinTolerance(expectedColour, colour.finalColor);
	expect(result).toBe(true);
	done();
}); 



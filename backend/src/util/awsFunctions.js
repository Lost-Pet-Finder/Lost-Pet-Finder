/* eslint-disable */
const aws = require('../aws/awsClient');
const rekognition = aws.rekognition;
const s3 = aws.s3;

const sizeOf = require('buffer-image-size');
const Jimp = require('jimp');
const ColorThief = require('color-thief');
const DateDiff = require('date-diff');

// const pets = ["Bird", "Bunny", "Cat", "Dog", "Guinea Pig", "Hamster", "Hare", "Kangaroo", "Mouse", "Pig", "Rabbit", "Rat", "Snake", "Wallaby"];
//This indicates an error with the bounding boxes we get from the tags
errorBox = {
	BoundingBox: {
		Width: -1,
		Height: -1,
		Left: -1,
		Top: -1,
	},
};

//if there is no box, but we still rekognze a pet, we take the whole picture without cropping
noBox = {
	BoundingBox: {
		Width: 1,
		Height: 1,
		Left: 0,
		Top: 0,
	},
};

async function getAWSTags(data) {
	const bucketName = data.bucketName;
	const fileName = data.fileName;

	const params = {
		Image: {
			S3Object: {
				Bucket: bucketName,
				Name: fileName,
			},
		},
		MaxLabels: 100,
	};

	try {
		const response = await rekognition.detectLabels(params).promise();

		var returnedLabels = [];

		response.Labels.forEach(label => {
			returnedLabels.push(label);
		});

		return returnedLabels;
	} catch (err) {
		console.log(err);

		return null;
	}
}

//gets dominant colour of pet
async function getColour(bucketName, fileName, validBox) {
	try {
		const image = await s3
			.getObject({ Bucket: bucketName, Key: fileName })
			.promise();
		var color = new ColorThief();

		//get width height and colour of whole image
		var totalDimensions = sizeOf(image.Body);
		totalWidth = totalDimensions.width;
		totalHeight = totalDimensions.height;

		colourTotal = color.getColor(image.Body);

		var box;

		//get height width and colour of only box with pet in it
		if (validBox.BoundingBox != undefined) box = validBox.BoundingBox;
		else box = validBox;

		// console.log(validBox);
		boxWidth = box.Width * totalWidth;
		boxHeight = box.Height * totalHeight;

		topLeft = [box.Left * totalWidth, box.Top * totalHeight];
		cropped = [];
		x = await Jimp.read(image.Body).then(img => {
			img.crop(topLeft[0], topLeft[1], boxWidth, boxHeight);
			img.getBuffer(Jimp.MIME_JPEG, (err, buf) => {
				if (err) throw err;
				cropped = buf;
			});
		});

		colourBox = color.getColor(cropped);

		//get % area that crop is of total
		//get % colour diff crop is of total
		percentArea = 1 - (boxWidth * boxHeight) / (totalWidth * totalHeight);
		rDiff = colourBox[0] - colourTotal[0];
		gDiff = colourBox[1] - colourTotal[1];
		bDiff = colourBox[2] - colourTotal[2];

		rDiff = Math.sign(rDiff) * Math.abs(rDiff / (128));
		gDiff = Math.sign(gDiff) * Math.abs(gDiff / (128));
		bDiff = Math.sign(bDiff) * Math.abs(bDiff / (128));

		//get colour of pet by subtracting total scaled with %s from the cropped
		colourPet = [];
		colourPet[0] = Math.max(
			Math.min(colourBox[0] + percentArea * rDiff * colourTotal[0], 255),
			0
		);
		colourPet[1] = Math.max(
			Math.min(colourBox[1] + percentArea * gDiff * colourTotal[1], 255),
			0
		);
		colourPet[2] = Math.max(
			Math.min(colourBox[2] + percentArea * bDiff * colourTotal[2], 255),
			0
		);

		return Promise.resolve(colourPet);
	} catch (err) {
		console.log(err);
		return null;
	}
}

//gets a box for the animal in the picture
//if multiple animals: sen err message
//if no boxes: return noBox
//if overlapping boxes for smae animal: choose one box

// helper function for getColour: DO NOT EXPORT
function validBoxes(tagData) {
	var boxes = [];
	if (tagData.length < 1) {
		return noBox;
	}
	tagData.forEach(label => {
		label.Instances.forEach(instance => {
			if (instance.BoundingBox != undefined) {
				boxes.push(instance.BoundingBox);
			}
		});
	});

	for (i = 0; i < boxes.length - 1; i++) {
		for (j = 0; j < i; i++) {
			if (Math.abs(boxes[i].Width - boxes[j].Width) > 0.1) {
				return errorBox;
			}
			if (Math.abs(boxes[i].Height - boxes[j].Height) > 0.1) {
				return errorBox;
			}
			if (Math.abs(boxes[i].Left - boxes[j].Left) > 0.1) {
				return errorBox;
			}
			if (Math.abs(boxes[i].Right - boxes[j].Right) > 0.1) {
				return errorBox;
			}
		}
	}

	if (boxes.length == 0) return noBox;

	return boxes[Math.floor(boxes.length / 2)];
}

// Filters
//get rid of tags that are nnot releated to animals
function filterForPets(tagData) {
	const animal = { Name: 'Animal' };
	ret = [];
	if (tagData.length < 1) {
		return ret;
	}
	tagData.forEach(label => {
		label.Parents.forEach(parent => {
			if (parent.Name == 'Animal' && ret.indexOf(label) < 0) {
				ret.push(label);
			}
		});
	});
	return ret;
}

//get rid of tags that arent of certain confidence
function filterForConfidence(tagData) {
	ret = [];
	if (tagData.length < 1) {
		return ret;
	}
	tagData.forEach(label => {
		if (label.Confidence >= 85) {
			ret.push(label);
		}
	});
	return ret;
}
// Filters End

// Score Calculators
//gets the colour difference betweeen two different colours
function getColourScore(colour0, colour1) {
	//441.67 is maximum distance can be: sqrt(3*255)
	score = Math.sqrt(
		Math.pow(colour0[0] - colour1[0], 2) +
			Math.pow(colour0[1] - colour1[1], 2) +
			Math.pow(colour0[2] - colour1[2], 2)
	);
	return Math.abs(score);
}

//gets a score from the similarity of a set of tags to another
function getIntersectionScore(labels0, labels1) {
	intersection = getIntersection(labels0, labels1);

	score = 0.0;

	for (i = 0; i < intersection.length; i++) {
		parentsScore = 0.0;
		intersection[i].Parents.forEach(parent => {
			parentsScore += 1;
		});
		parentsScore = Math.pow(parentsScore, 1.3);
		score += parentsScore;
	}
	score = Math.pow(score, 1.2);

	return Math.abs(score);
}

//returns the intersection between two sets of JSON tags
// helper function for getIntersectionScore: DO NOT EXPORT
function getIntersection(labels0, labels1) {
	// console.log(labels0);
	// console.log(labels1);
	var value0s = {};
	intersection = [];

	labels0.forEach(function (item) {
		value0s[item.Name] = item.Name;
	});

	labels1.forEach(function (item) {
		if (item.Name in value0s) {
			intersection.push(item);
		}
	});

	return intersection;
}

function getDateScore(date0, date1) {
	dateDiff0 = new Date(date0);
	dateDiff1 = new Date(date1);

	diff = new DateDiff(dateDiff0, dateDiff1).hours();

	return Math.abs(diff);
}

//gets the distance between two coordinates
function getDistanceScore(locx0, locy0, locx1, locy1) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(locy1 - locy0); // deg2rad below
	var dLon = deg2rad(locx1 - locx0);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(locy0)) *
			Math.cos(deg2rad(locy1)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return Math.abs(d);
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}
// Score Calculators End

module.exports = {
	// Data Generation Functions
	getAWSTags: getAWSTags,
	getColour: getColour,

	// Scoring Functions
	getColourScore: getColourScore,
	getIntersectionScore: getIntersectionScore,
	getDateScore: getDateScore,
	getDistanceScore: getDistanceScore,
	getIntersection: getIntersection,

	// Filter Functions
	filterForConfidence: filterForConfidence,
	filterForPets: filterForPets,

	// Helper Functions
	validBoxes: validBoxes,

	// Box Types
	errorBox: errorBox,
	noBox: noBox,
};

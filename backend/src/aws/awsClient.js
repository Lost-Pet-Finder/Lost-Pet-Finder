/* eslint-disable */

// Load the SDK and UUID
var AWS = require('aws-sdk');

const config = new AWS.Config({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const rekognitionClient = new AWS.Rekognition();

const s3Client = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

module.exports = {
	rekognition: rekognitionClient,
	s3: s3Client,
};

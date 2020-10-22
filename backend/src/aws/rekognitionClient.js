/* eslint-disable */

// Load the SDK and UUID
var AWS = require('aws-sdk');

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const client = new AWS.Rekognition();

module.exports = client;
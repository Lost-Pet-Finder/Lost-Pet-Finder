// Imports
// const sqlPool = require('../sql/connection');
const rekognition = require('../aws/rekognitionClient');

async function sendRekognitionRequest(req, res) {
    const bucketName = req.body.bucketName;
    const fileName = req.body.fileName;

    const params = {
        Image: {
            S3Object: {
                Bucket: bucketName,
                Name: fileName
            }
        },
        MaxLabels: 10
    }

    try {
        const response = await rekognition.detectLabels(params).promise();

        var returnedLabels = [];

        response.Labels.forEach(label => {
            returnedLabels.push(label);
        });

        res.status(200).json({
            labels: returnedLabels
        });
    } catch (err) {
        console.log(err);

        res.status(500).send('Request failed');
    }
}


module.exports = {
    sendRekognitionRequest: sendRekognitionRequest
}
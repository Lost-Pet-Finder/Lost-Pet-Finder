const rekognition = require('../aws/rekognitionClient');

async function getAWSTags(data) {
    const bucketName = data.bucketName;
    const fileName = data.fileName;

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

        return returnedLabels;
    } catch (err) {
        console.log(err);

        return null;
    }
}


module.exports = {
    getAWSTags: getAWSTags
}
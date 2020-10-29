// Imports
// const sqlPool = require('../sql/connection');
const rekognition = require('../aws/rekognitionClient');
const colorThief = require('color-thief');
const sizeOf = require('buffer-image-size');
const Jimp = require('jimp');
// const Clipper = require('image-clipper');
// const gm = require('gm')
// var fs = require('fs')

var AWS = require('aws-sdk');
const ColorThief = require('color-thief');
const { head } = require('../routers/awsRouter');
const { distance } = require('jimp');

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });



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
        MaxLabels: 100
    }

    try {
        const image = await s3.getObject({Bucket: bucketName,Key: fileName}).promise();
        var color =  new ColorThief();

        modeTotal = color.getColor(image.Body);
        // pixels = color.getPalette(image.Body, 8);
        // modeTotal2 = (pixels.sort((a,b) =>
        //   pixels.filter(v => v===a).length
        // - pixels.filter(v => v===b).length).pop());

        var totalDimensions = sizeOf(image.Body);
        totalWidth = totalDimensions.width;
        totalHeight = totalDimensions.height;
        // image = fs.createReadStream(image.Body)

        const response = await rekognition.detectLabels(params).promise();

        var returnedLabels = [];

        response.Labels.forEach(label => {
            returnedLabels.push(label);
        });


        var box;
        response.Labels.forEach(label => {
            console.log("Instances:")
            label.Instances.forEach(instance => {
                box = instance.BoundingBox
            })
        })

        topLeft = [box.Left * totalWidth, box.Top * totalHeight];

        boxWidth = box.Width * totalWidth;
        boxHeight = box.Height * totalHeight;

        buffer = []
        x = await Jimp.read(image.Body).then(img => {
            img.crop(topLeft[0], topLeft[1], boxWidth, boxHeight);
            img.getBuffer(Jimp.MIME_JPEG, (err, buf) => {
                if(err) throw err;
                buffer = buf;
            });
            img.write("owo.jpg");
        });

        mode = color.getColor(buffer);
        pixels = color.getPalette(buffer, 8);
        // mode2 = (pixels.sort((a,b) =>
        //   pixels.filter(v => v===a).length
        // - pixels.filter(v => v===b).length).pop());


        percentBias = 1;

        percentArea = 1 - boxWidth * boxHeight / (totalWidth * totalHeight);
        rDiff = (mode[0] - modeTotal[0]);
        gDiff = (mode[1] - modeTotal[1]);
        bDiff = (mode[2] - modeTotal[2]);

        rDiff = Math.sign(rDiff) * (Math.abs(rDiff / (mode[0] + rDiff)));
        gDiff = Math.sign(gDiff) * (Math.abs(gDiff / (mode[1] + gDiff)));
        bDiff = Math.sign(bDiff) * (Math.abs(bDiff / (mode[2] + bDiff)));

        // rDiffSign = Math.sign(Math.abs((mode[0]- modeTotal[0])));
        // gDiffSign = Math.sign(Math.abs((mode[1]- modeTotal[1])));
        // bDiffSign = Math.sign(Math.abs((mode[2]- modeTotal[2])));
        // dis = Math.sqrt(Math.pow(rDiff, 2) + Math.pow(gDiff, 2) + Math.pow(bDiff, 2));

        // percentDistance = 1 - Math.min((1 / dis), 1);

        console.log(mode);
        console.log(modeTotal);

        console.log(percentArea);
        modeCorrected = [mode[0] + percentBias * percentArea * rDiff * modeTotal[0], mode[1] + percentBias * percentArea * gDiff * modeTotal[1], mode[2] + percentBias * percentArea * bDiff * modeTotal[2]];

        console.log(modeCorrected);

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
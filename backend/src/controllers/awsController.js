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

        var totalDimensions = sizeOf(image.Body);
        totalWidth = totalDimensions.width;
        totalHeight = totalDimensions.height;

        topLeft = [box.Left * totalWidth, box.Top * totalHeight];

        boxWidth = box.Width * totalWidth;
        boxHeight = box.Height * totalHeight;

        // img = gm(image.Body).crop(boxWidth, boxHeight, topLeft[0], topLeft[1]).toBuffer(function(err, buffer) {
        //     if(err)
        //     console.log("oh no!")
        // })
        ugh = []
        xd = await Jimp.read(image.Body).then(img => {
            img.crop(topLeft[0], topLeft[1], boxWidth, boxHeight);
            img.getBuffer(Jimp.MIME_JPEG, (err, buf) => {
                if(err) throw err;
                ugh = buf;
            });
            img.write("owo.jpg");
            console.log('1');
        });

        



        console.log(ugh);


        
        console.log(boxWidth , boxHeight);
        console.log("2");
        var dim = sizeOf(ugh);
        x = dim.width
        y = dim.height
        console.log(x, y);

        // console.log(returnedLabels)



        var color =  new ColorThief();

        mode = color.getColor(ugh);

        // pixels = color.getPalette(ugh, 8);
        // mode = (pixels.sort((a,b) =>
        //   pixels.filter(v => v===a).length
        // - pixels.filter(v => v===b).length).pop());

        console.log(mode);



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
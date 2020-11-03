/* eslint-disable */

const aws = require('../aws/awsClient');
const rekognition = aws.rekognition;
const s3 = aws.s3;

const sizeOf = require('buffer-image-size');
const Jimp = require('jimp');
const ColorThief = require('color-thief');


async function getColour(bucketName, fileName) {
    try {
        const rekognitionParams = {
            Image: {
                S3Object: {
                    Bucket: bucketName,
                    Name: fileName
                }
            },
            MaxLabels: 100
        }

        const rekognitionResponse = await rekognition.detectLabels(rekognitionParams).promise();
        const image = await s3.getObject({Bucket: bucketName,Key: fileName}).promise();

        var color =  new ColorThief();

        var totalDimensions = sizeOf(image.Body);
        var totalWidth = totalDimensions.width;
        var totalHeight = totalDimensions.height;

        var modeTotal = color.getColor(image.Body);
        // pixels = color.getPalette(image.Body, 8);
        // modeTotal2 = (pixels.sort((a,b) =>
        //   pixels.filter(v => v===a).length
        // - pixels.filter(v => v===b).length).pop());
        
        var box;
        count = 0;

        // REDO
        rekognitionResponse.Labels.forEach(label => {
            label.Instances.forEach(instance => {
                box = instance.BoundingBox
                count++;
            })
        })
        if(count != 1) {
            //throw error
        }

        var boxWidth = box.Width * totalWidth;
        var boxHeight = box.Height * totalHeight;

        var topLeft = [box.Left * totalWidth, box.Top * totalHeight];
        var cropped = []
        var x = await Jimp.read(image.Body).then(img => {
            img.crop(topLeft[0], topLeft[1], boxWidth, boxHeight);
            img.getBuffer(Jimp.MIME_JPEG, (err, buf) => {
                if(err) throw err;
                cropped = buf;
            });
        });

        var mode = color.getColor(cropped);
        // pixels = color.getPalette(cropped, 8);
        // mode2 = (pixels.sort((a,b) =>
        //   pixels.filter(v => v===a).length
        // - pixels.filter(v => v===b).length).pop());



        var percentArea = 1 - ((boxWidth * boxHeight) / (totalWidth * totalHeight));
        var rDiff = (mode[0] - modeTotal[0]);
        var gDiff = (mode[1] - modeTotal[1]);
        var bDiff = (mode[2] - modeTotal[2]);

        var rDiff = Math.sign(rDiff) * (Math.abs(rDiff / (mode[0] + rDiff)));
        var gDiff = Math.sign(gDiff) * (Math.abs(gDiff / (mode[1] + gDiff)));
        var bDiff = Math.sign(bDiff) * (Math.abs(bDiff / (mode[2] + bDiff)));

        var modeCorrected = []
        modeCorrected[0] = Math.max(Math.min(mode[0] + percentArea * rDiff * modeTotal[0], 255), 0) ;
        modeCorrected[1] = Math.max(Math.min(mode[1] + percentArea * gDiff * modeTotal[1], 255), 0) ;
        modeCorrected[2] = Math.max(Math.min(mode[2] + percentArea * bDiff * modeTotal[2], 255), 0) ;

        // console.log(modeCorrected);

        const calculatedColors = {
            totalColor: modeTotal,
            croppedColor: mode,
            finalColor: modeCorrected
        }

        return calculatedColors
    } catch (err) {
        console.log(err);
        
        return null;
    }
}

module.exports = {
    getColour: getColour
}
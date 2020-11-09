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

        //we ask amazon ML to run on our image in the specified bucket
        //the ML will generate tags about what it thinks it sees in the image
        const rekognitionResponse = await rekognition.detectLabels(rekognitionParams).promise();
        //we get the image (as a buffer stream) in our server, so we can manipulate it and get characteristics about it
        //such as dominant colour and size
        const image = await s3.getObject({Bucket: bucketName,Key: fileName}).promise();

        var color =  new ColorThief();

        //we get the width and height of the entire image
        //and dominant colour
        var totalDimensions = sizeOf(image.Body);
        var totalWidth = totalDimensions.width;
        var totalHeight = totalDimensions.height;

        var modeTotal = color.getColor(image.Body);

        //the amazon ML will return tags
        //some tags, such as tags for dogs, cats, etc... will have bounding boxes
        //here we get A bounding box (right now its any box associated with any object)
        //in the more recent code, we filter for boxes that are associated with animals
        //fr this code we assume that any boxes that exist will be associated with an animal
        //and that any box will associated with the same animal
        var box;
        count = 0;
        rekognitionResponse.Labels.forEach(label => {
            label.Instances.forEach(instance => {
                box = instance.BoundingBox
                count++;
            })
        })
        if(count != 1) {
            //throw error
        }

        //we get the dimensions of the box and the dominant colour of the box
        //we get the buffer and crop it and then get it's dominant colour
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

        //we get the percent of the area that the bounding box is compared to the total image
        var percentArea = 1 - ((boxWidth * boxHeight) / (totalWidth * totalHeight));
        var rDiff = (mode[0] - modeTotal[0]);
        var gDiff = (mode[1] - modeTotal[1]);
        var bDiff = (mode[2] - modeTotal[2]);

        //we get the percent colour difference 
        var rDiff = Math.sign(rDiff) * (Math.abs(rDiff / (mode[0] + rDiff)));
        var gDiff = Math.sign(gDiff) * (Math.abs(gDiff / (mode[1] + gDiff)));
        var bDiff = Math.sign(bDiff) * (Math.abs(bDiff / (mode[2] + bDiff)));

        //for the colour of the animal (modeCorrected), we get the box colour, and subtract the total colour 
        //from it, scaling by percent area and percent colour difference
        //we then clip the colours to be within 0 and 255
        var modeCorrected = []
        modeCorrected[0] = Math.max(Math.min(mode[0] + percentArea * rDiff * modeTotal[0], 255), 0) ;
        modeCorrected[1] = Math.max(Math.min(mode[1] + percentArea * rDiff * modeTotal[1], 255), 0) ;
        modeCorrected[2] = Math.max(Math.min(mode[2] + percentArea * rDiff * modeTotal[2], 255), 0) ;

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

// Imports
// const sqlPool = require('../sql/connection');
const rekognition = require('../aws/rekognitionClient');
const sizeOf = require('buffer-image-size');
const Jimp = require('jimp');

var AWS = require('aws-sdk');
const ColorThief = require('color-thief');
const { head } = require('../routers/awsRouter');
const { response } = require('express');
// const { distance } = require('jimp');

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

const pets = ["Bird", "Bunny", "Cat", "Dog", "Guinea Pig", "Hamster", "Hare", "Kangaroo", "Mouse", "Pig", "Rabbit", "Rat", "Snake", "Wallaby"];
errorBox = {
    "BoundingBox": {
        "Width": -1,
        "Height": -1,
        "Left": -1,
        "Top": -1
    }
};
noBox = {
    "BoundingBox": {
        "Width": 1,
        "Height": 1,
        "Left": 0,
        "Top": 0
    }
};
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
        const response = await rekognition.detectLabels(params).promise();

        var returnedLabels = [];

        response.Labels.forEach(label => {
            returnedLabels.push(label);
        });

        // const colour = await getColour(req, response);
        answer = [];

        labels = [];

        response.Labels.forEach( label => {
            labels.push(label);
        });

        if(getLength(labels) > 0)
        labels = filterForPets(labels);
        console.log(labels);
        if(getLength(labels) > 0)
        labels = filterForConfidence(labels);

        if(getLength(labels) > 0)
        {
            validBox = validBoxes(labels);
            if(validBox != errorBox)
            {
                colour = await getColour(req.body.bucketName,req.body.fileName, validBox, labels).then(function(value) {
                    console.log(value);
                });
            }
            else 
            {
                console.log("too many animals in picture! :(");
            }
        }
        else 
        {
            // console.log(labels);
            // console.log(labels.array.length);
            console.log("no animals detected in image! :(");
        }

        res.status(200).json({
            labels: returnedLabels
        });
    } catch (err) {
        console.log(err);

        res.status(500).send('Request failed');
    }
}

async function getColour(bucketName, fileName, validBox, response) {

    try {
        const image = await s3.getObject({Bucket: bucketName,Key: fileName}).promise();
        var color =  new ColorThief();



        var totalDimensions = sizeOf(image.Body);
        totalWidth = totalDimensions.width;
        totalHeight = totalDimensions.height;

        modeTotal = color.getColor(image.Body);
        // pixels = color.getPalette(image.Body, 8);
        // modeTotal2 = (pixels.sort((a,b) =>
        //   pixels.filter(v => v===a).length
        // - pixels.filter(v => v===b).length).pop());


        
        var box = validBox;
        count = 0;

        boxWidth = box.Width * totalWidth;
        boxHeight = box.Height * totalHeight;

        topLeft = [box.Left * totalWidth, box.Top * totalHeight];
        cropped = []
        x = await Jimp.read(image.Body).then(img => {
            img.crop(topLeft[0], topLeft[1], boxWidth, boxHeight);
            img.getBuffer(Jimp.MIME_JPEG, (err, buf) => {
                if(err) throw err;
                cropped = buf;
            });
        });

        mode = color.getColor(cropped);
        // pixels = color.getPalette(cropped, 8);
        // mode2 = (pixels.sort((a,b) =>
        //   pixels.filter(v => v===a).length
        // - pixels.filter(v => v===b).length).pop());



        percentArea = 1 - ((boxWidth * boxHeight) / (totalWidth * totalHeight));
        rDiff = (mode[0] - modeTotal[0]);
        gDiff = (mode[1] - modeTotal[1]);
        bDiff = (mode[2] - modeTotal[2]);

        rDiff = Math.sign(rDiff) * (Math.abs(rDiff / (mode[0] + rDiff)));
        gDiff = Math.sign(gDiff) * (Math.abs(gDiff / (mode[1] + gDiff)));
        bDiff = Math.sign(bDiff) * (Math.abs(bDiff / (mode[2] + bDiff)));

        modeCorrected = []
        modeCorrected[0] = Math.max(Math.min(mode[0] + percentArea * rDiff * modeTotal[0], 255), 0) ;
        modeCorrected[1] = Math.max(Math.min(mode[1] + percentArea * rDiff * modeTotal[1], 255), 0) ;
        modeCorrected[2] = Math.max(Math.min(mode[2] + percentArea * rDiff * modeTotal[2], 255), 0) ;

        // console.log(modeCorrected);

        return Promise.resolve(modeCorrected);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function filterForPets(response)
{
    const animal = {"Name": "Animal"};
    try {
        ret = []
        response.forEach(label => {
            label.Parents.forEach(parent => {
                // console.log(label.Name);
                // console.log(parent);
                if(parent.Name == "Animal" && ret.indexOf(label) < 0)
                {
                    ret.push(label);
                }
            });
        });
        return ret;

    } catch (err) {
        console.log(err);

        throw err;
    }
}

function filterForConfidence(response)
{
    try {
        ret = []
        response.forEach(label => {
            if(label.Confidence >= 85)
            {
                ret.push(label);
            }
        });
        return ret;

    } catch (err) {
        console.log(err);

        throw err;
    }
}

function validBoxes(response) {
    var boxes = [];
    response.forEach(label => {
        label.Instances.forEach(instance => {
            if(instance.BoundingBox != undefined)
            {
                boxes.push(instance.BoundingBox)
            }
        })
    })

    for( i = 0; i < boxes.length - 1; i++) {
        for(j = 0; j < i; i++) {
            console.log(i + j + boxes[i] + "owo");
            if(Math.abs(boxes[i].Width - boxes[j].Width) > 0.1) {
                return errorBox;
            }
            if(Math.abs(boxes[i].Height - boxes[j].Height) > 0.1) {
                return errorBox;
            }
            if(Math.abs(boxes[i].Left - boxes[j].Left) > 0.1) {
                return errorBox;
            }
            if(Math.abs(boxes[i].Right - boxes[j].Right) > 0.1) {
                return errorBox;
            }
        }
    }

    if(boxes.length == 0)
    return [];

    return boxes[Math.floor(boxes.length / 2)];
}

function getLength(response)
{
    length = 0;
    response.forEach( label =>{
        length = length + 1;
    });
    return length;
}

module.exports = {
    sendRekognitionRequest: sendRekognitionRequest
}
/* eslint-disable */

// Imports
// const sqlPool = require('../sql/connection');
const aws = require('../aws/awsClient');
const rekognition = aws.rekognition;
const s3 = aws.s3;

const sizeOf = require('buffer-image-size');
const Jimp = require('jimp');
const ColorThief = require('color-thief');

const { head } = require('../routers/awsRouter');
const { response } = require('express');
// const { distance } = require('jimp');

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
    const fileName0 = req.body.fileName0;
    const fileName1 = req.body.fileName1;

    const params0 = {
        Image: {
            S3Object: {
                Bucket: bucketName,
                Name: fileName0
            }
        },
        MaxLabels: 100
    };

    const params1 = {
        Image: {
            S3Object: {
                Bucket: bucketName,
                Name: fileName1
            }
        },
        MaxLabels: 100
    };

    try {
        const response0 = await rekognition.detectLabels(params0).promise();
        const response1 = await rekognition.detectLabels(params1).promise();

        labels0 = [];
        labels1 = [];

        response0.Labels.forEach( label => {
            labels0.push(label);
        });

        response1.Labels.forEach( label => {
            labels1.push(label);
        });

        labels0 = filterForPets(labels0);
        labels0 = filterForConfidence(labels0);
        labels1 = filterForPets(labels1);
        labels1 = filterForConfidence(labels1);

        if(labels0.length > 0 && labels1.length > 0)
        {
            intersectionScore = getIntersectionScore(labels0, labels1);
        
            validBox0 = validBoxes(labels0);
            validBox1 = validBoxes(labels1);
            if(validBox0 != errorBox && validBox1 != errorBox)
            {
                colour0 = [];
                colour1 = [];

                colour0 = await getColour(bucketName, fileName0, validBox0);
                // console.log(colour0);

                colour1 = await getColour(bucketName, fileName1, validBox1);

                console.log(colour0);
                colourScore = getColourScore(colour0, colour1);

                finalScore = intersectionScore/20 / 2 + (441.67 - colourScore) / 441.67 / 2;
                console.log(finalScore);
                res.status(200).send("Request succeeded");
            }
            else 
            {
                console.log("too many animals in picture! :(");
                res.status(400).send('Request failed');
            }
        }
        else 
        {
            // console.log(labels);
            // console.log(labels.array.length);
            console.log("no animals detected in image! :(");
            res.status(401).send('Request failed');
            
        }

    } catch (err) {
        console.log(err);

        res.status(500).send('Request failed');
    }
}

async function getColour(bucketName, fileName, validBox) {

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
        modeCorrected[1] = Math.max(Math.min(mode[1] + percentArea * gDiff * modeTotal[1], 255), 0) ;
        modeCorrected[2] = Math.max(Math.min(mode[2] + percentArea * bDiff * modeTotal[2], 255), 0) ;

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
        if(response.length < 1)
        {
            return ret;
        }
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
        if(response.length < 1)
        {
            return ret;
        }
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
    if(response.length < 1)
    {
        return noBox;
    }
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
            // console.log(i + j + boxes[i] + "owo");
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
    return noBox;

    return boxes[Math.floor(boxes.length / 2)];
}

function getLength(response)
{
    length = 0;
    response.Labels.forEach( label =>{
        length = length + 1;
    });
    return length;
}

function getIntersectionScore(labels0, labels1) {
    intersection = getIntersection(labels0, labels1);

    score = 0.0;

    for(i = 0; i < intersection.length; i++)
    {
        parentsScore = 0.0;
        intersection[i].Parents.forEach( parent => {
            parentsScore += 1;
        });
        parentsScore = Math.pow(parentsScore, 1.3);
        score += parentsScore; 
    }
    sore = Math.pow(score, 1.2);

    return score;
}

function getIntersection(labels0, labels1) 
{
    // console.log(labels0);
    // console.log(labels1);
    var value0s = {};
    intersection = [];

    labels0.forEach(function(item) {
        value0s[item.Name] = item.Name;
    });

    labels1.forEach(function(item) {
    if (item.Name in value0s) {
        intersection.push(item);
    }
    });

    // console.log(intersection);
    return intersection;
}

function getColourScore(colour0, colour1)
{
    return Math.sqrt (Math.pow((colour0[0]-colour1[0]),2) + Math.pow((colour0[1]-colour1[1]),2) + Math.pow((colour0[2]-colour1[2]),2));
}

module.exports = {
    sendRekognitionRequest: sendRekognitionRequest,
    getIntersectionScore: getIntersectionScore
}
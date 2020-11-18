/* eslint-disable */

// Imports
// const sqlPool = require('../sql/connection');
const aws = require('../aws/awsClient');
const rekognition = aws.rekognition;
const s3 = aws.s3;

const sizeOf = require('buffer-image-size');
const Jimp = require('jimp');
const ColorThief = require('color-thief');
const DateDiff = require('date-diff');

const { head } = require('../routers/awsRouter');
const { response } = require('express');

// const pets = ["Bird", "Bunny", "Cat", "Dog", "Guinea Pig", "Hamster", "Hare", "Kangaroo", "Mouse", "Pig", "Rabbit", "Rat", "Snake", "Wallaby"];
//This indicates an error with the bounding boxes we get from the tags
errorBox = {
    "BoundingBox": {
        "Width": -1,
        "Height": -1,
        "Left": -1,
        "Top": -1
    }
};
//if there is no box, but we still rekognze a pet, we take the whole picture without cropping
noBox = {
    "BoundingBox": {
        "Width": 1,
        "Height": 1,
        "Left": 0,
        "Top": 0
    }
};

//this compares two pictures for similarity based on tags and colour: for the final product these values will
//be saved in MySQL so we don't have to recalculate them each time.
async function sendRekognitionRequest(req, res) {
    const bucketName = req.body.bucketName;
    const fileName0 = req.body.fileName0;
    const fileName1 = req.body.fileName1;

    date0 = req.body.date0;
    date1 = req.body.date1;

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

        //only if rekognition worked on both
        if(labels0.length > 0 && labels1.length > 0)
        {
            intersectionScore = getIntersectionScore(labels0, labels1);
        
            //only if each has valid box
            validBox0 = validBoxes(labels0);
            validBox1 = validBoxes(labels1);
            if(validBox0 != errorBox && validBox1 != errorBox)
            {
                colour0 = [];
                colour1 = [];

                colour0 = await getColour(bucketName, fileName0, validBox0);
                colour1 = await getColour(bucketName, fileName1, validBox1);

                colourScore = getColourScore(colour0, colour1);

                dateScore = getDateScore(date0, date1);

                //normalise each score to 1/2 max
                finalScore = intersectionScore / 3 + colourScore / 3 +  dateScore / 3;
                console.log("\nintersection score is: " + intersectionScore);
                console.log("\ncolour score is: " + colourScore);
                console.log("\ndate score score is: " + dateScore);
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
            console.log("no animals detected in image! :(");
            res.status(401).send('Request failed');
            
        }

    } catch (err) {
        console.log(err);

        res.status(500).send('Request failed');
    }
}

function getDateScore(date0, date1)
{
    dateDiff0 = new Date(date0);
    dateDiff1 = new Date(date1);

    diff = new DateDiff(dateDiff0, dateDiff1).hours();

    max = 6*30*24;

    return Math.max((max-diff), 0)/max;
}

//gets dominant colour of pet
async function getColour(bucketName, fileName, validBox) {

    try {
        const image = await s3.getObject({Bucket: bucketName,Key: fileName}).promise();
        var color =  new ColorThief();


        //get width height and colour of whole image
        var totalDimensions = sizeOf(image.Body);
        totalWidth = totalDimensions.width;
        totalHeight = totalDimensions.height;

        colourTotal = color.getColor(image.Body);

        var box;

        //get height width and colour of only box with pet in it
        if(validBox.BoundingBox != undefined)
        box = validBox.BoundingBox;

        else
        box = validBox

        // console.log(validBox);
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

        colourBox = color.getColor(cropped);


        //get % area that crop is of total
        //get % colour diff crop is of total
        percentArea = 1 - ((boxWidth * boxHeight) / (totalWidth * totalHeight));
        rDiff = (colourBox[0] - colourTotal[0]);
        gDiff = (colourBox[1] - colourTotal[1]);
        bDiff = (colourBox[2] - colourTotal[2]);

        rDiff = Math.sign(rDiff) * (Math.abs(rDiff / (colourBox[0] + rDiff)));
        gDiff = Math.sign(gDiff) * (Math.abs(gDiff / (colourBox[1] + gDiff)));
        bDiff = Math.sign(bDiff) * (Math.abs(bDiff / (colourBox[2] + bDiff)));

        //get colour of pet by subtracting total scaled with %s from the cropped
        colourPet = []
        colourPet[0] = Math.max(Math.min(colourBox[0] + percentArea * rDiff * colourTotal[0], 255), 0) ;
        colourPet[1] = Math.max(Math.min(colourBox[1] + percentArea * gDiff * colourTotal[1], 255), 0) ;
        colourPet[2] = Math.max(Math.min(colourBox[2] + percentArea * bDiff * colourTotal[2], 255), 0) ;

        return Promise.resolve(colourPet);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//get rid of tags that are nnot releated to animals
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

//get rid of tags that arent of certain confidence
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

//gets a box for the animal in the picture
//if multiple animals: sen err message
//if no boxes: return noBox
//if overlapping boxes for smae animal: choose one box
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

//gets a score from the similarity of a set of tags to another
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
    score = Math.pow(score, 1.2);

    return score;
}

//returns the intersection between two sets of JSON tags
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

    return intersection;
}

//gets the colour difference betweeen two different colours
function getColourScore(colour0, colour1)
{
    score = Math.sqrt (Math.pow((colour0[0]-colour1[0]),2) + Math.pow((colour0[1]-colour1[1]),2) + Math.pow((colour0[2]-colour1[2]),2));
    return ((441.67 - score) / 441.67);
}

module.exports = {
    sendRekognitionRequest: sendRekognitionRequest,
    getIntersectionScore: getIntersectionScore
}
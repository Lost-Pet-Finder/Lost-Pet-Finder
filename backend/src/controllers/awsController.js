// Imports
// const sqlPool = require('../sql/connection');
const rekognition = require('../aws/rekognitionClient');
const sizeOf = require('buffer-image-size');
const Jimp = require('jimp');

var AWS = require('aws-sdk');
const ColorThief = require('color-thief');
const { head } = require('../routers/awsRouter');
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

        console.log(validBoxes(response));

        res.status(200).json({
            labels: returnedLabels
        });
    } catch (err) {
        console.log(err);

        res.status(500).send('Request failed');
    }
}

async function getColour(req, response) {
    const bucketName = req.body.bucketName;
    const fileName = req.body.fileName;

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


        
        var box;
        count = 0;
        response.Labels.forEach(label => {
            label.Instances.forEach(instance => {
                box = instance.BoundingBox
                count++;
            })
        })
        if(count != 1) {
            //throw error
        }

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

function validatePet(response)
{
    try {
        valid = false;
        response.Labels.forEach(label => {
            console.log(label.Name);
            if(pets.indexOf("Dog") > -1 )
                valid = true;
        });
        return valid;

    } catch (err) {
        console.log(err);

        throw err;
    }
}

function validBoxes(response) {
    var boxes = [];
    response.Labels.forEach(label => {
        label.Instances.forEach(instance => {
            if(instance.BoundingBox != undefined)
            {
                boxes.push(instance.BoundingBox)
            }
        })
    })

    // for( i = 0; i < boxes.length; i++) {
    //     for(j = 0; j < i; i++) {
    //         console.log(boxes[i] + "owo");
    //         if(Math.abs(boxes[i].Width - boxes[j].Width) > 0.1) {
    //             return [];
    //         }
    //         if(Math.abs(boxes[i].Height - boxes[j].Height) > 0.1) {
    //             return [];
    //         }
    //         if(Math.abs(boxes[i].Left - boxes[j].Left) > 0.1) {
    //             return [];
    //         }
    //         if(Math.abs(boxes[i].Right - boxes[j].Right) > 0.1) {
    //             return [];
    //         }
    //     }
    // }

    boxes.sort();
    if(boxes.length == 0)
    return [];

    return boxes[Math.floor(boxes.length / 2)];
}


module.exports = {
    sendRekognitionRequest: sendRekognitionRequest
}
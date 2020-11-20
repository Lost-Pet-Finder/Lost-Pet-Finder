const awsFunctions = require('../util/awsFunctions');
const colourFunctions = require('../util/colourFunctions');
const getColour = colourFunctions.getColour;
const sqlPool = require('../sql/connection');

// Should only be called by users who posted a "FOUND" report
async function searchLostPets(req, res) {
    var userid = req.body.userid;

    try {
        const myReportRows = await sqlPool.query('CALL get_users_found_reports(?)', [userid]);
        const userReport = myReportRows[0][0];

        const myLabels = JSON.parse(userReport.tags);
        const myColours = JSON.parse(userReport.colour);
        const myDate = userReport.report_date;

        const allReportsRows = await sqlPool.query('CALL get_all_lost_pets()', []);
        const allReports = allReportsRows[0];

        var retArray = [];

        console.log(userReport);
        console.log(allReports);

        for (var i = 0; i < allReports.length; i++) {
            const otherLabels = JSON.parse(allReports[i].tags);
            const otherColours = JSON.parse(allReports[i].colour);
            const otherDate = allReports[i].report_date;

            const intersectionScore = awsFunctions.getIntersectionScore(myLabels, otherLabels);
            const colourScore = awsFunctions.getColourScore(myColours, otherColours);
            const dateScore = awsFunctions.getDateScore(myDate, otherDate);

            const totalScore = intersectionScore + colourScore + dateScore; // add other scores here

            retArray.push({
                "score": totalScore,
                "report": allReports[i]
            });
        }

        retArray.sort((a,b) => {
            return b.score - a.score;
        });

        res.status(200).json(retArray);
    } catch (err) {
        console.error(err);
        res.status(500).send('Request failed');
    }
}

//create or update entry: only one entry per user
async function postLostPets(req, res) {
    //only user_id and filename needed for M6
    const userid = req.body.userid;
    const filename = req.body.filename;
    const location_x  = req.body.location_x;
    const location_y  = req.body.location_y;
    const date = req.body.date;

    var data = {
            "bucketName": 'lostpetpictures',
            "fileName": req.body.filename
    };

    try {
        var tagData = await awsFunctions.getAWSTags(data);

        tagData = awsFunctions.filterForConfidence(tagData);
        tagData = awsFunctions.filterForPets(tagData);

        if (tagData.length < 0) {
            res.status(500).send('No Animals');
        }
        
        const validBox = awsFunctions.validBoxes(tagData);
        if (validBox == awsFunctions.errorBox) {
            res.status(500).send('Multiple Animals');
        }
        const coloursArray = await awsFunctions.getColour(data.bucketName, data.fileName, validBox);

        // Convert objects to JSON String
        const tagDataString = JSON.stringify(tagData);
        const coloursArrayString = JSON.stringify(coloursArray);
        
        console.log(tagDataString);

        const response = await sqlPool.query('CALL create_lost_pet_report(?, ?, POINT(?,?), ?, ?, ?)', [userid, filename, location_x, location_y, date, tagDataString, coloursArrayString]);

        res.status(200).send(response[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Request failed');
    }
}


async function searchFoundPets(req, res) {
    // var userid = req.body.userid;

    //SQL: search for existing entry in found pets matching user_id
    try {
        const rows = await sqlPool.query('CALL get_all_found_pets()', []);
        const dataPackets = rows[0];

        var retArray = []

        for (var i = 0; i < dataPackets.length; i++) {
            const petEntry = dataPackets[i];
            const colours = await getColour('lostpetpictures', petEntry.file_name);

            retArray.push({
                information: petEntry,
                colours: colours
            });
        }

        console.log(retArray);

        res.status(200).send(retArray);
    } catch (err) {
        console.error(err);
        res.status(500).send('Request failed');
    }

}

//create or update entry: only one entry per user
async function postFoundPets(req, res) {
    //only user_id and filename needed for M6

    const userid = req.body.userid;
    const filename = req.body.filename;
    const location_x  = req.body.location_x;
    const location_y  = req.body.location_y;
    const date = req.body.date;
     
    var data = {
            "bucketName": 'lostpetpictures',
            "fileName": req.body.filename
    };

    try {
        const tags = await awsFunctions.getAWSTags(data);

        var tagNames = []
        tags.forEach(label => {
            tagNames.push(label.Name);
        });

        const tagsString = JSON.stringify(tagNames);

        const response = await sqlPool.query('CALL create_found_pet_report(?, ?, POINT(?,?), ?, ?)', [userid, filename, location_x, location_y, date, tagsString]);

        res.status(200).send(response[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Request failed');
    }
}

module.exports = {
    searchLostPets: searchLostPets,
    postLostPets: postLostPets,
    searchFoundPets: searchFoundPets,
    postFoundPets: postFoundPets
}
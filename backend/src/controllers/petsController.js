const awsFunctions = require('../util/awsFunctions');
const sqlPool = require('../sql/connection');

async function searchLostPets(req, res) {

    // var userid = req.body.userid;

    //SQL: search for existing entry in found pets matching user_id
    try {
        const rows = await sqlPool.query('CALL get_all_lost_pets()', []);
        const dataPackets = rows[0];

        res.status(200).send(dataPackets);
    } catch (err) {
        console.error(err);
        res.status(500).send('Request failed');
    }

    // // *** More advanced searching later
    // var entry = sqlDummy();
    // var results = [];
    // if( entry == null) {
    //     //SQL: query the most recent lost pets (no further filtering)
    //     results = sqlDummy();
    // }
    // else {
    //     //SQL: query lost pets with results closest to entry's fields (complex logic later)
    //     results = sqlDummy();
    // }
    // console.log(results);
    // res.send(results);
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
        const tags = await awsFunctions.getAWSTags(data);

        var tagNames = []
        tags.forEach(label => {
            tagNames.push(label.Name);
        });

        const tagsString = JSON.stringify(tagNames);

        const response = await sqlPool.query('CALL create_lost_pet_report(?, ?, POINT(?,?), ?, ?)', [userid, filename, location_x, location_y, date, tagsString]);

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

        res.status(200).send(dataPackets);
    } catch (err) {
        console.error(err);
        res.status(500).send('Request failed');
    }

    // // *** More advanced searching later
    // var entry = sqlDummy();
    // var results = [];
    // if( entry == null) {
    //     //SQL: query the most recent lost pets (no further filtering)
    //     results = sqlDummy();
    // }
    // else {
    //     //SQL: query lost pets with results closest to entry's fields (complex logic later)
    //     results = sqlDummy();
    // }
    // console.log(results);
    // res.send(results);
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
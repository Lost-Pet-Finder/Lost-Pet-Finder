const awsFunctions = require('../util/awsFunctions');
// const colourFunctions = require('../util/colourFunctions');
// const getColour = colourFunctions.getColour;
const sqlPool = require('../sql/connection');

async function searchLostPets(req, res) {

    // var userid = req.body.userid;

    try {
        const rows = await sqlPool.query('CALL get_all_lost_pets()', []);
        const dataPackets = rows[0];

        // var retArray = []

        // for (var i = 0; i < dataPackets.length; i++) {
        //     //get each entry from databse
        //     const petEntry = dataPackets[i];
        //     const colours = await getColour('lostpetpictures', petEntry.file_name);

        //     //get colours string array from db 
        //     //"1,2,3!96,100,3!10,22,4"
        //     const colour_str = petEntry.colors;

        //     //convert to three string arrays "1,2,3!96,100,3!10,22,4"=>["1,2,3", "96,100,3", "10,22,4"]
        //     var colour_arr = colour_str.split("!");

        //     //["1,2,3", "96,100,3", "10,22,4"] => [[1, 2, 3], [96, 100, 3], [10, 22, 4]
        //     var number_arr = [];
        //     colour_arr.forEach(elem => {
        //         number_arr.push(elem.split(",").map(Number));
        //     });

        //     const total_c = number_arr[0];
        //     const crop_c = number_arr[1];
        //     const final_c = numer_arr[2];

        //     retArray.push({
        //         information: petEntry,
        //         colours: colours
        //     });
        // }

        // console.log(retArray);
        
        res.status(200).send(dataPackets);
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

        // //get colour associative array
        // var color_ar = getColor(data["bucketName"], data["fileName"]);

        // //transfer the associative array to string
        // //[96, 100, 5] => "96, 100, 5"
        // var t_color = color_ar["totalColor"].toString();
        // var c_color = color_ar["croppedColor"].toString();
        // var f_color = color_ar["finalColor"].toString();
    
        // //convert to a string
        // const colorString = [t_color, c_color, f_color].join("!");

        //get the tags
        
        const tags = await awsFunctions.getAWSTags(data);

        var tagNames = []
        tags.forEach(label => {
            tagNames.push(label.Name);
        });

        const tagsString = JSON.stringify(tagNames);

        const response = await sqlPool.query('CALL create_lost_pet_report(?, ?, POINT(?,?), ?, ?)', [userid, filename, location_x, location_y, date, tagsString]);

        //added color to database
        //const response = await sqlPool.query('CALL create_lost_pet_report(?, ?, POINT(?,?), ?, ?, ?)', [userid, filename, location_x, location_y, date, tagsString, colorString]);

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

        // var retArray = []

        // for (var i = 0; i < dataPackets.length; i++) {
        //     const petEntry = dataPackets[i];
        //     const colours = await getColour('lostpetpictures', petEntry.file_name);

        //     retArray.push({
        //         information: petEntry,
        //         colours: colours
        //     });
        // }

        // console.log(retArray);

        res.status(200).send(dataPackets);
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
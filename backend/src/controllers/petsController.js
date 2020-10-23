const awsFunctions = require('../util/awsFunctions');

async function searchLostPets(req, res) {
    var userid = req.body.userid;

    
    //SQL: search for existing entry in found pets matching user_id
    var entry = sqlDummy();
    var results = [];
    if( entry == null) {
        //SQL: query the most recent lost pets (no further filtering)
        results = sqlDummy();
    }
    else {
        //SQL: query lost pets with results closest to entry's fields (complex logic later)
        results = sqlDummy();
    }

    console.log(results);
    res.send(results);
}

async function postLostPets(req, res) {
    /**
     * For NATHAN:
     * instead of aggregateData function, just do this at the beginning of this function:
     *  filename = req.body.filename;
        location  = req.body.location;
        date = req.body.date;
        userid = req.body.userid;

        then call tags = awsFunctions.getAWSTags(data)
        and then leave one line thats like *store in SQL HERE*
     */
    var filename = "";
    var location = [0,0];
    var date = "";
    var userid = 0;
    var tags = [];
    var bucketName = "";

    filename = req.body.filename;
    location  = req.body.location;
    date = req.body.date;
    userid = req.body.userid;

    var data = {
            "bucketName": req.body.bucketName,
            "fileName": req.body.filename
    };

    console.log(data);
    // awsFunctions.getAWSTags(data).then((value) => tags = value);

    //*Store in SQL here*
    res.send(200);
}
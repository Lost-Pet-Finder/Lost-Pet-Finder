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
    // tags = await awsFunctions.getAWSTags(data);

    //*Store in SQL here*
    res.send(200);
}


async function searchFoundPets(req, res) {
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

async function postFoundPets(req, res) {
    /**
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
    // tags = await awsFunctions.getAWSTags(data);

    //*Store in SQL here*
    res.send(200);
}
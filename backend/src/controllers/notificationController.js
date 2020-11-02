const sqlPool = require('../sql/connection');
const fadmin = require('../util/firebaseAdmin');

async function uploadDeviceToken(req, res) {
    const userid = req.body.userid;
    const token = req.body.deviceToken;
    

    try {
        const rows = await sqlPool.query('CALL upload_device_token(?,?)', [userid, token]);
        const dataPackets = rows[0];

        res.status(200).send(dataPackets);
    } catch (err) {
        console.error(err);
        res.status(500).send('Request failed');
    }
}

async function getUserDeviceToken(req, res) {
    const userid = req.body.userid;
    
    try {
        const rows = await sqlPool.query('CALL get_user_device_token(?)', [userid]);
        const dataPackets = rows[0];

        res.status(200).send(dataPackets);
    } catch (err) {
        console.error(err);
        res.status(500).send('Request failed');
    }
}

async function sendNotificationToUser(req, res) {
    const userid = req.body.userid;
    const targetid = req.body.targetid;
    
    try {
        const rows = await sqlPool.query('CALL get_user_device_token(?)', [targetid]);
        const dataPackets = rows[0];
        const deviceToken = dataPackets[0].device_token;

        const payload = {
            notification: {
                title: `Contact Request`,
                body: `User #${userid} wants to contact you!`
            },
            data: {
                type: `contactRequest`,
                payload: `${userid}`
            }
        }

        const response = await fadmin.messaging().sendToDevice(deviceToken, payload);

        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send('Request failed');
    }
}


module.exports = {
    uploadDeviceToken: uploadDeviceToken,
    getUserDeviceToken: getUserDeviceToken,
    sendNotificationToUser: sendNotificationToUser
}
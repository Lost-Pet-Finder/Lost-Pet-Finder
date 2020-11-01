/* eslint-disable */

// Imports
// -- Express
const express = require('express');

// -- Environment Variables
const dotenv = require('dotenv');
dotenv.config();

// Core
const awsClient = require('./aws/awsClient');
const fadmin = require('./util/firebaseAdmin');

const sql = require('./sql/connection');
const { Redshift } = require('aws-sdk');
const { response, json } = require('express');

// Routers
const awsRouter = require('./routers/awsRouter');
const petsRouter = require('./routers/petsRouter');
const userRouter = require('./routers/userRouter');

// Objects
const PORT = 6464;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`[Server] Listening on PORT ${PORT}`);
});

//ROUTES
app.get('/', (req, res) => {
    res.status(200).send('This is the Lost Pet Finder API');
});

app.use('/aws', awsRouter);
app.use('/pets', petsRouter);
app.use('/user', userRouter);



app.get('/testFirebase', async (req, res) => {

    try {
        const userId = 1;

        // get from MySQL
        const targetDeviceToken = 'eacSV4PETuaKMxuhSddbQE:APA91bHwt4gAjzwCgc6hqWnYJTjZWHdgKO3VWNfSGDwjnE9rMf3mWkhNS1VtrbA1pPNHJEL52n6uszKaPoE0forThY1u5YXzZUb3dvOvWBR3K9oepYQWk4qBgdXWbbtJR-SyMCnBwOzW';
        const firstName = 'Wren';
        const lastName = 'Liang'

        const payload = {
            notification: {
                title: `Contact Request`,
                body: `${firstName} ${lastName} wants to contact you!`
            },
            data: {
                type: `contactRequest`,
                payload: `${userId}`
            }
        }

        const response = await fadmin.messaging().sendToDevice(targetDeviceToken, payload);
        res.send('Done');
    } catch (err) {
        console.error(err);
        res.status(500).send('Request failed');
    }
});

// Shutdown Protocol
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

function shutdown() {
    sql.end((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('[MySQL] Successful disconnection!');
        }

        console.log('[Server] Exiting process');
        process.exit();
    });
}
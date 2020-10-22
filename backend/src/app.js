/* eslint-disable */

// Imports
// -- Express
const express = require('express');

// -- Environment Variables
const dotenv = require('dotenv');
dotenv.config();

// Core
const awsRekognition = require('./aws/rekognitionClient');
const sql = require('./sql/connection');
const awsRouter = require('./routers/awsRouter');

// Objects
const PORT = 6464;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`[Server] Listening on PORT ${PORT}`);
});

app.get('/', (req, res) => {
    res.status(200).send('This is the Lost Pet Finder API');
});

app.use('/aws', awsRouter);

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
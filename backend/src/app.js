const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const sql = require('./sql/connection');

const PORT = 6464;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`[Server] Listening on PORT ${PORT}`);
});

app.get('/', (req, res) => {
    res.status(200).send('This is the Lost Pet Finder API');
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
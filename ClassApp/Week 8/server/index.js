const express = require("express");
var fs = require('fs');
var https = require('https');
const app = express();
require('dotenv').config(); 

app.use(express.static('public'));

app.use('/css/', express.static(__dirname + '/public/css'));
app.use('/js/', express.static(__dirname + '/public/js'));

const port = process.env.HTTP_PORT || 3000;
const https_port = process.env.HTTPS_PORT || 4443;
app.listen(port, function() {
    console.log("Server started at http://localhost:%s", port);
});

https
    .createServer(
        {
            key: fs.readFileSync(__dirname + '/server.key'),
            cert: fs.readFileSync(__dirname + '/server.cert'),
        },
        app
    )
    .listen(https_port, function () {
        console.log('HTTPS Server started at https://localhost:%s', https_port);
    });


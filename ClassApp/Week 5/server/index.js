const express = require("express");
const app = express();
require('dotenv').config(); 

app.use(express.static('public'));

app.use('/css/', express.static(__dirname + '/public/css'));
app.use('/js/', express.static(__dirname + '/public/js'));

const port = process.env.PORT;
app.listen(port, function() {
    console.log("Server started at http://localhost:%s", port);
});


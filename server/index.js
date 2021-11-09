// Import the necessary packages
const express = require('express');
const bodyParser = require('body-parser');

// Initialize and set the express app
const app = express();
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));


// Listen to Port 3000
const port = process.env.PORT || 8080;
app.listen(port, function() {
        console.log('express server listening on port ' + port);
})